# Contributing to Seven Bit News Frontend

Thank you for your interest in contributing to Seven Bit News! 🎉

This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/seven_bit_news_frontend.git
   cd seven_bit_news_frontend
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/seven_bit_news_frontend.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start the development server**

   ```bash
   npm start
   ```

## 🔄 Development Workflow

### Syncing with Upstream

Before starting work, ensure your fork is up to date:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### Creating a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/descriptive-name
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/documentation-update
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - Code style changes (formatting, etc.)

## 💻 Coding Standards

### JavaScript/React Guidelines

1. **Use Functional Components**
   
   ```javascript
   // ✅ Good
   const MyComponent = () => {
     return <div>Hello</div>;
   };

   // ❌ Avoid
   class MyComponent extends React.Component {
     render() {
       return <div>Hello</div>;
     }
   }
   ```

2. **Use Hooks**

   ```javascript
   // ✅ Good
   const [state, setState] = useState(initialValue);
   useEffect(() => {
     // Effect logic
   }, [dependencies]);
   ```

3. **Destructure Props**

   ```javascript
   // ✅ Good
   const MyComponent = ({ title, description }) => {
     return (
       <div>
         <h1>{title}</h1>
         <p>{description}</p>
       </div>
     );
   };

   // ❌ Avoid
   const MyComponent = (props) => {
     return (
       <div>
         <h1>{props.title}</h1>
         <p>{props.description}</p>
       </div>
     );
   };
   ```

4. **Use Meaningful Variable Names**

   ```javascript
   // ✅ Good
   const userArticles = articles.filter(article => article.userId === currentUser.id);

   // ❌ Avoid
   const arr = articles.filter(a => a.uid === u.id);
   ```

5. **Add Comments for Complex Logic**

   ```javascript
   // ✅ Good
   // Calculate sentiment score based on positive/negative word ratio
   // Score ranges from -1 (very negative) to 1 (very positive)
   const sentimentScore = (positiveCount - negativeCount) / totalWords;
   ```

### File Organization

```javascript
// Component file structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // If using PropTypes

// Import other dependencies
import { API_ENDPOINTS } from '../config';

// Import components
import ChildComponent from './ChildComponent';

// Import styles
import './MyComponent.css';

// Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Helper functions
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

// PropTypes (optional but recommended)
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default MyComponent;
```

### CSS/Styling Guidelines

1. **Use Descriptive Class Names**

   ```css
   /* ✅ Good */
   .article-card-container { }
   .sentiment-chart-wrapper { }

   /* ❌ Avoid */
   .container { }
   .wrapper { }
   ```

2. **Follow BEM Naming Convention (when appropriate)**

   ```css
   .article-card { }
   .article-card__title { }
   .article-card__description { }
   .article-card--featured { }
   ```

## 📝 Commit Guidelines

### Commit Message Format

Use clear, descriptive commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(chat): add message history export functionality

- Add export button to chat interface
- Implement CSV export format
- Add download functionality

Closes #123
```

```bash
fix(wordcloud): resolve rendering issue on mobile devices

The word cloud component was not rendering correctly on mobile
due to incorrect viewport calculations.

Fixes #456
```

```bash
docs(readme): update installation instructions

- Add troubleshooting section
- Update deployment steps
- Fix broken links
```

## 🔀 Pull Request Process

### Before Submitting

1. **Test Your Changes**
   
   ```bash
   npm start    # Test locally
   npm test     # Run tests
   npm run build # Ensure production build works
   ```

2. **Update Documentation**
   
   Update README.md or other docs if needed.

3. **Check Code Quality**

   ```bash
   # Ensure no ESLint errors
   npm run lint
   ```

### Submitting a Pull Request

1. **Push Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill in the PR template

3. **PR Title Format**

   ```
   [Type] Brief description of changes
   ```

   Examples:
   - `[Feature] Add dark mode support`
   - `[Fix] Resolve chat history persistence issue`
   - `[Docs] Update deployment guide`

4. **PR Description**

   Include:
   - What changes were made
   - Why these changes were necessary
   - How to test the changes
   - Screenshots (if UI changes)
   - Related issues (if any)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
How to test these changes:
1. Step 1
2. Step 2
3. Step 3

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project coding standards
- [ ] Tests added/updated (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Responsive design verified (mobile, tablet, desktop)

## Related Issues
Closes #issue_number
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

Create test files next to components:

```
src/
  components/
    MyComponent.js
    MyComponent.test.js
```

Example test:

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component title', () => {
  render(<MyComponent title="Test Title" />);
  const titleElement = screen.getByText(/Test Title/i);
  expect(titleElement).toBeInTheDocument();
});
```

## 📚 Documentation

### Inline Documentation

- Add JSDoc comments for complex functions
- Explain "why" not just "what"
- Document component props

Example:

```javascript
/**
 * Fetches and processes news articles for a given topic
 * @param {string} topic - The news topic to search for
 * @param {number} limit - Maximum number of articles to return (default: 10)
 * @returns {Promise<Array>} Array of processed article objects
 * @throws {Error} If API request fails
 */
const fetchArticles = async (topic, limit = 10) => {
  // Implementation
};
```

### Component Documentation

Document component usage in component files:

```javascript
/**
 * ArticleCard Component
 * 
 * Displays a single news article with title, description, and metadata
 * 
 * @param {Object} props
 * @param {string} props.title - Article title
 * @param {string} props.description - Article description
 * @param {string} props.url - Article URL
 * @param {string} props.source - News source name
 * @param {Date} props.publishedAt - Publication date
 * 
 * @example
 * <ArticleCard
 *   title="Breaking News"
 *   description="Description here"
 *   url="https://..."
 *   source="CNN"
 *   publishedAt={new Date()}
 * />
 */
const ArticleCard = ({ title, description, url, source, publishedAt }) => {
  // Component implementation
};
```

## ❓ Questions?

If you have questions:

1. Check the [README.md](README.md)
2. Search [existing issues](https://github.com/yourusername/seven_bit_news_frontend/issues)
3. Open a new issue with the `question` label

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute! 🎉

---

Happy Coding! 💻
