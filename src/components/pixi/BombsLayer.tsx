import { Texture } from "@pixi/core";
import { AnimatedSprite, Container } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface BombsLayerProps {
  data: number[][];
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
    <Container scale={2} position={{ x: 0, y: 0 }}>
      {data.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          tile > 0 && ( // Verifica se o valor de 'tile' é maior que 0
            <AnimatedSprite
              key={`${rowIndex}-${colIndex}`}
              position={{ x: (colIndex * tileSize)+tileSize/4, y: (rowIndex * tileSize)-tileSize/4 }}
              textures={getAnimationFrames(tile)} // Passa os frames para a animação
              animationSpeed={0.1} // Velocidade da animação
              isPlaying={true} // Começa a tocar a animação automaticamente
              scale={1}
            />
          )
        ))
      )}
    </Container>
  );
};
