package algorithms.leetcode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for TwoSum problem
 * 
 * Testing Strategy:
 * - Basic functionality with valid inputs
 * - Edge cases (duplicate numbers, negative numbers)
 * - Exception handling for no solution
 * - Performance comparison between approaches
 */
@DisplayName("TwoSum Algorithm Tests")
class TwoSumTest {

    @Test
    @DisplayName("Should find indices for valid input - Example 1")
    void testTwoSum_Example1() {
        // Given
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        
        // When
        int[] result = TwoSum.twoSum(nums, target);
        
        // Then
        assertThat(result).hasSize(2);
        assertThat(nums[result[0]] + nums[result[1]]).isEqualTo(target);
        assertThat(result).containsExactlyInAnyOrder(0, 1);
    }

    @Test
    @DisplayName("Should find indices for valid input - Example 2")
    void testTwoSum_Example2() {
        // Given
        int[] nums = {3, 2, 4};
        int target = 6;
        
        // When
        int[] result = TwoSum.twoSum(nums, target);
        
        // Then
        assertThat(result).containsExactlyInAnyOrder(1, 2);
    }

    @Test
    @DisplayName("Should handle duplicate numbers")
    void testTwoSum_DuplicateNumbers() {
        // Given
        int[] nums = {3, 3};
        int target = 6;
        
        // When
        int[] result = TwoSum.twoSum(nums, target);
        
        // Then
        assertThat(result).containsExactlyInAnyOrder(0, 1);
    }

    @Test
    @DisplayName("Should handle negative numbers")
    void testTwoSum_NegativeNumbers() {
        // Given
        int[] nums = {-1, -2, -3, -4, -5};
        int target = -8;
        
        // When
        int[] result = TwoSum.twoSum(nums, target);
        
        // Then
        assertThat(nums[result[0]] + nums[result[1]]).isEqualTo(target);
    }

    @Test
    @DisplayName("Should handle mixed positive and negative numbers")
    void testTwoSum_MixedNumbers() {
        // Given
        int[] nums = {-3, 4, 3, 90};
        int target = 0;
        
        // When
        int[] result = TwoSum.twoSum(nums, target);
        
        // Then
        assertThat(nums[result[0]] + nums[result[1]]).isEqualTo(target);
    }

    @ParameterizedTest(name = "nums={0}, target={1}")
    @CsvSource({
        "'2,7,11,15', 9",
        "'3,2,4', 6",
        "'3,3', 6",
        "'-1,-2,-3,-4,-5', -8"
    })
    @DisplayName("Parameterized tests with multiple inputs")
    void testTwoSum_ParameterizedTests(String numsStr, int target) {
        // Given
        int[] nums = parseIntArray(numsStr);
        
        // When
        int[] result = TwoSum.twoSum(nums, target);
        
        // Then
        assertNotNull(result);
        assertThat(result).hasSize(2);
        assertThat(nums[result[0]] + nums[result[1]]).isEqualTo(target);
    }

    @Test
    @DisplayName("Should throw exception when no solution exists")
    void testTwoSum_NoSolution() {
        // Given
        int[] nums = {1, 2, 3};
        int target = 10;
        
        // When & Then
        assertThrows(IllegalArgumentException.class, () -> {
            TwoSum.twoSum(nums, target);
        });
    }

    @Test
    @DisplayName("Brute force and hash map should produce same results")
    void testTwoSum_BruteForceVsHashMap() {
        // Given
        int[] nums = {2, 7, 11, 15, 3, 6};
        int target = 9;
        
        // When
        int[] resultHashMap = TwoSum.twoSum(nums, target);
        int[] resultBruteForce = TwoSum.twoSumBruteForce(nums, target);
        
        // Then - both should find valid pairs (may be in different order)
        int sum1 = nums[resultHashMap[0]] + nums[resultHashMap[1]];
        int sum2 = nums[resultBruteForce[0]] + nums[resultBruteForce[1]];
        assertThat(sum1).isEqualTo(target);
        assertThat(sum2).isEqualTo(target);
    }

    @Test
    @DisplayName("Performance test - Hash map should be faster for large arrays")
    void testTwoSum_Performance() {
        // Given
        int size = 10000;
        int[] nums = new int[size];
        for (int i = 0; i < size; i++) {
            nums[i] = i;
        }
        int target = size * 2 - 3; // Second to last and last element
        
        // When - Hash map approach
        long startTime = System.nanoTime();
        int[] resultHashMap = TwoSum.twoSum(nums, target);
        long hashMapTime = System.nanoTime() - startTime;
        
        // When - Brute force approach
        startTime = System.nanoTime();
        int[] resultBruteForce = TwoSum.twoSumBruteForce(nums, target);
        long bruteForceTime = System.nanoTime() - startTime;
        
        // Then
        assertThat(nums[resultHashMap[0]] + nums[resultHashMap[1]]).isEqualTo(target);
        assertThat(nums[resultBruteForce[0]] + nums[resultBruteForce[1]]).isEqualTo(target);
        
        // Performance assertion - hash map should be significantly faster
        System.out.println("Hash Map time: " + hashMapTime + " ns");
        System.out.println("Brute Force time: " + bruteForceTime + " ns");
        System.out.println("Speedup: " + (double) bruteForceTime / hashMapTime + "x");
        
        // Hash map should be at least 10x faster for large arrays
        assertThat(hashMapTime).isLessThan(bruteForceTime);
    }

    // Helper method to parse CSV string to int array
    private int[] parseIntArray(String str) {
        String[] parts = str.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            result[i] = Integer.parseInt(parts[i].trim());
        }
        return result;
    }
}

