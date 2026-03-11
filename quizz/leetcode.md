Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:

n == nums.length
1 <= n <= 5 \* 104
-109 <= nums[i] <= 109
The input is generated such that a majority element will exist in the array.

Follow-up: Could you solve the problem in linear time and in O(1) space?

```javaScript
// solution 1:
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // var
    let freqMap = new Map();
    let freqMax = 0;
    let result = 0;

    //hashMap frequences
    for ( const n of nums) {
        freqMap.set(n, (freqMap.get(n) || 0) + 1);
    }

    // check in the hashmap the number with max freq
    for ( const [num , freq] of freqMap) {
         if (freq > freqMax) {
            freqMax = freq;
            result = num;
         }
    }

    return result;
};

// solution 2 :

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // var
    let freqMap = new Map();
    let freqMax = 0;
    let result = 0;


    for ( const n of nums) {
        //hashMap frequences
        freqMap.set(n, (freqMap.get(n) || 0) + 1);

        // check if n have the best freq
        if ( freqMax < freqMap.get(n)) {
            freqMax = freqMap.get(n);
            result = n;
        }
    }

    return result;
};

// solution 3:

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let result = 0;
    let count = 0;

    for (const n of nums) {

        // setup the actual elements which have TOTAL majority in the array
        if (count === 0) {
            result = n;
        }

        //increment count
        count = n === result ? count++ : count--;

    }

    return result;
};

// solution 4:

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let result = 0;
    let count = 0;

    for (const n of nums) {

        // setup the actual elements which have TOTAL majority in the array
        if (count === 0) {
            result = n;
        }

        //increment count
        count += n === result ? 1 : -1;

    }

    return result;
};

```
