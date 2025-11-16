"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [sendingReview, setSendingReview] = useState(false);

  // estado de feedback "¿te ha resultado útil?"
  const [feedbackReviewId, setFeedbackReviewId] = useState(null);
  const [feedbackIsUseful, setFeedbackIsUseful] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [sendingFeedback, setSendingFeedback] = useState(false);

  // Cargar reseñas aprobadas al entrar en la página
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error(error);
          setReviews([]);
          return;
        }

        setReviews(data || []);
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
      alert("Rellena tu nombre y la reseña 🙏");
      return;
    }

    try {
      setSendingReview(true);

      const { error } = await supabase.from("reviews").insert([
        {
          name,
          service,
          text,
          // is_approved se queda en false por defecto
        },
      ]);

      if (error) {
        console.error(error);
        alert("Ha habido un problema al enviar tu reseña.");
        return;
      }

      form.reset();
      alert(
        "Reseña enviada. La revisaré y, si está aprobada, aparecerá aquí 🙌"
      );
    } catch (err) {
      console.error(err);
      alert("Ha habido un error inesperado.");
    } finally {
      setSendingReview(false);
    }
  };

  // cuando el usuario pulsa "Sí" o "No"
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

      // Actualizar contadores en el estado local para que se vea al momento
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
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Reseñas — VisualNickBarber
        </h1>
        <p className="text-zinc-400">
          Lee lo que dicen otros y deja tu reseña después de tu corte.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold mb-4">Lo que dicen de la silla</h2>

        {loadingReviews ? (
          <p className="text-sm text-zinc-500 mb-8">Cargando reseñas...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-zinc-500 mb-8">
            Aún no hay reseñas publicadas. Puedes ser de los primeros en dejar
            la tuya.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="p-4 rounded-2xl border border-zinc-800 bg-neutral-950 text-left"
              >
                <div className="text-xs text-zinc-500 mb-2">
                  {review.created_at
                    ? new Date(review.created_at).toLocaleDateString("es-ES")
                    : null}
                </div>
                <div className="text-sm text-zinc-400 mb-1">
                  {review.service}
                </div>
                <p className="text-sm text-zinc-200 mb-3">“{review.text}”</p>
                <div className="text-xs text-zinc-500 mb-1">
                  — {review.name}
                </div>

                {/* contador de útil */}
                {typeof review.useful_yes === "number" &&
                  review.useful_yes > 0 && (
                    <div className="text-[11px] text-zinc-500 mb-2">
                      {review.useful_yes} persona
                      {review.useful_yes === 1 ? "" : "s"} han encontrado esto
                      útil
                    </div>
                  )}

                {/* Botones: ¿Te ha resultado útil? */}
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

                {/* Bloque de feedback opcional */}
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

        {/* Formulario para enviar reseña */}
        <div className="max-w-xl mx-auto bg-neutral-950 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">Escribe tu reseña</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Tu reseña se guardará y la aprobaré antes de que se muestre
            públicamente.
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

            {/* BOTÓN NEGRO CON CONTORNO Y TEXTO DORADO */}
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
    </main>
  );
}
