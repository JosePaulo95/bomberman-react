import { Monster, Vector } from "@/types";
import { Texture } from "@pixi/core";
import { AnimatedSprite } from "@pixi/react";
import React from "react";

// Definindo os tipos das props
interface MonstersLayerProps {
  data: Monster[];
  pivo: Vector;
}

// Função para carregar as texturas do sprite sheet
const getAnimationFrames = (dir: Vector) => {
  if (dir.y < 0) {
    return [
      Texture.from("monster_0_up_0"),
      Texture.from("monster_0_up_1"),
      Texture.from("monster_0_up_2"),
      Texture.from("monster_0_up_3")
    ];
  }
  if (dir.y > 0) {
    return [
      Texture.from("monster_0_down_0"),
      Texture.from("monster_0_down_1"),
      Texture.from("monster_0_down_2"),
      Texture.from("monster_0_down_3")
    ];
  }
  if (dir.x < 0) {
    return [
      Texture.from("monster_0_left_0"),
      Texture.from("monster_0_left_1"),
      Texture.from("monster_0_left_2"),
      Texture.from("monster_0_left_3")
    ];
  }
  if (dir.x > 0) {
    return [
      Texture.from("monster_0_right_0"),
      Texture.from("monster_0_right_1"),
      Texture.from("monster_0_right_2"),
      Texture.from("monster_0_right_3")
    ];
  }
  
  return [Texture.from("monster_0_down_0")];
};

// Componente MonstersLayer
export const MonstersLayer: React.FC<MonstersLayerProps> = React.memo(({ data, pivo }) => {
  const tileSize = 16; // Tamanho do tile

  return (
    <>
      {data.map((monster, index) => {
        const direction: Vector = monster.direction;

        // Memoizando as texturas com base na direção do monstro
        const textures = getAnimationFrames(direction);

        return (
          <AnimatedSprite
            key={index} // Use um id único do monstro
            position={{ x: (monster.pos.x - pivo.x) * tileSize, y: (monster.pos.y - pivo.y - 1) * tileSize }}
            textures={textures} // Usa as texturas memoizadas
            animationSpeed={0.05} // Velocidade da animação
            isPlaying={true} // Começa a tocar a animação automaticamente
            scale={1}
          />
        );
      })}
    </>
  );
});
