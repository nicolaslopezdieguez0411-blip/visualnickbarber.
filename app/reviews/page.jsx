export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Reseñas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
          <p className="text-zinc-300">“Próximamente reseñas reales de clientes 💈”.</p>
        </div>

        <div className="p-5 rounded-2xl border border-zinc-800 bg-neutral-950">
          <p className="text-zinc-300">“Los 10 primeros cortes GRATIS — deja tu opinión.”</p>
        </div>
      </div>

      <a href="/" className="inline-block mt-10 text-zinc-400 underline hover:text-zinc-200 block text-center">
        ← Volver al inicio
      </a>
    </main>
  );
}
