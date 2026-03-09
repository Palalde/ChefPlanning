Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

```javaScript
// solution 1
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    // const
    const result = [];
    const charSumMap = new Map();
    let charSum = 0;

    // for each word
    for (const word of strs) {
        // reset charSum
        charSum = 0;
        // for each char of word
        for (const char of word) {
            // define the sum of each letter
            charSum += char.charCodeAt(0);
        }

        // if key already is charSum
        if (charSumMap.has(charSum)) {
            // then push the actual word
            charSumMap.get(charSum).push(word);
        } else {
            // if not create a new key with the word
            charSumMap.set(charSum, [word]);
        }
    }

    // for each key of the map
    for (const [key, value] of charSumMap) {
        result.push(value);
    }

    return result;
};

// solution 2
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    // const
    const result = [];
    let aStrs = strs;

    // while there is word on the actual string
    while (aStrs.length > 0) {
        // true and false stack
        let aTStack = [];
        let aFStack = [];
        // first word Map
        let fwMap = new Map();
        for (const word of aStrs) {
            // actual word map
            let wMap = new Map();

            for (const char of word) {
                // setup first refMap for first word
                if (word === aStrs[0]) {
                    fwMap.set(char, (fwMap.get(char) || 0) + 1);
                }
                // setup for other word
                wMap.set(char, (wMap.get(char) || 0) + 1);
            }

            // firstword
            if (word === aStrs[0]) {
                // push the word in the actual true stack
                aTStack.push(word);

                // otherword
            } else if (wMap.size !== fwMap.size) {
                // if different length push in false Stack
                aFStack.push(word);
            } else {
                // flag to check if the for made to the end
                let failled = false;
                // check if anagram with the fword
                for (const [c, value] of fwMap) {
                    if (wMap.get(c) !== value) {
                        aFStack.push(word);
                        failled = true;
                        break;
                    }
                }
                // if failled there is anagram
                if (!failled) {
                    // so push in the actual true stack
                    aTStack.push(word);
                }
            }
        }

        //push both stack
        result.push(aTStack);
        aStrs = aFStack;
    }

    return result;
};

//solution 3

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    // const
    const result = [];
    //hashMap result
    let rMap = new Map();
    //checkMap
    let cMap = new Map();

    for (const word of strs) {
        //letterMap
        let lMap = new Map();

        for (const char of word) {
            //set the actual letter map
            lMap.set(char, (lMap.get(char) || 0) + 1);
        }

        for (const [w, inner] of cMap) {
            let failed = false;
            for (const [char, count] of inner) {
                if (lmap.get(char) !== count) {
                    failed = true;
                    cMap.set(word, lMap);
                    break;
                }
            }

            if (!failed) {


            }
        }

    }

};

// solution 4

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    //hashMap result
    let rMap = new Map();

    //create the hashMap result
    for (const word of strs) {
        //letterfreq
        let lFreq = Array(26).fill(0);

        for (const char of word) {
            lFreq[char.charCodeAt(0) - 97]++;
        }

        // create the key with # join
        const freqKey = lFreq.join('#');

        // if there is one anagram in the map push it
        if (rMap.has(freqKey)) {
            rMap.get(freqKey).push(word);
        } else {
            // if not create a new one
            rMap.set(freqKey, [word]);
        }
    }

    return [...rMap.values()];
};

```

---

## **Résumé de la conversation – Résolution de `groupAnagrams`**

### **1. Blocages initiaux**

1. **Map avec des tableaux comme valeurs**
   - Tu voulais stocker des tableaux de mots comme valeurs dans une Map (`Map<clé, [mots]>`).
   - Tu étais confus sur la syntaxe et la logique pour ajouter un mot à un tableau existant ou en créer un nouveau.

2. **Calcul d’un `charSum` pour identifier les anagrammes**
   - Tu essayais d’utiliser la somme des codes caractères (`charCodeAt`) pour identifier les anagrammes.
   - Problème : plusieurs mots non-anagrammes peuvent donner la même somme → logique incorrecte.
   - Tu as compris que ça ne marche pas pour garantir l’unicité.

