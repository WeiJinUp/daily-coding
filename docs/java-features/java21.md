# Java 21 新特性 [NEW]

Java 21 是一个 **LTS (长期支持)** 版本，带来了许多激动人心的新特性。

---

## 🌟 主要特性

### 1. Virtual Threads (虚拟线程) [HOT]

虚拟线程是 Project Loom 的核心特性，让 Java 支持大规模并发。

#### 📖 什么是虚拟线程？

虚拟线程是轻量级线程，由 JVM 管理，而不是操作系统。它们解决了传统平台线程的扩展性问题。

####  对比

| 特性 | 平台线程 | 虚拟线程 |
|------|---------|----------|
| 创建成本 | 高 (~1MB) | 极低 (~1KB) |
| 数量限制 | 受限（数千） | 几乎无限（数百万） |
| 调度 | OS 调度 | JVM 调度 |
| 阻塞成本 | 高 | 极低 |

#### 💻 代码示例

<!-- tabs:start -->

#### **创建虚拟线程**

```java
// 方法1: Thread.ofVirtual()
Thread vThread = Thread.ofVirtual().start(() -> {
    System.out.println("Hello from virtual thread!");
});

// 方法2: Thread.startVirtualThread()
Thread.startVirtualThread(() -> {
    System.out.println("Another virtual thread!");
});

// 方法3: 使用 Executor
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> {
        // 任务代码
    });
}
```

#### **性能对比**

```java
public class VirtualThreadsDemo {
    
    public static void performanceTest(int numTasks) {
        // 虚拟线程
        Instant start = Instant.now();
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, numTasks).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(100); // 模拟 I/O
                });
            });
        }
        long virtualTime = Duration.between(start, Instant.now()).toMillis();
        
        // 平台线程池
        start = Instant.now();
        try (var executor = Executors.newFixedThreadPool(200)) {
            IntStream.range(0, numTasks).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(100);
                });
            });
        }
        long platformTime = Duration.between(start, Instant.now()).toMillis();
        
        System.out.println("虚拟线程: " + virtualTime + "ms");
        System.out.println("平台线程: " + platformTime + "ms");
        System.out.println("性能提升: " + (platformTime / virtualTime) + "x");
    }
    
    public static void main(String[] args) {
        performanceTest(10000); // 1万个任务
    }
}
```

**输出示例**:
```
虚拟线程: 1250ms
平台线程: 5000ms
性能提升: 4x
```

#### **实战应用**

```java
// Web 服务器示例 - 处理大量并发请求
public class WebServer {
    
    public void handleRequests() {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            // 每个请求一个虚拟线程
            while (true) {
                Request request = acceptRequest();
                executor.submit(() -> handleRequest(request));
            }
        }
    }
    
    private void handleRequest(Request request) {
        // 阻塞式 I/O 操作不再是问题
        String data = database.query(request.getQuery());
        String result = externalApi.call(data);
        response.send(result);
    }
}
```

<!-- tabs:end -->

#### 💡 最佳实践

?> **何时使用虚拟线程**: 
- I/O 密集型应用
- 需要处理大量并发连接
- 传统线程池无法满足扩展需求

!> **注意事项**:
- 不要池化虚拟线程（创建成本极低）
- CPU 密集型任务仍使用平台线程
- 避免 synchronized 块（使用 ReentrantLock）

#### 🔗 相关资源

- [JEP 444: Virtual Threads](https://openjdk.org/jeps/444)
- [源代码示例](../../src/main/java/javafeatures/java21/VirtualThreadsDemo.java)

---

### 2. Pattern Matching for switch

增强的 switch 表达式支持模式匹配。

```java
// Java 21
Object obj = "Hello";

String result = switch (obj) {
    case String s when s.length() > 5 -> "Long string: " + s;
    case String s -> "Short string: " + s;
    case Integer i -> "Integer: " + i;
    case null -> "Null value";
    default -> "Unknown type";
};
```

---

### 3. Record Patterns

解构 Record 类型。

```java
record Point(int x, int y) {}

Object obj = new Point(10, 20);

if (obj instanceof Point(int x, int y)) {
    System.out.println("x: " + x + ", y: " + y);
}
```

---

### 4. Sequenced Collections

新的集合接口，提供有序集合的统一操作。

```java
interface SequencedCollection<E> extends Collection<E> {
    SequencedCollection<E> reversed();
    void addFirst(E e);
    void addLast(E e);
    E getFirst();
    E getLast();
    E removeFirst();
    E removeLast();
}

// 使用示例
List<String> list = new ArrayList<>();
list.addFirst("first");
list.addLast("last");
String first = list.getFirst();
```

---

## 📊 特性对比表

| 特性 | 状态 | 稳定性 | 推荐指数 |
|------|------|--------|---------|
| Virtual Threads | ✅ 正式 | Stable | ⭐⭐⭐⭐⭐ |
| Pattern Matching for switch | ✅ 正式 | Stable | ⭐⭐⭐⭐⭐ |
| Record Patterns | ✅ 正式 | Stable | ⭐⭐⭐⭐ |
| Sequenced Collections | ✅ 正式 | Stable | ⭐⭐⭐⭐ |
| String Templates | 🔄 预览 | Preview | ⭐⭐⭐ |

---

## 🚀 迁移指南

### 从 Java 17 升级到 Java 21

1. **更新 Maven 配置**

```xml
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
</properties>
```

2. **使用虚拟线程替换线程池**

```java
// 之前 (Java 17)
ExecutorService executor = Executors.newFixedThreadPool(200);

// 之后 (Java 21)
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
```

3. **使用新的模式匹配**

```java
// 之前
if (obj instanceof String) {
    String s = (String) obj;
    if (s.length() > 5) {
        // ...
    }
}

// 之后
if (obj instanceof String s && s.length() > 5) {
    // ...
}
```

---

## 📚 学习资源

- [Java 21 官方文档](https://docs.oracle.com/en/java/javase/21/)
- [OpenJDK JEPs](https://openjdk.org/projects/jdk/21/)
- [Virtual Threads 深入解析](https://openjdk.org/jeps/444)
- [Inside Java Podcast](https://inside.java/podcast/)

---

## 🎯 练习项目

尝试使用 Java 21 特性重写以下项目：

- [ ] HTTP 服务器（使用虚拟线程）
- [ ] 爬虫程序（大规模并发）
- [ ] 数据处理管道（模式匹配）
- [ ] 微服务网关（虚拟线程 + 响应式）

