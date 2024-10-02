import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
import { InputLayer } from "@/components/pixi/InputLayer";
import { PlayerLayer } from "@/components/pixi/PlayerLayer";
import { Pixi } from "@/helpers/Pixi";
import { useGameStore } from "@/store/useGameStore";
import { useShallow } from "zustand/react/shallow";

export function Play() {
  const playerIds = useGameStore(useShallow((state) => Object.keys(state.game.players)));
  const yourPlayerId = useGameStore((state) => state.yourPlayerId);
  const player = yourPlayerId && useGameStore((state) => state.game.players[yourPlayerId].position)
  
  // Matriz 3x3 representando o piso
  const floor = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];

  const handleSpriteClick = (dir: string) => {
    switch (dir) {
      case "up":
        Rune.actions.moveUp(); // Chama ação para mover para cima
        break;
      case "down":
        Rune.actions.moveDown(); // Chama ação para mover para baixo
        break;
      case "left":
        Rune.actions.moveLeft(); // Chama ação para mover para a esquerda
        break;
      case "right":
        Rune.actions.moveRight(); // Chama ação para mover para a direita
        break;
      default:
        console.log("Direção inválida"); // Trata caso de direção inválida
    }
  };
  

  return (
    <div>
      <Pixi.In>
        <GroundLayer floor={floor} />

        {
          player && 
            <>
              <PlayerLayer data={player}/>
              
              <InputLayer x={player.x} y={player.y - 1} onClick={() => handleSpriteClick("up")} />
              <InputLayer x={player.x} y={player.y + 1} onClick={() => handleSpriteClick("down")} />
              <InputLayer x={player.x - 1} y={player.y} onClick={() => handleSpriteClick("left")} />
              <InputLayer x={player.x + 1} y={player.y} onClick={() => handleSpriteClick("right")} />
            </>
        }
      </Pixi.In>
    </div>
  );
}