3. **Boucles imbriquées et `break` / `return`**
   - Tu voulais interrompre certaines boucles mais continuer d’autres.
   - Confusion sur la portée de `break` et `return`.
   - Tu as appris la différence entre :
     - `break` → quitte la boucle courante
     - `return` → quitte toute la fonction
     - `label: break label` → peut quitter une boucle externe mais il faut faire attention

4. **Comparaison de Maps et objets**
   - Tu voulais comparer des Maps `{a:2,b:1}` pour savoir si elles étaient identiques.
   - Problème : `Map` ou objet en JS se compare par **référence**, pas par valeur.
   - Tu as appris qu’il faut :
     - Convertir en string (`JSON.stringify([...map])`)
     - Ou faire une comparaison manuelle clé par clé

5. **Problème avec Map + `JSON.stringify([...map])`**
   - Tu as réalisé que l’ordre des clés dans une Map influence le string → `"eat"` et `"tea"` donnaient des clés différentes.
   - Solution envisagée : soit trier les clés, soit utiliser une Map initialisée avec toutes les lettres dans l’ordre fixe.

6. **Performance / Complexité**
   - Tes premières solutions avec boucle imbriquée donnaient **O(n²)** → Time Limit Exceeded sur LeetCode.
   - Tu as compris qu’il fallait une approche **O(n·k)** (n = nombre de mots, k = longueur moyenne des mots).

---

### **2. Ce que tu as appris et intégré**

1. **Tableau de fréquences plutôt que Map**
   - Pour `'a'..'z'`, tu peux faire :

     ```javascript
     let freq = Array(26).fill(0);
     for (const char of word) freq[char.charCodeAt(0) - 97]++;
     const key = freq.join("#");
     ```

   - Avantages :
     - Complexité O(n·k)
     - Clé stable
     - Plus simple et léger qu’une Map ou un tri

2. **Comparaison d’objets / Map**
   - `JSON.stringify([...map])` permet de comparer des Maps par valeur, mais l’ordre compte.
   - Si ordre garanti (comme tableau de fréquence), plus besoin de `.sort()`.

3. **Map comme structure pour grouper les anagrammes**
   - Clé : fréquence des lettres ou string triée
   - Valeur : tableau des mots correspondants
   - Ajout conditionnel :

     ```javascript
     if (map.has(key)) map.get(key).push(word);
     else map.set(key, [word]);
     ```

4. **Optimisation finale**
   - Supprimer les variables inutilisées (`lString`, `result`)
   - Retourner directement `return [...rMap.values()]`
   - Pas besoin de boucle supplémentaire pour remplir un tableau intermédiaire

---

### **3. Points forts de ton apprentissage**

- Compréhension de **Map + tableau comme valeur** pour regrouper des éléments.
- Différence entre `break` et `return` et utilisation correcte dans des boucles imbriquées.
- Limites des méthodes basées sur `charCode` pour les anagrammes.
- Avantages des **tableaux de fréquences** vs `.sort()` : complexité O(n·k) vs O(n·k log k).
- Conversion d’objets/Maps en string pour comparaison par valeur.
- Nettoyage du code : supprimer variables inutilisées, simplifier le retour.

---

### **4. Résultat final**

- Une solution propre, efficace, O(n·k), utilisant un tableau de fréquences pour `'a'..'z'` et une Map pour grouper les mots :

```javascript
const rMap = new Map();
for (const word of strs) {
  const freq = Array(26).fill(0);
  for (const char of word) freq[char.charCodeAt(0) - 97]++;
  const key = freq.join("#");
  if (!rMap.has(key)) rMap.set(key, []);
  rMap.get(key).push(word);
}
return [...rMap.values()];
```

- Clé stable, pas besoin de `.sort()`, très rapide pour de grandes entrées.

---

### **5. Comment tu t’es servi de l’IA**

- Vérification de syntaxe et logique (Map, boucle, break/return).
- Explication de la limite de `charCodeAt` pour un charSum.
- Comparaison Map / objet par valeur vs référence.
- Simplification et optimisation du code (tableau de fréquence, suppression de variables inutilisées).
- Confirmation de la complexité et recommandations pour O(n·k) plutôt que O(n·k log k).

---
