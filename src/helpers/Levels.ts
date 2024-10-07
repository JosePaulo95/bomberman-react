import { Level, Monster, Vector } from "@/types";

function coverMatrix(matrix:number[][]) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Cria a borda de -1 com 2 linhas extras
    const rowPadding = new Array(numCols + 4).fill(1); // 1 padding para cada lado
    const coveredMatrix = [];

    // Adiciona duas linhas de padding no topo
    coveredMatrix.push(rowPadding);
    coveredMatrix.push(rowPadding);

    // Adiciona as linhas da matriz original com padding de 1 nas laterais
    for (let i = 0; i < numRows; i++) {
        coveredMatrix.push([1, 1, ...matrix[i], 1, 1]);
    }

    // Adiciona duas linhas de padding no final
    coveredMatrix.push(rowPadding);
    coveredMatrix.push(rowPadding);

    return coveredMatrix;
}

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
        '🟨': 5,  // Porta
    };

    const playerPositions: Vector[] = [];
    const monsters: Monster[] = []; // Array para monstros
    const lines = map.trim().split('\n');

    const result = lines.map((line, rowIndex) => 
        Array.from(line.trim()).map((char, colIndex) => {
            if (char === '👨' || char === '👩') {
                playerPositions.push({ x: colIndex+2, y: rowIndex+2 });
                return 0; // O jogador não altera o terreno
            } else if (char === '👹') { // Adiciona monstro
                monsters.push({ type: 1, lastMoveTime:0, moveInterval: 1000, pos: { x: colIndex+2, y: rowIndex+2 }, direction: { x: 0, y: 0 }});
                return 0; // O monstro também não altera o terreno
            }
            return emojiMap[char] || 0;
        })
    );

    return {
        map: coverMatrix(makeSquareMatrix(result)),
        playerPositions,
        monsters // Retorna o array de monstros
    };
}

