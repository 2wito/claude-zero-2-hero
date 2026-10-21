import type { ComponentType } from "react";

type MDXModule = { default: ComponentType };

// Chapters that have written content in content/docs. Others render a "being written" placeholder.
export const chapterContent: Record<string, () => Promise<MDXModule>> = {
  "01-introduction": () => import("@/content/docs/01-introduction.mdx"),
  "02-installation": () => import("@/content/docs/02-installation.mdx"),
  "03-first-run": () => import("@/content/docs/03-first-run.mdx"),
  "04-prompting-guide": () => import("@/content/docs/04-prompting-guide.mdx"),
  "05-cursor-integration": () => import("@/content/docs/05-cursor-integration.mdx"),
  "06-first-project": () => import("@/content/docs/06-first-project.mdx"),
  "07-debugging": () => import("@/content/docs/07-debugging.mdx"),
  "08-git-integration": () => import("@/content/docs/08-git-integration.mdx"),
  "09-deployment": () => import("@/content/docs/09-deployment.mdx"),
  "10-pro-tips": () => import("@/content/docs/10-pro-tips.mdx"),
  "11-skills": () => import("@/content/docs/11-skills.mdx"),
  "12-agents": () => import("@/content/docs/12-agents.mdx"),
  "13-platforms-and-apps": () => import("@/content/docs/13-platforms-and-apps.mdx"),
  "14-templates-library": () => import("@/content/docs/14-templates-library.mdx"),
  "15-glossary": () => import("@/content/docs/15-glossary.mdx"),
  "16-prompt-hub": () => import("@/content/docs/16-prompt-hub.mdx"),
  "17-tools": () => import("@/content/docs/17-tools.mdx"),
};
