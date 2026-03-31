# Memo — Verdicts Anki post-LeetCode

> Tableau récapitulatif de chaque session : concept appris / card créée / pourquoi.
> Ordre chronologique. Consulter pour retrouver le contexte d'une décision.

---

## 242. Valid Anagram & 3110. Score of a String

| Concept appris                                          | Card ? | Pourquoi                                                     |
| ------------------------------------------------------- | ------ | ------------------------------------------------------------ |
| `Math.abs()`                                            | ❌ Non | Google en 5 sec, le nom est littéral                         |
| `charCodeAt(i)`                                         | ❌ Non | Même chose, retrouvé instantanément                          |
| `.length` / `.split()` / `.join()`                      | ❌ Non | Déjà couvert JS Core + trop basique                          |
| `new Map()` + `get`/`set`                               | ❌ Non | Déjà couvert dans les cards Hash Set/Map                     |
| `for` vs `for...of` (comparer éléments = for classique) | ❌ Non | Déjà couvert par 4 cards Boucles                             |
| **Destructuring dans `for...of` sur Map**               | ✅ Oui | Pattern récurrent LeetCode, syntaxe `[key, value]` oubliable |

---

## 1. Two Sum

| Concept appris                                                | Card ? | Pourquoi                                                                                                                    |
| ------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| Brute Force → Optimize                                        | ❌ Non | Déjà couvert (Algo Thinking Q/R)                                                                                            |
| Hash Set/Map existence + frequency                            | ❌ Non | Déjà couvert (5 cards Hash Set/Map)                                                                                         |
| `for` classique vs `for...of`                                 | ❌ Non | Déjà couvert (4 cards Boucles)                                                                                              |
| O(n²) vs O(n)                                                 | ❌ Non | Déjà couvert (Big O cards)                                                                                                  |
| `break` / `return` dans boucle                                | ❌ Non | Trop basique, retrouvé en 5 sec                                                                                             |
| Boucles imbriquées `for` dans `for`                           | ❌ Non | Déjà dans les cards Big O                                                                                                   |
| `.filter()` inutile avec 0/négatifs                           | ❌ Non | Leçon spécifique à Two Sum, pas un pattern général                                                                          |
| Two Pointers                                                  | ❌ Non | Vu mais pas pratiqué — on le carde sur Valid Palindrome                                                                     |
| `for` vs `for...of` confusion restante                        | ❌ Non | 5 cards déjà, c'est la pratique qui ancre                                                                                   |
| **Complement Map pattern** (`target - nums[i]` + `map.has()`) | ✅ Oui | Pattern différent du Frequency Map. Revient dans Two Sum, 3Sum, 4Sum, SubArray Sum — très oubliable, temps mis à le trouver |
| **Pourquoi `map.set()` à la FIN de la boucle**                | ✅ Oui | Éviter de matcher un élément avec lui-même. Piège subtil, bloqué dessus                                                     |

---

## 1929. Concatenation of Array

Rien à carder — exercice trop simple, aucun concept nouveau.

---

## 14. Longest Common Prefix

| Ce que tu as appris                      | Card ? | Pourquoi                                                                                  |
| ---------------------------------------- | ------ | ----------------------------------------------------------------------------------------- |
| `.every()`                               | ❌ Non | Google en 5 sec, même famille que `.map`/`.filter`                                        |
| Quand sortir d'une boucle (return/break) | ❌ Non | Déjà couvert dans les cards Boucles + pratiqué                                            |
| `.reduce()` pour trouver le plus court   | ❌ Non | Usage niche, retrouvé facilement                                                          |
| `strs[j][i]` accès chaîné                | ❌ Non | Vu une fois, pas oubliable — syntaxe basique                                              |
| Savoir abandonner une approche           | ❌ Non | Mindset, pas un concept technique                                                         |
| **O(n × m) ≠ O(n²)**                     | ✅ Oui | Cette confusion a fait ABANDONNER la bonne solution — piège mental "nested for = mauvais" |

---

## 27. Remove Element

| Concept                                                       | Card ? | Pourquoi                                                                  |
| ------------------------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| Méthodes mutantes vs non-mutantes (splice/push vs map/filter) | ❌ Non | La distinction existe, le reste retrouvé facilement                       |
| `.splice()` vs `.slice()` vs `.toSpliced()`                   | ❌ Non | Noms parlants, Google en 5 sec                                            |
| `.splice()` est O(n)                                          | ❌ Non | Détail, card Big O couvre déjà le principe                                |
| Garbage collector / référence                                 | ❌ Non | Trop théorique, cards référence vs valeur couvrent l'essentiel            |
| `++n` vs `n++`, `+=`, `-=`                                    | ❌ Non | Syntaxe basique, pas oubliable maintenant                                 |
| While ne re-check pas entre 2 instructions                    | ❌ Non | Compris en pratiquant, ancré                                              |
| **Read/Write pointer pattern** (solution 6)                   | ✅ Oui | LE pattern pour les problèmes "in-place" — pas trouvé seul, 6h de détours |

