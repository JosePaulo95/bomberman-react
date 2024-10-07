import { BombsLayer } from "@/components/pixi/BombsLayer";
import { ExplosionsLayer } from "@/components/pixi/ExplosionsLayer";
import { GroundLayer } from "@/components/pixi/GroundLayer"; // Importando o novo componente
import { HUDLayer } from "@/components/pixi/HUDLayer";
import { InputLayer } from "@/components/pixi/InputLayer";
import { MonstersLayer } from "@/components/pixi/MonstersLayer";
import { PlayerLayer } from "@/components/pixi/PlayerLayer";
import { isWalkableTile } from "@/helpers/Gate";
import { Pixi } from "@/helpers/Pixi";
import { useGameStore } from "@/store/useGameStore";
import { Vector } from "@/types";
import { Container } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function Play() {
  const playerIds = useGameStore(useShallow((state) => Object.keys(state.game.players)));
  const yourPlayerId = useGameStore((state) => state.yourPlayerId);
  const player = yourPlayerId && useGameStore((state) => state.game.players[yourPlayerId].position)
  const players = useGameStore((state) => state.game.players)
  const monsters = useGameStore((state) => state.game.monsters)
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
    y: 4
  }

  const responFactor = 0.1875;
  const factor = responFactor*terrainMap.map[0].length

  const [interpolatedPosition, setInterpolatedPosition] = useState({ x: 0, y: 0 });
  const previousPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!yourPlayerId) return; // Certifique-se de que o jogador está definido

    const player = players[yourPlayerId]?.position;

    if (!player) return;

    // Inicia a interpolação
    const duration = 200; // Duração da interpolação em milissegundos
    const startTime = performance.now();
    const startPosition = previousPositionRef.current;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1); // Normaliza entre 0 e 1
      const easeOutQuad = (t:number) => t * (2 - t);
      // Aplique a função de easing
      const easedT = easeOutQuad(t);
    
      // Interpolação com easing
      const newX = startPosition.x + (player.x - startPosition.x) * easedT;
      const newY = startPosition.y + (player.y - startPosition.y) * easedT;
    
      setInterpolatedPosition({ x: newX, y: newY });
    
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        previousPositionRef.current = { x: player.x, y: player.y }; // Atualiza a posição anterior
      }
    };    

    requestAnimationFrame(animate);
  }, [players, yourPlayerId]);


  return (
    <div>
      <Pixi.In>
        {
          player && 
            <Container width={window.innerWidth*factor} height={window.innerWidth*factor} position={{ x: 0, y: 0 }}>
              { terrainMap && <GroundLayer index={terrainMap.level} floor={terrainMap.map} pivo={{x: interpolatedPosition.x-centralPos.x, y: interpolatedPosition.y-centralPos.y}}/>}
              { bombsMap && <BombsLayer data={bombsMap} pivo={{x: interpolatedPosition.x-centralPos.x, y: interpolatedPosition.y-centralPos.y}}/>}

              <PlayerLayer data={{ ...player, ...centralPos }} />
              {Object.keys(players)
              .filter((id) => id !== yourPlayerId) // Filtra os outros jogadores
              .map((id, index) => {
                return <PlayerLayer data={{...players[id], x:players[id].position.x-interpolatedPosition.x+centralPos.x, y:players[id].position.y-interpolatedPosition.y+centralPos.y}} />;
              })}
              <MonstersLayer data={monsters} pivo={{x: interpolatedPosition.x-centralPos.x, y: interpolatedPosition.y-centralPos.y}} />
              { bombsMap && <ExplosionsLayer data={explosionsList} pivo={{x: interpolatedPosition.x-centralPos.x, y: interpolatedPosition.y-centralPos.y}} />}

              <InputLayer x={centralPos.x} y={centralPos.y} onClick={() => handlePlaceBombClick()} iconAlias="bomb_icon"/>
              
              {(isWalkableTile(terrainMap.map[player.y - 1]?.[player.x])) && (
                <InputLayer x={centralPos.x} y={centralPos.y - 1} onClick={() => handleSpriteClick("up")} iconAlias="arrow_n"/>
              )}
              
              {(isWalkableTile(terrainMap.map[player.y + 1]?.[player.x])) && (
                <InputLayer x={centralPos.x} y={centralPos.y + 1} onClick={() => handleSpriteClick("down")} iconAlias="arrow_s"/>
              )}
              
              {(isWalkableTile(terrainMap.map[player.y]?.[player.x - 1])) && (
                <InputLayer x={centralPos.x - 1} y={centralPos.y} onClick={() => handleSpriteClick("left")} iconAlias="arrow_w"/>
              )}
              
              {(isWalkableTile(terrainMap.map[player.y]?.[player.x + 1])) && (
                <InputLayer x={centralPos.x + 1} y={centralPos.y} onClick={() => handleSpriteClick("right")} iconAlias="arrow_e"/>
              )}
              <HUDLayer remainingLife={players[yourPlayerId].remainingLife} maxLifes={players[yourPlayerId].maxLifes} />
            </Container>
        }

      </Pixi.In>
    </div>
  );
}
