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

// Componente BombSprite memoizado para evitar re-renderizações desnecessárias
const BombSprite: React.FC<{ bomb: Bomb }> = React.memo(({ bomb }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <AnimatedSprite
      key={bomb.id} // Usando a ID da bomba como chave única
      position={{ x: bomb.pos.x * tileSize, y: (bomb.pos.y - 1) * tileSize }}
      textures={getAnimationFrames(1)} // Passa os frames com base no tipo da bomba
      animationSpeed={0.05} // Velocidade da animação
      isPlaying={true} // Começa a tocar a animação automaticamente
      scale={1}
    />
  );
});

// Componente BombsLayer
export const BombsLayer: React.FC<BombsLayerProps> = ({ data }) => {
  return (
    <Container scale={3} position={{ x: 0, y: 0 }}>
      {data.map((bomb) => (
        <BombSprite key={bomb.id} bomb={bomb} />
      ))}
    </Container>
  );
};
