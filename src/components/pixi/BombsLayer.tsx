import { Bomb } from "@/types";
import { Texture } from "@pixi/core";
import { AnimatedSprite, Container } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface BombsLayerProps {
  data: Bomb[];
}

// Função para carregar as texturas do sprite sheet
const getAnimationFrames = (tile: number): Texture[] => {
  if (tile > 0) {
    return [Texture.from("bomb_0_a"), Texture.from("bomb_0_b")];
  }
  return [Texture.from("bomb_0_a")];
};

// Componente BombsLayer
export const BombsLayer: React.FC<BombsLayerProps> = ({ data }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <Container scale={3} position={{ x: 0, y: 0 }}>
      {data.map((bomb, index) => (
        <AnimatedSprite
          key={index}
          position={{ x: bomb.pos.x * tileSize, y: (bomb.pos.y-1) * tileSize }}
          textures={getAnimationFrames(1)} // Passa os frames com base no tipo da bomba
          animationSpeed={0.05} // Velocidade da animação
          isPlaying={true} // Começa a tocar a animação automaticamente
          scale={1}
        />
      ))}
    </Container>
  );
};
