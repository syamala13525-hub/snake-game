import { Track } from './types';

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'SynthAI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/400/400'
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/cyber/400/400'
  },
  {
    id: '3',
    title: 'Digital Horizon',
    artist: 'BitStream',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/digital/400/400'
  }
];

export const GAME_CONFIG = {
  GRID_SIZE: 20,
  INITIAL_SPEED: 150,
  SPEED_INCREMENT: 2,
  MIN_SPEED: 50,
};