---

## 49. Group Anagrams _(premier Medium)_

| Concept                                                                             | Card ? | Pourquoi                                                                                                        |
| ----------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `charCodeAt` sum ne marche pas comme clé unique                                     | ❌ Non | Leçon spécifique, pas un pattern                                                                                |
| Flag boolean pour savoir si une boucle est allée au bout                            | ❌ Non | Trop basique, ancré après la pratique                                                                           |
| `.size` sur Map vs `.length` sur Array                                              | ❌ Non | Google en 5 sec                                                                                                 |
| JS compare objets par référence                                                     | ❌ Non | Déjà couvert (card référence vs valeur)                                                                         |
| `JSON.stringify` pour comparer par valeur                                           | ❌ Non | Utile mais pas pattern algo récurrent                                                                           |
| `[...map.values()]`                                                                 | ❌ Non | Syntaxe simple, vue                                                                                             |
| **Frequency Array comme clé hashable** (`Array(26).fill(0)` + `charCodeAt(0) - 97`) | ✅ Oui | Pattern dense, syntaxe oubliable, réutilisable sur tous les string problems                                     |
| **Hashable key creation** (`.join('#')` / `JSON.stringify` comme clé Map)           | ✅ Oui | En JS on ne peut pas utiliser array/objet comme clé Map directement — pattern transversal 10+ fois sur LeetCode |

---

## 1470. Shuffle the Array

| Apprentissage                         | Card ? | Pourquoi                                              |
| ------------------------------------- | ------ | ----------------------------------------------------- |
| `k + 2` vs `k += 2`                   | ❌ Non | Bug/typo, pas un concept. Ne le referas plus.         |
| `j` c'est juste `i + n`               | ❌ Non | "Aha" de ton propre code, pas un concept réutilisable |
| `2*i` / `2*i + 1` pour interleaving   | ❌ Non | Trop spécifique, reviendra si recroisé                |
| `for i < n` ≡ `while length < total`  | ❌ Non | Compréhension, pas un fait oubliable                  |
| S'entêter sur une Map inutile         | ❌ Non | Leçon de process, pas une card Anki                   |
| **`push()` avec plusieurs arguments** | ✅ Oui | Fait JS utile et oubliable, s'applique partout        |

---

## 485. Max Consecutive Ones

| Apprentissage                          | Card ? | Pourquoi                                                                                                       |
| -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| Ternaire pour if/else simple           | ❌ Non | Syntaxe connue — c'est le réflexe qui manque, vient avec la pratique                                           |
| `for...of` quand pas besoin d'index    | ❌ Non | Card déjà existante (Boucles)                                                                                  |
| Trop de if/else → simplifier           | ❌ Non | Leçon de process                                                                                               |
| **`Math.max()` / `Math.min()`**        | ✅ Oui | Inconnus jusqu'ici. 2 usages : comparaison `Math.max(a, b)` + max tableau `Math.max(...arr)`                   |
| **Ternaire : expression vs statement** | ✅ Oui | "Je connais la syntaxe" ≠ "je sais quand l'utiliser". Règle valeur vs side effects — trou de connaissance réel |

---

## 169. Majority Element

| Apprentissage                             | Card ? | Pourquoi                                                         |
| ----------------------------------------- | ------ | ---------------------------------------------------------------- |
| Survolé l'énoncé (raté > n/2 majoritaire) | ❌ Non | Process. Règle : relire les contraintes 2 fois.                  |
| O(2n) → O(n) en fusionnant 2 passes       | ❌ Non | Réflexe one-pass déjà connu (Complement Map)                     |
| Boyer-Moore Voting Algorithm              | ❌ Non | Trop spécifique, applicable dans très peu de cas                 |
| `count = count++` ne marche pas           | ❌ Non | Bug ponctuel, ne le referas plus. Règle : `+=` avec un ternaire. |

---

## 705. Design HashSet

| Apprentissage                                 | Card ? | Pourquoi                                                                                                     |
| --------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| prototype / this (rappel)                     | ❌ Non | Cards existantes, c'était de la rouille. La pratique suffit.                                                 |
| class / constructor / #                       | ❌ Non | Même chose — syntaxe revenue en codant                                                                       |
| Hash function (key % size → bucket)           | ❌ Non | Card Hash Set existante. 6h dessus — pas oubliable.                                                          |
| Shallow copy / référence                      | ❌ Non | Card existante                                                                                               |
| **Linked List (Node + traversal + deletion)** | ✅ Oui | Concept totalement nouveau. Structure fondamentale, dizaines de LeetCodes. `prev.next = cur.next` oubliable. |
| **Dummy Head Node**                           | ✅ Oui | Pattern qui simplifie le code linked list. Facile à oublier, très réutilisable.                              |

