import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteShell from "@/src/components/SiteShell";

export const metadata: Metadata = {
  title: "TAM'S EMPIRE CONSTRUCTION SARL",
  description:
    "Grossiste en matériaux de construction métalliques au Cameroun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
