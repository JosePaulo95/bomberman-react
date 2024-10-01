import { Character } from "@/components/pixi/Character";
import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
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

  return (
    <div>
      <Pixi.In>
        <GroundLayer floor={floor} />
        <PlayerLayer data={player}/>

        {playerIds.map((playerId, index) => (
          <Character key={playerId} playerId={playerId} model={index % 2} />
        ))}
      </Pixi.In>
    </div>
  );
}
