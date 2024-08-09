import { Container, Text } from "@pixi/react"
import { TextStyle } from "@pixi/text"
import { useShallow } from "zustand/react/shallow"

import { Clock } from "@/components/dom/Clock"
import { Controls } from "@/components/dom/Controls"
import { Character } from "@/components/pixi/Character"
import { Pixi } from "@/helpers/Pixi"
import { useGameStore } from "@/store/useGameStore"

export function Play() {
  const playerIds = useGameStore(useShallow((state) => Object.keys(state.game.players)))
  const yourPlayerId = useGameStore((state) => state.yourPlayerId)

  return (
    <div>
      <Clock />
      {yourPlayerId && <Controls />}
      <Pixi.In>
        <Container scale={1} position={{ x: 0, y: 300 }}>
          {playerIds.map((playerId, index) => (
            <Character key={playerId} playerId={playerId} model={index % 2} />
          ))}
        </Container>
      </Pixi.In>
    </div>
  )
}
