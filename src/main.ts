import { WizardRepository, SpellRepository } from "./repository";
import { Cache } from "./decorators";
import type { House, Wizard, SpellCastEvent } from "./types";

// ===================================================
// Exercice 1 — Ajouter un nouveau sorcier
// ===================================================
console.log("===== Exercice 1 =====");

const wizards = new WizardRepository();

// on ne donne pas d'id, c'est le repository qui le met
const harry = wizards.register({ name: "Harry Potter", house: "Gryffindor", level: 5, active: true });
const hermione = wizards.register({ name: "Hermione Granger", house: "Gryffindor", level: 7, active: true });
const draco = wizards.register({ name: "Draco Malfoy", house: "Slytherin", level: 5, active: true });
const luna = wizards.register({ name: "Luna Lovegood", house: "Ravenclaw", level: 4, active: true });

console.log(harry);
console.log(hermione);
console.log(draco);
console.log(luna);
console.log("Nombre de sorciers :", wizards.getAll().length);

// wizards.register({ id: 10, name: "Ron", house: "Gryffindor", level: 3, active: true });
// -> Erreur : 'id' n'existe pas dans le type NewWizard

// ===================================================
// Exercice 2 — Filtrer les sorciers par maison
// ===================================================
console.log("\n===== Exercice 2 =====");

const gryffindors = wizards.findByHouse("Gryffindor");
console.log("Gryffindor :", gryffindors.map((w) => w.name));

const slytherins = wizards.findByHouse("Slytherin");
console.log("Slytherin :", slytherins.map((w) => w.name));

const hufflepuffs = wizards.findByHouse("Hufflepuff");
console.log("Hufflepuff :", hufflepuffs.map((w) => w.name)); // tableau vide

// wizards.findByHouse("Durmstrang");
// -> Erreur : '"Durmstrang"' n'est pas assignable au type 'House'

// ===================================================
// Exercice 3 — Extract pour les événements "spell-cast"
// ===================================================
console.log("\n===== Exercice 3 =====");

function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}

handleSpellCast({
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus",
});

// handleSpellCast({ type: "level-up", wizardId: 1, newLevel: 6 });
// -> Erreur : le type "level-up" n'est pas accepté par SpellCastEvent

// ===================================================
// Exercice 4 — Décorateur ValidateSpellPower
// ===================================================
console.log("\n===== Exercice 4 =====");

const spells = new SpellRepository();

spells.add({
  id: 102,
  name: "Protego",
  category: "defense",
  power: 50,
});
console.log("Sort ajouté : Protego");

try {
  spells.add({
    id: 103,
    name: "Invalid Spell",
    category: "attack",
    power: -10,
  });
} catch (error) {
  console.log("Erreur :", (error as Error).message);
}

console.log("Sorts dans le repository :", spells.getAll().map((s) => s.name));

// ===================================================
// Exercice 5 — Décorateur de cache
// ===================================================
console.log("\n===== Exercice 5 =====");

class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}

const calculator = new SpellCalculator();

console.log(calculator.calculatePower(10, 3)); // MISS + Calculating... + 30
console.log(calculator.calculatePower(10, 3)); // HIT + 30 (pas de calcul)
console.log(calculator.calculatePower(5, 2)); // MISS + Calculating... + 10

// une autre instance a son propre cache
const calculator2 = new SpellCalculator();
console.log(calculator2.calculatePower(10, 3)); // MISS car c'est une nouvelle instance

// ===================================================
// Exercice 6 — Renforcer le Type Guard
// ===================================================
console.log("\n===== Exercice 6 =====");

const validHouses: readonly House[] = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
];

function isHouse(value: unknown): value is House {
  return (
    typeof value === "string" &&
    validHouses.some((house) => house === value)
  );
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

const validData: unknown = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
};

const invalidData: unknown = {
  id: 2,
  name: "Viktor",
  house: "Durmstrang",
  level: 5,
  active: true,
};

console.log(isWizard(validData)); // true
console.log(isWizard(invalidData)); // false

// Grâce au type guard, TypeScript sait que validData est un Wizard ici
if (isWizard(validData)) {
  console.log(`${validData.name} est dans la maison ${validData.house}`);
}
