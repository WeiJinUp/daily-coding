# 📜 单序列双指针（Two Pointers）完整指南

> 双指针是一种高效的数组/链表处理技巧，通过两个指针的协同移动来优化时间复杂度和空间复杂度

---

## 1. 什么是单序列双指针？

**定义**：在同一个序列（数组、字符串、链表）中使用两个指针，通过协同移动来解决问题。

**核心优势**：
- ⚡ 时间优化：O(n²) → O(n)
- 💾 空间优化：避免使用额外的数据结构
- 🎯 逻辑清晰：指针移动规则明确

---

## 2. 三大经典模式

### 2.1 对撞指针（Collision Pointers）

#### 适用场景
- 有序数组的查找问题
- 回文串判断
- 反转问题
- 两数之和（有序数组）

#### 核心逻辑
两个指针分别从序列的**两端**向**中间**移动，直到相遇。

#### 模板代码

```java
/**
 * 对撞指针模板
 */
public void collisionPointers(int[] nums) {
    int left = 0;              // 左指针：从头开始
    int right = nums.length - 1; // 右指针：从尾开始
    
    while (left < right) {
        // 根据条件判断，决定移动哪个指针
        
        if (/* 满足某个条件 */) {
            // 处理逻辑
            // ...
            return; // 或 break
        } else if (/* nums[left] + nums[right] < target */) {
            left++;  // 左指针右移
        } else {
            right--; // 右指针左移
        }
    }
}
```

#### 执行步骤
1. **初始化**：`left = 0`, `right = n - 1`
2. **循环条件**：`left < right`（相遇即停止）
3. **移动规则**：根据业务逻辑决定移动哪个指针
4. **终止条件**：找到答案或指针相遇

#### 经典例题

**LeetCode 167. 两数之和 II - 输入有序数组**

```java
public int[] twoSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            return new int[]{left + 1, right + 1}; // 题目要求返回索引+1
        } else if (sum < target) {
            left++;  // 和太小，左指针右移增大和
        } else {
            right--; // 和太大，右指针左移减小和
        }
    }
    return new int[]{-1, -1};
}
```

**LeetCode 125. 验证回文串**

```java
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        // 跳过非字母数字字符
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
            left++;
        }
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
            right--;
        }
        
        // 比较字符（忽略大小写）
        if (Character.toLowerCase(s.charAt(left)) != 
            Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        
        left++;
        right--;
    }
    return true;
}
```

---

### 2.2 快慢指针（Fast-Slow Pointers）

#### 适用场景
- 链表环检测（Floyd 判圈算法）
- 链表中点查找
- 删除倒数第 N 个节点
- 判断链表是否有环
- 原地数组去重

#### 核心逻辑
两个指针以**不同速度**移动，快指针每次移动 2 步，慢指针每次移动 1 步。

#### 模板代码

**链表问题模板**

```java
/**
 * 快慢指针模板 - 链表
 */
public ListNode fastSlowPointers(ListNode head) {
    if (head == null || head.next == null) {
        return null;
    }
    
    ListNode slow = head;      // 慢指针：一次走 1 步
    ListNode fast = head;      // 快指针：一次走 2 步
    
    while (fast != null && fast.next != null) {
        slow = slow.next;       // 慢指针移动 1 步
        fast = fast.next.next;  // 快指针移动 2 步
        
        // 根据业务逻辑判断
        if (slow == fast) {
            // 快慢指针相遇（如：检测到环）
            return slow;
        }
    }
    
    return slow; // 或其他返回值
}
```

**数组问题模板**

```java
/**
 * 快慢指针模板 - 数组去重
 */
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    
    int slow = 0;  // 慢指针：指向不重复元素的位置
    
    for (int fast = 1; fast < nums.length; fast++) { // 快指针：扫描数组
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1; // 返回新数组长度
}
```

#### 执行步骤
1. **初始化**：两个指针都从起点开始
2. **移动规则**：
   - 快指针：每次移动 2 步（或固定步长）
   - 慢指针：每次移动 1 步
3. **终止条件**：快指针到达末尾或满足特定条件

#### 经典例题

**LeetCode 141. 环形链表**

