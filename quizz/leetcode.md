merged sorted array

```javaScript

//solution 1
* @param {number[]} nums1 * @param {number} m * @param {number[]} nums2 * @param {number} n * @return {void} Do not return anything, modify nums1 in-place instead. */ var merge = function (nums1, m, nums2, n) { let i = 0; let j = 0; while (i <= m && j <= n ) { if (nums1[i] && nums2[j]) { if (nums1[i] <= nums2[j]) { i++; } else { [nums1[i], nums1[i + 1] ] = [nums2[j], nums1[i]]; i++; j++; }; } else { if (nums1[i]) { i++; } else { nums1[i] = nums2[j]; i++; j++; } } } };
//solution 2

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = (m + n) - 1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
            k--;
        } else {
            nums1[k] = nums2[j];
            j--;
            k--;
        }
    }

    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
};

// solution attendue

class Solution {
    /**
     * @param {number[]} nums1
     * @param {number} m
     * @param {number[]} nums2
     * @param {number} n
     * @return {void} Do not return anything, modify nums1 in-place instead.
     */
    merge(nums1, m, nums2, n) {
        let last = m + n - 1;

        // Merge in reverse order
        while (m > 0 && n > 0) {
            if (nums1[m - 1] > nums2[n - 1]) {
                nums1[last--] = nums1[m-- - 1];
            } else {
                nums1[last--] = nums2[n-- - 1];
            }
        }

        // Fill nums1 with leftover nums2 elements
        while (n > 0) {
            nums1[last--] = nums2[n-- - 1];
        }
    }
}

```
