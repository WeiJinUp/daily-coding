# 🛠️ Utilities

A collection of battle-tested, reusable utility classes and code snippets for everyday Java development.

## 🎯 Purpose

This directory contains:
- **Production-ready utilities**: Code that can be used in real projects
- **Common operations**: Solutions to frequently encountered tasks
- **Best practices**: Demonstrating clean, efficient Java code
- **Time-savers**: Reducing boilerplate in daily development

## 📂 Categories

### String Utilities
```java
StringUtils.java
- isEmpty/isNotEmpty
- capitalize/uncapitalize
- truncate with ellipsis
- removeWhitespace
- isPalindrome
```

### Collection Utilities
```java
CollectionUtils.java
- nullSafeList/Set/Map
- partition collections
- intersection/union/difference
- findDuplicates
- shuffle and sample
```

### Date & Time Utilities
```java
DateTimeUtils.java
- formatters for common patterns
- duration calculations
- time zone conversions
- business day calculations
- relative time formatting
```

### File & I/O Utilities
```java
FileUtils.java
- safe file reading/writing
- recursive directory operations
- file extension handling
- file size formatting
- checksum calculations
```

### Validation Utilities
```java
ValidationUtils.java
- email validation
- phone number validation
- URL validation
- credit card format check
- password strength check
```

### JSON & Serialization
```java
JsonUtils.java
- JSON parsing and generation
- Pretty printing
- Safe deserialization
- Type conversions
```

## 🚀 Usage Examples

### String Utilities
```java
// Truncate long text
String summary = StringUtils.truncate(longText, 100, "...");

// Check if string is empty (null-safe)
if (StringUtils.isEmpty(input)) {
    // handle empty case
}
```

### Collection Utilities
```java
// Partition a list
List<List<Integer>> batches = CollectionUtils.partition(largeList, 100);

// Find duplicates
Set<String> duplicates = CollectionUtils.findDuplicates(list);
```

### Date & Time Utilities
```java
// Format relative time
String timeAgo = DateTimeUtils.getRelativeTime(timestamp); // "2 hours ago"

// Calculate business days
int workDays = DateTimeUtils.businessDaysBetween(start, end);
```

## ✅ Code Quality Standards

All utilities follow these principles:

1. **Null-safe**: Handle null inputs gracefully
2. **Immutable**: Don't modify input parameters
3. **Well-tested**: Each method should be unit-testable
4. **Documented**: Clear JavaDoc comments
5. **Efficient**: Optimized for common use cases
6. **No dependencies**: Use only Java standard library (when possible)

## 📝 Naming Conventions

- `is*()` - boolean checks (e.g., `isEmpty()`)
- `has*()` - existence checks (e.g., `hasContent()`)
- `get*()` - retrieve values (e.g., `getFirstNonNull()`)
- `to*()` - conversions (e.g., `toUpperCase()`)
- `find*()` - search operations (e.g., `findMax()`)
- `create*()` - factory methods (e.g., `createEmptyList()`)

## 🎓 Best Practices Demonstrated

### Defensive Programming
```java
public static boolean isEmpty(String str) {
    return str == null || str.trim().isEmpty();
}
```

### Fluent Interfaces
```java
String result = StringUtils.builder()
    .append("Hello")
    .appendIf(condition, " World")
    .trim()
    .build();
```

### Generic Methods
```java
public static <T> T getFirstNonNull(T... items) {
    for (T item : items) {
        if (item != null) return item;
    }
    return null;
}
```

## 🔧 How to Use

Each utility class is independent and can be copied directly into your project:

```bash
# Compile a utility class
javac StringUtils.java

# Or integrate into your project
# Just copy the file to your src directory
```

## 📚 Inspiration Sources

- Apache Commons Lang
- Google Guava
- Spring Framework Utilities
- Personal development experience

## ⚠️ Important Notes

- **Not a library**: These are educational examples and starting points
- **Production use**: Review and adapt to your specific needs
- **Dependencies**: Some utilities may benefit from external libraries in production
- **Performance**: For high-performance scenarios, consider specialized libraries

## 🚀 Future Additions

Planned utility categories:
- Network utilities (HTTP, socket)
- Cryptography utilities (hashing, encryption)
- Concurrency utilities (thread pools, locks)
- Math utilities (statistics, rounding)
- Reflection utilities (bean manipulation)

---

**Philosophy**: Write utilities that you would be happy to see in production code. Quality over quantity.

