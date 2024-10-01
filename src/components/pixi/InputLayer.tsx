import { Html } from "@/helpers/Html";
import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface InputLayerProps {
  onClick: () => void;
  x: number; // Coordenada x (em tiles)
  y: number; // Coordenada y (em tiles)
}

export const InputLayer: React.FC<InputLayerProps> = ({ onClick, x, y }) => {
  // Carregar a textura (pode ser personalizada conforme o contexto)
  const inputTexture = Texture.from(`input_0`); // Exemplo de textura
  const tileSize = 64;

  // Estilo para o botão ocupar toda a área da sprite
  const buttonStyle = {
    position: "absolute" as const,
    left: `${x * tileSize}px`,
    top: `${y * tileSize}px`,
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 1, // Garante que o botão fique acima da Sprite
  };

  return (
    <>
      <Sprite
        texture={inputTexture}
        position={{ x: x * tileSize, y: y * tileSize }} // Posiciona no grid
        scale={1}
      />
      <Html.In>
        <button style={buttonStyle} onClick={onClick}></button>
      </Html.In>
    </>
  );
};
