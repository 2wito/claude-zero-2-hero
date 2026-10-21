# Project Overview: Claude Code Hebrew Guide (Zero to Hero)

## Objective

Build a modern, highly accessible, RTL-supported documentation website in Hebrew to teach "Claude Code" from Zero to Hero for friends and family.

## Tech Stack

- Framework: Next.js 14/15 (App Router)

- Styling: Tailwind CSS (with RTL layout support)

- Content Engine: MDX / Contentlayer / Fumadocs

- Icons: Lucide-React

- Deployment Target: Vercel

## Key Functional & Design Requirements

1. **RTL First**: Full right-to-left UI layout, typography, navigation, and sidebar.

2. **Accessible Explanations**: Translate technical CLI concepts into simple, clear Hebrew.

3. **Interactive UI Components**:

   - Copyable code blocks with one-click feedback.

   - Distinct callout components (Info, Warning, Tip).

   - Dynamic sidebar navigation matching the course syllabus.

4. **Cross-Platform Guides**: Include OS-specific terminal tabs/instructions for Windows (PowerShell/CMD) and macOS/Linux.

5. **Integration Focus**: Dedicate clear sections to using Cursor IDE side-by-side with Claude Code CLI.

## Token & Context Optimization

### 1. Response & Code Efficiency

- Give direct, extremely concise answers. No preamble, no filler.
- Edit files with targeted, precise diffs. Never rewrite a whole file to change part of it.

### 2. Context Window Management

- After a significant step or a multi-file change, suggest running `/compact` (it is a user command; Claude cannot run it itself).
- Don't re-read or scan large files or directories unless explicitly asked. Prefer targeted search over full reads.
- When the user moves to an entirely new, unrelated task, recommend `/clear` to reset the context.

### 3. File Filtering

- Never read build artifacts, logs, or dependencies: `node_modules/`, `.next/`, `out/`, `*.log`, `.env*`.
- Note: `.claudeignore` has no effect in Claude Code (per the official docs). Enforce exclusions with `Read(...)` deny rules in `.claude/settings.json`; `.gitignore` already keeps these out of search.

## Core Reference Material

Use information and structural inspiration from these sources:

- Official Docs: [https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)

- Guides & Tutorials: [https://claudehero.com/](https://claudehero.com/) , [https://zero2claude.dev/](https://zero2claude.dev/) , [https://claude-world.com/articles/claude-code-complete-guide-2026/](https://claude-world.com/articles/claude-code-complete-guide-2026/)

- Cursor + Claude Code Workflow Video: [https://www.youtube.com/watch?v=ntDIxaeo3Wg](https://www.youtube.com/watch?v=ntDIxaeo3Wg)