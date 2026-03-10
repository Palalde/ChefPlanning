Given a binary array nums, return the maximum number of consecutive 1's in the array.

Example 1:

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 2

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.

```javaScript
// solution 1:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    //const
    let r = 0;
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i]) {
            k++;
        } else if (!nums[i] && k < r) {
            k = 0;
        } else {
            r = K;
            k = 0;
        }
    }

    return r;
};


//solution 2:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    //const
    let r = 0;
    let k = 0;

    for (let i = 0; i < nums.length; i++) {

        //count
        if (nums[i]) {
            k++;
        } else {
            k = 0;
        }

        // fix the result
        if (k > r) {
            r = k;
        }
    }

    return r;
};

// solution 2
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    //const
    let r = 0;
    let k = 0;

    for (const n of nums) {
        k = n ? k + 1 : 0;
        r = Math.max(r, k);
    }

    return r;
};
```
