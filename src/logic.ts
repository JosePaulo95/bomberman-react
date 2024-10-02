import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"

import { ROUND_DURATION } from "./constants"
import { GameScreen, Player } from "./types"

export type GameState = {
  players: Record<PlayerId, Player>
  currentScreen: GameScreen
  timeLeft: number
  gameStartedAt: number
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
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      players: allPlayerIds.reduce(
        (acc, id, i) => ({
          ...acc,
          [id]: {
            position: { x: 1, y: 3 },
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
      game.players[playerId].position.x -= 1;
    },
    moveRight: (_, { game, playerId }) => {
      game.players[playerId].position.x += 1; // Move para a direita
    },
    moveUp: (_, { game, playerId }) => {
      game.players[playerId].position.y -= 1; // Move para cima
    },
    moveDown: (_, { game, playerId }) => {
      game.players[playerId].position.y += 1; // Move para baixo
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
