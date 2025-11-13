const whatsappLink =
  "https://wa.me/34613143562?text=Hola%20VisualNickBarber%2C%20quiero%20reservar%20un%20corte%20%F0%9F%92%88";
const instagramLink = "https://instagram.com/visualnick.barber";

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {/* HERO */}
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
          <img
            src="/logo.png"
            alt="VisualNickBarber logo"
            className="w-28 h-28 mx-auto mb-6 rounded-full"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            VisualNickBarber
          </h1>
          <p className="mt-3 text-zinc-300">
            Transformo tu imagen. Elevo tu presencia.
          </p>
          <p className="text-zinc-500 mt-1">
            Fades limpios, detalles precisos — Madrid.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <a
              href={whatsappLink}
              className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Reservar corte
            </a>
            <a
              href={instagramLink}
              target="_blank"
              className="rounded-2xl px-5 py-3 border border-zinc-700 hover:border-zinc-500 transition"
            >
              Instagram
            </a>
          </div>
        </section>

        {/* SERVICIOS / PRECIOS */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-4">Servicios & Precios</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
              <div className="font-semibold">Corte + Fade limpio</div>
              <div className="text-zinc-400 mt-2">
                Degradado preciso y acabado a tijera.
              </div>
              <div className="mt-3">10 € (lanzamiento)</div>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
              <div className="font-semibold">Barba + Perfilado</div>
              <div className="text-zinc-400 mt-2">
                Máquina y navaja, acabado visual.
              </div>
              <div className="mt-3">+5 €</div>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
              <div className="font-semibold">Cejas / Detalles</div>
              <div className="text-zinc-400 mt-2">Definición limpia.</div>
              <div className="mt-3">+3 €</div>
            </div>
          </div>
        </section>

        {/* SECCIONES PRINCIPALES (BOTONES DORADOS ARRIBA YA LOS LLEVA EL NAVBAR) */}
        <section className="max-w-3xl mx-auto px-6 py-12 text-center space-y-4">
          <h2 className="text-2xl font-bold mb-6">Explora</h2>

          <p className="text-zinc-400 mb-4">
            Conoce más sobre mí, mira la galería de cortes y pronto las
            reseñas de los primeros clientes.
          </p>

          <a
            href="/about"
            className="block rounded-2xl border border-zinc-700 py-3 text-white font-semibold hover:bg-zinc-900 transition"
          >
            Sobre mí
          </a>

          <a
            href="/gallery"
            className="block rounded-2xl border border-zinc-700 py-3 text-white font-semibold hover:bg-zinc-900 transition"
          >
            Galería
          </a>

          <a
            href="/reviews"
            className="block rounded-2xl border border-zinc-700 py-3 text-white font-semibold hover:bg-zinc-900 transition"
          >
            Reseñas
          </a>
        </section>

        {/* CONTACTO / QR */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Contacto</h2>

          <a
            href={whatsappLink}
            className="inline-block mb-4 rounded-2xl px-6 py-3 bg-white text-black font-semibold hover:opacity-80 transition"
          >
            Reservar por WhatsApp
          </a>
          <br />
          <a
            href={instagramLink}
            target="_blank"
            className="inline-block rounded-2xl px-6 py-3 border border-zinc-700 text-white font-semibold hover:border-zinc-500 transition"
          >
            Instagram
          </a>

          <div className="mt-6 flex justify-center">
            <img
              src="/qr-whatsapp.png"
              alt="QR WhatsApp VisualNickBarber"
              className="w-32 h-32 rounded-xl border border-zinc-700"
            />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-zinc-400">
          <div>
            <div className="font-semibold text-white">VisualNickBarber</div>
            <div>Horario: 16:00–20:30 · Madrid</div>
          </div>
          <div className="flex gap-3">
            <a
              href={whatsappLink}
              className="rounded-2xl px-4 py-2 bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Reservar
            </a>
            <a
              href={instagramLink}
              target="_blank"
              className="rounded-2xl px-4 py-2 border border-zinc-700 hover:border-zinc-500 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

  );
}
