import "./globals.css";

export const metadata = {
  title: "VisualNickBarber",
  description: "Barber Studio — Fades limpios, estética y detalle.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
                <svg
                  width="20"
                  height="20"
                  stroke="#c9a646"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
                </svg>
                Sobre mí
              </a>

              {/* GALERÍA */}
              <a
                href="/gallery"
                className="flex items-center gap-2 px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium
                  transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
              >
                <svg
                  width="20"
                  height="20"
                  stroke="#c9a646"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
                Galería
              </a>

              {/* RESEÑAS */}
              <a
                href="/reviews"
                className="flex items-center gap-2 px-4 py-2 border border-[#c9a646] rounded-lg text-[#c9a646] font-medium
                  transition-all duration-200 hover:scale-110 hover:bg-[#c9a646]/10"
              >
                <svg
                  width="20"
                  height="20"
                  stroke="#c9a646"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3l3 6 6 .5-4.5 4 1.5 6-6-3.5L6 19l1.5-6L3 9.5l6-.5z" />
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
}

