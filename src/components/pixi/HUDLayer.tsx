import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface HUDLayerProps {
  remainingLife: number;  // Vidas restantes do jogador
  maxLifes: number;       // Máximo de vidas
}

export const HUDLayer: React.FC<HUDLayerProps> = ({ remainingLife, maxLifes }) => {
  const fullHeartTexture = Texture.from('fullheart');   // Textura de coração cheio
  const emptyHeartTexture = Texture.from('emptyheart'); // Textura de coração vazio
  const tileSize = 16;  // Tamanho de cada tile (coração)

  return (
    <>
      {Array.from({ length: maxLifes }).map((_, index) => (
        <Sprite
          key={index}
          texture={index < remainingLife ? fullHeartTexture : emptyHeartTexture}  // Coração cheio ou vazio
          position={{ x: index * tileSize*0.7, y: 0 }}  // Posiciona horizontalmente no topo esquerdo
          scale={0.7}  // Escala padrão (pode ajustar conforme necessário)
        />
      ))}
    </>
  );
};
