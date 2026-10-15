import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Heading, Text } from "@/components/atoms/Typography";
import { GoldLine } from "@/components/atoms/GoldLine";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { Spotlight } from "@/components/atoms/Spotlight";
import { ArrowLeft, Terminal } from "lucide-react";

/**
 * Componente Organismo NotFoundView
 * Pantalla completa independiente para la pagina 404.
 * Sin Header ni Footer. Estetica tecnica de alto contraste con trazos SVG,
 * indicador de modulo en despliegue y boton con esquinas al 10% para regresar.
 * Cero emojis.
 */
export const NotFoundView: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-[#080A0A] text-[#FFFFFF] flex flex-col justify-between p-8 md:p-16 relative overflow-hidden select-none">
      {/* Textura de grano editorial y luz ambiental */}
      <FilmGrain opacity={0.04} />
      <Spotlight />

      {/* Cabecera superior independiente */}
      <div className="w-full flex items-center justify-between z-10">
        <BrandLogo mode="vector-font" color="white" />
        <div className="flex items-center gap-2 text-xs font-mono text-[#A98242]">
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP_STATUS_404</span>
        </div>
      </div>

      {/* Bloque Central de Alto Impacto */}
      <div className="max-w-2xl mx-auto w-full flex flex-col items-start z-10 my-auto text-left py-12">
        {/* Badge de estado tecnico */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-[#A98242] rounded-[1px] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#A98242]">
            ESTADO DEL SERVICIO: MODULO EN DESPLIEGUE
          </span>
        </div>

        {/* Codigo 404 en tipografia Lora con trazo arquitectonico */}
        <Heading as="h1" size="display" className="font-serif font-light text-[#FFFFFF] mb-4">
          404 <span className="font-serif italic font-normal text-[#A98242]">/</span>
        </Heading>

        <Heading as="h2" size="lg" className="font-normal text-[#FFFFFF] mb-6">
          Ruta no disponible o en proceso de arquitectura
        </Heading>

        <Text variant="lead" className="text-neutral-400 font-light leading-relaxed mb-8">
          La división o sección que intenta consultar se encuentra actualmente bajo proceso de
          auditoría, desarrollo de especificaciones o migración controlada. No se han detectado brechas ni
          fallos en la infraestructura central.
        </Text>

        <GoldLine className="opacity-40 mb-10 max-w-sm" />

        {/* Boton de Retorno con Esquinas al 10% */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#F8F8F6] text-[#080A0A] font-sans text-xs uppercase tracking-widest font-medium rounded-[3px] hover:bg-[#FFFFFF] transition-all duration-300 shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Regresar a la Página Principal</span>
        </Link>
      </div>

      {/* Pie de pantalla 404 */}
      <div className="w-full flex items-center justify-between z-10 text-[11px] font-mono text-neutral-600">
        <span>LESSSO TECHNICAL ECOSYSTEM</span>
        <span>INFRASTRUCTURE RESILIENCE V1.0</span>
      </div>
    </main>
  );
};
