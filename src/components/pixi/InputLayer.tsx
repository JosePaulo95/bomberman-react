import { Html } from "@/helpers/Html";
import { Texture } from "@pixi/core";
import { Container, Sprite } from "@pixi/react";
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
  const tileSize = 16;
  const scale = 3
  // Estilo para o botão ocupar toda a área da sprite
  const buttonStyle = {
    position: "absolute" as const,
    left: `${x * scale * tileSize}px`,
    top: `${y * scale * tileSize}px`,
    width: `${tileSize*scale}px`,
    height: `${tileSize*scale}px`,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 1, // Garante que o botão fique acima da Sprite
  };

  return (
    <Container scale={scale} position={{ x: 0, y: 0 }}>
      <Sprite
        texture={inputTexture}
        position={{ x: x * tileSize, y: y * tileSize }} // Posiciona no grid
        scale={1}
      />
      <Html.In>
        <button style={buttonStyle} onClick={onClick}></button>
      </Html.In>
    </Container>
  );
};
