import { useShallow } from "zustand/react/shallow";

import { Clock } from "@/components/dom/Clock";
import { Controls } from "@/components/dom/Controls";
import { Character } from "@/components/pixi/Character";
import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
import { Pixi } from "@/helpers/Pixi";
import { useGameStore } from "@/store/useGameStore";

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

  return (
    <div>
      <Clock />
      {yourPlayerId && <Controls />}
      <Pixi.In>
        <GroundLayer floor={floor} />

        {playerIds.map((playerId, index) => (
          <Character key={playerId} playerId={playerId} model={index % 2} />
        ))}
      </Pixi.In>
    </div>
  );
}
