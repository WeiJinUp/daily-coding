# 创建型模式

创建型模式关注对象的创建机制，试图以适合情况的方式创建对象。

---

## 📖 模式列表

| 模式 | 状态 | 说明 |
|------|------|------|
| [单例模式](#单例模式) | ✅ 已完成 | 确保一个类只有一个实例 |
| [工厂方法](#工厂方法) | 📝 计划中 | 定义创建对象的接口 |
| [抽象工厂](#抽象工厂) | 📝 计划中 | 创建相关对象家族 |
| [建造者](#建造者) | 📝 计划中 | 分步骤构建复杂对象 |
| [原型](#原型) | 📝 计划中 | 通过克隆创建对象 |

---

## 单例模式 (Singleton) [HOT]

### 🎯 意图

确保一个类只有一个实例，并提供一个全局访问点。

### 🔑 关键点

- 私有构造函数
- 静态实例
- 线程安全

### 💻 实现方式

<!-- tabs:start -->

#### **饿汉式**

```java
/**
 * 饿汉式单例 - 类加载时创建实例
 * 优点：简单、线程安全
 * 缺点：可能造成资源浪费
 */
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();
    
    private EagerSingleton() {
        // 私有构造函数
    }
    
    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}
```

**适用场景**: 实例一定会被使用，且创建成本不高

#### **懒汉式（双重检查锁定）**

```java
/**
 * 懒汉式单例 - 延迟初始化
 * 使用双重检查锁定保证线程安全
 */
public class LazyDoubleCheckSingleton {
    // volatile 确保可见性
    private static volatile LazyDoubleCheckSingleton instance;
    
    private LazyDoubleCheckSingleton() {}
    
    public static LazyDoubleCheckSingleton getInstance() {
        if (instance == null) {  // 第一次检查
            synchronized (LazyDoubleCheckSingleton.class) {
                if (instance == null) {  // 第二次检查
                    instance = new LazyDoubleCheckSingleton();
                }
            }
        }
        return instance;
    }
}
```

**适用场景**: 需要延迟加载且线程安全

#### **静态内部类**

```java
/**
 * 静态内部类单例（推荐）
 * 优点：延迟加载、线程安全、实现简单
 */
public class StaticInnerClassSingleton {
    
    private StaticInnerClassSingleton() {}
    
    private static class SingletonHolder {
        private static final StaticInnerClassSingleton INSTANCE = 
            new StaticInnerClassSingleton();
    }
    
    public static StaticInnerClassSingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

**适用场景**: 大多数情况（推荐使用）

#### **枚举单例**

```java
/**
 * 枚举单例 - 最佳实践（Joshua Bloch 推荐）
 * 优点：简洁、线程安全、防止反序列化和反射攻击
 */
public enum EnumSingleton {
    INSTANCE;
    
    public void doSomething() {
        System.out.println("Enum Singleton");
    }
}

// 使用
EnumSingleton.INSTANCE.doSomething();
```

**适用场景**: 需要绝对保证单例特性

<!-- tabs:end -->

### ⚖️ 优缺点对比

| 实现方式 | 线程安全 | 延迟加载 | 实现难度 | 推荐指数 |
|---------|---------|---------|---------|---------|
| 饿汉式 | ✅ | ❌ | ⭐ | ⭐⭐⭐ |
| 懒汉式（同步） | ✅ | ✅ | ⭐⭐ | ⭐⭐ |
| 双重检查锁定 | ✅ | ✅ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 静态内部类 | ✅ | ✅ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 枚举 | ✅ | ❌ | ⭐ | ⭐⭐⭐⭐⭐ |

### 📝 注意事项

!> **反射破坏**: 除了枚举外，其他实现都可能被反射破坏。如需防御，在构造函数中添加检查。

!> **序列化问题**: 实现 `Serializable` 时需要添加 `readResolve()` 方法，防止反序列化创建新实例。

### 🔗 相关资源

- [源代码](../../src/main/java/designpatterns/singleton/Singleton.java)
- [单元测试](../../src/test/java/designpatterns/singleton/SingletonTest.java)
- [Effective Java - Item 3: Enforce the singleton property with a private constructor or an enum type](https://www.amazon.com/Effective-Java-Joshua-Bloch/dp/0134685997)

---

## 工厂方法 (Factory Method)

> 📝 即将添加...

## 抽象工厂 (Abstract Factory)

> 📝 即将添加...

## 建造者 (Builder)

> 📝 即将添加...

## 原型 (Prototype)

> 📝 即将添加...

