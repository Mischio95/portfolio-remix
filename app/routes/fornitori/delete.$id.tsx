import { ActionFunction, redirect } from "@remix-run/node";
import { deleteFornitore } from "~/models/fornitori.server";

export const action: ActionFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Response("ID mancante", { status: 400 });
  }

  await deleteFornitore(Number(id));
  return redirect("/fornitori");
};
