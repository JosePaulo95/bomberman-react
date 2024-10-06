import { GameState } from "@/logic";
import { Monster, Vector } from "@/types";

// Função para validar se a direção é permitida
const isValidDirection = (monster: Monster, direction: Vector, game: GameState): boolean => {
    const newX = monster.pos.x + direction.x;
    const newY = monster.pos.y + direction.y;

    // Verificar se a nova posição está dentro dos limites do mapa
    const isWithinBounds = (
        newX >= 0 && newX < game.terrainMap.map[0].length &&
        newY >= 0 && newY < game.terrainMap.map.length
    );

    // Verificar se a nova posição não é uma parede (assumindo que 1 é uma parede no mapa)
    const isNotWall = game.terrainMap.map[newY][newX] !== 1;

    const hasNoMonsterInIt = !game.monsters.some(otherMonster =>
        otherMonster.pos.x === newX && otherMonster.pos.y === newY
    );

    return isWithinBounds && isNotWall && hasNoMonsterInIt;
};

export const applyMonsterStrategy = (monster: Monster, game: GameState): Vector => {
    // Definindo as direções possíveis: cima, baixo, esquerda, direita
    const directions: Vector[] = [
        { x: 0, y: -1 }, // Cima
        { x: 0, y: 1 },  // Baixo
        { x: -1, y: 0 }, // Esquerda
        { x: 1, y: 0 }   // Direita
    ];

    // Filtrar as direções válidas
    const validDirections = directions.filter(d => isValidDirection(monster, d, game));

    // Se houver direções válidas, escolher uma aleatoriamente
    if (validDirections.length > 0) {
        const randomIndex = Math.floor(Math.random() * validDirections.length);
        return validDirections[randomIndex];
    }

    // Se não houver direções válidas, o monstro não se move
    return { x: 0, y: 0 };
};

