import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import { ThemeProvider } from "@/context/ThemeContext";
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

const siteUrl = getSiteUrl();
const description = "Servicios de ciberseguridad, desarrollo de software e infraestructura tecnológica en Tijuana. Conozca a LESSSO y hable con nuestro equipo.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: "LESSSO | Ciberseguridad, software e infraestructura en Tijuana",
  description,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "LESSSO",
    title: "LESSSO | Tecnología con atención cercana",
    description,
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: { card: "summary", title: "LESSSO | Tecnología con atención cercana", description },
  icons: { icon: "/assets/logos/lessso-gold.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth" suppressHydrationWarning className={`${lora.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('lessso-theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-[#F8F8F6] text-[#080A0A] dark:bg-[#080A0A] dark:text-[#F8F8F6] antialiased selection:bg-[#A98242] selection:text-[#080A0A] transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
