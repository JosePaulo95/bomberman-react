import { LevelTransitionPlayerIcons } from '@/components/dom/LevelTransitionPlayerIcons';
import { useGameStore } from '@/store/useGameStore';
import React from 'react';

export const LevelTransition = () => {
  const totalLevels = useGameStore((state) => state.game.totalLevels);
  const currentLevelIndex = useGameStore((state) => state.game.currentLevelIndex);

  return (
    <div style={containerStyle}>
      {Array.from({ length: totalLevels }, (_, index) => (
        <div style={rowStyle} key={index}>
          <div style={index<currentLevelIndex? circleFilledStyle:circleOutlineStyle}></div>
          {index === currentLevelIndex && <LevelTransitionPlayerIcons />}
        </div>
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw', // Garantindo que o container ocupe 100% da largura
  height: '100vh', // Mudado para 100vh para ocupar toda a altura da tela
};

const circleFilledStyle: React.CSSProperties = {
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  backgroundColor: 'white',
  marginRight: '10px', // Espaçamento entre a bolinha e o texto
};

const circleOutlineStyle: React.CSSProperties = {
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  border: '2px solid white', // Apenas borda para círculos não preenchidos
  backgroundColor: 'transparent', // Transparente para círculos não preenchidos
  marginRight: '10px', // Espaçamento entre a bolinha e o texto
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'left', // Justificando à esquerda
  alignItems: 'center',
  margin: '10px 0', // Espaçamento entre as linhas
  width: '80%', // Largura fixa para todas as linhas
};
