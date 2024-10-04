import { Texture } from "@pixi/core";
import { AnimatedSprite, Container } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface GroundLayerProps {
  floor: number[][];
}

// Função para mapear o valor da célula para uma textura específica
const getTexturesForTile = (tileValue: number): Texture[] => {
  switch (tileValue) {
    case 0:
      return [Texture.from(`ground_0`)]; // Textura para chão normal
    case 1:
      return [Texture.from(`block_0`)]; // parede
    case 2:
      return [Texture.from(`crate_0`)]; // destrutivel
    case 3:
      return [Texture.from(`crate_0`)]; // destrutivel
    default:
      return [Texture.from(`ground_0`)]; // na dúvida é chao
  }
};

// Componente GroundLayer
export const GroundLayer: React.FC<GroundLayerProps> = ({ floor }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <Container scale={3} position={{ x: 0, y: 0 }}>
      {floor.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <AnimatedSprite
            key={`${rowIndex}-${colIndex}`}
            position={{ x: colIndex * tileSize, y: rowIndex * tileSize }}
            textures={getTexturesForTile(0)}
            animationSpeed={0.05} // Velocidade da animação
            isPlaying={true} // Começa a tocar a animação automaticamente
            scale={1}
          />
        ))
      )}
      {floor.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          ![0].includes(tile) &&
          <AnimatedSprite
            key={`${rowIndex}-${colIndex}`}
            position={{ x: colIndex * tileSize, y: rowIndex * tileSize }}
            textures={getTexturesForTile(tile)}
            animationSpeed={0.05} // Velocidade da animação
            isPlaying={true} // Começa a tocar a animação automaticamente
            scale={1}
          />
        ))
      )}
    </Container>
  );
};
