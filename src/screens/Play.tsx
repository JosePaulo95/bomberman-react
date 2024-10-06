import { BombsLayer } from "@/components/pixi/BombsLayer";
import { ExplosionsLayer } from "@/components/pixi/ExplosionsLayer";
import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
import { InputLayer } from "@/components/pixi/InputLayer";
import { PlayerLayer } from "@/components/pixi/PlayerLayer";
import { isWalkableTile } from "@/helpers/Gate";
import { Pixi } from "@/helpers/Pixi";
import { useGameStore } from "@/store/useGameStore";
import { Vector } from "@/types";
import { Container } from "@pixi/react";
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
  const centralPos: Vector = {
    x: 2,
    y: 2
  }

  const responFactor = 0.1875;
  const factor = responFactor*terrainMap.map[0].length
  return (
    <div>
      <Pixi.In>
        {
          player && 
            <Container width={window.innerWidth*factor} height={window.innerWidth*factor} position={{ x: 0, y: 0 }}>
              { terrainMap && <GroundLayer index={terrainMap.level} floor={terrainMap.map} pivo={{x: player.x-centralPos.x, y: player.y-centralPos.y}}/>}
              { bombsMap && <BombsLayer data={bombsMap} pivo={{x: player.x-centralPos.x, y: player.y-centralPos.y}}/>}
              { bombsMap && <ExplosionsLayer data={explosionsList} pivo={{x: player.x-centralPos.x, y: player.y-centralPos.y}} />}

              <PlayerLayer data={{ ...player, ...centralPos }} />

              <InputLayer x={centralPos.x} y={centralPos.y} onClick={() => handlePlaceBombClick()} />
              
              {(isWalkableTile(terrainMap.map[player.y - 1]?.[player.x])) && (
                <InputLayer x={centralPos.x} y={centralPos.y - 1} onClick={() => handleSpriteClick("up")} />
              )}
              
              {(isWalkableTile(terrainMap.map[player.y + 1]?.[player.x])) && (
                <InputLayer x={centralPos.x} y={centralPos.y + 1} onClick={() => handleSpriteClick("down")} />
              )}
              
              {(isWalkableTile(terrainMap.map[player.y]?.[player.x - 1])) && (
                <InputLayer x={centralPos.x - 1} y={centralPos.y} onClick={() => handleSpriteClick("left")} />
              )}
              
              {(isWalkableTile(terrainMap.map[player.y]?.[player.x + 1])) && (
                <InputLayer x={centralPos.x + 1} y={centralPos.y} onClick={() => handleSpriteClick("right")} />
              )}
            </Container>
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
