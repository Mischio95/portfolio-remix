import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPreventivoById } from "~/models/preventivo.server";
import { generatePDFgenerico } from "~/utils/genera-pdf-preventivi-generici.server";

export const action: ActionFunction = async ({ params }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return json({ error: "ID non valido" }, { status: 400 });
  }

  const preventivo = await getPreventivoById(id);
  if (!preventivo) {
    return json({ error: "Preventivo non trovato" }, { status: 404 });
  }

  try {
    const pdfBuffer = await generatePDFgenerico(preventivo);
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Preventivo_${preventivo.clientName}.pdf`,
      },
    });
  } catch (error) {
    console.error("Errore durante la generazione del PDF:", error);
    return json({ error: "Errore durante la generazione del PDF" }, { status: 500 });
  }
};