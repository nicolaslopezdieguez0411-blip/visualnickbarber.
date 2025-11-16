"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WHATSAPP_BASE = "https://wa.me/34613143562";
const whatsappLink =
  "https://wa.me/34613143562?text=Hola%20VisualNickBarber%2C%20quiero%20reservar%20un%20corte%20%F0%9F%92%88";
const instagramLink = "https://instagram.com/visualnick.barber";

// servicios con precio y mensaje para WhatsApp
const services = [
  {
    id: "fade",
    title: "Corte + Fade limpio",
    description: "Degradado preciso, líneas limpias y acabado a tijera.",
    price: "10 €",
    whatsappText:
      "Hola VisualNick, me gustaría reservar un corte + fade limpio. ¿Tienes algún hueco?",
  },
  {
    id: "barba-perfilado",
    title: "Barba + Perfilado",
    description: "Máquina y navaja, contornos limpios y visual marcadito.",
    price: "5 €",
    whatsappText:
      "Hola VisualNick, me gustaría reservar barba + perfilado. ¿Cuándo podría ir?",
  },
  {
    id: "cejas",
    title: "Cejas / Detalles",
    description: "Definición limpia, natural, sin pasarse.",
    price: "3 €",
    whatsappText:
      "Hola VisualNick, me gustaría arreglarme las cejas / detalles. ¿Qué horario tienes disponible?",
  },
];

