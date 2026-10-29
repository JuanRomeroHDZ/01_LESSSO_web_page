import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Heading, Text } from "@/components/atoms/Typography";
import { ArrowLeft, FileText } from "lucide-react";

export default function TerminosPage() {
  if (process.env.NEXT_PUBLIC_LEGAL_PAGES_ENABLED !== "true") notFound();
  return (
    <main className="min-h-screen bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] px-6 py-24 max-w-4xl mx-auto flex flex-col justify-start">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A98242] hover:text-[#080A0A] dark:hover:text-white transition-colors mb-12 font-sans"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Regresar al Inicio</span>
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-5 h-5 text-[#A98242]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#A98242]">
          DOCUMENTO EN REVISION LEGAL
        </span>
      </div>

      <Heading as="h1" size="xl" className="mb-8 font-normal">
        Términos y Condiciones de Servicio
      </Heading>

      <Text variant="body" className="text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-6">
        Bienvenido a los servicios tecnológicos y consultoría especializada de LESSSO. El acceso y uso
        de nuestra plataforma se rige por los presentes términos.
      </Text>

      <div className="p-6 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-[3px] space-y-4 text-xs font-sans text-neutral-700 dark:text-neutral-400 font-light leading-relaxed">
        <p>
          [NOTA DE IMPLEMENTACION: Redactar aqui las clausulas definitivas relativas a propiedad intelectual,
          acuerdos de nivel de servicio (SLA), alcances de responsabilidad y jurisdiccion aplicable.
          Ver lista de control en PENDIENTES.md].
        </p>
        <p>
          Propiedad Intelectual: Todo el software, codigo, metodologias y arquitecturas desarrolladas
          por LESSSO bajo contratos de servicio seran transferidas de conformidad con los acuerdos especificos
          pactados por escrito con cada cliente.
        </p>
      </div>
    </main>
  );
}
