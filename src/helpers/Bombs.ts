import { GameState } from "@/logic";
import { Bomb, Explosion, Vector } from "@/types";

// Função que verifica colisões
const canPlaceExplosion = (pos: Vector, game: GameState) => {
    // Aqui você implementa sua lógica de colisão com o mapa ou outros objetos
    // Retorne true se a explosão puder ocorrer, false se colidir com algo
    return true; // Por enquanto, assumimos que sempre pode
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
  
        // Checa se pode colocar a explosão nesse local
        if (canPlaceExplosion(explosionPos, game)) {
          explosions.push({
            pos: explosionPos,
            createdAt: currentTime,
            duration: 1000, // Duração da explosão
          });
        } else {
          break; // Para a explosão ao encontrar uma colisão
        }
      }
    });
    
    debugger;
    return explosions;
  };
  