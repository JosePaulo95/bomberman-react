import { Level } from "@/types";

function makeSquareMatrix(matrix: number[][]): number[][] {
    const numRows = matrix.length;
    const numCols = Math.max(...matrix.map(row => row.length)); // Encontra o número máximo de colunas

    // Se o número de linhas e colunas for o mesmo, já é quadrada
    if (numRows === numCols) {
        return matrix;
    }

    // Para cada linha que estiver menor, adiciona 0s no final para completar
    const squareMatrix = matrix.map(row => {
        const newRow = [...row];
        while (newRow.length < numCols) {
            newRow.push(0); // Adiciona 0 até completar o número máximo de colunas
        }
        return newRow;
    });

    // Adiciona linhas cheias de 0 até ficar quadrada
    while (squareMatrix.length < numCols) {
        squareMatrix.push(new Array(numCols).fill(0)); // Adiciona uma linha de 0s
    }

    return squareMatrix;
}

function convertStringMapToArray2D(map: string): number[][] {
    // Remove espaços extras no começo e final, e divide a string em linhas
    const lines = map.trim().split('\n');

    // Mapeia cada linha para um array de números
    const result = lines.map(line =>
        line.trim().split('').map(char => {
            if (char === '_') return 0; // Se for '__', substitui por 0
            if (char === 'b') return 1; // Se for 'b', substitui por 1
            if (char === 'c') return 2; // Se for 'b', substitui por 1
            // Qualquer outro caractere substitui por 0
            return 0;
        })
    );

    return makeSquareMatrix(result);
}

export const createTerrainMap = (level: number): Level => {
    switch (level) {
        case 1:
            // Terreno misturado
            return {
                map: convertStringMapToArray2D(`
                    ___________
                    _b__b______
                    __1______bc
                    _b___ss__ck
                    __2______bc
                    _b__b______
                    ___________
                `)
            }
        default:
            // Terreno padrão, todo 0
            return {
                map: [
                    [0, 2, 1, 0, 0, 1, 2, 0],
                    [0, 1, 0, 1, 2, 0, 1, 0],
                    [0, 2, 2, 0, 1, 0, 0, 2],
                    [0, 1, 0, 0, 0, 2, 0, 1],
                    [0, 0, 0, 0, 0, 0, 2, 0],
                    [1, 0, 2, 0, 1, 0, 1, 2],
                    [0, 2, 1, 0, 0, 1, 2, 0],
                    [0, 1, 0, 1, 2, 0, 1, 0]
                ]
            }
    }
}
