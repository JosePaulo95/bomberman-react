import { Level, Vector } from "@/types";

function makeSquareMatrix(matrix: number[][]): number[][] {
    const numRows = matrix.length;
    const numCols = Math.max(...matrix.map(row => row.length)); // Encontra o número máximo de colunas

    if (numRows === numCols) {
        return matrix;
    }

    const squareMatrix = matrix.map(row => {
        const newRow = [...row];
        while (newRow.length < numCols) {
            newRow.push(0); // Adiciona 0 até completar o número máximo de colunas
        }
        return newRow;
    });

    while (squareMatrix.length < numCols) {
        squareMatrix.push(new Array(numCols).fill(0)); // Adiciona uma linha de 0s
    }

    return squareMatrix;
}

function convertStringMapToArray2D(map: string) {
    const emojiMap: { [key: string]: number } = {
        '⬛': 0,  // Caixa cinza
        '🟦': 1,  // Parede
        '⬜': 2,  // Bloco quebrável
        '🔑': 4,  // Chave
        '🟨': 6,  // Porta
    };

    const playerPositions: Vector[] = [];
    const lines = map.trim().split('\n');

    const result = lines.map((line, rowIndex) => 
        Array.from(line.trim()).map((char, colIndex) => {
            if (char === '👨' || char === '👩') {
                playerPositions.push({ x: rowIndex, y: colIndex });
                return 0; // O jogador não altera o terreno
            }
            return emojiMap[char] || 0;
        })
    );

    return {
        map: makeSquareMatrix(result),
        playerPositions
    };
}

export const createTerrainMap = (level: number): Level => {
    switch (level) {
        case 1:
            const level1Data = convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛👨⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛⬛🟨🟨⬛⬛⬜🔑
                ⬛⬛👩⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
            `);
            return {
                level: 1,
                map: level1Data.map,
                playerPositions: level1Data.playerPositions
            };
        case 2:
            const level2Data = convertStringMapToArray2D(`
                👨⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛🟦⬛🟦⬛🟦⬛🟦⬛
                ⬛⬛⬜⬛⬜⬛⬜⬛⬜⬛⬛
                ⬛🟦⬛🟦⬛🟦⬛🟦⬛🟦⬛
                🟨🟨⬛⬛⬛⬛⬛⬛🔑⬜⬛
                ⬛🟦⬛🟦⬛🟦⬛🟦⬛🟦⬛
                ⬛⬛⬜⬛⬜⬛⬜⬛⬜⬛⬛
                ⬛🟦⬛🟦⬛🟦⬛🟦⬛🟦⬛
                👩⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
            `);
            return {
                level: 2,
                map: level2Data.map,
                playerPositions: level2Data.playerPositions
            };
        default:
            const defaultLevelData = convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛👨⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛⬛🟨🟨⬛⬛⬜🔑
                ⬛⬛👩⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
            `);
            return {
                level: 0,
                map: defaultLevelData.map,
                playerPositions: defaultLevelData.playerPositions
            };
    }
}
