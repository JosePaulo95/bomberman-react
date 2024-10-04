import { BombsLayer } from "@/components/pixi/BombsLayer";
import { ExplosionsLayer } from "@/components/pixi/ExplosionsLayer";
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
  const players = useGameStore((state) => state.game.players)
  const terrainMap = useGameStore((state) => state.game.terrainMap)
  const bombsMap = useGameStore((state) => state.game.bombsMap)
  const explosionsList = useGameStore((state) => state.game.explosions)

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
  
  const handlePlaceBombClick = () => {
    Rune.actions.placeBomb();
  }

  return (
    <div>
      <Pixi.In>
        { terrainMap && <GroundLayer floor={terrainMap} />}
        { bombsMap && <BombsLayer data={bombsMap} />}
        { bombsMap && <ExplosionsLayer data={explosionsList} />}
        {
          player && 
            <>
              <PlayerLayer data={player}/>
              <InputLayer x={player.x} y={player.y} onClick={() => handlePlaceBombClick()} />
              
              {terrainMap[player.y - 1]?.[player.x] === 0 && (
                <InputLayer x={player.x} y={player.y - 1} onClick={() => handleSpriteClick("up")} />
              )}
              
              {terrainMap[player.y + 1]?.[player.x] === 0 && (
                <InputLayer x={player.x} y={player.y + 1} onClick={() => handleSpriteClick("down")} />
              )}
              
              {terrainMap[player.y]?.[player.x - 1] === 0 && (
                <InputLayer x={player.x - 1} y={player.y} onClick={() => handleSpriteClick("left")} />
              )}
              
              {terrainMap[player.y]?.[player.x + 1] === 0 && (
                <InputLayer x={player.x + 1} y={player.y} onClick={() => handleSpriteClick("right")} />
              )}
            </>
        }

        {Object.keys(players)
        .filter((id) => id !== yourPlayerId) // Filtra os outros jogadores
        .map((id) => {
          const otherPlayer = players[id].position;
          return <PlayerLayer key={id} data={otherPlayer} />;
        })}
      </Pixi.In>
    </div>
  );
}
