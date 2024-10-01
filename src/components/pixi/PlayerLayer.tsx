import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface PlayerData {
  x: number; // Coordenada x (em tiles)
  y: number; // Coordenada y (em tiles)
}

interface PlayerLayerProps {
  data: PlayerData;
}

export const PlayerLayer: React.FC<PlayerLayerProps> = ({ data }) => {
  // Carregar a textura do player
  const playerTexture = Texture.from(`player_0`);

  // Definir o tamanho de cada tile (64x64)
  const tileSize = 64;

  return (
    <Sprite
      position={{
        x: data.x * tileSize, // Multiplicando pela unidade de tile
        y: data.y * tileSize, // Multiplicando pela unidade de tile
      }}
      texture={playerTexture}
      scale={1}
    />
  );
};