export const createTerrainMap = (level: number): Level => {
    switch (level) {
        case 1:
            const level1Data = convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
                ⬛⬛👹👹👹⬛⬛⬛⬛⬛⬛
                ⬛🟦👨🟦⬛⬛⬛⬛⬛🟦⬜
                ⬛⬛⬛⬛⬛🟨🟨⬛⬛⬜🔑
                ⬛🟦👩🟦⬛⬛⬛⬛⬛🟦⬜
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
            `);
            return {
                level: 1,
                map: level1Data.map,
                playerPositions: level1Data.playerPositions,
                monsters: level1Data.monsters
            };
            case 2:
                const level2Data = convertStringMapToArray2D(`
                ⬛⬛👹⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛🟦⬛⬛⬛
                ⬛🟦👨🟦⬛🟦⬛⬛⬛🟦⬛⬛⬛
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛🟦👩🟦⬛🟦🟦🟦⬜🟦🟦🟦🟦
                ⬛⬛⬛🟦⬛⬛⬛🟦⬛⬛⬛👹⬛
                ⬛🟦🟦🟦⬛⬛⬛🟦⬛🟦👹🔑⬛
                ⬛⬛⬛🟦⬛⬛⬛🟦⬛⬛⬛⬛⬛
                ⬛🟦⬛🟦⬛🟦🟦🟦⬜🟦🟦🟦🟦
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                ⬛⬛⬛⬛⬛🟦⬛⬛⬛🟦🟦🟦⬛
                ⬛🟦🟨🟨🟦⬛⬛⬛⬛⬛⬛⬛⬛
                `);
                return {
                    level: 2,
                    map: level2Data.map,
                    playerPositions: level2Data.playerPositions,
                    monsters: level2Data.monsters
                };
            case 3:
                const level3Data = convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
                ⬛⬛⬛⬛⬛⬛⬛🟦⬛🟦🟨🟨⬛⬛⬛
                ⬛🟦👨🟦🟦🟦⬛🟦⬛🟦🟦🟦🟦🟦⬛
                ⬛🟦⬛⬛⬛⬜⬛⬛⬛👹⬛⬛⬛⬛⬛
                ⬛🟦⬛🟦⬛🟦⬛🟦⬜🟦🟦⬛⬛🟦🟦
                ⬛⬛⬛🟦⬛⬛⬛🟦⬛⬛⬛🟦⬛⬛⬛
                ⬛🟦🟦🟦⬛🟦⬛🟦⬛🟦👹⬛🟦⬛⬛
                ⬛🟦⬛⬛⬛🟦⬛🟦⬛🟦⬛⬛⬛⬛🟦
                ⬜🟦👩🟦🟦🟦🟦🟦⬜🟦🟦🟦🟦⬛⬛
                ⬛⬛⬛⬛⬛⬛⬛🟦⬛⬛🟦⬛⬜⬛👹
                ⬛🟦🟦🟦⬛🟦⬛🟦⬛🟦⬛🟦⬛🟦🟦
                ⬛⬛⬛⬛⬛🟦⬛⬛⬛🟦⬛🟦⬛⬛⬛
                👹⬛⬛⬛👹🟦⬛🟦⬛🟦⬛🟦🟦🟦🟦
                ⬛🟦⬛⬛🟦⬛⬛🟦⬛👹⬛⬛⬛⬛🔑
                `);
                return {
                    level: 3,
                    map: level3Data.map,
                    playerPositions: level3Data.playerPositions,
                    monsters: level3Data.monsters
                };
            case 4:
                const level4Data = convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
                ⬛⬛⬛⬛⬛⬛🟦⬛⬛🟦👹👹👹🟦🟦
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛🟦👹🟦👹🟦🟦
                ⬛🟦⬛⬛⬛⬛⬛⬛⬛🟦👹👹👹🟦🟦
                ⬛🟦👨⬛⬛⬛⬛⬛⬛🟦⬜🟦🟦🟦🟦
                ⬛⬛⬛🟨🟨🟦⬛🟦⬛⬛⬛⬜⬛⬛🔑
                ⬛🟦👩⬛⬛⬛⬛⬛⬛🟦⬜🟦🟦🟦🟦
                ⬛🟦⬛⬛⬛⬛⬛⬛⬛🟦👹👹👹🟦🟦
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛🟦👹🟦👹🟦🟦
                ⬛⬛⬛⬛⬛⬛🟦⬛⬛🟦👹👹👹🟦🟦
                🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
                `);
                return {
                    level: 4,
                    map: level4Data.map,
                    playerPositions: level4Data.playerPositions,
                    monsters: level4Data.monsters
                };
            case 5:
                const level5Data = convertStringMapToArray2D(`
                ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
                ⬛👹⬛⬛⬜⬜⬜⬛⬛⬛⬛⬛👹
                ⬛🟦⬛🟦⬛🟦⬛🟦⬜🟦⬜🟦⬛
                ⬛⬜⬜👹🟨🟨🟦⬛👹⬛👹⬛⬛
                ⬛🟦⬛🟦⬛🟦⬛🟦⬛🟦🔑🟦⬛
                ⬛⬛⬜🟦⬜⬛⬜⬛⬜⬛🟦🟦🟦
                ⬛🟦⬜🟦⬛🟦⬜🟦⬜🟦⬜🟦⬛
                ⬜⬜⬛⬜⬛⬛⬜⬛👹⬛⬜⬛⬜
                ⬛🟦⬜🟦⬛🟦⬜🟦⬛🟦⬜🟦⬛
                👩⬛⬛⬜👹⬛⬜🟦⬜⬛⬜⬛👨
                `);
                return {
                    level: 5,
                    map: level5Data.map,
                    playerPositions: level5Data.playerPositions,
                    monsters: level5Data.monsters
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
                playerPositions: defaultLevelData.playerPositions,
                monsters: defaultLevelData.monsters
            };
    }
}
