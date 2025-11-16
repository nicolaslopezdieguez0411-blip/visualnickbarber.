import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { reviewId, isUseful, reason } = body;

    if (!reviewId || typeof isUseful !== "boolean") {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("review_feedback")
      .insert([
        {
          review_id: reviewId,
          is_useful: isUseful,
          reason: reason || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE FEEDBACK ERROR:", error);
      return NextResponse.json(
        { error: error.message || "Error guardando feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("FEEDBACK API ERROR:", err);
    return NextResponse.json(
      { error: "Error inesperado en el servidor" },
      { status: 500 }
    );
  }
}
