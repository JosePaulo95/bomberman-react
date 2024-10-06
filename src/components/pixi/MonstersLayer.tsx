import { Monster, Vector } from "@/types";
import { Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/react";
import React, { useMemo } from "react";

// Definindo os tipos das props
interface MonstersLayerProps {
  data: Monster[];
  pivo: Vector;
}

// Função para carregar as texturas do sprite sheet com useMemo
const getAnimationFrames = (): Texture[] => {
  return [Texture.from("monster_0_a"), Texture.from("monster_0_b")] 
};

// Componente monstersLayer
export const MonstersLayer: React.FC<MonstersLayerProps> = ({ data, pivo }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <>
      {data.map((monster, index) => {
        // Memoizando as texturas com base em monster.type ou outro valor relevante
        const textures = useMemo(
          () => getAnimationFrames(), // Use monster.type para gerar as texturas dinamicamente
          [monster.pos] // Dependência para recalcular as texturas apenas se o monster.type mudar
        );

        return (
          <AnimatedSprite
            key={index}
            position={{ x: (monster.pos.x-pivo.x) * tileSize, y: (monster.pos.y-pivo.y-1) * tileSize }}
            textures={textures} // Usa as texturas memoizadas
            animationSpeed={0.05} // Velocidade da animação
            isPlaying={true} // Começa a tocar a animação automaticamente
            scale={1}
          />
        );
      })}
    </>
  );
};
