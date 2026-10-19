import { Metadata } from "next";
import { NotFoundView } from "@/components/organisms/NotFoundView";

export const metadata: Metadata = {
  title: "Módulo en Despliegue // Próximamente | LESSSO",
  description:
    "Área especializada en arquitectura, desarrollo y endurecimiento de infraestructura actualmente en fase de especificación.",
};

export default function ProximamentePage() {
  return <NotFoundView />;
}
