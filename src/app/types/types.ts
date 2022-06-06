export interface ZoneTemp {
  name: string;
  maxCapacity: number;
  animals: AnimalTemp[];
}

export interface AnimalTemp {
  name: string;
  species: string;
  lifeStage: string;
}

export interface EnvironmentTemp {
  name: string;
  type: string;
  zones: ZoneTemp[];
}

export interface SpeciesTemp {
  id: string;
  name: string;
  emoji: string;
  type: string;
}
