// soundManager.js
import { Howl } from 'howler';

const sounds = {
  kill: new Howl({
    src: ['./audio/Strange.wav'],
    preload: true,
    volume: 0.5, // Ajuste o volume conforme necessário (0.0 a 1.0)
  }),
  bomb: new Howl({
    src: ['./audio/Explosion.wav'],
    preload: true,
    volume: 0.1, // Ajuste o volume conforme necessário
  }),
  key: new Howl({
    src: ['./audio/Gold1.wav'],
    preload: true,
    volume: 0.8, // Ajuste o volume conforme necessário
  }),
  nextLevel: new Howl({
    src: ['./audio/Success1.wav'],
    preload: true,
    volume: 1, // Ajuste o volume conforme necessário
  }),
  bg: new Howl({
    src: ['./audio/17 - Fight.ogg'],
    preload: true,
    volume: 0.7, // Ajuste o volume conforme necessário
  }),
  // Adicione outros sons aqui conforme necessário
};

// Variável para armazenar o último tempo de reprodução
let lastPlayed = {};
let repeatSound = null;

export const playSound = (soundName) => {
  const currentTime = Date.now();

  // Verifica se o som foi tocado recentemente
  if (sounds[soundName]) {
    if (!lastPlayed[soundName] || currentTime - lastPlayed[soundName] > 1000) {
      sounds[soundName].play();
      lastPlayed[soundName] = currentTime; // Atualiza o tempo da última reprodução
    }
  }
};

// Função para tocar som em loop
// Função para tocar som em loop e reiniciar do começo
export const playSoundOnRepeat = (soundName) => {
  stopSoundOnRepeat()
  if (sounds[soundName]) {
    // Se já houver um som tocando em loop, interrompa-o
    if (repeatSound) {
      sounds[repeatSound].stop();
    }

    // Toca o novo som em loop e reinicia
    sounds[soundName].loop(true);
    sounds[soundName].play();
    repeatSound = soundName; // Armazena o som atual em loop
  }
};

// Função para parar o som em loop
export const stopSoundOnRepeat = () => {
  if (repeatSound) {
    sounds[repeatSound].stop();
    repeatSound = null; // Reseta a variável
  }
};