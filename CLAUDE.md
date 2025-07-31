# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the American Faith Academy website - a Next.js 15 application for a classical Christian education institution that combines traditional education with modern adaptive technology. The site serves students, parents, educators, and administrators.

## Core Commands

### Development
```bash
npm run dev              # Start dev server on port 3000
npm run dev:turbo        # Start with Turbopack
npm run dev:3005         # Start on port 3005
```

### Build & Production
```bash
npm run build            # Build for production (includes Prisma generate)
npm run start            # Start production server
```

### Code Quality
```bash
npm run lint             # ESLint with auto-fix + TypeScript check
npm run type-check       # TypeScript check only
npm run format           # Prettier format all files
```

### Testing
```bash
npm test                 # Run Jest tests
# Run specific test: npm test -- path/to/test
```

### Database (Prisma)
```bash
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm (with some bun commands)

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with Navigation/Footer
│   └── [route]/page.tsx # Page components
├── components/
│   ├── sections/        # Page section components
│   │   ├── BaseHeroSection.tsx  # Reusable hero base
│   │   └── [page]/      # Page-specific sections
│   ├── ui/              # Reusable UI components
│   └── Navigation.tsx   # Global navigation
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions

docs/                    # Detailed documentation
```

### Key Architectural Patterns

1. **Component Organization**: Sections are organized by page (e.g., `sections/about/`, `sections/admissions/`) with shared components in `ui/`

2. **Hero Sections**: All hero sections extend `BaseHeroSection` for consistency

3. **Type Safety**: Comprehensive type definitions in `src/types/index.ts` with strict TypeScript config

4. **Performance**: 
   - Image optimization enabled with Next.js Image
   - Component-level code splitting
   - Performance monitoring component available

5. **Security**: Content Security Policy and security headers configured in `next.config.js`

### Routing Structure
- `/` - Homepage
- `/about` - About page
- `/academics` - Academic programs
- `/admissions` - Admissions info
- `/contact` - Contact form
- `/soaring-centers` - Learning center info

### Styling Conventions
- Tailwind CSS for styling with custom brand colors (navy, patriot)
- Animation classes: `animate-float`, `animate-pulse-red`, `animate-slide-up`
- Font families: Inter (sans), Playfair Display (serif)
- Container breakpoints: sm, md, lg, xl, 2xl

### Form Handling
Forms integrate with GoHighLevel CRM. Form types are defined in `types/index.ts` with comprehensive validation patterns.

### Testing Approach
- Unit tests alongside components in `__tests__` directories
- Integration tests in `__tests__/integration/`
- Test utilities and setup in `jest.setup.js`

### Important Configurations
- **ESLint**: Accessibility rules enforced, TypeScript warnings enabled
- **TypeScript**: Strict mode with additional checks (noUnusedLocals, exactOptionalPropertyTypes, etc.)
- **Next.js**: Image optimization enabled, CSP headers configured