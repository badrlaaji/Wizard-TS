# TP TypeScript — Académie de sorciers (TAF)

## Lancer le projet
```bash
npm install
npm start        # compile (tsc) puis lance node dist/main.js
```

## Structure
- `src/types.ts` : types (House, Wizard, Spell, NewWizard, AcademyEvent, SpellCastEvent)
- `src/repository.ts` : `Repository<T>` générique + `WizardRepository` + `SpellRepository`
- `src/decorators.ts` : décorateurs `ValidateSpellPower` et `Cache`
- `src/main.ts` : tests des 6 exercices

## Exercices
1. **Nouveau sorcier** : `register(newWizard: NewWizard)` dans `WizardRepository`, l'id est attribué automatiquement (`Omit<Wizard, "id">`).
2. **Filtrer par maison** : `findByHouse(house: Wizard["house"])` (type à accès indexé, n'accepte que les 4 maisons).
3. **Événement de sort** : `SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>` + `handleSpellCast()`.
4. **Puissance d'un sort** : décorateur `@ValidateSpellPower` sur `SpellRepository.add()`, lance une erreur si `power < 0`.
5. **Cache** : décorateur `@Cache` avec une `WeakMap` (un cache par instance) et une `Map` (clé = arguments en JSON).
6. **Type guard** : `isHouse()` vérifie les 4 maisons valides, `isWizard()` l'utilise → "Durmstrang" est refusé.

## Remarque
Les décorateurs utilisent l'ancienne syntaxe (`target, propertyKey, descriptor`), donc il faut
`"experimentalDecorators": true` dans `tsconfig.json`.
