Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2

Output: [1,2]

Example 2:

Input: nums = [1], k = 1

Output: [1]

Example 3:

Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

Output: [1,2]

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

```javaScript

//solution 1
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    let freqMap = new Map();
    let checkMap = new Map();
    let result = [];

    for (const n of nums) {
        freqMap.set(n, (freqMap.get(n) || 0) + 1);
    }

    for (const [val, freq] of freqMap) {
        if (!checkMap.has(freq)) {
            checkMap.set(freq, [val]);
        } else {
            checkMap.set(freq, checkMap.get(freq).push(val));
        }
    }

    let allFreq = checkMap.keys();
    let n = 0

    while (n <= k) {
        let max = Math.max(...allFreq);
        result.push(max);
        freqMap.delete(max);
        n++;
    }

    return result;
};


//solution 2
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    let freqMap = new Map();
    let checkMap = new Map();
    let checkSet = new Set();
    let result = [];

    for (const n of nums) {
        freqMap.set(n, (freqMap.get(n) || 0) + 1);
    }

    for (const [val, freq] of freqMap) {
        if (!checkMap.has(freq)) {
            checkMap.set(freq, [val]);
        } else {
            checkMap.set(freq, checkMap.get(freq).push(val));
        }

        checkSet.add(freq);
    }

   let n = 0;
    while (n <= k) {
        max = Math.max(...checkSet);
        checkSet.delete(max);
        result.push(...checkMap.get(max));
        n++;
    }

    return result;

};
//solution 3

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    let freqMap = new Map();
    let bucket = Array.from({ length: nums.length + 1 }, () => []);
    let result = [];

    for (const n of nums) {
        freqMap.set(n, (freqMap.get(n) || 0) + 1);
    }
    for (const [num, freq] of freqMap) {
        bucket[freq].push(num);
    }

    for (let i = bucket.length - 1; i > 0; i--) {
        for (let num of bucket[i]) {
            result.push(num);
            if (result.length === k) return result;
        }
    }
};

// solution 4

var topKFrequent = function (nums, k) {
  let freqMap = new Map();
  let checkMap = new Map();
  let result = [];

  for (const n of nums) {
    freqMap.set(n, (freqMap.get(n) || 0) + 1);
  }

  for (const [val, freq] of freqMap) {
    if (!checkMap.has(freq)) {
      checkMap.set(freq, [val]);
    } else {
      checkMap.get(freq).push(val);
    }
  }

  // Parcourir de la freq max (nums.length) vers 1
  for (let freq = nums.length; freq >= 1 && result.length < k; freq--) {
    if (checkMap.has(freq)) {
      result.push(...checkMap.get(freq));
    }
  }

  return result;
};
```
