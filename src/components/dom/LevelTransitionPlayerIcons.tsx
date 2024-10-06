import { useGameStore } from "@/store/useGameStore";
import { useShallow } from "zustand/react/shallow";

export function LevelTransitionPlayerIcons() {
    const playerIds = useGameStore(useShallow((state) => Object.keys(state.game.players)));

    return (
        <div style={containerStyle}>
            <img 
                src="/player_2_icon.png" // Altere para o caminho correto da sua imagem
                alt="Ícone do Jogador 2"
                style={iconStyle} // Estilo opcional
            />
            {
                (playerIds.length>1) &&
                    <img 
                        src="/player_2_icon.png" // Altere para o caminho correto da sua imagem
                        alt="Ícone do Jogador 2"
                        style={iconStyle} // Estilo opcional
                    />
            }
        </div>
    );
}

// Estilos (opcionais)
const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};

const iconStyle: React.CSSProperties = {
    marginTop: '10px',
    width: '50px', // Defina o tamanho desejado para a imagem
    height: '50px',
    imageRendering: 'pixelated',
};
