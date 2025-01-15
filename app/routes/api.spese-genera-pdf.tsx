import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSpese } from "~/models/spese.server";
import { generatePDFSpese } from "~/utils/genera-pdf-spese-server";

export const action: ActionFunction = async () => {
  const spese = await getSpese();

  try {
    const pdfBuffer = await generatePDFSpese(spese);
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Riepilogo_Spese_${new Date().getFullYear()}.pdf`,
      },
    });
  } catch (error) {
    console.error("Errore durante la generazione del PDF:", error);
    return json(
      { error: "Errore durante la generazione del PDF" },
      { status: 500 }
    );
  }
};
