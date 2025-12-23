# LeetCode 题解

这里收录了 LeetCode 平台上的算法题目解决方案，按难度和类型分类。

## 📊 进度统计

| 难度 | 已完成 | 目标 | 进度 |
|------|--------|------|------|
| 🟢 Easy | 1 | 50 | ![](https://progress-bar.dev/2?width=100) |
| 🟡 Medium | 0 | 100 | ![](https://progress-bar.dev/0?width=100) |
| 🔴 Hard | 0 | 50 | ![](https://progress-bar.dev/0?width=100) |

---

## 🟢 Easy 题目

### #1 Two Sum [NEW]

**难度**: Easy  
**标签**: `Array` `Hash Table`  
**通过率**: 48.5%

#### 问题描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值 `target` 的那两个整数，并返回它们的数组下标。

```java
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

#### 解法一：暴力法

```java
public int[] twoSumBruteForce(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[] { i, j };
            }
        }
    }
    throw new IllegalArgumentException("No solution found");
}
```

**复杂度分析**:
- 时间复杂度: O(n²)
- 空间复杂度: O(1)

#### 解法二：哈希表（最优解）

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        
        map.put(nums[i], i);
    }
    
    throw new IllegalArgumentException("No solution found");
}
```

**复杂度分析**:
- 时间复杂度: O(n)
- 空间复杂度: O(n)

#### 💡 思路总结

使用哈希表存储已遍历过的元素及其索引，对于每个元素，检查其补数（target - 当前值）是否在哈希表中。这种方法只需遍历数组一次，时间复杂度为 O(n)。

#### 🔗 相关题目

- [15. 三数之和](https://leetcode.com/problems/3sum/)
- [167. 两数之和 II - 输入有序数组](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

---

## 🟡 Medium 题目

> 即将添加...

---

## 🔴 Hard 题目

> 即将添加...

---

## 📚 学习资源

- [LeetCode 官方题库](https://leetcode.com/problemset/all/)
- [LeetCode 中文题库](https://leetcode.cn/problemset/all/)
- [代码随想录](https://programmercarl.com/)
- [labuladong 的算法小抄](https://labuladong.github.io/algo/)

