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
    const isNotWall = ![1,2].includes(game.terrainMap.map[newY][newX])

    const hasNoMonsterInIt = !game.monsters.some(otherMonster =>
        otherMonster.pos.x === newX && otherMonster.pos.y === newY
    );

    const hasNoBombInIt = !game.bombsMap.some(bomb =>
        bomb.pos.x === newX && bomb.pos.y === newY
    );

    return isWithinBounds && isNotWall && hasNoMonsterInIt && hasNoBombInIt;
};

export const applyMonsterStrategy = (monster: Monster, game: GameState): Vector => {
    // Definindo as direções possíveis: cima, baixo, esquerda, direita
    const directions: Vector[] = [
        { x: 0, y: -1 }, // Cima
        { x: 0, y: 1 },  // Baixo
        { x: -1, y: 0 }, // Esquerda
        { x: 1, y: 0 }   // Direita
    ];

    // Verificar se a direção atual do monstro ainda é válida
    if (isValidDirection(monster, monster.direction, game) && (monster.direction.x!=0 || monster.direction.y!=0) ) {
        // Se a direção atual é válida, continua se movendo nela
        return monster.direction;
    } else {
        // Se a direção atual é inválida, sorteia uma nova direção válida
        const validDirections = directions.filter(d => isValidDirection(monster, d, game));

        if (validDirections.length > 0) {
            // Escolhe uma nova direção aleatória válida
            const randomIndex = Math.floor(Math.random() * validDirections.length);
            const newDirection = validDirections[randomIndex];
            
            // Atualiza a direção do monstro
            monster.direction = newDirection;

            // Retorna a nova direção para o movimento
            return newDirection;
        }

        // Se não houver direções válidas, o monstro não se move
        return { x: 0, y: 0 };
    }
};


