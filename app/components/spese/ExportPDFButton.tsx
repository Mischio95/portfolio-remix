import ButtonCustom from "~/components/buttons/ButtonCustom";

export default function ExportPDFButton() {
  const exportToPDF = async () => {
    try {
      const response = await fetch("/api/spese/genera-pdf", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Errore durante l'esportazione del PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Riepilogo_Spese_${new Date().getFullYear()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Errore durante l'esportazione del PDF.");
    }
  };

  return <ButtonCustom onClick={exportToPDF}>Esporta in PDF</ButtonCustom>;
}
