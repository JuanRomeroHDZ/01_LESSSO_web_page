import { NotFoundView } from "@/components/organisms/NotFoundView";

export const metadata = {
  title: "Infraestructura - Módulo en Despliegue | LESSSO",
  description: "División técnica de infraestructura resiliente en proceso de despliegue controlado.",
};

/**
 * Pantalla de modulo en despliegue para la division de Infraestructura
 * Renderiza la vista 404 personalizada independiente
 */
export default function InfrastructurePage() {
  return <NotFoundView />;
}
