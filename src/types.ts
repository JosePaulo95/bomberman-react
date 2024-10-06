import { AnimatedSprite, PixiRef, Sprite } from "@pixi/react"
import { Interpolator, PlayerId } from "rune-games-sdk"

export type ISprite = PixiRef<typeof Sprite>
export type IAnimatedSprite = PixiRef<typeof AnimatedSprite>

export type Vector = {
  x: number
  y: number
}

export type Player = {
  position: Vector
  remainingLife: number
  maxLifes: number
  initialPos: Vector
  facing: "left" | "right"
  state: "standing" | "walking"
  ready: boolean
}

export type PlayersInterpolators = {
  [playerId: PlayerId]: { position: { x: Interpolator<number> } }
}

export type GameScreen = "lobby" | "play" | "levelTransition" | "gameOver"

export enum CharacterModel {
  PinkGuy,
  YellowGuy,
}

export type Bomb = {
  id: number;
  pos: Vector;
  placedAt: number;   // Timestamp da colocação da bomba
  timeToExplode: number; // Tempo até explodir
  range: number;      // Alcance da explosão
};

export type Explosion = {
  pos: Vector;
  createdAt: number;  // Timestamp da criação da explosão
  duration: number;   // Quanto tempo a explosão dura
};

export type Level = {
  map: number[][];
  level: number;
  playerPositions: Vector[];
  monsters: Monster[];
}

export type Monster = {
  type: number;
  pos: Vector;
}