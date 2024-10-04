import { Explosion, Vector } from "@/types";
import { Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface ExplosionsLayerProps {
  data: Explosion[];
  pivo: Vector;
}

// Função para carregar as texturas do sprite sheet
const getAnimationFrames = (tile: number): Texture[] => {
  return [Texture.from("explosion_0")];
};

// Componente ExplosionsLayer
export const ExplosionsLayer: React.FC<ExplosionsLayerProps> = ({ data, pivo }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <>
      {data.map((bomb, index) => (
        <AnimatedSprite
          key={index}
          position={{ x: (bomb.pos.x-pivo.x) * tileSize, y: (bomb.pos.y-pivo.y) * tileSize }}
          textures={getAnimationFrames(1)} // Passa os frames com base no tipo da bomba
          animationSpeed={0.05} // Velocidade da animação
          isPlaying={true} // Começa a tocar a animação automaticamente
          scale={1}
        />
      ))}
    </>
  );
};
