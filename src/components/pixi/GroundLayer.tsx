import { Html } from "@/helpers/Html";
import { Vector } from "@/types";
import { Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface GroundLayerProps {
  floor: number[][];
  pivo: Vector;
  index: number;
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
      return [Texture.from(`player_0`), Texture.from(`crate_0`), Texture.from(`ground_0`), Texture.from(`crate_0`)]; // destrutivel
    case 4:
      return [Texture.from(`key`)];
    case 5:
      return [Texture.from(`closed_gate`)];
    case 6:
      return [Texture.from(`opened_gate`)];
    default:
      return [Texture.from(`ground_0`)]; // na dúvida é chao
  }
};

// Componente GroundLayer
export const GroundLayer: React.FC<GroundLayerProps> = ({ index, floor, pivo }) => {
  const tileSize = 16; // Tamanho do tile
  
  return (
    <>
      <Html.In>{index}</Html.In>
      {floor.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <AnimatedSprite
            key={`${rowIndex}-${colIndex}-${tile}`}
            position={{ x: (colIndex-pivo.x) * tileSize, y: (rowIndex-pivo.y) * tileSize }}
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
            key={`${rowIndex}-${colIndex}-${tile}`}
            position={{ x: (colIndex-pivo.x) * tileSize, y: (rowIndex-pivo.y) * tileSize }}
          // position={{ x: colIndex * tileSize, y: rowIndex * tileSize }}
            textures={getTexturesForTile(tile)}
            animationSpeed={0.05} // Velocidade da animação
            isPlaying={true} // Começa a tocar a animação automaticamente
            scale={1}
          />
        ))
      )}
    </>
  );
};
