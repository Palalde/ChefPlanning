Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

Return the answer in an array.

Example 1:

Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
Explanation:
For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3).
For nums[1]=1 does not exist any smaller number than it.
For nums[2]=2 there exist one smaller number than it (1).
For nums[3]=2 there exist one smaller number than it (1).
For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).
Example 2:

Input: nums = [6,5,4,8]
Output: [2,1,0,3]
Example 3:

Input: nums = [7,7,7,7]
Output: [0,0,0,0]

Constraints:

2 <= nums.length <= 500
0 <= nums[i] <= 100

```javaScript
// solution 1:

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {

    let result = Array.from({ length: nums.length }, () => 0);


    let j = 0;
    // nums minus the previous first number of the array for each loop
    while (j < nums.length - 1) {

        //start with the second number
        for (let i = j + 1; i < nums.length; i++) {

            //check with the first number of the loop
            if (nums[j] === nums[i]) {
                continue;
            }

            if (nums[j] > nums[i]) {
                result[j]++;
            } else {
                result[i]++;
            }

        }
        //next number
        j++;
    }
    return result;
};


// solution 2 :

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {

    let count = Array.from({ length: Math.max(...nums) + 1 }, () => 0);
    let iMap = new Map();

    let result = Array.from({ length: nums.length }, () => 0);

    //count freq
    for (let i = 0; i < nums.length; i++) {
        count[nums[i]]++;

        if (!iMap.has(nums[i])) {
            iMap.set(nums[i], [i]);
        } else {
            iMap.get(nums[i]).push(i);
        }
    }

    //count acc
    let acc = 0;
    for (let j = 0; j < count.length; j++) {

        if (count[j]) {
            // update result and loop if multiple number
            for (let idx of iMap.get(j)) {
                result[idx] += acc;
            }
        }

        acc += count[j];
    }

    return result;

};
// solution 3:

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {

    let count = Array.from({ length: Math.max(...nums) + 1 }, () => 0);

    //count freq
    for (const num of nums) {
        count[num]++;
    }

    //count acc
    let acc = 0;
    for (let i = 0; i < count.length; i++) {

        if (count[i]) {
            let actual = count[i];
            count[i] = acc;
            acc += actual;
        }
    }

    return nums.map((n) => count[n]);
};


```
