# Contributing to Portfolio

Thank you for considering contributing to this portfolio project! Your interest in improving this project is greatly appreciated.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements ✨

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/React styleguides
* Include appropriate test cases
* Update documentation as needed
* Ensure all tests pass
* Follow the Git workflow described in [DEVELOPMENT.md](DEVELOPMENT.md#git-workflow)

## Getting Started with Development

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/portfolio-react.git
   cd portfolio-react
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/portfolio-react.git
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Make your changes
7. Test your changes:
   ```bash
   npm run dev
   npm run build
   ```
8. Commit your changes following [commit message guidelines](DEVELOPMENT.md#commit-messages)
9. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
10. Open a Pull Request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Follow [conventional commits](DEVELOPMENT.md#commit-messages)

### TypeScript/React Styleguide

* Use TypeScript for all components
* Use interfaces for props
* Use descriptive variable and function names
* Follow the project's existing code style (enforced by ESLint/Prettier)
* Write comments for complex logic
* Use semantic HTML elements
* Include ARIA labels for accessibility

```tsx
// ✅ Good example
interface CardProps {
  title: string;
  description: string;
  onSelect?: (id: string) => void;
}

export default function Card({ 
  title, 
  description, 
  onSelect 
}: CardProps): JSX.Element {
  return (
    <article className="card" role="article">
      <h2>{title}</h2>
      <p>{description}</p>
      {onSelect && (
        <button onClick={() => onSelect(title)}>
          Learn More
        </button>
      )}
    </article>
  );
}
```

### CSS Styleguide

* Use BEM naming convention for classes
* Use CSS custom properties for theme values
* Mobile-first responsive design
* Keep component styles co-located with components
* Use Bootstrap utilities when appropriate

```css
/* ✅ Good example */
.card {
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.card__title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.card__button {
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .card {
    padding: var(--spacing-sm);
  }
}
```

## Running Tests

```bash
npm run test
npm run test:watch
```

Write tests for new features and ensure all tests pass before submitting a PR.

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

## Recognition

Contributors will be recognized in the project README and CHANGELOG.

## Questions?

Feel free to create an issue with the `question` label or reach out to the maintainers directly.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
