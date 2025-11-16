"use client";

import Link from "next/link";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-10">Galería</h1>

      {/* GRID DE 4 VIDEOS IGUALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <video
          src="/gallery/cut1.mp4"
          className="w-full rounded-2xl border border-zinc-800 shadow-md"
          autoPlay
          loop
          muted
          playsInline
        />

        <video
          src="/gallery/cut2.mp4"
          className="w-full rounded-2xl border border-zinc-800 shadow-md"
          autoPlay
          loop
          muted
          playsInline
        />

        <video
          src="/gallery/cut3.mp4"
          className="w-full rounded-2xl border border-zinc-800 shadow-md"
          autoPlay
          loop
          muted
          playsInline
        />

        <video
          src="/gallery/cut4.mp4"
          className="w-full rounded-2xl border border-zinc-800 shadow-md"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <p className="text-zinc-500 mt-6">
        Más resultados próximamente 💈
      </p>

      {/* BOTÓN PREMIUM CON BRILLO LENTO */}
      <Link
        href="/"
        className="btn-glow inline-block mt-10 px-6 py-3 rounded-xl border border-yellow-500/60 text-yellow-400 hover:bg-yellow-500/20 hover:shadow-[0_0_10px_rgba(255,215,0,0.4)] transition-all duration-300"
      >
        <span className="inline-flex items-center gap-2">
          {/* Icono redondo con flecha */}
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-yellow-500/60 text-sm">
            ←
          </span>
          <span>Volver al inicio</span>
        </span>
      </Link>

      {/* FOOTER PREMIUM */}
      <footer className="mt-16 border-t border-zinc-800 pt-8 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="uppercase tracking-[0.25em] text-[0.65rem] text-zinc-600">
          VisualNick Barber Studio
        </p>
        <p className="text-zinc-500">
          Fades limpios · Detalle · Estética
        </p>
      </footer>
    </main>
  );
}
