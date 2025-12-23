package algorithms.leetcode;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * LeetCode #1 - Two Sum
 * Difficulty: Easy
 * 
 * Problem:
 * Given an array of integers nums and an integer target, return indices of the
 * two numbers such that they add up to target.
 * 
 * You may assume that each input would have exactly one solution, and you may
 * not use the same element twice.
 * 
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 * 
 * Link: https://leetcode.com/problems/two-sum/
 */
public class TwoSum {

    /**
     * Approach 1: Brute Force
     * Time Complexity: O(n²) - nested loops
     * Space Complexity: O(1) - no extra space
     * 
     * @param nums   array of integers
     * @param target target sum
     * @return indices of two numbers that add up to target
     */
    public static int[] twoSumBruteForce(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        throw new IllegalArgumentException("No solution found");
    }

    /**
     * Approach 2: Hash Map (Optimal)
     * Time Complexity: O(n) - single pass through array
     * Space Complexity: O(n) - hash map storage
     * 
     * Intuition:
     * For each number, we check if (target - current number) exists in our map.
     * If yes, we found the pair. If no, we store current number and continue.
     * 
     * @param nums   array of integers
     * @param target target sum
     * @return indices of two numbers that add up to target
     */
    public static int[] twoSum(int[] nums, int target) {
        // Map: value -> index
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // Check if complement exists in map
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }

            // Store current number with its index
            map.put(nums[i], i);
        }

        throw new IllegalArgumentException("No solution found");
    }

    /**
     * Test cases
     */
    public static void main(String[] args) {
        // Test Case 1
        int[] nums1 = { 2, 7, 11, 15 };
        int target1 = 9;
        System.out.println("Test 1: " + Arrays.toString(twoSum(nums1, target1))); // [0, 1]

        // Test Case 2
        int[] nums2 = { 3, 2, 4 };
        int target2 = 6;
        System.out.println("Test 2: " + Arrays.toString(twoSum(nums2, target2))); // [1, 2]

        // Test Case 3
        int[] nums3 = { 3, 3 };
        int target3 = 6;
        System.out.println("Test 3: " + Arrays.toString(twoSum(nums3, target3))); // [0, 1]

        // Performance comparison
        int[] largeArray = new int[10000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = i;
        }

        long startTime = System.nanoTime();
        twoSum(largeArray, 19997);
        long endTime = System.nanoTime();
        System.out.println("\nHash Map approach: " + (endTime - startTime) + " ns");

        startTime = System.nanoTime();
        twoSumBruteForce(largeArray, 19997);
        endTime = System.nanoTime();
        System.out.println("Brute Force approach: " + (endTime - startTime) + " ns");
    }

    /**
     * Key Takeaways:
     * 
     * 1. Hash maps are powerful for lookup operations (O(1))
     * 2. Trading space for time is often worth it
     * 3. Think about the complement: what do I need to find?
     * 4. One-pass solutions are elegant and efficient
     * 
     * Follow-up Questions:
     * - What if the array is sorted? (Two-pointer approach)
     * - What if we need all pairs? (Different problem)
     * - What about duplicate values? (This solution handles it)
     */
}

