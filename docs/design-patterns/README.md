# 🎨 Design Patterns

Classic Gang of Four design patterns implemented in Java, demonstrating best practices for object-oriented software design.

## 📖 What Are Design Patterns?

Design patterns are **reusable solutions** to common problems in software design. They represent best practices evolved over time by experienced developers.

### Benefits
- ✅ **Proven solutions**: Battle-tested approaches
- ✅ **Common vocabulary**: Communicate design ideas effectively
- ✅ **Flexibility**: Easier to modify and extend code
- ✅ **Best practices**: Embody SOLID principles

## 🗂️ Pattern Categories

### Creational Patterns (5)
Focus on **object creation mechanisms**:

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Singleton** | Ensure only one instance exists | Global configuration, logging |
| **Factory Method** | Create objects without specifying exact class | Object type determined at runtime |
| **Abstract Factory** | Create families of related objects | Multiple product families |
| **Builder** | Construct complex objects step-by-step | Many constructor parameters |
| **Prototype** | Clone existing objects | Object creation is expensive |

### Structural Patterns (7)
Focus on **object composition**:

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Adapter** | Make incompatible interfaces work together | Integrate legacy code |
| **Bridge** | Separate abstraction from implementation | Avoid class explosion |
| **Composite** | Treat individual and composite objects uniformly | Tree structures |
| **Decorator** | Add responsibilities dynamically | Flexible alternative to subclassing |
| **Facade** | Provide simplified interface to complex system | Hide complexity |
| **Flyweight** | Share objects to save memory | Many similar objects |
| **Proxy** | Control access to another object | Lazy loading, access control |

### Behavioral Patterns (11)
Focus on **communication between objects**:

| Pattern | Purpose | Use When |
|---------|---------|----------|
| **Chain of Responsibility** | Pass request along handler chain | Multiple handlers possible |
| **Command** | Encapsulate request as object | Queue, log, or undo operations |
| **Iterator** | Access elements sequentially | Traverse collections |
| **Mediator** | Centralize complex communications | Reduce coupling |
| **Memento** | Capture and restore object state | Undo functionality |
| **Observer** | Notify dependents of state changes | Event-driven systems |
| **State** | Alter behavior when state changes | State machines |
| **Strategy** | Encapsulate interchangeable algorithms | Runtime algorithm selection |
| **Template Method** | Define algorithm skeleton | Subclasses override steps |
| **Visitor** | Separate algorithm from object structure | Operations on object structures |
| **Interpreter** | Implement language grammar | Domain-specific languages |

## 📁 Directory Structure

```
design-patterns/
├── creational/
│   ├── singleton/
│   │   ├── Singleton.java
│   │   ├── ThreadSafeSingleton.java
│   │   └── README.md
│   ├── factory/
│   └── builder/
├── structural/
│   ├── adapter/
│   ├── decorator/
│   └── proxy/
└── behavioral/
    ├── observer/
    ├── strategy/
    └── command/
```

## 🎯 Implementation Guidelines

Each pattern implementation includes:

1. **Problem Statement**: What problem does this solve?
2. **UML Diagram**: Visual representation (in comments)
3. **Implementation**: Clean, commented Java code
4. **Usage Example**: Practical demonstration
5. **When to Use/Avoid**: Decision criteria

## 🚀 How to Use

Each pattern directory is self-contained:

```bash
# Navigate to pattern directory
cd design-patterns/singleton

# Compile and run
javac Singleton.java
java Singleton
```

## ⚠️ Important Notes

- **Patterns are not silver bullets**: Don't force them where unnecessary
- **Favor composition over inheritance**: Many patterns demonstrate this
- **SOLID principles**: Patterns embody these fundamental principles
- **Context matters**: Same problem, different contexts → different patterns

## 📚 Learning Resources

- *Design Patterns: Elements of Reusable Object-Oriented Software* (Gang of Four)
- *Head First Design Patterns* by Freeman & Robson
- [Refactoring.Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [SourceMaking - Design Patterns](https://sourcemaking.com/design_patterns)

## 🎓 Study Approach

1. **Understand the problem** the pattern solves
2. **Study the structure** (classes and relationships)
3. **Implement it yourself** (don't just copy)
4. **Identify real-world uses** in frameworks you use
5. **Know when NOT to use it**

---

**Remember**: "Patterns are not meant to be converted into code directly. They are templates for solving problems that can be used in many different situations." — Gang of Four

