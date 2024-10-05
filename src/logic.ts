import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"

import { ROUND_DURATION } from "./constants"
import { createExplosions } from "./helpers/Bombs"
import { isWalkableTile } from "./helpers/Gate"
import { createTerrainMap } from "./helpers/Levels"
import { Bomb, Explosion, GameScreen, Level, Player, Vector } from "./types"

export type GameState = {
  players: Record<PlayerId, Player>
  currentScreen: GameScreen
  timeLeft: number
  gameStartedAt: number
  terrainMap: Level
  bombsMap: Bomb[]
  explosions: Explosion[]
}

type GameActions = {
  ready: () => void
  moveLeft: () => void
  moveRight: () => void
  moveUp: () => void
  moveDown: () => void
  placeBomb: () => void
  destroyCrateAt: (pos: Vector) => void
  stop: () => void
  checkKeyCollection: (coord: Vector) => void
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
            direction: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            facing: "left",
            state: "standing",
            ready: false,
          },
        }),
        {} as Record<PlayerId, Player>,
      ),
      currentScreen: "lobby",
      timeLeft: ROUND_DURATION,
      gameStartedAt: Infinity,
      terrainMap: createTerrainMap(1),
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
        debugger;
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
        debugger;
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
        debugger;
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
        debugger;
      }
    },
    checkKeyCollection: (coord: Vector, { game, playerId }) => {
      const tile = game.terrainMap.map[coord.y]?.[coord.x];
    
      if (tile === 4) {
        game.terrainMap.map[coord.y][coord.x] = 0; // Remove a chave
        // Atualiza todas as ocorrências do tile 5 para 6
        for (let i = 0; i < game.terrainMap.map.length; i++) {
          for (let j = 0; j < game.terrainMap.map[0].length; j++) {
            if (game.terrainMap.map[i][j] === 5) {
              game.terrainMap.map[i][j] = 6;
            }
          }
        }
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
      if(game.terrainMap.map[pos.y][pos.x] == 2){
        game.terrainMap.map[pos.y][pos.x] = 0
        // game.terrainMap[pos.y][pos.x] = 3
      }
    },
    stop: (_, { game, playerId }) => {
      game.players[playerId].state = "standing"
      game.players[playerId].direction.x = 0
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.players[playerId] = {
        position: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        facing: "left",
        state: "standing",
        ready: false,
      }
    },
    playerLeft: (playerId, { game }) => {
      delete game.players[playerId]

      // if we're in the lobby they were the last one to not be ready, start the game
      if (game.currentScreen === "lobby" && Object.values(game.players).every((player) => player.ready)) {
        startGame(game)
      }
    },
  },
  update: ({ game }) => {
    if (game.currentScreen === "play") {
      const currentTime = Rune.gameTime(); // Usa o tempo do jogo
      const explosions = game.explosions

      // destrutiveis que colidem com explosao sao apagados
      for (let i = 0; i < explosions.length; i++) {
        Rune.actions.destroyCrateAt({x: explosions[i].pos.x, y: explosions[i].pos.y})
      }

      const remain = game.bombsMap.filter(bomb => {
        const timeElapsed = currentTime - bomb.placedAt;
        return timeElapsed < bomb.timeToExplode; // Mantém só as bombas que ainda não explodiram
      });
      const exploding = game.bombsMap.filter(bomb => {
        const timeElapsed = currentTime - bomb.placedAt;
        // return timeElapsed >= bomb.timeToExplode; // Mantém só as bombas que ainda não explodiram
        return timeElapsed >= bomb.timeToExplode && !explodedBombs_.has(`${bomb.pos.x}-${bomb.pos.y}-${bomb.placedAt}`); // Verifica se já explodiu

      });

      // remove bombas q expiraram
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
  game.currentScreen = "play"
  game.gameStartedAt = Rune.gameTime()
}