```java
public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head.next;
    
    while (slow != fast) {
        if (fast == null || fast.next == null) {
            return false; // 快指针到达末尾，无环
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return true; // 快慢指针相遇，有环
}
```

**LeetCode 876. 链表的中间节点**

```java
public ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    
    // 当 fast 到达末尾时，slow 正好在中间
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}
```

**LeetCode 26. 删除有序数组中的重复项**

```java
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    
    int slow = 0;
    
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}
```

---

### 2.3 分离双指针（Partition Pointers）

#### 适用场景
- 数组分区（快速排序的分区过程）
- 移动零到末尾
- 颜色分类（荷兰国旗问题）
- 奇偶数分离

#### 核心逻辑
一个指针用于**扫描**，另一个指针用于**标记边界**，将数组分成两部分。

#### 模板代码

```java
/**
 * 分离双指针模板
 */
public void partitionPointers(int[] nums) {
    int boundary = 0; // 边界指针：标记分区边界
    
    for (int i = 0; i < nums.length; i++) { // 扫描指针
        if (/* 满足条件 */) {
            // 交换元素，将满足条件的元素移到边界左侧
            swap(nums, boundary, i);
            boundary++; // 边界右移
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}
```

#### 执行步骤
1. **初始化**：`boundary = 0`（边界指针）
2. **扫描**：用 `i` 遍历整个数组
3. **分区**：满足条件的元素交换到边界左侧，边界右移
4. **结果**：数组被分成两部分

#### 经典例题

**LeetCode 283. 移动零**

```java
public void moveZeroes(int[] nums) {
    int boundary = 0; // 边界：非零元素的位置
    
    // 将所有非零元素移到前面
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[boundary] = nums[i];
            boundary++;
        }
    }
    
    // 将边界后的元素全部置为 0
    for (int i = boundary; i < nums.length; i++) {
        nums[i] = 0;
    }
}
```

**优化版本（减少写操作）**

```java
public void moveZeroes(int[] nums) {
    int boundary = 0;
    
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            if (i != boundary) { // 避免不必要的交换
                swap(nums, boundary, i);
            }
            boundary++;
        }
    }
}
```

**LeetCode 75. 颜色分类（荷兰国旗问题）**

```java
public void sortColors(int[] nums) {
    int left = 0;   // 0 的右边界
    int right = nums.length - 1; // 2 的左边界
    int i = 0;      // 当前扫描位置
    
    while (i <= right) {
        if (nums[i] == 0) {
            swap(nums, i, left);
            left++;
            i++;
        } else if (nums[i] == 2) {
            swap(nums, i, right);
            right--;
            // 注意：i 不动，因为交换来的元素还未检查
        } else {
            i++; // nums[i] == 1，继续扫描
        }
    }
}
```

---

## 3. 核心差异对比

| 模式 | 初始位置 | 移动方向 | 移动速度 | 典型应用 |
|------|---------|---------|---------|---------|
| **对撞指针** | 两端 | 相向而行 | 根据条件 | 有序数组查找、回文判断 |
| **快慢指针** | 同起点 | 同向 | 快2倍/慢1倍 | 链表环检测、中点查找、数组去重 |
| **分离双指针** | 同起点 | 同向 | 一个扫描/一个标记 | 数组分区、元素移动 |

---

## 4. 适用条件判断

### 何时使用对撞指针？
✅ 数组**有序**或可以排序  
✅ 需要在两端寻找满足条件的元素  
✅ 问题涉及**对称性**（如回文）  

### 何时使用快慢指针？
✅ 链表问题（环检测、中点、倒数第N个）  
✅ 数组去重（保持原有顺序）  
✅ 需要找到**特殊位置**（如中点）  

### 何时使用分离双指针？
✅ 需要**原地**调整数组顺序  
✅ 将数组分成两类（满足条件/不满足条件）  
✅ 要求 O(1) 空间复杂度  

---

## 5. 性能分析

### 时间复杂度
- **对撞指针**：O(n) - 每个元素最多访问一次
- **快慢指针**：O(n) - 最多遍历整个序列
- **分离双指针**：O(n) - 单次遍历

### 空间复杂度
- 所有模式均为 **O(1)** - 只使用固定数量的指针

