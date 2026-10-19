"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormSchemaType } from "@/lib/validators";
import { submitContactLead } from "@/lib/api-client";
import { useCooldown } from "@/hooks/useCooldown";
import { EntityType, AreaOfInterest, CompanySize, UrgencyLevel, EstimatedBudget } from "@/types";
import { Locale, SITE_CONTENT } from "@/config/site-content";

// Componentes Atomicos y Moleculares
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Button } from "@/components/atoms/Button";
import { Heading, Text } from "@/components/atoms/Typography";
import { EntitySwitch } from "@/components/molecules/EntitySwitch";
import { FormField } from "@/components/molecules/FormField";
import { CooldownTimer } from "@/components/molecules/CooldownTimer";
import { WhatsAppButton } from "@/components/molecules/WhatsAppButton";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { DiagonalLightRays } from "@/components/atoms/DiagonalLightRays";

export interface CrmContactFormProps {
  currentLocale: Locale;
  isCybersecurity?: boolean;
  defaultArea?: AreaOfInterest;
}

const countryDialingCodes = [
  { code: "+52", label: "México (+52)" },
  { code: "+1", label: "EE.UU. / Canadá (+1)" },
  { code: "+34", label: "España (+34)" },
  { code: "+57", label: "Colombia (+57)" },
  { code: "+54", label: "Argentina (+54)" },
  { code: "+56", label: "Chile (+56)" },
  { code: "+51", label: "Perú (+51)" },
  { code: "+506", label: "Costa Rica (+506)" },
  { code: "+507", label: "Panamá (+507)" },
];

/**
 * Componente Organismo CrmContactForm
 * Formulario reactivo y seguro que alimenta Twenty CRM y respalda en PostgreSQL.
 * Cuenta con conmutador Persona / Empresa, Cooldown de 90 segundos con barra dorada,
 * validacion doble con Zod, trampa Honeypot y boton editorial de WhatsApp.
 */
