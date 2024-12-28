import React, { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import Button3D from "~/components/Button3D";
import Button3DCustom from "~/components/Button3DCustom";

type Player = {
  id: number;
  name: string;
  lives: number;
};

export default function AssoCheFugge() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerLives, setNewPlayerLives] = useState(3);
  // Aggiungi nuovo state
  const [searchTerm, setSearchTerm] = useState("");

  // Aggiungi funzione per filtrare
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
  // Aggiungi un nuovo giocatore tramite l'API
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

  // Aggiorna le vite di un giocatore tramite l'API
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

  // Cancella tutti i giocatori tramite l'API
  const deletePlayers = async () => {
    if (
      !window.confirm(
        "Sei sicuro di voler cancellare tutti i giocatori? l'operazione è irreversibile"
      )
    )
      return;

    try {
      const response = await fetch("/api/players", {
        method: "DELETE",
      });

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
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-white-600">
        Asso che Fugge
      </h1>

      {/* Add Player Form */}
      <Card className="mb-6 bg-[#10172A] border border-2-[#64FFDA]">
        <CardHeader>
          <CardTitle className="text-[#ffffff]">Aggiungi Giocatore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Inputs sempre affiancati */}
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                placeholder="Nome giocatore"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="w-2/3 text-[#ffffff] placeholder:text-[#64FFDA] placeholder:opacity-50"
              />
              <Input
                type="number"
                min="1"
                max="6"
                value={newPlayerLives}
                onChange={(e) =>
                  setNewPlayerLives(parseInt(e.target.value) || 1)
                }
                className="w-1/3 text-[#ffffff]"
              />
            </div>
            {/* Bottoni affiancati desktop, impilati mobile */}
            <div className="flex  sm:flex-row gap-4 justify-center items-center">
              <Button3D onClick={addPlayer}>Aggiungi</Button3D>
              <Button3D onClick={deletePlayers}>Cancella</Button3D>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6 bg-[#10172A] border border-2-[#64FFDA]">
        <CardHeader>
          <CardTitle className="text-[#ffffff]">
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
              className="bg-[#10172A] text-[#ffffff] placeholder:text-[#64FFDA] placeholder:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Player List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id} // Utilizza l'ID come key
            className={`p-4 rounded shadow-md flex flex-col justify-between ${
              player.lives === 0 ? "bg-red-200" : "bg-[#f0e8e3]"
            }`}
          >
            <CardContent className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-bold uppercase">{player.name}</h2>
              <p
                className={`text-lg font-bold ${
                  player.lives === 0 ? "text-red-600" : "text-gray-800"
                }`}
              >
                Vite: {player.lives}
              </p>
            </CardContent>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="flex gap-2 justify-center">
                <Button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => updateLives(player.id, -1)}
                >
                  -1 Vita
                </Button>
                <Button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => updateLives(player.id, 1)}
                >
                  +1 Vita
                </Button>
              </div>
              {player.lives <= 0 && (
                <span className="text-red-500 font-bold uppercase text-2xl">
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
