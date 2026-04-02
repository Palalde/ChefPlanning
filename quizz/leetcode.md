valid palindrome II

```javaScript

//solution 1
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {

    let i = 0;
    let j = 0;
    const end = Math.max(word1.length - 1, word2.length - 1);
    let result = "";

    while (j <= end || i <= end) {
        if (word1[i] !== undefined) {
            result += word1[i];
            i++;
        }

        if (word2[j] !== undefined) {
            result += word2[j];
            j++;
        }
    }

    return result;
};

//solution 2

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {

    let i = 0;
    let j = 0;
    let result = "";

    while (i < word1.length  || j < word2.length ) {
        if (i < word1.length) {
            result += word1[i];
            i++;
        }

        if ( j < word2.length) {
            result += word2[j];
            j++;
        }
    }

    return result;
};
```
