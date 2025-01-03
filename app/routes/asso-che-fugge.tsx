import React, { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Button3D from "~/components/buttons/Button3D";
import AssoCheFuggeRegole from "./asso-che-fugge-regole";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "~/components/ui/dialog";
import { v4 as uuidv4 } from "uuid"; // Aggiunto per UUID

type Lobby = {
  id: string;
  players: Player[];
};

type Player = {
  id: number;
  name: string;
  lives: number;
};

export default function AssoCheFugge() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [currentLobbyId, setCurrentLobbyId] = useState<string>("");

  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerLives, setNewPlayerLives] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeadOnly, setShowDeadOnly] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogOpenChange = (isOpen: boolean) => {
    setShowDialog(isOpen);
  };

  const filteredPlayers = players.filter((player) => {
    const nameMatch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const deathMatch = !showDeadOnly || player.lives === 0;
    return nameMatch && deathMatch;
  });

  const deletePlayer = async (id: number) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo giocatore?"))
      return;

    try {
      const response = await fetch(`/api/players/${id}`, { method: "DELETE" });
      if (response.ok) {
        setPlayers(players.filter((p) => p.id !== id));
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Errore nell'eliminazione del giocatore");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Errore di rete. Riprova più tardi.");
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Errore:", error);
        alert("Errore caricamento giocatori");
      }
    };

    fetchPlayers();
  }, []);

  const addPlayer = async () => {
    if (!newPlayerName.trim()) return;
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        body: new URLSearchParams({
          name: newPlayerName,
          lives: newPlayerLives.toString(),
        }),
      });

      if (response.ok) {
        const newPlayer: Player = await response.json();
        setPlayers([...players, newPlayer]);
        setNewPlayerName("");
        setNewPlayerLives(3);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Errore nell'aggiunta del giocatore");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Errore di rete. Riprova più tardi.");
    }
  };

  const updateLives = async (id: number, delta: number) => {
    const player = players.find((p) => p.id === id);
    if (!player) return;

    const updatedLives = player.lives + delta;

    try {
      const response = await fetch(`/api/players/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lives: updatedLives }),
      });

      if (response.ok) {
        setPlayers(
          players.map((p) => (p.id === id ? { ...p, lives: updatedLives } : p))
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Errore nell'aggiornamento delle vite");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Errore di rete. Riprova più tardi.");
    }
  };

  const deletePlayers = async () => {
    if (
      !window.confirm(
        "Sei sicuro di voler cancellare tutti i giocatori? l'operazione è irreversibile"
      )
    )
      return;

    try {
      const response = await fetch("/api/players", { method: "DELETE" });
      if (response.ok) {
        setPlayers([]);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Errore nella cancellazione della lista");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Errore di rete. Riprova più tardi.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Asso che Fugge</h1>
      {/* Bottone per aprire popup regole */}
      <div>
        {" "}
        <div className="flex justify-center my-8">
          <Dialog open={showDialog} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="w-full max-w-7xl max-h-screen overflow-y-auto rounded-md border-2 border-[#ebe5d4] bg-[#10172A] text-white">
              <DialogHeader>
                <DialogTitle className="text-center font-bold uppercase text-3xl text-[#ebe5d4] tracking-wider">
                  Regole Asso Che Fugge!
                </DialogTitle>
              </DialogHeader>
              <AssoCheFuggeRegole />
            </DialogContent>
          </Dialog>
        </div>{" "}
      </div>
      {/* Add Player Form */}
      <Card className="mb-6 bg-gray-800 border border-[#64FFDA]">
        <CardHeader>
          <CardTitle className="text-[#64FFDA]">Aggiungi Giocatore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                placeholder="Nome giocatore"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="w-2/3 bg-gray-700 text-white placeholder:text-[#64FFDA] placeholder:opacity-50"
              />
              <Input
                type="number"
                min="1"
                max="6"
                value={newPlayerLives}
                onChange={(e) =>
                  setNewPlayerLives(parseInt(e.target.value) || 1)
                }
                className="w-1/3 bg-gray-700 text-white"
              />
            </div>
            <div className="flex sm:flex-row gap-4 justify-center items-center">
              <Button3D onClick={addPlayer}>Aggiungi</Button3D>
              <Button3D onClick={deletePlayers}>Cancella</Button3D>
              <Button3D onClick={() => setShowDialog(true)}>Regole</Button3D>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Search and Filter */}
      <Card className="mb-6 bg-gray-800 border border-[#64FFDA]">
        <CardHeader>
          <CardTitle className="text-[#64FFDA]">
            Ricerca Giocatore per nome!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Input
              type="text"
              placeholder="Cerca giocatore..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white placeholder:text-[#64FFDA] placeholder:opacity-50"
            />
            <div className="flex flex-col items-center gap-2 -mt-7">
              <span className="font-bold text-[11px] text-[#64FFDA] mb-1">
                {showDeadOnly ? "Morti ON" : "Morti OFF"}
              </span>
              <button
                onClick={() => setShowDeadOnly(!showDeadOnly)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  showDeadOnly
                    ? "bg-[#64FFDA]"
                    : "bg-gray-700 border-2 border-[#64FFDA]"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full transition-transform duration-300 ${
                    showDeadOnly
                      ? "translate-x-7 bg-gray-700"
                      : "translate-x-1 bg-[#64FFDA]"
                  }`}
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Player List */}
      <h1 className="text-4xl font-bold text-center mb-12 mt-12">
        Lista Giocatori
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id}
            className={`p-4 rounded shadow-md flex flex-col justify-between ${
              player.lives === 0
                ? "bg-red-200 border-2 border-[#64FFDA] text-black"
                : "bg-gray-800 border-2 border-[#64FFDA] text-white"
            }`}
          >
            <CardContent className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-bold uppercase">{player.name}</h2>
              <p
                className={`text-lg font-bold ${
                  player.lives === 0 ? "text-red-600" : "text-white"
                }`}
              >
                Vite: {player.lives}
              </p>
            </CardContent>
            <CardContent className="flex flex-col items-center -mt-2 gap-2">
              <Button
                className="bg-red-500 w-full text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => updateLives(player.id, -1)}
              >
                -1 Vita
              </Button>
              <Button
                className="bg-blue-500 w-full text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => updateLives(player.id, 1)}
              >
                +1 Vita
              </Button>
              <Button
                className="w-full bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
                onClick={() => deletePlayer(player.id)}
              >
                Elimina
              </Button>
              {player.lives <= 0 && (
                <span className="flex items-center text-red-500 font-bold uppercase text-2xl mt-4">
                  <svg
                    fill="#EF4444"
                    height="30px"
                    width="40px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 437.713 437.713"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M401.316,104.341l-43.664-4.933l18.726-7.519c1.37-0.55,2.427-1.678,2.888-3.08l15.467-47.123 c0.5-1.524,0.239-3.194-0.701-4.492c-0.94-1.299-2.446-2.067-4.05-2.067H243.084l-7.436-31.283C235.113,1.591,233.101,0,230.784,0 h-44.132c-2.761,0-5,2.238-5,5v30.127h-35.341c-2.761,0-5,2.238-5,5v9.314h-31.365v-9.314c0-2.762-2.239-5-5-5H45.863 c-2.761,0-5,2.238-5,5v77.729c0,1.957,1.142,3.735,2.923,4.548l12.541,5.728l-20.547,4.982c-2.243,0.544-3.822,2.552-3.822,4.859 v55.378c0,2.372,1.667,4.418,3.99,4.897l49.685,10.244v6.475l-20.494,5.195c-2.218,0.563-3.772,2.559-3.772,4.847v32.194 c0,2.762,2.239,5,5,5h115.285v170.511c0,2.762,2.239,5,5,5h47.711c2.496,0,4.61-1.842,4.953-4.314l16.697-120.632 c0.189-1.37-0.197-2.759-1.068-3.833c-0.871-1.075-2.148-1.741-3.528-1.84l-12.217-0.872l-1.573-44.02h138.464c2.762,0,5-2.238,5-5 v-61.435c0-2.762-2.238-5-5-5h-35.938v-4.673l61.667-13.454c2.297-0.501,3.935-2.534,3.935-4.885V109.31 C405.755,106.766,403.845,104.627,401.316,104.341z M191.652,10h35.181l5.972,25.127h-41.152V10z M229.366,311.067 c0.092,2.553,2.093,4.627,4.641,4.809l11.368,0.812l-15.367,111.025h-38.355V262.202h35.969L229.366,311.067z M395.755,163.729 l-61.667,13.454c-2.297,0.501-3.935,2.534-3.935,4.885v13.699c0,2.762,2.238,5,5,5h35.938v51.435H71.367v-23.304l20.494-5.195 c2.218-0.563,3.771-2.559,3.771-4.847v-14.439c0-2.372-1.667-4.418-3.99-4.897l-49.685-10.244v-47.371l30.768-7.459 c2.071-0.502,3.596-2.262,3.799-4.384c0.203-2.121-0.962-4.139-2.9-5.023l-22.762-10.396V45.127h49.083v9.314c0,2.762,2.239,5,5,5 h41.365c2.761,0,5-2.238,5-5v-9.314h231.767L370.49,83.478l-34.954,14.035c-2.125,0.854-3.399,3.041-3.092,5.31 c0.308,2.27,2.118,4.04,4.394,4.298l58.917,6.655V163.729z"></path>{" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <g>
                              {" "}
                              <path d="M192.59,173.809c-12.385,0-22.461-10.076-22.461-22.461c0-12.385,10.076-22.461,22.461-22.461 c12.386,0,22.463,10.076,22.463,22.461C215.053,163.732,204.976,173.809,192.59,173.809z M192.59,138.887 c-6.871,0-12.461,5.59-12.461,12.461c0,6.871,5.59,12.461,12.461,12.461c6.872,0,12.463-5.59,12.463-12.461 C205.053,144.477,199.462,138.887,192.59,138.887z"></path>{" "}
                            </g>{" "}
                            <g>
                              {" "}
                              <path d="M245.122,173.809c-12.385,0-22.461-10.076-22.461-22.461c0-12.385,10.076-22.461,22.461-22.461 c12.385,0,22.461,10.076,22.461,22.461C267.583,163.732,257.507,173.809,245.122,173.809z M245.122,138.887 c-6.871,0-12.461,5.59-12.461,12.461c0,6.871,5.59,12.461,12.461,12.461c6.871,0,12.461-5.59,12.461-12.461 C257.583,144.477,251.993,138.887,245.122,138.887z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                          <path d="M276.856,95.274c-8.688-7.644-30.678-20.58-57.99-20.58c-33.047,0-54.13,17.149-58.018,20.584 c-18.881,16.653-29.71,40.633-29.71,65.788c0,17.989,14.61,32.625,32.568,32.625h10.141v14.35c0,8.047,6.546,14.593,14.592,14.593 c8.047,0,14.595-6.546,14.595-14.593v-4.757h1.23v4.757c0,8.047,6.546,14.593,14.593,14.593c8.047,0,14.594-6.546,14.594-14.593 v-4.757h1.229v4.757c0,8.047,6.546,14.593,14.592,14.593c8.047,0,14.594-6.546,14.594-14.593v-14.35h10.143 c17.958,0,32.568-14.636,32.568-32.625C306.575,135.915,295.745,111.936,276.856,95.274z M274.007,183.691h-15.143 c-2.762,0-5,2.238-5,5v19.35c0,2.532-2.061,4.593-4.594,4.593c-2.532,0-4.592-2.061-4.592-4.593v-9.757c0-2.762-2.238-5-5-5 H228.45c-2.762,0-5,2.238-5,5v9.757c0,2.532-2.061,4.593-4.594,4.593c-2.533,0-4.593-2.061-4.593-4.593v-9.757 c0-2.762-2.239-5-5-5h-11.23c-2.761,0-5,2.238-5,5v9.757c0,2.532-2.061,4.593-4.595,4.593c-2.532,0-4.592-2.061-4.592-4.593 v-19.35c0-2.762-2.239-5-5-5h-15.141c-12.444,0-22.568-10.15-22.568-22.625c0-22.287,9.595-43.532,26.328-58.291 c3.417-3.02,21.955-18.081,51.399-18.081c24.334,0,43.749,11.37,51.38,18.084c16.732,14.76,26.329,36.005,26.329,58.288 C296.575,173.542,286.451,183.691,274.007,183.691z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  Morto
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
