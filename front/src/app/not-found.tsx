import { NotFoundView } from "@/components/organisms/NotFoundView";

export const metadata = {
  title: "404 - Módulo en Despliegue | LESSSO",
  description: "Ruta no disponible o en proceso de arquitectura técnica.",
};

/**
 * Pagina 404 de Next.js App Router
 * Pantalla completa independiente, sin Header ni Footer globales.
 */
export default function NotFound() {
  return <NotFoundView />;
}
