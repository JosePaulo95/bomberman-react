import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"

import { ROUND_DURATION } from "./constants"
import { createExplosions } from "./helpers/Bombs"
import { isWalkableTile } from "./helpers/Gate"
import { createTerrainMap } from "./helpers/Levels"
import { applyMonsterStrategy } from "./helpers/Monster"
import { Bomb, Explosion, GameScreen, Level, Monster, Player, Vector } from "./types"

export type GameState = {
  players: Record<PlayerId, Player>
  monsters: Monster[]
  currentScreen: GameScreen
  timeLeft: number
  gameStartedAt: number
  terrainMap: Level
  bombsMap: Bomb[]
  explosions: Explosion[]
  totalLevels: number
  currentLevelIndex: number
}

type GameActions = {
  ready: () => void
  moveLeft: () => void
  moveRight: () => void
  moveUp: () => void
  moveDown: () => void
  placeBomb: () => void
  destroyCrateAt: (pos: Vector) => void
  killPlayer: (pos: Vector) => void
  moveMonster: ({index, direction}: {index: number, direction: Vector}) => void
  stop: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

let explodedBombs_ = new Set(); // Usando um Set para garantir que não haja duplicatas

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 1,
  setup: (allPlayerIds): GameState => {
    return {
      players: allPlayerIds.reduce(
        (acc, id, i) => ({
          ...acc,
          [id]: {
            position: { x: 1, y: 1 },
            remainingLife: 3,
            maxLifes: 3,
            initialPos: { x: 1, y: 1 },
            facing: "left",
            state: "standing",
            ready: false,
          },
        }),
        {} as Record<PlayerId, Player>,
      ),
      currentScreen: "lobby",
      totalLevels: 5,
      currentLevelIndex: 0,
      timeLeft: ROUND_DURATION,
      gameStartedAt: Infinity,
      terrainMap: createTerrainMap(1),
      monsters: [],
      bombsMap: [],
      explosions: [],
    }
  },
  actions: {
    ready: (_, { game, playerId }) => {
      game.players[playerId].ready = true

      if (Object.values(game.players).every((player) => player.ready)) {
        startGame(game)
      }
    },

    moveLeft: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newX = player.position.x - 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (isWalkableTile(game.terrainMap.map[player.position.y]?.[newX])) {
        player.position.x = newX;
      }
      if(game.terrainMap.map[player.position.y]?.[newX] == 4){
        game.terrainMap.map[player.position.y][newX] = 0;
        for (let i = 0; i < game.terrainMap.map.length; i++) {
          for (let j = 0; j < game.terrainMap.map[0].length; j++) {
            if(game.terrainMap.map[i][j] == 5){
              game.terrainMap.map[i][j] = 6
            }
            
          }
        }
      }

      if(Object.keys(game.players).every(id => 
        game.terrainMap.map[game.players[id].position.y][game.players[id].position.x] == 6
      )){
        const level = createTerrainMap(game.currentLevelIndex+1)
        Object.keys(game.players).forEach((player, index) => {
          game.players[player].position = level.playerPositions[index]
          game.players[player].initialPos = level.playerPositions[index]
        })
        game.terrainMap = level
        game.currentLevelIndex++
      }
    },
    moveRight: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newX = player.position.x + 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (isWalkableTile(game.terrainMap.map[player.position.y]?.[newX])) {
        player.position.x = newX;
      }
      if(game.terrainMap.map[player.position.y]?.[newX] == 4){
        game.terrainMap.map[player.position.y][newX] = 0
        for (let i = 0; i < game.terrainMap.map.length; i++) {
          for (let j = 0; j < game.terrainMap.map[0].length; j++) {
            if(game.terrainMap.map[i][j] == 5){
              game.terrainMap.map[i][j] = 6
            }
          }
        }
      }
      if(Object.keys(game.players).every(id => 
        game.terrainMap.map[game.players[id].position.y][game.players[id].position.x] == 6
      )){
        const level = createTerrainMap(game.currentLevelIndex+1)
        Object.keys(game.players).forEach((player, index) => {
          game.players[player].position = level.playerPositions[index]
          game.players[player].initialPos = level.playerPositions[index]
        })
        game.monsters = level.monsters
        game.terrainMap = level
        game.currentLevelIndex++
      }
    },
    moveUp: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newY = player.position.y - 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (isWalkableTile(game.terrainMap.map[newY]?.[player.position.x])) {
        player.position.y = newY;
      }
      if(game.terrainMap.map[newY]?.[player.position.x] == 4){
        game.terrainMap.map[newY][player.position.x] = 0
        for (let i = 0; i < game.terrainMap.map.length; i++) {
          for (let j = 0; j < game.terrainMap.map[0].length; j++) {
            if(game.terrainMap.map[i][j] == 5){
              game.terrainMap.map[i][j] = 6
            }
          }
        }
      }
      if(Object.keys(game.players).every(id => 
        game.terrainMap.map[game.players[id].position.y][game.players[id].position.x] == 6
      )){
        const level = createTerrainMap(game.currentLevelIndex+1)
        Object.keys(game.players).forEach((player, index) => {
          game.players[player].position = level.playerPositions[index]
          game.players[player].initialPos = level.playerPositions[index]
        })
        game.terrainMap = level
        game.currentLevelIndex++
      }
    },
    moveDown: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newY = player.position.y + 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (isWalkableTile(game.terrainMap.map[newY]?.[player.position.x])) {
        player.position.y = newY;
      }
      if(game.terrainMap.map[newY]?.[player.position.x] == 4){
        game.terrainMap.map[newY][player.position.x] = 0;
        for (let i = 0; i < game.terrainMap.map.length; i++) {
          for (let j = 0; j < game.terrainMap.map[0].length; j++) {
            if(game.terrainMap.map[i][j] == 5){
              game.terrainMap.map[i][j] = 6
            }
          }
        }
      }
      if(Object.keys(game.players).every(id => 
        game.terrainMap.map[game.players[id].position.y][game.players[id].position.x] == 6
      )){
        const level = createTerrainMap(game.currentLevelIndex+1)
        Object.keys(game.players).forEach((player, index) => {
          game.players[player].position = level.playerPositions[index]
          game.players[player].initialPos = level.playerPositions[index]
        })
        game.terrainMap = level
        game.currentLevelIndex++
      }
    },
    placeBomb: (_, { game, playerId }) => {
      const playerPos = game.players[playerId].position;
      
      game.bombsMap.push({
        id: Rune.gameTimeInSeconds(),
        timeToExplode: 2000,
        placedAt: Rune.gameTime(),
        pos: {
          x: playerPos.x,
          y: playerPos.y,
        },
        range: 2
      })
    },
    destroyCrateAt: (pos: Vector, { game, playerId }) => {
      // if(game.terrainMap.map[pos.y][pos.x] == 2){
        game.terrainMap.map[pos.y][pos.x] = 0
        // game.terrainMap[pos.y][pos.x] = 3
      // }
    },
    killPlayer: (pos: Vector, { game, playerId }) => {
      Object.keys(game.players).forEach(id => {
        const player = game.players[id];
    
        // Verifica se o jogador está na posição da explosão
        if (player.position.x === pos.x && player.position.y === pos.y) {
          
          // Se a vida restante for 1 ou menos, encerra o jogo
          if (player.remainingLife <= 1) {
            Rune.gameOver();
          } else {
            // Caso contrário, reposiciona o jogador e reduz a vida
            player.position = player.initialPos;
            player.remainingLife--;
          }
        }
      });
    },
    moveMonster: ({index, direction}, { game, playerId }) => {
        // Pega o monstro pelo índice
        const monster = game.monsters[index];
    
        // Atualiza a posição do monstro com base na direção fornecida
        const newPosition = {
            x: monster.pos.x + direction.x,
            y: monster.pos.y + direction.y
        };

        game.monsters[index].pos.x = newPosition.x;
        game.monsters[index].pos.y = newPosition.y;
    },  
    stop: (_, { game, playerId }) => {
      game.players[playerId].state = "standing"
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.players[playerId] = {
        position: { x: 0, y: 0 },
        maxLifes: 3,
        remainingLife: 3,
        initialPos: { x: 0, y: 0 },
        facing: "left",
        state: "standing",
        ready: false,
      }
    },
    playerLeft: (playerId, { game }) => {
      delete game.players[playerId]

      // if we're in the lobby they were the last one to not be ready, start the game
      if (game.currentScreen === "lobby" && Object.values(game.players).every((player) => player.ready)) {
        game.terrainMap = createTerrainMap(game.currentLevelIndex+1)
        game.currentLevelIndex++
      }
    },
  },
  update: ({ game }) => {
    if (game.currentScreen === "play") {
      const currentTime = Rune.gameTime(); // Usa o tempo do jogo
      const explosions = game.explosions

      //apply monster strategy
      for (let i = 0; i < game.monsters.length; i++) {
        const monster = game.monsters[i];

        if (currentTime > monster.lastMoveTime + monster.moveInterval) {
          // Aplique a estratégia do monstro e mova-o
          const direction = applyMonsterStrategy(monster, game);
  
          // Movimentar o monstro
          game.monsters[i].pos.x += direction.x;
          game.monsters[i].pos.y += direction.y;
  
          // Atualize o último tempo de movimento
          game.monsters[i].lastMoveTime = currentTime;
        }
      }

      // ações das explosoes
      for (let i = 0; i < explosions.length; i++) {
        // Rune.actions.destroyCrateAt({x: explosions[i].pos.x, y: explosions[i].pos.y})
        if(game.terrainMap.map[explosions[i].pos.y][explosions[i].pos.x] == 2){
          Rune.actions.destroyCrateAt({x: explosions[i].pos.x, y: explosions[i].pos.y})
          // game.terrainMap.map[explosions[i].pos.y][explosions[i].pos.x] = 0
        }
        Rune.actions.killPlayer({x: explosions[i].pos.x, y: explosions[i].pos.y})
      }

      //descobre as bombas q permanecem no mapa
      const remain = game.bombsMap.filter(bomb => {
        const timeElapsed = currentTime - bomb.placedAt;
        return timeElapsed < bomb.timeToExplode; // Mantém só as bombas que ainda não explodiram
      });

      //descobre as bombas q tao expiraram
      const exploding = game.bombsMap.filter(bomb => {
        const timeElapsed = currentTime - bomb.placedAt;
        // return timeElapsed >= bomb.timeToExplode; // Mantém só as bombas que ainda não explodiram
        return timeElapsed >= bomb.timeToExplode && !explodedBombs_.has(`${bomb.pos.x}-${bomb.pos.y}-${bomb.placedAt}`); // Verifica se já explodiu

      });

      // deixa só as q nao explodiram
      game.bombsMap = remain

      // insere explosoes nas bombas q expiraram
      exploding.forEach(b => {
        game.explosions = explosions.concat(createExplosions(b, game))
        explodedBombs_.add(`${b.pos.x}-${b.pos.y}-${b.placedAt}`); // Adiciona ao Set
      })
      
      //remove explosoes q expiraram
      game.explosions = game.explosions.filter(explosion => {
        const timeElapsed = currentTime - explosion.createdAt;
        return timeElapsed < explosion.duration; // Mantém só as bombas que ainda não explodiram
      });

      // game.timeLeft = ROUND_DURATION - (Rune.gameTime() - game.gameStartedAt)
      if (1>2 && game.timeLeft <= 0) {
        game.currentScreen = "gameOver"
        Rune.gameOver({
          players: Object.keys(game.players).reduce(
            (acc, playerId) => {
              acc[playerId] = "WON"
              return acc
            },
            {} as Record<PlayerId, "WON" | "LOST">,
          ),
          delayPopUp: true,
        })
      }
    }
  },
  updatesPerSecond: 10,
})

function startGame(game: GameState) {
  // game.currentScreen = "play"
  game.gameStartedAt = Rune.gameTime()
  const level = createTerrainMap(1)
  Object.keys(game.players).forEach((player, index) => {
    game.players[player].position = level.playerPositions[index]
  })
  game.monsters = level.monsters
  game.terrainMap = level
  game.currentScreen = "play"
  
}
