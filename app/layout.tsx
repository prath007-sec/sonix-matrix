import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SONIX MATRIX MK-IV | Neural Synthesizer & Spatial Audio Studio",
  description: "Tactile generative synthesizer and spatial audio workstation driven by an illuminated quantum dot matrix display. Compose, sculpt, and perform in real-time.",
  keywords: ["Synthesizer", "Dot Matrix", "Audio Workstation", "Music Production", "DAW", "Spatial Audio", "DSP"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070709] text-zinc-100 antialiased selection:bg-zinc-100 selection:text-black">
        {children}
      </body>
    </html>
  );
}
