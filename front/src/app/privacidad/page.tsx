import React from "react";
import Link from "next/link";
import { Heading, Text } from "@/components/atoms/Typography";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacidadPage() {
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
        <Shield className="w-5 h-5 text-[#A98242]" />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#A98242]">
          DOCUMENTO EN REVISION LEGAL
        </span>
      </div>

      <Heading as="h1" size="xl" className="mb-8 font-normal">
        Aviso de Privacidad Integral
      </Heading>

      <Text variant="body" className="text-neutral-300 font-light leading-relaxed mb-6">
        En LESSSO, la protección de los datos personales y la confidencialidad de la información técnica
        de nuestros clientes constituye un principio medular de nuestra ingeniería.
      </Text>

      <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-[3px] space-y-4 text-xs font-sans text-neutral-400 font-light leading-relaxed">
        <p>
          [NOTA DE IMPLEMENTACION: Redactar aqui el texto legal definitivo conforme a la Ley Federal de Protección
          de Datos Personales en Posesión de los Particulares (LFPDPPP) o regulaciones internacionales correspondientes.
          Ver lista de control en PENDIENTES.md].
        </p>
        <p>
          Finalidad principal del tratamiento: Los datos recabados a través del formulario de contacto
          (Nombre, Correo electrónico, Teléfono, Empresa y Detalles del proyecto) serán utilizados única y
          exclusivamente para evaluar la solicitud técnica solicitada y establecer comunicación directa
          con el prospecto. No se ceden datos a terceros sin consentimiento previo por escrito.
        </p>
      </div>
    </main>
  );
}
