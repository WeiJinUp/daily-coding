# 📜 滑动窗口（Sliding Window）万能通关手册

> 滑动窗口是一种高效的数组/字符串处理技巧，通过维护一个动态的区间来优化时间复杂度

---

## 1. 定长滑动窗口（Fixed Window）

### 适用场景
窗口大小 `k` 固定，求连续区间的和、平均值、字符频率等。

### 核心逻辑
窗口像一节固定长度的火车厢，向前滑动时，**进一个、出一个**。

### 模板代码

```java
/**
 * 定长滑动窗口模板
 */
public void fixedSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    long windowMetric = 0; // 窗口指标：和、计数、哈希等
    
    // 1. 初始化：先填满前 k-1 个元素
    for (int i = 0; i < k - 1; i++) {
        // 更新指标 (入)
        // windowMetric += nums[i]; 
    }
    
    // 2. 滑动：右边界 i 走到最后
    for (int i = k - 1; i < n; i++) {
        // 【入】：新元素进入窗口
        // windowMetric += nums[i]; 
        
        // 【算】：此时窗口大小正好是 k，计算结果
        // result = ... 
        
        // 【出】：最左侧元素准备离开，为下一轮腾位置
        // windowMetric -= nums[i - k + 1]; 
    }
}
```

### 执行步骤
1. **初始化**：先填满前 `k-1` 个元素
2. **滑动**：右边界 `i` 从 `k-1` 走到最后
   - **入**：新元素进入窗口
   - **算**：计算窗口内的结果
   - **出**：最左侧元素离开窗口

---

## 2. 变长滑动窗口（Variable Window / 双指针）

### 适用场景
窗口大小不固定。求满足某个条件的**最长**或**最短**子数组。

### 核心逻辑
窗口像一条会伸缩的蛇。**右边界负责探索，左边界负责追赶**。

### 模板代码

```java
/**
 * 变长滑动窗口模板
 */
public int variableSlidingWindow(int[] nums, int target) {
    int n = nums.length;
    int left = 0;      // 左指针（追赶者）
    int windowMetric = 0;
    int res = 0;       // 或 Integer.MAX_VALUE

    for (int right = 0; right < n; right++) {
        // --- 1. 【入】：右指针元素进场，更新指标 ---
        // windowMetric += nums[right];

        // --- 2. 【缩】：while 循环维持窗口的合法性 ---
        while (/* 满足收缩条件 */) {
            
            // --- 【分支 A】：如果求【最短】区间，在此处更新结果 ---
            // res = Math.min(res, right - left + 1);
            
            // --- 3. 【出】：左指针元素离场，更新指标 ---
            // windowMetric -= nums[left];
            left++;
        }
        
        // --- 【分支 B】：如果求【最长】区间，在此处更新结果 ---
        // res = Math.max(res, right - left + 1);
    }
    return res;
}
```

### 执行步骤
1. **入**：右指针元素进场，更新窗口指标
2. **缩**：`while` 循环维持窗口的合法性
   - 如果求**最短**区间，在 `while` 内部更新结果
3. **出**：左指针元素离场，更新窗口指标
   - 如果求**最长**区间，在 `while` 外部更新结果

---

## 3. 核心差异对比（面试必考点）

| 维度 | 定长窗口 | 变长窗口 |
|------|---------|---------|
| **窗口大小** | 恒定 k | 动态变化 |
| **循环结构** | 单个 for 循环 | for 嵌套 while |
| **出窗条件** | 索引达到 k 之后，每步必出一 | 由业务条件（如和、频率）决定 |
| **求最短结果** | N/A | 在 while 内部更新结果 |
| **求最长结果** | N/A | 在 while 外部更新结果 |

### 关键记忆点
- **定长**：窗口大小固定，单循环，到位置就出
- **变长**：窗口大小动态，双循环，条件触发才出
- **求最短**：在收缩时更新（while 内）
- **求最长**：在扩展后更新（while 外）

---

## 4. 性能优化 Tip：字符哈希数组

在处理字符串时，不要无脑使用 `HashMap<Character, Integer>`，建议使用以下方案提高 **10 倍性能**：

```java
// ASCII 字符（128个）或扩展 ASCII（256个）
int[] cnt = new int[128]; 

// 入窗
cnt[s.charAt(right)]++; 

// 出窗
cnt[s.charAt(left)]--; 
```

### 优势对比

| 方案 | 时间复杂度 | 空间复杂度 | 性能 |
|------|-----------|-----------|------|
| `HashMap<Character, Integer>` | O(1) 平均 | O(n) | 较慢（哈希计算开销） |
| `int[] cnt = new int[128]` | O(1) | O(128) 常量 | **快 10 倍**（数组直接访问） |

---

## 5. 易错点备忘录

### ⚠️ 初始化错误
- **求最小值（Min）**：`res` 初始化为 `Integer.MAX_VALUE`
- **求最大值（Max）**：`res` 初始化为 `0` 或 `Integer.MIN_VALUE`

```java
// ❌ 错误示例
int minLen = 0; // 求最小时应该初始化为 MAX_VALUE

// ✅ 正确示例
int minLen = Integer.MAX_VALUE;
int maxLen = 0;
```

### ⚠️ 溢出问题
累加和如果可能超过 `2 × 10⁹`，必须使用 `long` 类型维护 `windowSum`。

```java
// ❌ 可能溢出
int windowSum = 0;

// ✅ 防止溢出
long windowSum = 0;
```

### ⚠️ 空指针/越界
在开始滑窗前，先检查边界条件。

```java
// ✅ 边界检查
if (nums == null || nums.length < k) {
    return -1; // 或其他默认值
}
```

### ⚠️ 窗口长度计算错误
窗口长度 = `right - left + 1`（注意 +1）

```java
// ❌ 错误
int len = right - left;

// ✅ 正确
int len = right - left + 1;
```

---

## 6. 典型例题

### 定长窗口例题
- [LeetCode 643. 子数组最大平均数 I](https://leetcode.cn/problems/maximum-average-subarray-i/)
- [LeetCode 1456. 定长子串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)
- [LeetCode 567. 字符串的排列](https://leetcode.cn/problems/permutation-in-string/)

### 变长窗口例题
- [LeetCode 3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
- [LeetCode 209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)
- [LeetCode 76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)

---

## 7. 总结

### 何时使用滑动窗口？
满足以下特征之一：
1. **连续子数组/子串**问题
2. 需要**优化暴力双层循环**（O(n²) → O(n)）
3. 问题描述中出现"**连续**"、"**窗口**"、"**区间**"等关键词

### 解题三步走
1. **判断类型**：定长 or 变长？
2. **套用模板**：入 → 算/缩 → 出
3. **调整细节**：更新指标、更新结果的时机

### 时间复杂度
- **定长窗口**：O(n)
- **变长窗口**：O(n)（虽然有嵌套 while，但每个元素最多进出一次）

---

> 💡 **记住**：滑动窗口的本质是**避免重复计算**，通过维护窗口状态，将 O(n²) 优化为 O(n)。

掌握这份手册，滑动窗口问题不再是难题！🚀

