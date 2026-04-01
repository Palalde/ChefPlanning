valid palindrome II

```javaScript

//solution 1
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    let flag = false;
    let i = 0;
    let j = s.length - 1;

    while (i < j) {
        if (s[i] === s[j]) {
            i++;
            j--;
        } else if (flag === false) {

            if (s[i] !== s[j - 1]) {
                flag = true;
                i++;
            } else {
                flag = true;
                j--;
            }
        } else {
            return false;
        }
    }

    return true;
};

//solution 2

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    let flag = 0;
    let i = 0;
    let j = s.length - 1;
    let save = [0,0];

    while (i < j) {
        if (s[i] === s[j]) {
            i++;
            j--;
        } else if (flag === 0) {
            save = [i,j - 1];
            i++;
            flag = 1;

        } else if (flag === 1) {
            [iS, jS] = save;

            i = iS;
            j = jS;
            flag = 2;
        } else {
            return false;
        }
    }

    return true;
};

//solution attendue

class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    validPalindrome(s) {
        let l = 0,
            r = s.length - 1;

        while (l < r) {
            if (s[l] !== s[r]) {
                return (
                    this.isPalindrome(s, l + 1, r) ||
                    this.isPalindrome(s, l, r - 1)
                );
            }
            l++;
            r--;
        }

        return true;
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {boolean}
     */
    isPalindrome(s, l, r) {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```
