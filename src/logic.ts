import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"

import { ROUND_DURATION } from "./constants"
import { initBombsMap } from "./helpers/Bombs"
import { GameScreen, Player } from "./types"

export type GameState = {
  players: Record<PlayerId, Player>
  currentScreen: GameScreen
  timeLeft: number
  gameStartedAt: number
  terrainMap: number[][]
  bombsMap: number[][]
}

type GameActions = {
  ready: () => void
  moveLeft: () => void
  moveRight: () => void
  moveUp: () => void
  moveDown: () => void
  stop: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 1,
  setup: (allPlayerIds): GameState => {
    return {
      players: allPlayerIds.reduce(
        (acc, id, i) => ({
          ...acc,
          [id]: {
            position: { x: 0, y: 0 },
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
      terrainMap: [
        [0, 2, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 2, 2, 0, 0],
        [0, 1, 0, 1, 2],
        [0, 0, 0, 2, 0],
      ],
      bombsMap: initBombsMap(5,5)
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
      if (game.terrainMap[player.position.y]?.[newX] === 0) {
        player.position.x = newX;
      }
    },
    moveRight: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newX = player.position.x + 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (game.terrainMap[player.position.y]?.[newX] === 0) {
        player.position.x = newX;
      }
    },
    moveUp: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newY = player.position.y - 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (game.terrainMap[newY]?.[player.position.x] === 0) {
        player.position.y = newY;
      }
    },
    moveDown: (_, { game, playerId }) => {
      const player = game.players[playerId];
      const newY = player.position.y + 1;
      
      // Verificar se o novo local no terreno é 0 (pisável)
      if (game.terrainMap[newY]?.[player.position.x] === 0) {
        player.position.y = newY;
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
      game.timeLeft = ROUND_DURATION - (Rune.gameTime() - game.gameStartedAt)
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