### 优势对比

| 方案 | 暴力解法 | 双指针优化 |
|------|---------|-----------|
| **时间复杂度** | O(n²) | O(n) |
| **空间复杂度** | O(n)（可能需要额外空间） | O(1) |
| **代码复杂度** | 嵌套循环 | 单层循环 |

---

## 6. 易错点备忘录

### ⚠️ 指针越界
```java
// ❌ 错误：没有检查边界
while (left < right) {
    fast = fast.next.next; // 可能空指针
}

// ✅ 正确：检查边界
while (fast != null && fast.next != null) {
    fast = fast.next.next;
}
```

### ⚠️ 循环条件错误
```java
// ❌ 错误：对撞指针使用 <=
while (left <= right) { // 可能导致重复处理中间元素
    // ...
}

// ✅ 正确：根据需求选择
while (left < right) { // 回文判断、两数之和等
    // ...
}

while (left <= right) { // 二分查找
    // ...
}
```

### ⚠️ 指针移动时机错误
```java
// ❌ 错误：荷兰国旗问题中，交换后立即移动 i
if (nums[i] == 2) {
    swap(nums, i, right);
    right--;
    i++; // 错误！交换来的元素还未检查
}

// ✅ 正确：交换后不移动 i
if (nums[i] == 2) {
    swap(nums, i, right);
    right--;
    // i 不动，下次循环继续检查 nums[i]
}
```

### ⚠️ 链表指针丢失
```java
// ❌ 错误：直接修改指针导致链表断裂
ListNode temp = head;
head = head.next; // 丢失了原来的 head
temp.next = null;

// ✅ 正确：使用额外变量保存
ListNode dummy = new ListNode(0);
dummy.next = head;
ListNode prev = dummy;
```

---

## 7. 典型例题分类

### 对撞指针例题
- [LeetCode 167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)
- [LeetCode 125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)
- [LeetCode 344. 反转字符串](https://leetcode.cn/problems/reverse-string/)
- [LeetCode 11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)
- [LeetCode 15. 三数之和](https://leetcode.cn/problems/3sum/)

### 快慢指针例题
- [LeetCode 141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)
- [LeetCode 142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)
- [LeetCode 876. 链表的中间节点](https://leetcode.cn/problems/middle-of-the-linked-list/)
- [LeetCode 19. 删除链表的倒数第 N 个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)
- [LeetCode 26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

### 分离双指针例题
- [LeetCode 283. 移动零](https://leetcode.cn/problems/move-zeroes/)
- [LeetCode 27. 移除元素](https://leetcode.cn/problems/remove-element/)
- [LeetCode 75. 颜色分类](https://leetcode.cn/problems/sort-colors/)
- [LeetCode 905. 按奇偶排序数组](https://leetcode.cn/problems/sort-array-by-parity/)

---

## 8. 解题三步走

### Step 1：识别模式
- 是否在**同一序列**中操作？ → 考虑双指针
- 是否需要**两端向中间**？ → 对撞指针
- 是否涉及**链表**或需要找**特殊位置**？ → 快慢指针
- 是否需要**原地分区**？ → 分离双指针

### Step 2：套用模板
- 初始化指针位置
- 确定循环条件
- 明确指针移动规则
- 处理边界情况

### Step 3：优化细节
- 避免不必要的操作
- 处理特殊输入（空、单元素）
- 注意指针越界
- 验证循环不变式

---

## 9. 总结

### 核心思想
双指针的本质是**通过两个指针的协同移动，减少不必要的重复访问**，将暴力 O(n²) 优化为 O(n)。

### 记忆口诀
- **对撞指针**：两端相向，查找配对
- **快慢指针**：同向异速，定位特殊
- **分离双指针**：扫描标记，原地分区

### 适用特征
1. 在**单个序列**中操作
2. 需要**优化时间复杂度**（O(n²) → O(n)）
3. 要求**原地操作**（O(1) 空间）
4. 问题涉及**相对位置**或**区间**

---

> 💡 **记住**：双指针不仅仅是技巧，更是一种**思维方式**。掌握指针移动的规律，就能高效解决大部分数组和链表问题！🚀

