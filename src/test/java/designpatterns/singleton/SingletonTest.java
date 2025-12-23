package designpatterns.singleton;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.Assertions.*;

/**
 * Unit tests for Singleton Pattern implementations
 * 
 * Testing Strategy:
 * - Verify single instance property
 * - Test thread safety with concurrent access
 * - Performance comparison between implementations
 * - Verify instance consistency across multiple calls
 */
@DisplayName("Singleton Pattern Tests")
class SingletonTest {

    @Test
    @DisplayName("EagerSingleton - Should return same instance")
    void testEagerSingleton_SingleInstance() {
        // When
        EagerSingleton instance1 = EagerSingleton.getInstance();
        EagerSingleton instance2 = EagerSingleton.getInstance();
        
        // Then
        assertThat(instance1).isSameAs(instance2);
        assertThat(instance1).isNotNull();
    }

    @Test
    @DisplayName("BillPughSingleton - Should return same instance")
    void testBillPughSingleton_SingleInstance() {
        // When
        BillPughSingleton instance1 = BillPughSingleton.getInstance();
        BillPughSingleton instance2 = BillPughSingleton.getInstance();
        
        // Then
        assertThat(instance1).isSameAs(instance2);
        assertThat(instance1).isNotNull();
    }

    @Test
    @DisplayName("EnumSingleton - Should return same instance")
    void testEnumSingleton_SingleInstance() {
        // When
        EnumSingleton instance1 = EnumSingleton.INSTANCE;
        EnumSingleton instance2 = EnumSingleton.INSTANCE;
        
        // Then
        assertThat(instance1).isSameAs(instance2);
        assertThat(instance1).isNotNull();
    }

    @Test
    @DisplayName("DoubleCheckedSingleton - Should return same instance")
    void testDoubleCheckedSingleton_SingleInstance() {
        // When
        DoubleCheckedSingleton instance1 = DoubleCheckedSingleton.getInstance();
        DoubleCheckedSingleton instance2 = DoubleCheckedSingleton.getInstance();
        
        // Then
        assertThat(instance1).isSameAs(instance2);
        assertThat(instance1).isNotNull();
    }

    @RepeatedTest(10)
    @DisplayName("BillPughSingleton - Should maintain single instance across repeated calls")
    void testBillPughSingleton_RepeatedAccess() {
        // When
        BillPughSingleton instance1 = BillPughSingleton.getInstance();
        BillPughSingleton instance2 = BillPughSingleton.getInstance();
        
        // Then
        assertThat(instance1).isSameAs(instance2);
    }

    @Test
    @DisplayName("DoubleCheckedSingleton - Thread safety test")
    void testDoubleCheckedSingleton_ThreadSafety() throws InterruptedException {
        // Given
        int threadCount = 100;
        Set<DoubleCheckedSingleton> instances = ConcurrentHashMap.newKeySet();
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch doneLatch = new CountDownLatch(threadCount);
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        
        // When - Multiple threads try to get instance simultaneously
        for (int i = 0; i < threadCount; i++) {
            executor.submit(() -> {
                try {
                    startLatch.await(); // Wait for all threads to be ready
                    DoubleCheckedSingleton instance = DoubleCheckedSingleton.getInstance();
                    instances.add(instance);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    doneLatch.countDown();
                }
            });
        }
        
        startLatch.countDown(); // Start all threads at once
        doneLatch.await(); // Wait for all threads to complete
        executor.shutdown();
        
        // Then - Should have only one unique instance
        assertThat(instances).hasSize(1);
    }

    @Test
    @DisplayName("BillPughSingleton - Thread safety test")
    void testBillPughSingleton_ThreadSafety() throws InterruptedException {
        // Given
        int threadCount = 100;
        Set<BillPughSingleton> instances = ConcurrentHashMap.newKeySet();
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch doneLatch = new CountDownLatch(threadCount);
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        
        // When
        for (int i = 0; i < threadCount; i++) {
            executor.submit(() -> {
                try {
                    startLatch.await();
                    BillPughSingleton instance = BillPughSingleton.getInstance();
                    instances.add(instance);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    doneLatch.countDown();
                }
            });
        }
        
        startLatch.countDown();
        doneLatch.await();
        executor.shutdown();
        
        // Then
        assertThat(instances).hasSize(1);
    }

    @Test
    @DisplayName("EnumSingleton - Should be inherently thread-safe")
    void testEnumSingleton_ThreadSafety() throws InterruptedException {
        // Given
        int threadCount = 100;
        Set<EnumSingleton> instances = ConcurrentHashMap.newKeySet();
        CountDownLatch latch = new CountDownLatch(threadCount);
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        
        // When
        for (int i = 0; i < threadCount; i++) {
            executor.submit(() -> {
                try {
                    EnumSingleton instance = EnumSingleton.INSTANCE;
                    instances.add(instance);
                } finally {
                    latch.countDown();
                }
            });
        }
        
        latch.await();
        executor.shutdown();
        
        // Then
        assertThat(instances).hasSize(1);
    }

    @Test
    @DisplayName("All implementations should have consistent behavior")
    void testAllImplementations_Consistency() {
        // When
        EagerSingleton eager1 = EagerSingleton.getInstance();
        EagerSingleton eager2 = EagerSingleton.getInstance();
        
        BillPughSingleton billPugh1 = BillPughSingleton.getInstance();
        BillPughSingleton billPugh2 = BillPughSingleton.getInstance();
        
        EnumSingleton enum1 = EnumSingleton.INSTANCE;
        EnumSingleton enum2 = EnumSingleton.INSTANCE;
        
        DoubleCheckedSingleton doubleChecked1 = DoubleCheckedSingleton.getInstance();
        DoubleCheckedSingleton doubleChecked2 = DoubleCheckedSingleton.getInstance();
        
        // Then - Each implementation maintains single instance
        assertThat(eager1).isSameAs(eager2);
        assertThat(billPugh1).isSameAs(billPugh2);
        assertThat(enum1).isSameAs(enum2);
        assertThat(doubleChecked1).isSameAs(doubleChecked2);
    }

    @Test
    @DisplayName("Singleton instances should be functional")
    void testSingleton_Functionality() {
        // Given
        BillPughSingleton instance = BillPughSingleton.getInstance();
        
        // When & Then - Should be able to call methods without errors
        assertThatCode(() -> instance.doSomething()).doesNotThrowAnyException();
    }
}

