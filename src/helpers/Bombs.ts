import { GameState } from "@/logic";
import { Bomb, Explosion, Vector } from "@/types";

// Verifica se a explosão deve parar imediatamente (casos 1 e 2)
const cantPlaceImmediate = (pos: Vector, game: GameState) => {
  const { terrainMap } = game;

  // 1. Limite do mapa (a explosão não pode sair dos limites)
  if (pos.x < 0 || pos.x >= terrainMap.map[0].length || pos.y < 0 || pos.y >= terrainMap.map.length) {
    return true; // Não pode explodir fora dos limites
  }

  const tile = terrainMap.map[pos.y][pos.x];

  // 2. Colisão com paredes sólidas (não pode atravessar)
  if (tile === 1) {
    return true; // Paredes sólidas bloqueiam a explosão
  }

  return false; // Não há bloqueios imediatos
};

// Verifica se deve parar a explosão ao atingir uma parede destrutível (caso 3)
const shouldStopOnDestructible = (pos: Vector, game: GameState) => {
  const { terrainMap } = game;

  const tile = terrainMap.map[pos.y][pos.x];

  // 3. Colisão com paredes destrutíveis (explosão para e destrói a parede)
  if (tile === 2) {
    return true; // Paredes destrutíveis devem parar a explosão
  }

  return false; // Não é uma parede destrutível, a explosão pode continuar
};

export const createExplosions = (bomb: Bomb, game: GameState): Explosion[] => {
  const currentTime = Rune.gameTime();
  const explosions: Explosion[] = [];

  // Explosão no centro (onde a bomba estava)
  explosions.push({
    pos: {
      x: bomb.pos.x,
      y: bomb.pos.y
    },
    createdAt: currentTime,
    duration: 1000, // Duração da explosão
  });

  // Direções da explosão (cima, baixo, esquerda, direita)
  const directions = [
    { x: 1, y: 0 },  // Direita
    { x: -1, y: 0 }, // Esquerda
    { x: 0, y: 1 },  // Baixo
    { x: 0, y: -1 }  // Cima
  ];

  directions.forEach((dir) => {
    for (let i = 1; i <= bomb.range; i++) {
      const explosionPos = {
        x: bomb.pos.x + dir.x * i,
        y: bomb.pos.y + dir.y * i,
      };

      // Checa colisões com limites e paredes sólidas
      if (cantPlaceImmediate(explosionPos, game)) {
        break; // Para a explosão imediatamente
      }

      // Adiciona a explosão à lista
      explosions.push({
        pos: explosionPos,
        createdAt: currentTime,
        duration: 1000, // Duração da explosão
      });

      // Checa colisão com paredes destrutíveis
      if (shouldStopOnDestructible(explosionPos, game)) {
        break; // Para a explosão, pois encontrou uma parede destrutível
      }
    }
  });

  return explosions;
};
