import { SpeciesTemp } from './types/types';

export const availableLifeStages = ['Juvenile', 'Adult'];

export const availableSpecies: Record<string, SpeciesTemp> = {
   'tiger': {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    type: 'Carnivore',
  },
  'monkey': {
    id: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    type: 'Herbivore',
  },
  'zebra': {
    id: 'zebra',
    name: 'Zebra',
    emoji: '🦓',
    type: 'Herbivore',
  },
  'deer': {
    id: 'deer',
    name: 'Deer',
    emoji: '🦌',
    type: 'Herbivore',
  },
  'flamingo': {
    id: 'flamingo',
    name: 'Flamingo',
    emoji: '🦩',
    type: 'Carnivore',
  },
  'alligator': {
    id: 'alligator',
    name: 'Alligator',
    emoji: '🐊',
    type: 'Carnivore',
  },
  't-rex': {
    id: 't-rex',
    name: 'T-Rex',
    emoji: '🦖',
    type: 'Omnivore',
  },
};
