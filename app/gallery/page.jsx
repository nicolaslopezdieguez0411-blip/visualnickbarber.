export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-10">Galería</h1>

      <video
        src="/gallery/cut1.mp4"
        className="w-full max-w-2xl mx-auto rounded-2xl border border-zinc-800 shadow-xl"
        autoPlay
        loop
        muted
        playsInline
      />

      <p className="text-zinc-500 mt-6">
        Más resultados próximamente 💈
      </p>

      <a href="/" className="inline-block mt-10 text-zinc-400 underline hover:text-zinc-200">
        ← Volver al inicio
      </a>
    </main>
  );
}