export const CrmContactForm: React.FC<CrmContactFormProps> = ({
  currentLocale,
  isCybersecurity = false,
  defaultArea,
}) => {
  const t = SITE_CONTENT[currentLocale].contact;
  const [selectedEntity, setSelectedEntity] = useState<EntityType>("PERSON");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Hook del periodo de enfriamiento (90 segundos por defecto)
  const {
    isCooldownActive,
    remainingSeconds,
    totalSeconds,
    progressPercent,
    startCooldown,
  } = useCooldown(90);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      entityType: "PERSON",
      countryCode: "+52",
      termsAccepted: false,
      website_verification_code: "",
      projectDetails: "",
      areaOfInterest: defaultArea || (isCybersecurity ? "Ciberseguridad" : undefined),
    },
  });

  // Observar valores en tiempo real para el contador y el boton de WhatsApp
  const watchedDetails = watch("projectDetails") || "";
  const watchedFullName = watch("fullName");
  const watchedCompany = watch("companyName");
  const watchedArea = watch("areaOfInterest");

  // Cambio de entidad Persona / Empresa
  const handleEntityChange = (entity: EntityType) => {
    setSelectedEntity(entity);
    setValue("entityType", entity, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormSchemaType) => {
    setServerError(null);

    if (isCooldownActive) {
      setServerError(`Por favor espere ${remainingSeconds} segundos antes de enviar nuevamente.`);
      return;
    }

    try {
      const response = await submitContactLead({
        entityType: data.entityType,
        fullName: data.fullName,
        email: data.email,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        areaOfInterest: data.areaOfInterest as AreaOfInterest,
        projectDetails: data.projectDetails,
        termsAccepted: data.termsAccepted,
        website_verification_code: data.website_verification_code,
        // Campos de Empresa si corresponden
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        companySize: data.companySize as CompanySize,
        urgencyLevel: data.urgencyLevel as UrgencyLevel,
        estimatedBudget: data.estimatedBudget as EstimatedBudget,
      });

      if (response.success) {
        setSubmissionSuccess(true);
        startCooldown(response.data?.cooldownSeconds || 90);
        reset({
          entityType: selectedEntity,
          countryCode: "+52",
          termsAccepted: false,
          website_verification_code: "",
          projectDetails: "",
        });
      } else {
        if (response.remainingSeconds && response.remainingSeconds > 0) {
          startCooldown(response.remainingSeconds);
        }
        setServerError(response.message || "Ocurrió un error al procesar la solicitud.");
      }
    } catch {
      setServerError("Error de comunicación con el servidor. Verifique su conexión.");
    }
  };

  return (
    <section
      id="contacto"
      className={cn(
        "py-28 px-6 md:px-12 relative overflow-hidden transition-colors duration-200",
        "bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF]",
        "border-t border-neutral-200 dark:border-neutral-900"
      )}
    >
      {/* Soporte de ancla para enlaces directos #contact */}
      <span id="contact" className="sr-only" aria-hidden="true" />

      {/* Rayos Diagonales de Fondo */}
      <DiagonalLightRays
        variant={isCybersecurity ? "cybersecurity" : "home"}
        opacity={isCybersecurity ? 0.6 : 0.45}
      />

      {/* Iluminacion ambiental para seccion de Ciberseguridad */}
      {isCybersecurity && (
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(circle,rgba(158,42,43,0.14)_0%,rgba(36,11,11,0.05)_50%,transparent_70%)] blur-3xl select-none opacity-50 dark:opacity-40"
          aria-hidden="true"
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Encabezado de la Seccion */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A98242] mb-3 font-semibold">
            {t.sectionBadge}
          </span>
          <Heading as="h2" size="xl" className="font-normal mb-4 text-[#080A0A] dark:text-[#FFFFFF]">
            {t.sectionTitle}{" "}
            <span className="italic font-normal text-[#240B0B] dark:text-[#F8F8F6]">
              {t.sectionTitleItalic}
            </span>
          </Heading>
          <Text variant="lead" className="text-[#080A0A]/75 dark:text-neutral-400 max-w-xl font-light">
            {t.sectionSubtitle}
          </Text>
        </div>

        {/* Notificacion de Cooldown Activo */}
        {isCooldownActive && (
          <div className="mb-10">
            <CooldownTimer
              remainingSeconds={remainingSeconds}
              totalSeconds={totalSeconds}
              progressPercent={progressPercent}
              title={t.cooldown.activeTitle}
              message={t.cooldown.activeMessage}
            />
          </div>
        )}

        {/* Mensaje de Exito Inmediato */}
        {submissionSuccess && !isCooldownActive && (
          <div className="mb-10 p-6 bg-neutral-100 dark:bg-neutral-950 border border-[#A98242]/50 rounded-[3px] flex items-start gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#A98242] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-base text-[#080A0A] dark:text-[#FFFFFF] font-normal mb-1">
                {t.feedback.successHeading}
              </h4>
              <p className="font-sans text-xs text-[#080A0A]/75 dark:text-neutral-300 font-light leading-relaxed">
                {t.feedback.successText}
              </p>
            </div>
          </div>
        )}

        {/* Mensaje de Error del Servidor */}
        {serverError && (
          <div className="mb-8 p-4 bg-red-950/40 border border-red-800/60 rounded-[3px] flex items-center gap-3 text-xs text-red-200">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Contenedor del Formulario */}
        <div
          className={cn(
            "p-8 md:p-12 rounded-[3px] transition-all",
            isCybersecurity
              ? "bg-[#FFFFFF] dark:bg-[#080A0A]/90 border border-[#7A1C1C]/40 dark:border-[#A98242]/40 shadow-xl"
              : "bg-[#FFFFFF] dark:bg-[#080A0A]/90 border border-neutral-300 dark:border-neutral-800 shadow-md"
          )}
        >
          {/* Conmutador Superior Persona / Empresa (Esquinas al 10%) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-neutral-200 dark:border-neutral-900">
            <span className="text-xs uppercase tracking-widest text-[#080A0A]/70 dark:text-neutral-400 font-light">
              Modalidad de Contacto:
            </span>
            <EntitySwitch
              value={selectedEntity}
              onChange={handleEntityChange}
              personLabel={t.switch.person}
              companyLabel={t.switch.company}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo Honeypot Invisible contra robots spammer */}
            <div className="sr-only" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website_verification_code")}
              />
            </div>

            {/* Fila 1: Nombre y Correo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label={t.fields.fullName.label}
                required
                error={errors.fullName?.message}
              >
                <Input
                  placeholder={t.fields.fullName.placeholder}
                  hasError={!!errors.fullName}
                  {...register("fullName")}
                />
              </FormField>

              <FormField
                label={t.fields.email.label}
                required
                error={errors.email?.message}
              >
                <Input
                  type="email"
                  placeholder={t.fields.email.placeholder}
                  hasError={!!errors.email}
                  {...register("email")}
                />
              </FormField>
            </div>

            {/* Fila 2: Telefono con Lada Internacional y Area de Interes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label={t.fields.phone.label}
                required
                helper={t.fields.phone.helper}
                error={errors.phoneNumber?.message}
              >
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <Controller
                      name="countryCode"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={countryDialingCodes.map((c) => ({
                            value: c.code,
                            label: c.code,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="w-2/3">
                    <Input
                      type="tel"
                      maxLength={10}
                      placeholder={t.fields.phone.placeholder}
                      hasError={!!errors.phoneNumber}
                      {...register("phoneNumber")}
                    />
                  </div>
                </div>
              </FormField>

              <FormField
                label={t.fields.area.label}
                required
                error={errors.areaOfInterest?.message}
              >
                <Controller
                  name="areaOfInterest"
                  control={control}
                  render={({ field }) => (
                    <Select
                      placeholder={t.fields.area.placeholder}
                      options={t.fields.area.options}
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.areaOfInterest}
                    />
                  )}
                />
              </FormField>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* CAMPOS ADICIONALES CONDICIONALES PARA EMPRESA                    */}
            {/* Para agregar mas campos: declare en Zod y vincule aqui con Input */}
            {/* ---------------------------------------------------------------- */}
            {selectedEntity === "COMPANY" && (
              <div className="pt-6 border-t border-neutral-900 space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label={t.fields.companyName.label}
                    required
                    error={errors.companyName?.message}
                  >
                    <Input
                      placeholder={t.fields.companyName.placeholder}
                      hasError={!!errors.companyName}
                      {...register("companyName")}
                    />
                  </FormField>

                  <FormField
                    label={t.fields.jobTitle.label}
                    error={errors.jobTitle?.message}
                  >
                    <Input
                      placeholder={t.fields.jobTitle.placeholder}
                      hasError={!!errors.jobTitle}
                      {...register("jobTitle")}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label={t.fields.companySize.label}
                    error={errors.companySize?.message}
                  >
                    <Controller
                      name="companySize"
                      control={control}
                      render={({ field }) => (
                        <Select
                          placeholder={t.fields.companySize.placeholder}
                          options={t.fields.companySize.options}
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormField>

                  <FormField
                    label={t.fields.urgency.label}
                    error={errors.urgencyLevel?.message}
                  >
                    <Controller
                      name="urgencyLevel"
                      control={control}
                      render={({ field }) => (
                        <Select
                          placeholder={t.fields.urgency.placeholder}
                          options={t.fields.urgency.options}
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormField>

                  <FormField
                    label={t.fields.budget.label}
                    error={errors.estimatedBudget?.message}
                  >
                    <Controller
                      name="estimatedBudget"
                      control={control}
                      render={({ field }) => (
                        <Select
                          placeholder={t.fields.budget.placeholder}
                          options={t.fields.budget.options}
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormField>
                </div>
              </div>
            )}

            {/* Fila 3: Detalles del Proyecto (Textarea con contador en vivo 20-500) */}
            <FormField
              label={t.fields.projectDetails.label}
              required
              charCount={{ current: watchedDetails.length, min: 20, max: 500 }}
              error={errors.projectDetails?.message}
            >
              <textarea
                rows={4}
                maxLength={500}
                placeholder={t.fields.projectDetails.placeholder}
                className="w-full px-4 py-3 text-sm font-sans font-light rounded-[3px] bg-[#F8F8F6] dark:bg-[#080A0A]/40 text-[#080A0A] dark:text-[#FFFFFF] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border border-neutral-300 dark:border-neutral-800 transition-all duration-200 outline-none focus:border-[#A98242] focus:ring-1 focus:ring-[#A98242]/30 resize-none"
                {...register("projectDetails")}
              />
            </FormField>

            {/* Fila 4: Casilla de Terminos y Privacidad */}
            <div className="flex items-start gap-3 pt-2">
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    hasError={!!errors.termsAccepted}
                  />
                )}
              />
              <label className="text-xs text-[#080A0A]/70 dark:text-neutral-400 font-light select-none cursor-pointer leading-tight">
                {t.fields.terms.checkbox}
                {/* Enlace futuro: vincular a /terminos y /privacidad una vez redactados */}
              </label>
            </div>
            {errors.termsAccepted && (
              <span className="text-xs text-red-500 dark:text-red-400 block -mt-3 font-light">
                {errors.termsAccepted.message}
              </span>
            )}

            {/* Botones de Envio y Canal de WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-900">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={isCooldownActive}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? t.buttons.submitting : t.buttons.submit}
              </Button>

              {/* Boton Dinamico de WhatsApp (Diseno Editorial Sobrio) */}
              <div className="w-full sm:w-auto">
                <WhatsAppButton
                  label={t.buttons.whatsappDefault}
                  formData={{
                    fullName: watchedFullName,
                    companyName: watchedCompany,
                    areaOfInterest: watchedArea,
                    projectDetails: watchedDetails,
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
