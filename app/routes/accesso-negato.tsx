import { Link } from "@remix-run/react";
import Button3D from "~/components/Button3D";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Accesso Negato</h1>
      <p className="text-gray-700 mb-6">
        Non hai i permessi necessari per visualizzare questa pagina.
      </p>
      <Link to="/">
        <Button3D>Torna alla Home</Button3D>
      </Link>
    </div>
  );
}
