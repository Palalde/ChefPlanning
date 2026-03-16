# Anki — Contexte IA

> **MAJ** : 2026-03-16 | **Total** : 132 cards | **Decks** : 7 | **Modèles** : 3
>
> Mémoire IA pour création/modification de cartes Anki.
> **But principal** : guider la décision card/pas card + éviter les doublons.

---

## ⚡ 1. Process de décision (LIRE EN PREMIER)

Après chaque LeetCode (ou apprentissage), l'IA analyse les concepts et produit un **tableau de verdict** :

| Apprentissage    | Card ?                | Pourquoi                                                         |
| ---------------- | --------------------- | ---------------------------------------------------------------- |
| _concept appris_ | **OUI** — type (deck) | ROI : réutilisable, piège prouvé, fait mémorisable               |
| _autre concept_  | **NON**               | Leçon d'expérience / déjà couvert / trop niche / pas mémorisable |

### Critères ROI pour créer une card

| ✅ OUI (card)                                                 | ❌ NON (pas de card)                                                   |
| ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Fait mémorisable** : formule, syntaxe, pattern réutilisable | **Leçon d'expérience** : "ne pas sur-ingénier", "pivoter après 10 min" |
| **Piège prouvé** : l'utilisateur est tombé dedans             | **Bug ponctuel** : erreur de code spécifique (k+2 vs k+=2)             |
| **Pattern réutilisable** : applicable à 3+ problèmes futurs   | **Trop niche** : solution math spécifique, trick d'un seul problème    |
| **Vrai gap de connaissance** : ne savait pas que ça existait  | **Déjà couvert** : concept déjà dans une card existante                |
| **Rencontré 2+ fois** : pattern qui revient                   | **Trop tôt** : rencontré 1 seule fois, pas encore de pattern           |

### Règle du push back

L'utilisateur peut contester un verdict "NON". Si son argument montre un **vrai gap de connaissance** (pas juste un bug), réviser le verdict. Historique : l'utilisateur a eu raison 2 fois (ternaire expression/statement, Object.entries).

---

## 2. Modèles (Note Types)

### Dev - Code Q/R _(principal)_

| Champ          | Rôle                                     |
| -------------- | ---------------------------------------- |
| `Question`     | Question avec HTML (bold, code, pre)     |
| `Reponse`      | Réponse structurée avec exemples de code |
| `Tags_Concept` | Mots-clés du concept (affiché en bas)    |
| `Difficulte`   | ⭐ / ⭐⭐ / ⭐⭐⭐                       |

### Dev - Cloze _(texte à trous)_

| Champ   | Rôle                                         |
| ------- | -------------------------------------------- |
| `Texte` | Texte avec `{{c1::réponse}}` (syntaxe cloze) |
| `Extra` | Info complémentaire après la réponse         |

Syntaxe : `{{c1::mot}}`, `{{c2::autre}}` pour trous indépendants.

### Dev - Reversible _(bidirectionnelle)_

| Champ   | Rôle               |
| ------- | ------------------ |
| `Recto` | Concept / question |
| `Verso` | Code / explication |

2 cartes par note : Normal (Recto→Verso) + Inversée (Verso→Recto).

### CSS commun (thème Dracula)

```css
/* Partagé par les 3 modèles */
.card {
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 16px;
  text-align: left;
  color: #e0e0e0;
  background-color: #1e1e2e;
  padding: 20px;
  line-height: 1.6;
}
pre {
  background: #282a36;
  border-radius: 8px;
  padding: 14px;
  overflow-x: auto;
  font-size: 14px;
  border: 1px solid #44475a;
}
code {
  font-family: "Fira Code", "Cascadia Code", "Consolas", monospace;
  font-size: 14px;
  color: #f8f8f2;
}
b,
strong {
  color: #bd93f9;
} /* violet */
em {
  color: #8be9fd;
} /* cyan */

/* Spécifique Dev - Code Q/R */
.kw {
  color: #ff79c6;
} /* rose — mots-clés */
.str {
  color: #f1fa8c;
} /* jaune — strings */
.fn {
  color: #50fa7b;
} /* vert — fonctions */
.cm {
  color: #6272a4;
} /* gris — commentaires */

/* Spécifique Dev - Cloze */
.cloze {
  font-weight: bold;
  color: #bd93f9;
}
.extra {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #44475a;
  font-size: 14px;
  color: #888;
}
```

---

## 3. Format & Conventions

### Diversité des formes

| Forme      | Modèle           | Quand                                            |
| ---------- | ---------------- | ------------------------------------------------ |
| Q/R        | Dev - Code Q/R   | Explication complète, "qu'est-ce que", "comment" |
| Cloze      | Dev - Cloze      | **Syntaxe exacte**, mots-clés, ordre, patterns   |
| Reversible | Dev - Reversible | **Code ↔ concept** bidirectionnel                |
| Output     | Dev - Code Q/R   | "Que log ce code ?" (tag: `output-question`)     |

Ratio cible : ~60% Q/R, ~20% Cloze, ~10% Reversible, ~10% Output

