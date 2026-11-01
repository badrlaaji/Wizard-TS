// Les 4 maisons de Poudlard (literal types + union)
export type House = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

export type SpellCategory = "attack" | "defense" | "healing" | "charm";

export interface Spell {
  id: number;
  name: string;
  category: SpellCategory;
  power: number;
}

// Exercice 1 : un sorcier sans id (c'est le repository qui donne l'id)
export type NewWizard = Omit<Wizard, "id">;

// Union discriminée des événements de l'académie
export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };

// Exercice 3 : on garde seulement l'événement "spell-cast"
export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;
