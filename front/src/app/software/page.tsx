import { NotFoundView } from "@/components/organisms/NotFoundView";

export const metadata = {
  title: "Desarrollo de Software - Módulo en Despliegue | LESSSO",
  description: "División técnica de desarrollo de software en proceso de despliegue controlado.",
};

/**
 * Pantalla de modulo en despliegue para la division de Desarrollo de Software
 * Renderiza la vista 404 personalizada independiente
 */
export default function SoftwarePage() {
  return <NotFoundView />;
}
