import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export const dynamic = "force-dynamic";

// GET — reseñas aprobadas + contador de "útil"
export async function GET() {
  try {
    // 1. Traer reseñas aprobadas
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (reviewsError) {
      console.error("REVIEWS ERROR:", reviewsError);
      return NextResponse.json(
        { error: "Error cargando reseñas" },
        { status: 500 }
      );
    }

    if (!reviews || reviews.length === 0) {
      return NextResponse.json([]);
    }

    const reviewIds = reviews.map((r) => r.id);

    // 2. Traer feedback de esas reseñas
    const { data: feedback, error: feedbackError } = await supabase
      .from("review_feedback")
      .select("review_id, is_useful")
      .in("review_id", reviewIds);

    if (feedbackError) {
      console.error("FEEDBACK ERROR:", feedbackError);
      // Si falla el feedback, devolvemos reseñas sin contadores
      return NextResponse.json(
        reviews.map((r) => ({
          ...r,
          useful_yes: 0,
          useful_no: 0
        }))
      );
    }

    // 3. Construir mapa de contadores
    const stats = {};
    (feedback || []).forEach((fb) => {
      if (!stats[fb.review_id]) {
        stats[fb.review_id] = { yes: 0, no: 0 };
      }
      if (fb.is_useful) {
        stats[fb.review_id].yes += 1;
      } else {
        stats[fb.review_id].no += 1;
      }
    });

    // 4. Mezclar reseñas + contadores
    const enriched = reviews.map((r) => {
      const s = stats[r.id] || { yes: 0, no: 0 };
      return {
        ...r,
        useful_yes: s.yes,
        useful_no: s.no
      };
    });

    return NextResponse.json(enriched);
  } catch (err) {
    console.error("REVIEWS API ERROR:", err);
    return NextResponse.json(
      { error: "Error inesperado" },
      { status: 500 }
    );
  }
}

// POST — crear nueva reseña (pendiente de aprobación)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, service, text } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Faltan campos" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([{ name, service, text }])
      .select()
      .single();

    if (error) {
      console.error("CREATE REVIEW ERROR:", error);
      return NextResponse.json(
        { error: "Error guardando reseña" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("CREATE REVIEW API ERROR:", err);
    return NextResponse.json(
      { error: "Error inesperado al crear reseña" },
      { status: 500 }
    );
  }
}
