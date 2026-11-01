import { Wizard, Spell, NewWizard } from "./types";
import { ValidateSpellPower } from "./decorators";

// Repository générique : marche pour tout objet qui a un id
export class Repository<T extends { id: number }> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

export class WizardRepository extends Repository<Wizard> {
  private nextId: number = 1;

  // Exercice 1 : l'appelant donne un NewWizard (sans id), on attribue l'id ici
  register(newWizard: NewWizard): Wizard {
    const wizard: Wizard = { id: this.nextId, ...newWizard };
    this.nextId++;
    this.add(wizard);
    return wizard;
  }

  // Exercice 2 : filtrer par maison
  // Wizard["house"] = type à accès indexé => c'est le type House
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter((wizard) => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
  // Exercice 4 : le décorateur refuse un sort avec une puissance négative
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}
