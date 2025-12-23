package javafeatures.java21;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

/**
 * Java 21 - Virtual Threads (Project Loom)
 * 
 * Virtual threads are lightweight threads that dramatically reduce the effort of
 * writing, maintaining, and observing high-throughput concurrent applications.
 * 
 * Key Benefits:
 * 1. Lightweight: Millions of virtual threads can run simultaneously
 * 2. Low overhead: Minimal memory footprint per thread
 * 3. Simple: Same programming model as platform threads
 * 4. Efficient: No need for reactive programming or async/await
 * 
 * Use Cases:
 * - High-throughput servers (handling many concurrent requests)
 * - I/O-bound operations (database calls, HTTP requests)
 * - Microservices communication
 */
public class VirtualThreadsDemo {

    /**
     * Demo 1: Creating Virtual Threads
     */
    public static void basicVirtualThread() {
        System.out.println("=== Basic Virtual Thread Demo ===\n");

        // Method 1: Using Thread.ofVirtual()
        Thread vThread1 = Thread.ofVirtual().start(() -> {
            System.out.println("Hello from virtual thread: " + Thread.currentThread());
        });

        // Method 2: Using Thread.startVirtualThread()
        Thread vThread2 = Thread.startVirtualThread(() -> {
            System.out.println("Another virtual thread: " + Thread.currentThread());
        });

        try {
            vThread1.join();
            vThread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println();
    }

    /**
     * Demo 2: Virtual Threads vs Platform Threads - Performance
     * 
     * This demonstrates the scalability of virtual threads.
     * Try running with 10,000 or even 100,000 threads!
     */
    public static void performanceComparison(int numTasks) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("Number of tasks: " + numTasks + "\n");

        // Simulate I/O-bound work
        Runnable task = () -> {
            try {
                Thread.sleep(100); // Simulate I/O operation
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        };

        // Test 1: Virtual Threads with Executor
        Instant start = Instant.now();
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, numTasks).forEach(i -> {
                executor.submit(task);
            });
        } // Auto-shutdown and wait for completion
        Instant end = Instant.now();
        long virtualThreadTime = Duration.between(start, end).toMillis();
        System.out.println("Virtual Threads: " + virtualThreadTime + " ms");

        // Test 2: Platform Threads with Fixed Pool
        start = Instant.now();
        try (var executor = Executors.newFixedThreadPool(200)) {
            IntStream.range(0, numTasks).forEach(i -> {
                executor.submit(task);
            });
        }
        end = Instant.now();
        long platformThreadTime = Duration.between(start, end).toMillis();
        System.out.println("Platform Threads (pool=200): " + platformThreadTime + " ms");

        System.out.println("\nSpeedup: " + 
            String.format("%.2fx", (double) platformThreadTime / virtualThreadTime));
        System.out.println();
    }

    /**
     * Demo 3: Virtual Thread Executor
     * 
     * The recommended way to use virtual threads in production.
     */
    public static void executorDemo() {
        System.out.println("=== Executor Service Demo ===\n");

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            // Submit multiple tasks
            for (int i = 1; i <= 5; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    System.out.println("Task " + taskId + " running on: " + 
                        Thread.currentThread());
                    simulateWork(500);
                    System.out.println("Task " + taskId + " completed");
                });
            }
        } // Automatically waits for all tasks to complete

        System.out.println("\nAll tasks completed!\n");
    }

    /**
     * Demo 4: Real-world Example - Concurrent HTTP Requests
     * 
     * Simulates fetching data from multiple APIs concurrently.
     */
    public static void concurrentApiCallsDemo() {
        System.out.println("=== Concurrent API Calls Demo ===\n");

        String[] apis = {
            "https://api.example.com/users",
            "https://api.example.com/posts",
            "https://api.example.com/comments",
            "https://api.example.com/albums",
            "https://api.example.com/photos"
        };

        Instant start = Instant.now();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (String api : apis) {
                executor.submit(() -> {
                    String response = simulateApiCall(api);
                    System.out.println("Response from " + api + ": " + response);
                });
            }
        }

        Instant end = Instant.now();
        System.out.println("\nTotal time: " + Duration.between(start, end).toMillis() + " ms\n");
    }

    /**
     * Demo 5: Structured Concurrency (Preview Feature)
     * 
     * Note: This is a preview feature in Java 21
     * Requires: --enable-preview flag
     * 
     * Structured concurrency ensures that all child tasks complete before
     * the parent scope exits.
     */
    public static void structuredConcurrencyNote() {
        System.out.println("=== Structured Concurrency (Preview) ===");
        System.out.println("Structured concurrency ensures reliable cancellation and");
        System.out.println("error handling for concurrent operations.");
        System.out.println("See Java documentation for StructuredTaskScope.\n");
    }

    // Helper methods

    private static void simulateWork(long milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private static String simulateApiCall(String url) {
        simulateWork(200); // Simulate network latency
        return "{ \"status\": \"success\", \"data\": \"...\" }";
    }

    /**
     * Main method - Run all demos
     */
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║  Java 21 Virtual Threads Demo         ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        basicVirtualThread();
        performanceComparison(1000);
        executorDemo();
        concurrentApiCallsDemo();
        structuredConcurrencyNote();

        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║  Key Takeaways                         ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("✓ Virtual threads are cheap and plentiful");
        System.out.println("✓ Use newVirtualThreadPerTaskExecutor()");
        System.out.println("✓ Perfect for I/O-bound operations");
        System.out.println("✓ No need to pool virtual threads");
        System.out.println("✓ Maintains simple thread-per-request model");
        System.out.println("\n💡 When to use: High concurrency with blocking I/O");
        System.out.println("❌ When NOT to use: CPU-intensive computations");
    }

    /**
     * Additional Resources:
     * 
     * - JEP 444: Virtual Threads
     *   https://openjdk.org/jeps/444
     * 
     * - Project Loom
     *   https://openjdk.org/projects/loom/
     * 
     * - Java 21 Documentation
     *   https://docs.oracle.com/en/java/javase/21/
     * 
     * Migration Tips:
     * 1. Replace Executors.newCachedThreadPool() with newVirtualThreadPerTaskExecutor()
     * 2. Don't pool virtual threads - create new ones as needed
     * 3. Existing thread-per-request code works without changes
     * 4. Monitor with JFR (Java Flight Recorder) for best results
     */
}

