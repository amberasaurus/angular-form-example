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
