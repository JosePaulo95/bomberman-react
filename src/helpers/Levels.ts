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
    const emojiMap: { [key: string]: number } = {
        '⬛': 0,  // Caixa cinza
        '🟦': 1,  // parede
        '⬜': 2,  // bloco quebravel
        '🔑': 4,  // Chave
        '🟨': 5,  // Porta
    };

    // Remove espaços extras e divide a string em linhas
    const lines = map.trim().split('\n');

    // Mapeia cada linha para um array de números
    const result = lines.map(line => 
        Array.from(line.trim()).map(char => emojiMap[char] || 0)
    );
    debugger;
    return makeSquareMatrix(result);
}

export const createTerrainMap = (level: number): Level => {
    switch (level) {
        case 1:
            // Terreno misturado
            return {
                map: convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛👨⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛⬛🟨🟨⬛⬛⬜🔑
                ⬛⬛👩⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                `)
            }
        case 2:
            // Terreno misturado
            return {
                map: convertStringMapToArray2D(`
                👨⬛⬛⬜⬜⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛🟦⬜🟦⬛🟦⬛🟦⬛
                ⬛⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛🟦⬜🟦⬜🟦⬛🟦⬛
                🟨🟨⬛⬛⬜⬛⬛⬛⬛⬜⬛
                ⬛🟦⬛🟦⬜🟦⬛🟦⬛🟦⬛
                ⬛⬛⬜⬛⬛⬛⬜⬛⬛⬛⬛
                ⬛🟦⬛🟦⬜🟦⬛🟦🔑🟦⬛
                👩⬛⬛⬜⬜⬛⬛⬛⬛⬛⬛
                `)
            }
        default:
            // Terreno padrão, todo 0
            return {
                map: convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛👨⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛⬛🟨🟨⬛⬛⬜🔑
                ⬛⬛👩⬛⬛⬛⬛⬛⬛🟦⬜
                ⬛🟦⬛⬛🟦⬛⬛⬛⬛⬛⬛
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                `)
            }
    }
}
