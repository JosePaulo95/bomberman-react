import { Bomb } from "@/types";
import { Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/react";
import React, { useMemo } from "react";

// Definindo os tipos das props
interface BombsLayerProps {
  data: Bomb[];
}

// Função para carregar as texturas do sprite sheet com useMemo
const getAnimationFrames = (tile: number): Texture[] => {
  return tile > 0 
    ? [Texture.from("bomb_0_a"), Texture.from("bomb_0_b")] 
    : [Texture.from("bomb_0_a")];
};

// Componente BombsLayer
export const BombsLayer: React.FC<BombsLayerProps> = ({ data }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <>
      {data.map((bomb, index) => {
        // Memoizando as texturas com base em bomb.type ou outro valor relevante
        const textures = useMemo(
          () => getAnimationFrames(1), // Use bomb.type para gerar as texturas dinamicamente
          [bomb.pos] // Dependência para recalcular as texturas apenas se o bomb.type mudar
        );

        return (
          <AnimatedSprite
            key={bomb.id}
            position={{ x: bomb.pos.x * tileSize, y: (bomb.pos.y - 1) * tileSize }}
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
