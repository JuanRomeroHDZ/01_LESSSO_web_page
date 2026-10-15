import { NotFoundView } from "@/components/organisms/NotFoundView";

export const metadata = {
  title: "Ciberseguridad - Módulo en Despliegue | LESSSO",
  description: "División técnica de ciberseguridad en proceso de despliegue controlado.",
};

/**
 * Pantalla de modulo en despliegue para la division de Ciberseguridad
 * Renderiza la vista 404 personalizada independiente
 */
export default function CybersecurityPage() {
  return <NotFoundView />;
}
