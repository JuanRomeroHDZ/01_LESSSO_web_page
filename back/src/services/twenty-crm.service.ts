import { env } from "../config/env";
import { StoredLead, updateLeadSyncStatus } from "./lead-storage.service";

export interface TwentyCrmResult {
  synced: boolean;
  personId?: string;
  companyId?: string;
  reason?: string;
}

/**
 * Servicio resiliente de integracion con Twenty CRM.
 * Si las credenciales no existen o el CRM esta fuera de linea,
 * no interrumpe el flujo del usuario y mantiene el lead seguro en PostgreSQL.
 */
export async function syncLeadWithTwentyCrm(lead: StoredLead): Promise<TwentyCrmResult> {
  const apiUrl = env.TWENTY_API_URL;
  const apiKey = env.TWENTY_API_KEY;

  // 1. Verificacion de configuracion activa
  if (!apiUrl || !apiKey || apiKey.trim().length === 0) {
    console.info(
      `[TWENTY_CRM_INFO] Integracion en modo pasivo. Lead ${lead.id} resguardado en PostgreSQL con estado PENDING. (Configurar TWENTY_API_KEY en .env para transmision automatica)`
    );
    return {
      synced: false,
      reason: "TWENTY_API_KEY_NOT_CONFIGURED",
    };
  }

  try {
    // Separar nombre y apellido para formato estandar de CRM
    const nameParts = lead.fullName.trim().split(" ");
    const firstName = nameParts[0] || lead.fullName;
    const lastName = nameParts.slice(1).join(" ") || "N/A";

    let companyId: string | undefined = undefined;

    // 2. Si es modalidad Empresa, registrar la organizacion primero
    if (lead.entityType === "COMPANY" && lead.companyName) {
      try {
        const companyPayload = {
          query: `
            mutation CreateCompany($input: CompanyCreateInput!) {
              createCompany(data: $input) {
                id
                name
              }
            }
          `,
          variables: {
            input: {
              name: lead.companyName,
              domainName: lead.email.split("@")[1] || "",
              employees: lead.companySize || undefined,
            },
          },
        };

        const companyRes = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(companyPayload),
        });

        if (companyRes.ok) {
          const companyData = await companyRes.json() as {
            data?: { createCompany?: { id: string } };
          };
          companyId = companyData?.data?.createCompany?.id;
        } else {
          console.warn("[TWENTY_CRM_WARN] Respuesta no satisfactoria al crear Company:", companyRes.status);
        }
      } catch (companyErr) {
        console.warn("[TWENTY_CRM_WARN] No se pudo crear Company en Twenty CRM:", (companyErr as Error).message);
      }
    }

    // 3. Crear el registro en People (Contacto)
    const personPayload = {
      query: `
        mutation CreatePerson($input: PersonCreateInput!) {
          createPerson(data: $input) {
            id
            name {
              firstName
              lastName
            }
          }
        }
      `,
      variables: {
        input: {
          name: {
            firstName: firstName,
            lastName: lastName,
          },
          emails: {
            primaryEmail: lead.email,
          },
          phones: {
            primaryPhone: lead.phone,
          },
          jobTitle: lead.jobTitle || undefined,
          companyId: companyId || undefined,
          intro: `Area de Interes: ${lead.areaOfInterest} | Urgencia: ${lead.urgencyLevel || "N/A"} | Presupuesto: ${lead.estimatedBudget || "N/A"} | Necesidad: ${lead.projectDetails}`,
        },
      },
    };

    const personRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(personPayload),
    });

    if (!personRes.ok) {
      throw new Error(`Twenty CRM respondio con codigo HTTP ${personRes.status}`);
    }

    const personData = await personRes.json() as {
      data?: { createPerson?: { id: string } };
      errors?: Array<{ message: string }>;
    };

    if (personData.errors && personData.errors.length > 0) {
      throw new Error(`Error GraphQL en Twenty CRM: ${personData.errors[0]?.message}`);
    }

    const personId = personData?.data?.createPerson?.id;

    // 4. Actualizar estado local a SYNCED
    await updateLeadSyncStatus(lead.id, "SYNCED", personId, companyId);

    console.info(`[TWENTY_CRM_SUCCESS] Lead ${lead.id} sincronizado exitosamente con Twenty CRM. Person ID: ${personId}`);

    return {
      synced: true,
      personId,
      companyId,
    };
  } catch (error) {
    console.error(
      `[TWENTY_CRM_ERROR] No se pudo sincronizar el lead ${lead.id} con Twenty CRM: ${(error as Error).message}. El lead permanece resguardado en PostgreSQL con estado FAILED para reintento.`
    );

    // Actualizar a FAILED para reintento posterior sin arrojar error al usuario
    await updateLeadSyncStatus(lead.id, "FAILED");

    return {
      synced: false,
      reason: (error as Error).message,
    };
  }
}
