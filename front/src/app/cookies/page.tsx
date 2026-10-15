import React from "react";
import Link from "next/link";
import { Heading, Text } from "@/components/atoms/Typography";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#080A0A] text-[#FFFFFF] px-6 py-24 max-w-4xl mx-auto flex flex-col justify-start">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A98242] hover:text-white transition-colors mb-12 font-sans"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Regresar al Inicio</span>
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <Cookie className="w-5 h-5 text-[#A98242]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#A98242]">
          DOCUMENTO EN REVISION LEGAL
        </span>
      </div>

      <Heading as="h1" size="xl" className="mb-8 font-normal">
        Política de Cookies y Almacenamiento Local
      </Heading>

      <Text variant="body" className="text-neutral-300 font-light leading-relaxed mb-6">
        La plataforma web de LESSSO utiliza únicamente elementos de almacenamiento estrictamente necesarios
        para garantizar la seguridad del sistema y prevenir abusos en el envío de formularios.
      </Text>

      <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-[3px] space-y-4 text-xs font-sans text-neutral-400 font-light leading-relaxed">
        <p>
          Uso de SessionStorage: Empleamos variables de sesión volátiles para el control del temporizador de espera (Cooldown de 90 segundos)
          tras el envío exitoso de una consulta técnica. No empleamos cookies invasivas de seguimiento ni píxeles publicitarios de terceros.
        </p>
      </div>
    </main>
  );
}
