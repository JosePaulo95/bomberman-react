import { Character } from "@/components/pixi/Character";
import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
import { InputLayer } from "@/components/pixi/InputLayer";
import { PlayerLayer } from "@/components/pixi/PlayerLayer";
import { Pixi } from "@/helpers/Pixi";
import { useGameStore } from "@/store/useGameStore";
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
  const player = {
    x: 1,
    y: 3
  }

  const handleSpriteClick = (dir: string) => {
    console.log("Sprite clicada!");
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
