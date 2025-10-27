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
    </main>
  );
}
<section className="max-w-3xl mx-auto px-6 pt-10 pb-20 text-center">
  <h2 className="text-2xl font-bold mb-3">Reserva por WhatsApp</h2>
  <p className="text-zinc-400 mb-6">Escanea el QR o pulsa el botón.</p>

  <img
    src="/qr-whatsapp.png"
    alt="QR WhatsApp VisualNickBarber"
    className="w-48 sm:w-60 md:w-72 mx-auto rounded-xl border border-zinc-800"
  />

  <div className="mt-6">
    <a
      href="https://wa.me/34613143562?text=Hola%20VisualNckBarber%2C%20quiero%20reservar%20un%20corte%20%F0%9F%92%88"
      className="inline-block rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:opacity-90 transition"
    >
      Reservar por WhatsApp
    </a>
  </div>

  <div className="mt-3">
    <a href="/qr-whatsapp.png" download className="text-zinc-400 underline underline-offset-4">
      Descargar QR
    </a>
  </div>
</section>
