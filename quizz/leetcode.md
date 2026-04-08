26. Remove Duplicates from Sorted Array

```javaScript
// solution 1
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let k = 1;
    let j = 1;

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] !== nums[i + 1]) {

            nums[j] = nums[i + 1];
            k++;
            j++;
        }
    }

    return k;
};
```
