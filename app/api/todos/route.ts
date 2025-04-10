import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("todo").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { title, description } = body;

  if (!title || !description) {
    return new Response(JSON.stringify({ error: "All fields required" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("todo")
    .insert({ title, description });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
