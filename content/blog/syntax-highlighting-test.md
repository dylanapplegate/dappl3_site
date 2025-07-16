---
title: "Syntax Highlighting Test"
date: "2025-07-16"
excerpt: "A test post to showcase syntax highlighting with various programming languages using highlight.js and the Dracula theme."
---

# Syntax Highlighting Test

This post demonstrates syntax highlighting with various programming languages using highlight.js and the beautiful Dracula theme.

## JavaScript

```javascript
function greetUser(name) {
  const greeting = `Hello, ${name}!`;
  console.log(greeting);

  return {
    message: greeting,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

// Usage example
const result = greetUser("World");
console.log(result);
```

## TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  addUser(user: Omit<User, "id">): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
```

## Python

```python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    sequence = [0, 1]
    for i in range(2, n):
        next_value = sequence[i-1] + sequence[i-2]
        sequence.append(next_value)

    return sequence

# Example usage
fib_sequence = fibonacci(10)
print(f"Fibonacci sequence: {fib_sequence}")
```

## CSS

```css
.syntax-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.syntax-highlight:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .syntax-highlight {
    padding: 1rem;
    border-radius: 6px;
  }
}
```

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syntax Highlighting Demo</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="main-header">
      <h1>Welcome to My Blog</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article class="blog-post">
        <h2>Hello World!</h2>
        <p>This is a sample blog post with syntax highlighting.</p>
      </article>
    </main>

    <script src="script.js"></script>
  </body>
</html>
```

## JSON

```json
{
  "name": "syntax-highlighting-demo",
  "version": "1.0.0",
  "description": "A demo of syntax highlighting with highlight.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "highlight.js": "^11.9.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0"
  },
  "keywords": ["syntax", "highlighting", "demo"],
  "author": "Developer",
  "license": "MIT"
}
```

## Bash/Shell

```bash
#!/bin/bash

# Deploy script for static site
echo "Starting deployment process..."

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"

    # Deploy to production
    rsync -avz --delete ./out/ user@server:/var/www/html/

    echo "🚀 Deployment complete!"
else
    echo "❌ Build failed!"
    exit 1
fi
```

This demonstrates the beautiful Dracula theme syntax highlighting across multiple programming languages!
