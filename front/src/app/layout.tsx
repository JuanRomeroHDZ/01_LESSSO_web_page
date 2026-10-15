import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LESSSO | Ingeniería de Precisión, Trato Humano",
  description:
    "Plataforma de ciberseguridad avanzada, desarrollo de software crítico y arquitectura de infraestructura resiliente para organizaciones modernas.",
  icons: {
    icon: "/assets/logos/lessso-gold.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${lora.variable} ${poppins.variable} scroll-smooth`}>
      <body className="bg-[#080A0A] text-[#FFFFFF] antialiased selection:bg-[#A98242] selection:text-[#080A0A]">
        {children}
      </body>
    </html>
  );
}
