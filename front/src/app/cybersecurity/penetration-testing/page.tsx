import { Metadata } from "next";
import { NotFoundView } from "@/components/organisms/NotFoundView";

export const metadata: Metadata = {
  title: "Penetration Testing // En Despliegue | LESSSO Ciberseguridad",
  description:
    "Módulo de Penetration Testing especializado en seguridad ofensiva, pruebas de intrusión y auditoría técnica avanzada. Próximamente disponible.",
};

export default function PenetrationTestingPage() {
  return <NotFoundView />;
}
