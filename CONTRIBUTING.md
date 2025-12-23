# Contributing to Daily Coding Practice

First off, thank you for considering contributing to this project! 🎉

This document provides guidelines for contributing to make the process smooth and effective for everyone.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include Java version, Maven version, and OS**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other projects (if applicable)**

### Contributing Code

We welcome code contributions! You can contribute:

1. **New algorithm solutions** - Add LeetCode or other algorithm solutions
2. **Design pattern implementations** - Implement missing design patterns
3. **Java feature examples** - Add demonstrations of Java features
4. **Utility classes** - Contribute reusable utility code
5. **Tests** - Add or improve unit tests
6. **Documentation** - Improve or add documentation

---

## 🛠️ Development Setup

### Prerequisites

- Java 21 or higher
- Maven 3.6+
- Git
- IntelliJ IDEA (recommended) or any Java IDE

### Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/daily-coding.git
cd daily-coding

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/daily-coding.git
```

### Build and Test

```bash
# Compile the project
mvn clean compile

# Run all tests
mvn test

# Run a specific test
mvn test -Dtest=TwoSumTest
```

### IDE Setup

1. Open IntelliJ IDEA
2. `File` → `Open` → Select the `daily-coding` folder
3. Wait for Maven to import dependencies
4. Verify project compiles without errors

---

## 📏 Coding Standards

### Java Code Style

- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use meaningful variable and method names
- Keep methods short and focused (ideally < 20 lines)
- Add JavaDoc comments for public methods
- Include inline comments for complex logic

### Code Structure

```java
package algorithms.leetcode;

/**
 * LeetCode #1 - Two Sum
 * 
 * Problem Description:
 * [Describe the problem]
 * 
 * Approach:
 * [Explain your approach]
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * @author Your Name
 */
public class TwoSum {
    
    public int[] twoSum(int[] nums, int target) {
        // Implementation with detailed comments
    }
    
    public static void main(String[] args) {
        // Example usage
    }
}
```

### Test Structure

- Place tests in `src/test/java/` mirroring the source structure
- Test class name should end with `Test` (e.g., `TwoSumTest`)
- Use `@DisplayName` for descriptive test names
- Include edge cases and boundary conditions
- Use AssertJ for assertions

```java
@DisplayName("TwoSum Algorithm Tests")
class TwoSumTest {
    
    @Test
    @DisplayName("Should find indices for valid input")
    void testTwoSum_ValidInput() {
        // Arrange
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        
        // Act
        int[] result = TwoSum.twoSum(nums, target);
        
        // Assert
        assertThat(result).containsExactly(0, 1);
    }
}
```

### Documentation

- Update relevant `docs/` README files when adding new content
- Include complexity analysis for algorithms
- Provide usage examples
- Link to external resources when helpful

---

## 📝 Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
feat(algorithms): add Three Sum solution with O(n²) complexity

- Implemented using two-pointer technique
- Added comprehensive unit tests
- Included detailed comments and complexity analysis

Closes #123
```

```bash
fix(design-patterns): correct thread safety issue in Singleton

The double-checked locking pattern was missing volatile keyword,
which could lead to broken singleton in multi-threaded environments.
```

```bash
docs(readme): update installation instructions

- Added prerequisites section
- Clarified Maven commands
- Added troubleshooting guide
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all tests**
   ```bash
   mvn clean test
   ```

3. **Ensure code compiles**
   ```bash
   mvn clean compile
   ```

4. **Format your code**
   - Use IDE's auto-format feature
   - Ensure no trailing whitespace

### Submitting a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request on GitHub**
   - Use a clear and descriptive title
   - Reference any related issues
   - Provide a detailed description of changes
   - Include screenshots if applicable

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of what this PR does
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests added/updated
   - [ ] All tests passing
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   
   ## Related Issues
   Closes #123
   ```

### Review Process

- Maintainers will review your PR as soon as possible
- Address any requested changes
- Once approved, your PR will be merged
- Your contribution will be acknowledged in the project

---

## 🎯 Good First Issues

Looking for a place to start? Check out issues labeled with:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements

---

## 💡 Development Tips

### Adding a New Algorithm

1. Create the class in `src/main/java/algorithms/[category]/`
2. Add comprehensive JavaDoc
3. Implement the solution with detailed comments
4. Include a `main()` method with examples
5. Create corresponding test in `src/test/java/algorithms/[category]/`
6. Update `docs/algorithms/README.md`

### Adding a New Design Pattern

1. Create the class in `src/main/java/designpatterns/[pattern]/`
2. Include UML diagram in comments
3. Provide usage examples
4. Add comprehensive tests
5. Update `docs/design-patterns/README.md`

---

## 🏆 Recognition

Contributors will be recognized in:

- GitHub Contributors page
- Project acknowledgments
- Release notes (for significant contributions)

---

## ❓ Questions?

Feel free to:

- Open an issue with the `question` label
- Contact the maintainers
- Join discussions

---

**Thank you for contributing!** 🙏

Your efforts help make this project better for everyone in the developer community.

