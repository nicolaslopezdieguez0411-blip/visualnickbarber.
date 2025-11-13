import "./globals.css";

export const metadata = {
  title: "VisualNickBarber — Madrid",
  description: "Precisión visual en cada corte. Degradados limpios, acabado profesional.",
  openGraph: { title: "VisualNickBarber — Madrid", images: ["/og.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body><header className="w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
  <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
    
    {/* LOGO O NOMBRE */}
    <a href="/" className="text-[#c9a646] font-bold tracking-wider text-xl hover:opacity-80 transition">
      VISUALNICKBARBER
    </a>

    {/* BOTONES */}
    <div className="flex items-center gap-4">
      <a
        href="/about"
        className="px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium 
                   transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
      >
        Sobre mí
      </a>

      <a
        href="/gallery"
        className="px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium 
                   transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
      >
        Galería
      </a>

      <a
        href="/reviews"
        className="px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium 
                   transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
      >
        Reseñas
      </a>
    </div>
  </nav>
</header>
{children}</body>
    </html>
  );
}
