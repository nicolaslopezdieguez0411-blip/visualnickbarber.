export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Sobre mí</h1>

      <p className="text-zinc-400 leading-relaxed text-lg">
        Soy <span className="text-white font-semibold">Nicolás López</span>, fundador de VisualNickBarber. 
        Barber en formación constante, especializado en fades limpios, estética y precisión.
        Mi visión es que cada persona salga con una versión más segura, más pulida y más visual de sí misma.
      </p>

      <a href="/" className="inline-block mt-10 text-zinc-400 underline hover:text-zinc-200">
        ← Volver al inicio
      </a>
    </main>
  );
}
