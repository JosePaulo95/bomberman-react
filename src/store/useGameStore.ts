import { Interpolator, Player, PlayerId } from "rune-games-sdk"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import { GameState } from "@/logic"
import { PlayersInterpolators } from "@/types"

type State = {
  yourPlayerId?: PlayerId
  game: GameState
  playerDetails: Record<PlayerId, Player>
  interpolators: {
    timeLeft: Interpolator<number>
    players: PlayersInterpolators
  },
  terrainMap: number[][]
}

export const useGameStore = create<State>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subscribeWithSelector((set, get) => ({
    game: { players: {}, currentScreen: "lobby", totalLevels: 5, currentLevelIndex: 1, timeLeft: 0, gameStartedAt: 0, monsters: [], terrainMap: {map: [], level: 0, playerPositions: [], monsters: []}, bombsMap: [], explosions: [], explodedBombs_: [] },
    playerDetails: {},
    interpolators: { timeLeft: Rune.interpolator(), players: {} },
    terrainMap: []
  })),
)
