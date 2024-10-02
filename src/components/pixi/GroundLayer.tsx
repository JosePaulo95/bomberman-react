import { Texture } from "@pixi/core";
import { Container, Sprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface GroundLayerProps {
  floor: number[][];
}

// Função para mapear o valor da célula para uma textura específica
const getTextureForTile = (tileValue: number): Texture => {
  switch (tileValue) {
    case 0:
      return Texture.from(`ground_0`); // Textura para chão normal
    case 1:
      return Texture.from(`block_0`); // Exemplo de outra textura
    case 2:
      return Texture.from(`crate_0`); // Exemplo de outra textura
    default:
      return Texture.from(`ground_0`); // Textura padrão para valores desconhecidos
  }
};

// Componente GroundLayer
export const GroundLayer: React.FC<GroundLayerProps> = ({ floor }) => {
  const tileSize = 64; // Tamanho do tile

  return (
    <Container scale={1} position={{ x: 0, y: 0 }}>
      {floor.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Sprite
            key={`${rowIndex}-${colIndex}`}
            position={{ x: colIndex * tileSize, y: rowIndex * tileSize }}
            texture={getTextureForTile(0)}
            scale={1}
          />
        ))
      )}
      {floor.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          ![0].includes(tile) &&
          <Sprite
            key={`${rowIndex}-${colIndex}`}
            position={{ x: colIndex * tileSize, y: rowIndex * tileSize }}
            texture={getTextureForTile(tile)}
            scale={1}
          />
        ))
      )}
    </Container>
  );
};