---

## 706. Design HashMap

| Apprentissage                         | Card ? | Pourquoi                                                                    |
| ------------------------------------- | ------ | --------------------------------------------------------------------------- |
| Sparse arrays (trous, length)         | ❌ Non | Comportement niche JS, quasi jamais utilisé intentionnellement              |
| `{}` clés converties en string        | ✅ Oui | Piège concret : `obj[42]` et `obj['42']` = même propriété. Gotcha réel.     |
| `Object.keys/values/entries()`        | ✅ Oui | `{}` n'est PAS itérable directement — trou de connaissance, pas de pratique |
| `delete obj[key]`                     | ✅ Oui | Syntaxe de suppression non intuitive, piège `= undefined` ≠ suppression     |
| Linked list + dummy head pour HashMap | ❌ Non | Déjà couvert par les 2 cards créées sur Design HashSet                      |
| `{}` est un hashmap simplifié         | ❌ Non | 2 jours dessus. Acquis.                                                     |

---

## 645. Set Mismatch

| Concept                                               | Card ? | Pourquoi                                                                                                                         |
| ----------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Negative marking pattern (`Math.abs` + signe négatif) | ❌ Non | Trick d'optimisation spatiale très spécifique. Ta frequency map est déjà O(n). Reviendra sur d'autres problèmes avant de carder. |
| Solution mathématique (système d'équations)           | ❌ Non | Pas un pattern réutilisable, pas demandé en interview                                                                            |

---

## 1365. How Many Numbers Are Smaller Than the Current Number

| Apprentissage                                                                | Card ?               | Pourquoi                                                                                                                |
| ---------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Boucle imbriquée qui rétrécit = O(n²)** — `n + (n-1) + ... + 1 = n(n+1)/2` | ✅ Oui (à confirmer) | Piège dans lequel tu es tombé à 100%. Formule de Gauss = fait mémorisable, réutilisable à chaque nested loop. ROI fort. |
| **Prefix Sum sur counting array** — transformer fréquences en cumul          | ✅ Oui               | Pattern nouveau, première rencontre, pas trouvé seul. Réutilisable (counting sort, range queries, histogrammes).        |
| Utiliser les contraintes (0-100 = cadeau, pas triche)                        | ❌ Non               | Leçon méta, pas mémorisable sous forme de card. Viendra naturellement.                                                  |
| Ne pas sur-ingénier (HashMap inutile quand boucle suffit)                    | ❌ Non               | Sagesse d'expérience, pas un fait.                                                                                      |
| Counting sort (concept général)                                              | ❌ Non               | Déjà couvert par la card "Frequency Array pattern".                                                                     |

---

## 448. Find All Numbers Disappeared in an Array

| Apprentissage                                                | Card ? | Pourquoi                                               |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Negative Marking** — marquer `nums[                        | n      | -1] \*= -1` pour tracker les vus in-place, O(1) espace | ✅ Oui | 2e rencontre (Set Mismatch + celui-ci). Pattern réutilisable (Find All Duplicates, First Missing Positive). Fait mémorisable. |
| "Je peux muter l'input sur LeetCode" (contrairement à React) | ❌ Non | Leçon d'expérience / mindset. Pas un fait mémorisable. |
| Counting array pour existence                                | ❌ Non | Déjà couvert (Frequency Array pattern + Prefix Sum).   |

---

## 20. Valid Parentheses

| Apprentissage                                                                            | Card ? | Pourquoi                                                                                                                                         |
| ---------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stack (LIFO)** — `push()` pour empiler, `pop()` pour dépiler le dernier, ordre inversé | ✅ Oui | Vrai gap : pensait qu'un stack = "juste un array où on accumule". LIFO + `pop()` comme opération centrale est fondamental. 10+ problèmes futurs. |
| Map pour reverse lookup (closer → opener)                                                | ❌ Non | Déjà couvert (Map/Set cards). Utilisation créative, pas concept nouveau.                                                                         |
| Edge cases (longueur impaire, stack non vide à la fin)                                   | ❌ Non | Bug fixes ponctuels. Réflexe qui vient avec la pratique.                                                                                         |

---

## 682. Baseball Game

| Apprentissage                                        | Card ? | Pourquoi                                                                                    |
| ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| **`.at(-1)` — accès index négatif**                  | ✅ Oui | Vrai gap : ne connaissait pas. Remplace `arr[arr.length-1]`, réutilisable partout           |
| **`??` (nullish coalescing) vs `\|\|` (logical OR)** | ✅ Oui | Piège classique. `\|\|` écrase `0`, `''`, `false`. Gap avoué ("du mal à comprendre `\|\|`") |
| **`isNaN()` vs `Number.isNaN()` (+ isFinite)**       | ✅ Oui | Conversion implicite vs stricte. ChatGPT a trompé = preuve du gap. isFinite même pattern    |
| `isFinite()` seul séparément                         | ❌ Non | Même pattern que isNaN, couvert dans la card ci-dessus                                      |
| ChatGPT hallucine sur isNaN                          | ❌ Non | Leçon d'expérience, pas un fait mémorisable                                                 |
| Stack (push/pop/at)                                  | ❌ Non | Déjà couvert (card Stack LIFO — Valid Parentheses)                                          |

---

## 225. Implement Stack using Queues

| Apprentissage                                             | Card ? | Pourquoi                                                                  |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| Linked list pour implémenter un stack (prepend, pop head) | ❌ Non | Déjà couvert (cards Linked List : Node, traversal). Application correcte. |
| Class syntax JS (class, constructor, this, méthodes)      | ❌ Non | Pratiqué naturellement, pas un gap                                        |
| `??` utilisé correctement dans pop()/top()                | ❌ Non | Application de la card Baseball Game, bien ancré                          |
| Queue (FIFO) — concept découvert                          | ❌ Non | Trop tôt. Pas pratiqué. Reviendra sur BFS / level-order traversal.        |

---

## 232. Implement Queue using Stacks

| Apprentissage                                          | Card ? | Pourquoi                                                                                                                                      |
| ------------------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Push O(n) sans tail pointer (parcourir toute la liste) | ❌ Non | Compris par la pratique, conséquence logique                                                                                                  |
| **Tail pointer — O(1) append sur linked list**         | ✅ Oui | Vrai gap : pensait impossible d'avoir push O(1). Pattern fondamental (queue, deque, LRU cache). `tail.next = node` + `tail = node` oubliable. |
| Référence partagée head/tail = même objet mémoire      | ❌ Non | Déjà couvert (cards référence vs valeur). Insight intégré dans la card tail pointer                                                           |
| Queue FIFO concept                                     | ❌ Non | Trop tôt — même verdict que 225. Reviendra sur BFS                                                                                            |

---

## 347. Top K Frequent Elements

| Apprentissage                                                                | Card ? | Pourquoi                                                                                                         |
| ---------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| **Bucket Sort (frequency bucket)** — index = fréquence, itérer depuis la fin | ✅ Oui | Pattern top K en O(n). Pas trouvé malgré intuition correcte. Réutilisable (top K, sort O(n) quand range limitée) |
| `.push()` retourne la length, pas l'array                                    | ❌ Non | Bug ponctuel. Fix simple, pas un pattern                                                                         |
| `Array.from({ length: n }, () => [])` pour buckets                           | ❌ Non | Syntaxe trouvable, écrite correctement après avoir vu l'approche                                                 |
| Math.max(...keys) pas adapté pour top K                                      | ❌ Non | Leçon de design, pas un concept mémorisable                                                                      |
| Être proche mais pas trouver le bucket                                       | ❌ Non | Process/frustration, pas technique                                                                               |

---

## 739. Daily Temperatures

| Apprentissage                                                                                  | Card ? | Pourquoi                                                                                                                           |
| ---------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Monotone Stack** — maintenir une stack triée en poppant les éléments qui violent l'invariant | ✅ Oui | Pattern réutilisable 10+ problèmes (Next Greater/Smaller Element, Stock Span, Largest Rectangle). Pas codé seul malgré l'intuition |
| Map pas adaptée comme stack (pas de `.at(-1)`, pas d'ordre)                                    | ❌ Non | Design choice, ancré après l'avoir testé — réalisé seul                                                                            |
| Toujours lire le top dynamiquement (`stack.at(-1)`) au lieu d'une variable `value`             | ❌ Non | Leçon de débogage. `.at(-1)` déjà couvert (card Baseball Game)                                                                     |
| `[value, index]` vs `{ value, index }` pour les paires                                         | ❌ Non | Destructuring déjà couvert, choix de style                                                                                         |
| Forward vs backward traversal                                                                  | ❌ Non | Les 2 marchent, pas de bonne réponse universelle                                                                                   |
| `i <= 0` au lieu de `i >= 0`                                                                   | ❌ Non | Typo/bug ponctuel                                                                                                                  |
| Vérifier stack vide avant de lire le top                                                       | ❌ Non | Déjà couvert dans la card Stack LIFO                                                                                               |
