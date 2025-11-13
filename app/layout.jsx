import "./globals.css";

export const metadata = {
  title: "VisualNickBarber",
  description: "Barber Studio — Fades limpios, estética y detalle.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        {/* NAVBAR PREMIUM */}
        <header className="w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">

            {/* LOGO / NOMBRE */}
            <a
              href="/"
              className="text-[#c9a646] font-bold tracking-wider text-xl hover:opacity-80 transition"
            >
              VISUALNICKBARBER
            </a>

            {/* BOTONES */}
            <div className="flex items-center gap-4">

              {/* SOBRE MÍ */}
              <a
                href="/about"
                className="flex items-center gap-2 px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium
                           transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
              >
                <svg width="18" height="18" fill="#c9a646" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 12c4.418 0 8 2.239 8 5v2H4v-2c0-2.761 3.582-5 8-5z"/>
                </svg>
                Sobre mí
              </a>

              {/* GALERÍA */}
              <a
                href="/gallery"
                className="flex items-center gap-2 px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium
                           transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
              >
                <svg width="18" height="18" fill="#c9a646" viewBox="0 0 24 24">
                  <path d="M4 5h3l2-2h6l2 2h3v14H4V5zm8 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8z"/>
                </svg>
                Galería
              </a>

              {/* RESEÑAS */}
              <a
                href="/reviews"
                className="flex items-center gap-2 px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium
                           transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
              >
                <svg width="18" height="18" fill="#c9a646" viewBox="0 0 24 24">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4l-6 4l1.5-7.5L2 9h7z"/>
                </svg>
                Reseñas
              </a>
            </div>
          </nav>
        </header>

        {/* CONTENIDO DE LAS PÁGINAS */}
        {children}
      </body>
    </html>
  );

