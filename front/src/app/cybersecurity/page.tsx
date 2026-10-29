import { getSiteUrl } from "@/lib/site-url";
import { CybersecurityView } from "@/components/organisms/CybersecurityView";

export const metadata = {
  title: "Ciberseguridad & Penetration Testing | LESSSO",
  description:
    "Pruebas de penetración y evaluación de vulnerabilidades en aplicaciones, redes y sistemas. Conozca los servicios de ciberseguridad de LESSSO.",
  alternates: getSiteUrl() ? { canonical: "/cybersecurity" } : undefined,
  openGraph: {
    title: "Ciberseguridad y pruebas de penetración | LESSSO",
    description: "Evaluamos la seguridad de sus sistemas para ayudarle a identificar y atender vulnerabilidades.",
  },
};

/**
 * Página Oficial de la División de Ciberseguridad de LESSSO
 * Especializada en Penetration Testing y Seguridad Ofensiva/Defensiva Práctica
 */
export default function CybersecurityPage() {
  return <CybersecurityView />;
}
