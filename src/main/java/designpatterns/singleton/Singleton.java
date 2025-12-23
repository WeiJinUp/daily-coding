package designpatterns.singleton;

/**
 * Singleton Design Pattern
 * 
 * Intent:
 * Ensure a class has only one instance and provide a global point of access to it.
 * 
 * Motivation:
 * - Some classes should have exactly one instance (e.g., database connection pool,
 *   configuration manager, logging service)
 * - The class itself should be responsible for keeping track of its sole instance
 * 
 * When to Use:
 * ✓ Exactly one instance of a class is needed
 * ✓ Global access point is required
 * ✓ The instance should be extensible by subclassing
 * 
 * When NOT to Use:
 * ✗ If you need multiple instances in the future
 * ✗ In environments with multiple class loaders
 * ✗ When it makes testing difficult (consider dependency injection instead)
 * 
 * Thread Safety Considerations:
 * This file shows multiple implementations with different thread safety guarantees.
 */

// ============================================================================
// Implementation 1: Eager Initialization (Thread-Safe)
// ============================================================================

/**
 * Pros: Simple, thread-safe, no synchronization overhead
 * Cons: Instance created even if never used (may waste resources)
 * 
 * Best for: Lightweight objects that are always needed
 */
class EagerSingleton {
    // Instance created at class loading time
    private static final EagerSingleton INSTANCE = new EagerSingleton();

    private EagerSingleton() {
        // Private constructor prevents instantiation
        System.out.println("EagerSingleton instance created");
    }

    public static EagerSingleton getInstance() {
        return INSTANCE;
    }

    public void doSomething() {
        System.out.println("EagerSingleton doing something...");
    }
}

// ============================================================================
// Implementation 2: Lazy Initialization (NOT Thread-Safe)
// ============================================================================

/**
 * Pros: Instance created only when needed
 * Cons: NOT thread-safe! Multiple threads may create multiple instances
 * 
 * Best for: Single-threaded applications only
 */
class LazySingleton {
    private static LazySingleton instance;

    private LazySingleton() {
        System.out.println("LazySingleton instance created");
    }

    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }

    public void doSomething() {
        System.out.println("LazySingleton doing something...");
    }
}

// ============================================================================
// Implementation 3: Thread-Safe Lazy Initialization (Synchronized)
// ============================================================================

/**
 * Pros: Thread-safe, lazy initialization
 * Cons: Synchronization overhead on every call (slow)
 * 
 * Best for: Rarely accessed singletons where thread safety is critical
 */
class SynchronizedSingleton {
    private static SynchronizedSingleton instance;

    private SynchronizedSingleton() {
        System.out.println("SynchronizedSingleton instance created");
    }

    public static synchronized SynchronizedSingleton getInstance() {
        if (instance == null) {
            instance = new SynchronizedSingleton();
        }
        return instance;
    }

    public void doSomething() {
        System.out.println("SynchronizedSingleton doing something...");
    }
}

// ============================================================================
// Implementation 4: Double-Checked Locking (Recommended)
// ============================================================================

/**
 * Pros: Thread-safe, lazy initialization, minimal synchronization overhead
 * Cons: Slightly more complex code
 * 
 * Best for: Most production scenarios requiring lazy initialization
 * 
 * Note: 'volatile' keyword is essential for correct behavior in Java
 */
class DoubleCheckedSingleton {
    // volatile ensures visibility across threads
    private static volatile DoubleCheckedSingleton instance;

    private DoubleCheckedSingleton() {
        System.out.println("DoubleCheckedSingleton instance created");
    }

    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) { // First check (no locking)
            synchronized (DoubleCheckedSingleton.class) {
                if (instance == null) { // Second check (with locking)
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }

    public void doSomething() {
        System.out.println("DoubleCheckedSingleton doing something...");
    }
}

// ============================================================================
// Implementation 5: Bill Pugh Singleton (Best Practice)
// ============================================================================

/**
 * Pros: Lazy initialization, thread-safe, no synchronization, elegant
 * Cons: None really!
 * 
 * Best for: Most production scenarios (RECOMMENDED)
 * 
 * How it works:
 * - Inner static class is not loaded until getInstance() is called
 * - JVM guarantees thread-safe initialization of static fields
 * - Combines benefits of eager and lazy initialization
 */
class BillPughSingleton {
    private BillPughSingleton() {
        System.out.println("BillPughSingleton instance created");
    }

    // Static inner class - inner classes are not loaded until referenced
    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }

    public void doSomething() {
        System.out.println("BillPughSingleton doing something...");
    }
}

