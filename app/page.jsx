import "./globals.css";

export const metadata = {
  title: "VisualNickBarber — Madrid",
  description: "Precisión visual en cada corte. Degradados limpios, acabado profesional.",
  openGraph: { title: "VisualNickBarber — Madrid", images: ["/og.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
const whatsappLink = "https://wa.me/34613143562?text=Hola%20VisualNckBarber%2C%20quiero%20reservar%20un%20corte%20%F0%9F%92%88";
const instagramLink = "https://instagram.com/visualnick.barber";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <img src="/logo.png" alt="VisualNickBarber logo" className="w-28 h-28 mx-auto mb-6 rounded-full" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">VisualNickBarber</h1>
        <p className="mt-3 text-zinc-300">Madrid · 10 primeros cortes GRATIS (lanzamiento)</p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <a href={whatsappLink} className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:opacity-90 transition">WhatsApp</a>
          <a href={instagramLink} target="_blank" className="rounded-2xl px-5 py-3 border border-zinc-700 hover:border-zinc-500 transition">Instagram</a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold">Servicios & Precios</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
            <div className="font-semibold">Corte + Fade limpio</div>
            <div className="text-zinc-400 mt-2">Degradado preciso y acabado a tijera.</div>
            <div className="mt-3">10 € (lanzamiento)</div>
          </div>
          <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
            <div className="font-semibold">Barba + Perfilado</div>
            <div className="text-zinc-400 mt-2">Máquina y navaja, acabado visual.</div>
            <div className="mt-3">+5 €</div>
          </div>
          <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
            <div className="font-semibold">Cejas / Detalles</div>
            <div className="text-zinc-400 mt-2">Definición limpia.</div>
            <div className="mt-3">+3 €</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
          <div>
            <div className="font-semibold">VisualNickBarber</div>
            <div className="text-zinc-400">Horario: 16:00–20:30</div>
          </div>
          <div className="flex gap-3">
            <a href={whatsappLink} className="rounded-2xl px-4 py-2 bg-white text-black font-semibold hover:opacity-90 transition">Reservar</a>
            <a href={instagramLink} target="_blank" className="rounded-2xl px-4 py-2 border border-zinc-700 hover:border-zinc-500 transition">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
