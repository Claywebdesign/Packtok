# 🚀 Packtok Platform - Monorepo

A comprehensive digital marketplace platform built with modern technologies and monorepo architecture.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Running Applications](#running-applications)
- [Package Management](#package-management)
- [Code Sharing](#code-sharing)
- [Development Workflow](#development-workflow)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## 🏗️ Architecture Overview

This monorepo uses:
- **pnpm** - Efficient package manager with workspace support
- **Turborepo** - High-performance build system and task orchestrator
- **TypeScript** - Type-safe development across all packages
- **Shared Libraries** - Code reuse between applications

## 📁 Project Structure

```
packtok-monorepo/
├── 📱 apps/                    # Applications
│   ├── admin/                  # Next.js Admin Panel
│   │   ├── src/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .gitignore
│   ├── api/                    # Node.js/Express Backend API
│   │   ├── src/
│   │   │   ├── config/         # Configuration files
│   │   │   ├── routers/        # API route handlers
│   │   │   ├── services/       # Business logic
│   │   │   ├── middlewares/    # Express middlewares
│   │   │   ├── utils/          # API-specific utilities
│   │   │   └── server.ts       # Main server entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .gitignore
│   ├── mobile/                 # Expo React Native App
│   │   ├── src/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .gitignore
│   └── web/                    # Next.js Customer Web App
│       ├── src/
│       ├── package.json
│       ├── tsconfig.json
│       └── .gitignore
├── 📦 packages/                # Shared Libraries
│   ├── config/                 # Shared configurations
│   │   ├── eslint.js           # ESLint configuration
│   │   ├── prettier.js         # Prettier configuration
│   │   ├── package.json
│   │   └── .gitignore
│   ├── db/                     # Database schema & client
│   │   ├── prisma/
│   │   ├── migrations/
│   │   ├── package.json
│   │   └── .gitignore
│   ├── ui/                     # Shared React Components
│   │   ├── src/
│   │   │   ├── Button.tsx      # Web component
│   │   │   ├── Button.native.tsx # Mobile component (future)
│   │   │   └── index.ts        # Exports
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .gitignore
│   └── utils/                  # Shared Utilities
│       ├── src/
│       │   ├── schemas.ts      # Zod validation schemas
│       │   ├── constants.ts    # Application constants
│       │   ├── helpers.ts      # Utility functions
│       │   └── index.ts        # Exports
│       ├── package.json
│       ├── tsconfig.json
│       └── .gitignore
├── 🔧 Configuration Files
│   ├── .env.example            # Environment variables template
│   ├── .gitignore              # Root gitignore
│   ├── package.json            # Root package configuration
│   ├── pnpm-workspace.yaml     # pnpm workspace configuration
│   ├── tsconfig.base.json      # Base TypeScript configuration
│   └── turbo.json              # Turborepo task pipeline
└── 📖 README.md                # This file
```

## ✅ Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installations
node --version
pnpm --version
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd packtok-monorepo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build all packages**
   ```bash
   pnpm build
   ```

5. **Start development**
   ```bash
   pnpm dev
   ```

## 🏃‍♂️ Running Applications

### Backend API
```bash
# Development mode with hot reload
cd apps/api
pnpm dev

# Production build and run
pnpm build
pnpm start

# API will be available at http://localhost:3001
```

### Customer Web App
```bash
# Development mode
cd apps/web
pnpm dev

# Production build
pnpm build
pnpm start

# Web app will be available at http://localhost:3000
```

### Admin Panel
```bash
# Development mode
cd apps/admin
pnpm dev

# Production build
pnpm build
pnpm start

# Admin panel will be available at http://localhost:3002
```

### Mobile App
```bash
# Development mode
cd apps/mobile
pnpm dev

# Start iOS simulator
pnpm ios

# Start Android emulator
pnpm android
```

## 📦 Package Management

### Installing Dependencies

```bash
# Install to root workspace
pnpm add <package> -w

# Install to specific app
pnpm add <package> --filter @packtok/api

# Install dev dependency
pnpm add <package> -D --filter @packtok/web
```

### Internal Package Dependencies

```bash
# Add internal package dependency
pnpm add @packtok/utils --filter @packtok/api

# This uses workspace protocol: "workspace:*"
```

## 🔄 Code Sharing

### Shared Utilities (`@packtok/utils`)

```typescript
// Import validation schemas
import { userSchema, createUserSchema } from "@packtok/utils";

// Import constants
import { API_ROUTES, HTTP_STATUS } from "@packtok/utils";

// Import helper functions
import { formatPrice, generateId } from "@packtok/utils";
```

### Shared UI Components (`@packtok/ui`)

```typescript
// Import shared components
import { Button, Card, Input } from "@packtok/ui";

// Usage in React components
function MyComponent() {
  return (
    <Button variant="primary" onClick={handleClick}>
      Click me
    </Button>
  );
}
```

### Shared Configuration (`@packtok/config`)

```javascript
// .eslintrc.js
module.exports = {
  extends: ["@packtok/config/eslint"],
};

// prettier.config.js
module.exports = require("@packtok/config/prettier");
```

## 🔄 Development Workflow

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes in packages/apps**
   - Edit shared packages in `packages/`
   - Changes are immediately available to apps
   - TypeScript provides compile-time safety

3. **Test changes**
   ```bash
   pnpm lint      # Run linting
   pnpm build     # Build all packages
   pnpm dev       # Test in development
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

### Adding New Packages

1. **Create package directory**
   ```bash
   mkdir packages/new-package
   cd packages/new-package
   ```

2. **Initialize package.json**
   ```json
   {
     "name": "@packtok/new-package",
     "version": "0.0.0",
     "private": true,
     "main": "./src/index.ts",
     "dependencies": {
       "@packtok/utils": "workspace:*"
     }
   }
   ```

3. **Create TypeScript config**
   ```json
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "outDir": "dist"
     },
     "include": ["src/**/*"]
   }
   ```

## 📜 Scripts

### Root Level Scripts
```bash
pnpm build        # Build all packages and apps
pnpm dev          # Start all apps in development mode
pnpm lint         # Lint all packages and apps
pnpm clean        # Clean all build outputs
pnpm type-check   # Run TypeScript type checking
```

### Package Level Scripts
```bash
# Run script in specific package
pnpm --filter @packtok/api dev
pnpm --filter @packtok/web build

# Run script in multiple packages
pnpm --filter "@packtok/*" build
```

## 🔐 Environment Variables

### API Backend (`apps/api`)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/packtok"
JWT_SECRET="your-jwt-secret-key-here"
API_PORT=3001
API_HOST=localhost
```

### Web Frontend (`apps/web`)
```bash
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_NAME="Packtok"
```

### Admin Panel (`apps/admin`)
```bash
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_NAME="Packtok Admin"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the code style
4. **Add tests** for new functionality
5. **Ensure all tests pass** (`pnpm test`)
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to the branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for type safety
- Follow the existing ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for public APIs
- Keep shared packages focused and minimal

### Testing

```bash
# Run tests for all packages
pnpm test

# Run tests for specific package
pnpm --filter @packtok/utils test

# Run tests in watch mode
pnpm test:watch
```

## 🔧 Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   # Reinstall dependencies
   pnpm install

   # Clear node_modules and reinstall
   rm -rf node_modules packages/*/node_modules apps/*/node_modules
   pnpm install
   ```

2. **TypeScript errors**
   ```bash
   # Rebuild all packages
   pnpm build

   # Check TypeScript configuration
   pnpm type-check
   ```

3. **pnpm workspace issues**
   ```bash
   # Check workspace configuration
   cat pnpm-workspace.yaml

   # Verify package links
   pnpm list --depth=0
   ```

## 📚 Additional Resources

- [pnpm Workspaces Documentation](https://pnpm.io/workspaces)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)

---

Built with ❤️ using modern web technologies
