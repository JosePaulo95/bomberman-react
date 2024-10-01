import { Texture } from "@pixi/core";
import { Container, Sprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface GroundLayerProps {
  floor: number[][];
}

// Componente GroundLayer
export const GroundLayer: React.FC<GroundLayerProps> = ({ floor }) => {
  // Definir textura e tamanho dos tiles dentro do componente
  const groundTexture = Texture.from(`ground_0`);
  const tileSize = 64; // Definir tamanho do tile

  return (
    <Container scale={1} position={{ x: 0, y: 0 }}>
      {floor.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Sprite
            key={`${rowIndex}-${colIndex}`}
            position={{ x: colIndex * tileSize, y: rowIndex * tileSize }}
            texture={groundTexture}
            scale={1}
          />
        ))
      )}
    </Container>
  );
};
