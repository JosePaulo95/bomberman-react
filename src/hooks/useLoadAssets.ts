import { Assets } from "@pixi/assets"
import { SCALE_MODES } from "@pixi/constants"
import { useEffect, useState } from "react"

export const useLoadAssets = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    load().then(() => setAssetsLoaded(true))
  }, [])

  return assetsLoaded
}

function load() {
  Assets.add([
    {
      alias: "character_0_a",
      src: "./tile_0004.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "character_0_b",
      src: "./tile_0005.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "character_1_a",
      src: "./tile_0006.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "character_1_b",
      src: "./tile_0007.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "ground_0",
      // src: "./ground_06.png",
      src: "./(16)ground_1.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "block_0",
      // src: "./block_08.png",
      src: "./(16)block_0.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "crate_0",
      // src: "./crate_02.png",
      src: "./(16)crate_0.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "player_0",
      // src: "./player_01.png",
      src: "./(16)player_0.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "input_0",
      // src: "./environment_03.png",
      src: "./explosion_1.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "bomb_0_a",
      src: "./tnt_0_a.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "bomb_0_b",
      src: "./tnt_0_b.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "explosion_0",
      src: "./explosion_0.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "key",
      src: "./GoldKey.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "closed_gate",
      src: "./closed_gate.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "opened_gate",
      src: "./down_stairs.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "fullheart",
      src: "./fullheart.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "emptyheart",
      src: "./emptyheart.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_down_0",
      src: "./monster_0/down/tile000.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_down_1",
      src: "./monster_0/down/tile001.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_down_2",
      src: "./monster_0/down/tile002.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_down_3",
      src: "./monster_0/down/tile003.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_left_0",
      src: "./monster_0/left/tile000.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_left_1",
      src: "./monster_0/left/tile001.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_left_2",
      src: "./monster_0/left/tile002.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_left_3",
      src: "./monster_0/left/tile003.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_up_0",
      src: "./monster_0/up/tile000.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_up_1",
      src: "./monster_0/up/tile001.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_up_2",
      src: "./monster_0/up/tile002.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_up_3",
      src: "./monster_0/up/tile003.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_right_0",
      src: "./monster_0/right/tile000.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_right_1",
      src: "./monster_0/right/tile001.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_right_2",
      src: "./monster_0/right/tile002.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
    {
      alias: "monster_0_right_3",
      src: "./monster_0/right/tile003.png",
      data: { scaleMode: SCALE_MODES.NEAREST },
    },
  ])

  return Assets.load(["character_0_a", "character_0_b", "character_1_a", "character_1_b", "ground_0", "block_0", "crate_0", "player_0", "bomb_0_a", "bomb_0_b", "explosion_0","input_0", "key","closed_gate","opened_gate", "fullheart", "emptyheart",
  "monster_0_down_0",
  "monster_0_down_1",
  "monster_0_down_2",
  "monster_0_down_3",
  "monster_0_left_0",
  "monster_0_left_1",
  "monster_0_left_2",
  "monster_0_left_3",
  "monster_0_up_0",
  "monster_0_up_1",
  "monster_0_up_2",
  "monster_0_up_3",
  "monster_0_right_0",
  "monster_0_right_1",
  "monster_0_right_2",
  "monster_0_right_3",
  ])
}
