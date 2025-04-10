import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase.from("todo").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = params.id;

  if (!id)
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

  if (error)
    return new Response(JSON.stringify({ error: "Todo not found" }), {
      status: 404,
    });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
