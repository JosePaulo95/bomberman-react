import { Character } from "@/components/pixi/Character";
import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
import { InputLayer } from "@/components/pixi/InputLayer";
import { PlayerLayer } from "@/components/pixi/PlayerLayer";
import { Pixi } from "@/helpers/Pixi";
import { useGameStore } from "@/store/useGameStore";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function Play() {
  const playerIds = useGameStore(useShallow((state) => Object.keys(state.game.players)));
  const yourPlayerId = useGameStore((state) => state.yourPlayerId);
  
  // Matriz 3x3 representando o piso
  const floor = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  const playerInitialState = {
    x: 1,
    y: 3
  };
  const [player, setPlayer] = useState(playerInitialState);

  const handleSpriteClick = (dir: string) => {
    setPlayer((prevPlayer) => {
      switch (dir) {
        case "up":
          return { ...prevPlayer, y: prevPlayer.y - 1 }; // Move para cima
        case "down":
          return { ...prevPlayer, y: prevPlayer.y + 1 }; // Move para baixo
        case "left":
          return { ...prevPlayer, x: prevPlayer.x - 1 }; // Move para a esquerda
        case "right":
          return { ...prevPlayer, x: prevPlayer.x + 1 }; // Move para a direita
        default:
          return prevPlayer; // Se a direção for inválida, não faz nada
      }
    });

    console.log(`Sprite clicada! Movimento: ${dir}`);
  };

  return (
    <div>
      <Pixi.In>
        <GroundLayer floor={floor} />
        <PlayerLayer data={player}/>
        
        <InputLayer x={player.x} y={player.y - 1} onClick={() => handleSpriteClick("up")} />
        <InputLayer x={player.x} y={player.y + 1} onClick={() => handleSpriteClick("down")} />
        <InputLayer x={player.x - 1} y={player.y} onClick={() => handleSpriteClick("left")} />
        <InputLayer x={player.x + 1} y={player.y} onClick={() => handleSpriteClick("right")} />

        {playerIds.map((playerId, index) => (
          <Character key={playerId} playerId={playerId} model={index % 2} />
        ))}
      </Pixi.In>
    </div>
  );
}