### HTML

```html
<b>Concept important</b>
<code>useState</code>
<pre><code>function example() {
  return 'hello';
}</code></pre>
• Item 1<br />• Item 2
```

### Conventions

- **1 concept = 1 card**, max ~15 lignes, pas de multi-concept
- **Tags** : `lowercase`, tirets (`array-methods`, `custom-hooks`)
- **Difficulté** : ⭐ basique | ⭐⭐ appliquer | ⭐⭐⭐ pièges
- **Deck** : le concept détermine le deck, pas le contexte d'utilisation
- **Pièges** : toujours inclure les gotchas courants (⚠️)
- Avant de créer : vérifier doublons via `mcp_anki-mcp_findNotes(query: 'deck:Dev "mot-clé"')`

---

## 4. Decks & Inventaire anti-doublons

| Deck                      | Cards   | Mots-clés couverts (pour éviter doublons)                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Dev::01-JavaScript-Core` | 57      | types, typeof, scope, hoisting, TDZ, closure, this, coercion, prototype, spread/rest, destructuring, event-loop, promises, async/await, array-methods, ES-modules, fetch, Map/Set, localStorage, Math.max/min, Object.keys/values/entries, push() multi-args, ternaire expression, delete obj[key], {} clés string                                                                                                             |
| `Dev::02-React`           | 28      | Virtual DOM, props/state, useEffect, immutabilité, useReducer, useCallback, useMemo, Context, keys, React.memo, custom hooks, forms, lifting state, composition, re-renders, data fetching, batching, rendu conditionnel, fragments, events, reducer pattern, fonctions pures, StrictMode                                                                                                                                      |
| `Dev::03-CSS-HTML`        | 8       | flexbox, grid, box-model, spécificité, variables CSS, responsive, position, sémantique, tailwind                                                                                                                                                                                                                                                                                                                               |
| `Dev::04-Tooling-Git`     | 6       | vite, npm, eslint, git workflow, branches, annulation                                                                                                                                                                                                                                                                                                                                                                          |
| `Dev::05-Backend-API`     | 0       | _(réservé Phase 11+)_                                                                                                                                                                                                                                                                                                                                                                                                          |
| `Dev::06-Entretien`       | 7       | SPA/MPA, stockage, référence/copie, setTimeout closure, Promise.allSettled                                                                                                                                                                                                                                                                                                                                                     |
| `Dev::07-LeetCode-Algo`   | 26      | Big O (notation, déterminer, O(n²) vs O(n×m), opérations courantes), Hash Set/Map (Set API, frequency map, Map counting), Boucles (for/for..of/for..in, destructuring Map), Complement Map (one-pass), Read/Write Pointer, Frequency Array (charCodeAt, Array(26).fill(0)), Hashable Key (.join, JSON.stringify), Prefix Sum (counting→cumul), Algo Thinking (brute force→optimize), Linked List (Node, traversal, dummy head) |
| **Total**                 | **132** |                                                                                                                                                                                                                                                                                                                                                                                                                                |

### Tags existants

`js-core`, `types`, `typeof`, `scope`, `hoisting`, `closure`, `this`, `coercition`, `prototype`, `spread`, `rest`, `destructuring`, `ES6`, `ES-modules`, `variables`, `array-methods`, `Map`, `Set`, `fondamentaux`, `async`, `await`, `promise`, `event-loop`, `fetch`, `react`, `state`, `useState`, `useEffect`, `useReducer`, `useCallback`, `useMemo`, `memo`, `context`, `keys`, `rendering`, `custom-hooks`, `forms`, `lifting-state`, `composition`, `patterns`, `css`, `css-html`, `html`, `layout`, `box-model`, `specificity`, `responsive`, `position`, `semantique`, `tailwind`, `variables`, `tooling`, `vite`, `npm`, `eslint`, `git`, `workflow`, `entretien`, `soft-skills`, `output-question`, `stockage`, `architecture`, `fondamentaux`, `gotcha`, `cloze`, `reversible`, `performance`, `algo`, `big-o`, `complexite`, `hash-set`, `hash-map`, `data-structure`, `boucles`, `methode`, `prefix-sum`

---

## 5. MCP Anki — API

```
mcp_anki-mcp_addNote(deckName, modelName, fields: {}, tags: [])
mcp_anki-mcp_addNotes(deckName, modelName, notes: [{fields, tags}])
mcp_anki-mcp_findNotes(query: 'deck:Dev "mot-clé"')
mcp_anki-mcp_notesInfo(notes: [id1, id2])
mcp_anki-mcp_updateNoteFields(noteId, fields: {})
mcp_anki-mcp_deleteNotes(noteIds: [], confirmDeletion: true)
```

---

## 6. Maintenance

- Après création de cards : MAJ ce fichier (total, deck count, mots-clés inventaire)
- Deck placement : concept → deck (`localStorage` → JS-Core, `useReducer` → React)
- Pas de cards pour phases non commencées

_Dernière vérification : 2026-03-16_