// FOOTER
const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10 md:flex-row md:justify-between md:items-start text-sm text-zinc-400">
        {/* Columna 1: Marca + copyright */}
        <div className="space-y-2">
          <p className="text-zinc-100 font-semibold text-base">
            VisualNickBarber
          </p>
          <p>Copyright © 2025 VisualNickBarber</p>
          <p className="text-xs text-zinc-500">
            Fades limpios, estética y detalle. ✂️
          </p>
        </div>

        {/* Columna 2: Contacto + iconos */}
        <div>
          <h3 className="text-zinc-100 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Contacto
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 hover:border-zinc-400 hover:bg-zinc-900 transition"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/40 text-xs">
                🟢
              </span>
              <div className="flex flex-col">
                <span className="text-zinc-100 text-xs font-medium">
                  WhatsApp
                </span>
                <span className="text-[11px] text-zinc-500">
                  Reserva tu corte por mensaje
                </span>
              </div>
            </a>

            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 hover:border-zinc-400 hover:bg-zinc-900 transition"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-500/10 border border-fuchsia-500/40 text-xs">
                📷
              </span>
              <div className="flex flex-col">
                <span className="text-zinc-100 text-xs font-medium">
                  Instagram
                </span>
                <span className="text-[11px] text-zinc-500">
                  @visualnick.barber
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Columna 3: Horario + localización */}
        <div>
          <h3 className="text-zinc-100 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Horario
          </h3>
          <p className="text-sm">
            Lunes - Viernes:{" "}
            <span className="text-zinc-100">16:00 – 20:30</span>
          </p>
          <p className="text-sm">
            Sábados: <span className="text-zinc-100">Bajo reserva</span>
          </p>

          <h3 className="text-zinc-100 text-xs font-semibold uppercase tracking-[0.25em] mt-5 mb-2">
            Localización
          </h3>
          <p className="text-sm">
            Madrid — Zona a domicilio / punto acordado.
          </p>
        </div>

        {/* Columna 4: Enlaces a secciones */}
        <div>
          <h3 className="text-zinc-100 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Navegación
          </h3>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="#servicios" className="hover:text-zinc-100 transition">
              Servicios
            </a>
            <a href="#galeria" className="hover:text-zinc-100 transition">
              Galería
            </a>
            <a href="#reservar" className="hover:text-zinc-100 transition">
              Reservar
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  // estado de reseñas
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [sendingReview, setSendingReview] = useState(false);

  // estado de feedback "¿te ha resultado útil?"
  const [feedbackReviewId, setFeedbackReviewId] = useState(null);
  const [feedbackIsUseful, setFeedbackIsUseful] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [sendingFeedback, setSendingFeedback] = useState(false);

  // Cargar reseñas aprobadas desde /api/reviews
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, []);

  // Enviar nueva reseña (queda pendiente de aprobación)
  const handleSendReview = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const service = form.service.value;
    const text = form.text.value.trim();

    if (!name || !text) {
      alert("Rellena al menos tu nombre y tu reseña 🙏");
      return;
    }

    try {
      setSendingReview(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, service, text }),
      });

      if (!res.ok) {
        console.error("Error creando reseña");
        alert(
          "Ha habido un problema al enviar tu reseña. Inténtalo más tarde."
        );
        return;
      }

      form.reset();
      alert(
        "Reseña enviada. La revisaré y la publicaré si está aprobada 🙌"
      );
    } catch (err) {
      console.error(err);
      alert("Ha habido un error inesperado al enviar la reseña.");
    } finally {
      setSendingReview(false);
    }
  };

  const handleClickUseful = (reviewId, isUseful) => {
    setFeedbackReviewId(reviewId);
    setFeedbackIsUseful(isUseful);
    setFeedbackText("");
  };

  const sendFeedback = async (reasonOverride = "") => {
    if (!feedbackReviewId || feedbackIsUseful === null) return;

    try {
      setSendingFeedback(true);

      const res = await fetch("/api/review-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: feedbackReviewId,
          isUseful: feedbackIsUseful,
          reason: reasonOverride.trim() || feedbackText.trim() || null,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Error guardando feedback", data);
        alert(
          data?.error ||
            "Ha habido un problema al enviar tu respuesta. Inténtalo más tarde."
        );
        return;
      }

      setReviews((prev) =>
        prev.map((r) => {
          if (r.id !== feedbackReviewId) return r;
          const currentYes = r.useful_yes || 0;
          const currentNo = r.useful_no || 0;
          return {
            ...r,
            useful_yes: feedbackIsUseful ? currentYes + 1 : currentYes,
            useful_no: !feedbackIsUseful ? currentNo + 1 : currentNo,
          };
        })
      );

      setFeedbackReviewId(null);
      setFeedbackIsUseful(null);
      setFeedbackText("");
      alert("¡Gracias por tu feedback! 🙌");
    } catch (err) {
      console.error(err);
      alert("Ha habido un error inesperado al enviar tu respuesta.");
    } finally {
      setSendingFeedback(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    await sendFeedback();
  };

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
        <section
          id="servicios"
          className="max-w-5xl mx-auto px-6 pb-12"
        >
          <h2 className="text-2xl font-bold mb-2">Servicios &amp; Precios</h2>
          <p className="text-zinc-400 mb-6">
            Elige lo que quieres hacerte y reserva directo por WhatsApp.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(
                service.whatsappText
              )}`;

              return (
                <Link
                  key={service.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <article
                    className="
                      p-5 rounded-2xl border border-zinc-800 bg-neutral-950 
                      flex flex-col justify-between h-full
                      transform transition-transform duration-200
                      group-hover:scale-105
                    "
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {service.title}
                      </div>
                      <div className="text-sm text-zinc-300 mt-1">
                        {service.price}
                      </div>
                      <div className="text-sm text-zinc-400 mt-2">
                        {service.description}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                      <span>Reservar por WhatsApp</span>
                      <span className="uppercase tracking-wide text-zinc-500">
                        Click &gt;
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* Botón para varios servicios a la vez */}
          <div className="mt-8 text-center">
            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                "Hola VisualNick, me gustaría reservar varios servicios (por ejemplo fade + barba + cejas). ¿Me ayudas a cuadrar hora?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 transition"
            >
              Reservar varios servicios
            </a>
          </div>
        </section>

        {/* RESEÑAS (GALERÍA SOCIAL) */}
        <section
          id="galeria"
          className="max-w-5xl mx-auto px-6 pb-16"
        >
          <h2 className="text-2xl font-bold mb-2">Reseñas</h2>
          <p className="text-zinc-400 mb-6">
            Lo que dicen los que ya han pasado por la silla.
          </p>

          {loadingReviews ? (
            <p className="text-zinc-500 text-sm mb-6">Cargando reseñas...</p>
          ) : reviews.length === 0 ? (
            <p className="text-zinc-500 text-sm mb-6">
              Aún no hay reseñas publicadas. Serás de los primeros en dejar la
              tuya.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="p-4 rounded-2xl border border-zinc-800 bg-neutral-950 text-left"
                >
                  <div className="text-sm text-zinc-400 mb-2">
                    {review.service}
                  </div>
                  <p className="text-sm text-zinc-200 mb-2">
                    “{review.text}”
                  </p>
                  <div className="text-xs text-zinc-500 mb-1">
                    — {review.name}
                  </div>

                  {typeof review.useful_yes === "number" &&
                    review.useful_yes > 0 && (
                      <div className="text-[11px] text-zinc-500 mb-2">
                        {review.useful_yes} persona
                        {review.useful_yes === 1 ? "" : "s"} han encontrado
                        esto útil
                      </div>
                    )}

                  <div className="mt-1 text-xs text-zinc-500">
                    ¿Te ha resultado útil?
                    <button
                      type="button"
                      onClick={() => handleClickUseful(review.id, true)}
                      className="ml-2 px-2 py-1 rounded-full border border-zinc-600 hover:border-zinc-300 hover:text-white transition text-[11px]"
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickUseful(review.id, false)}
                      className="ml-2 px-2 py-1 rounded-full border border-zinc-600 hover:border-zinc-300 hover:text-white transition text-[11px]"
                    >
                      No
                    </button>
                  </div>

                  {feedbackReviewId === review.id && (
                    <form
                      onSubmit={handleSubmitFeedback}
                      className="mt-3 space-y-2 text-xs"
                    >
                      <label className="block text-zinc-400">
                        {feedbackIsUseful
                          ? "¿Qué es lo que más te ha ayudado? (opcional)"
                          : "¿Qué crees que podríamos mejorar? (opcional)"}
                      </label>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl bg-black border border-zinc-700 px-3 py-2 text-xs focus:outline-none focus:border-zinc-400"
                        placeholder="Escribe tu comentario (opcional)..."
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={sendingFeedback}
                          className="px-3 py-1 rounded-full bg-white text-black font-semibold hover:opacity-90 transition disabled:opacity-60"
                        >
                          {sendingFeedback ? "Enviando..." : "Enviar"}
                        </button>
                        <button
                          type="button"
                          disabled={sendingFeedback}
                          onClick={() => sendFeedback("")}
                          className="px-3 py-1 rounded-full border border-zinc-600 text-zinc-300 hover:border-zinc-300 hover:text-white transition"
                        >
                          Enviar sin comentario
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFeedbackReviewId(null);
                            setFeedbackIsUseful(null);
                            setFeedbackText("");
                          }}
                          className="ml-auto px-2 py-1 text-[11px] text-zinc-500 hover:text-zinc-300"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  )}
                </article>
              ))}
            </div>
          )}

          <div className="max-w-xl mx-auto bg-neutral-950 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">Escribe tu reseña</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Tu reseña se guardará y la aprobaré antes de que se muestre en la
              web.
            </p>

            <form onSubmit={handleSendReview} className="space-y-4 text-left">
              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-xl bg-black border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  placeholder="Tu nombre o apodo"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Servicio</label>
                <select
                  name="service"
                  className="w-full rounded-xl bg-black border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  defaultValue="Corte + Fade limpio"
                >
                  <option>Corte + Fade limpio</option>
                  <option>Barba + Perfilado</option>
                  <option>Cejas / Detalles</option>
                  <option>Varios servicios</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Reseña</label>
                <textarea
                  name="text"
                  rows={4}
                  className="w-full rounded-xl bg-black border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  placeholder="Cuenta brevemente tu experiencia..."
                />
              </div>

              <button
                type="submit"
                disabled={sendingReview}
                className="w-full mt-4 py-3 rounded-xl border border-yellow-500 text-yellow-400 bg-black font-semibold hover:bg-yellow-500/10 hover:shadow-[0_0_10px_rgba(255,215,0,0.4)] transition-all duration-200 disabled:opacity-60"
              >
                {sendingReview ? "Enviando..." : "Enviar reseña"}
              </button>
            </form>
          </div>
        </section>

        {/* CONTACTO / QR */}
        <section
          id="reservar"
          className="max-w-3xl mx-auto px-6 py-16 text-center"
        >
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
              className="w-60 h-60 rounded-2xl border border-zinc-600 shadow-xl"
            />
          </div>

          <div className="flex justify-center mt-4">
            <a
              href="/qr-whatsapp.png"
              download="VisualNickBarber-QR.png"
              className="rounded-2xl px-6 py-3 bg-white text-black font-semibold hover:opacity-80 transition"
            >
              Descargar QR
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