// ============================================================================
// Implementation 6: Enum Singleton (Joshua Bloch's Approach)
// ============================================================================

/**
 * Pros: 
 * - Thread-safe by default
 * - Prevents reflection attacks
 * - Prevents serialization issues
 * - Most concise implementation
 * 
 * Cons: Can't extend a class (but can implement interfaces)
 * 
 * Best for: When you need absolute guarantee of singleton property
 * 
 * Joshua Bloch (Effective Java): "This approach is functionally equivalent
 * to the public field approach, except that it is more concise, provides
 * the serialization machinery for free, and provides an ironclad guarantee
 * against multiple instantiation, even in the face of sophisticated
 * serialization or reflection attacks."
 */
enum EnumSingleton {
    INSTANCE;

    EnumSingleton() {
        System.out.println("EnumSingleton instance created");
    }

    public void doSomething() {
        System.out.println("EnumSingleton doing something...");
    }
}

// ============================================================================
// Demo and Testing
// ============================================================================

public class Singleton {
    public static void main(String[] args) {
        System.out.println("=== Singleton Pattern Demonstration ===\n");

        // Test 1: Eager Singleton
        System.out.println("1. Eager Singleton:");
        EagerSingleton eager1 = EagerSingleton.getInstance();
        EagerSingleton eager2 = EagerSingleton.getInstance();
        System.out.println("Same instance? " + (eager1 == eager2));
        System.out.println();

        // Test 2: Bill Pugh Singleton (Recommended)
        System.out.println("2. Bill Pugh Singleton:");
        BillPughSingleton bp1 = BillPughSingleton.getInstance();
        BillPughSingleton bp2 = BillPughSingleton.getInstance();
        System.out.println("Same instance? " + (bp1 == bp2));
        System.out.println();

        // Test 3: Enum Singleton (Most robust)
        System.out.println("3. Enum Singleton:");
        EnumSingleton enum1 = EnumSingleton.INSTANCE;
        EnumSingleton enum2 = EnumSingleton.INSTANCE;
        System.out.println("Same instance? " + (enum1 == enum2));
        enum1.doSomething();
        System.out.println();

        // Test 4: Thread Safety Test
        System.out.println("4. Thread Safety Test:");
        testThreadSafety();
    }

    private static void testThreadSafety() {
        Runnable task = () -> {
            DoubleCheckedSingleton instance = DoubleCheckedSingleton.getInstance();
            System.out.println(Thread.currentThread().getName() + 
                ": " + instance.hashCode());
        };

        Thread t1 = new Thread(task, "Thread-1");
        Thread t2 = new Thread(task, "Thread-2");
        Thread t3 = new Thread(task, "Thread-3");

        t1.start();
        t2.start();
        t3.start();
    }
}

/**
 * Key Takeaways:
 * 
 * 1. Bill Pugh Singleton is the recommended approach for most cases
 * 2. Enum Singleton is best when you need absolute guarantee
 * 3. Always consider if you really need a Singleton (can make testing hard)
 * 4. In modern applications, consider Dependency Injection frameworks
 * 5. Be aware of serialization and reflection attacks
 * 
 * Real-world Examples:
 * - java.lang.Runtime (Enum-like singleton)
 * - Spring Framework beans (default scope is singleton)
 * - Database connection pools
 * - Configuration managers
 * - Logger instances
 * 
 * Alternatives to Consider:
 * - Dependency Injection (Spring, Guice)
 * - Factory pattern with instance tracking
 * - Monostate pattern (shares state, not instance)
 */

