import { Children, isValidElement, type ReactElement } from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/callout";
import { Glossary } from "@/components/Glossary";
import { MiniQuiz } from "@/components/MiniQuiz";
import { PromptBuilder } from "@/components/PromptBuilder";
import { TokenCalculator } from "@/components/TokenCalculator";
import { Checklist } from "@/components/mdx/checklist";
import { CodeBlock } from "@/components/mdx/code-block";
import { Library } from "@/components/mdx/library";
import { LibraryItem } from "@/components/mdx/library-item";
import { Prompt } from "@/components/mdx/prompt";
import { PromptCompare } from "@/components/mdx/prompt-compare";
import { RecapCards } from "@/components/mdx/recap-cards";
import { Tab, Tabs } from "@/components/mdx/tabs";

type ElementProps = Record<string, unknown> & { children?: React.ReactNode };

/**
 * rehype-pretty-code wraps every fenced block in <figure> with an optional
 * <figcaption> (from title="...") and a <pre data-language>. Collapse that into one CodeBlock.
 */
function CodeFigure({ children, ...props }: ElementProps) {
  if (!("data-rehype-pretty-code-figure" in props)) return <figure {...props}>{children}</figure>;

  let title: React.ReactNode;
  let language: string | undefined;
  let pre: React.ReactNode = null;
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    const childProps = (child as ReactElement<ElementProps>).props;
    if ("data-rehype-pretty-code-title" in childProps) title = childProps.children;
    else {
      language = childProps["data-language"] as string | undefined;
      pre = child;
    }
  }
  return (
    <CodeBlock title={title} language={language}>
      {pre}
    </CodeBlock>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="font-display text-4xl leading-tight sm:text-5xl" {...props} />,
    h2: (props) => <h2 className="mt-14 scroll-mt-24 font-display text-2xl leading-tight sm:text-3xl" {...props} />,
    h3: (props) => <h3 className="mt-9 scroll-mt-24 text-xl font-bold" {...props} />,
    p: (props) => <p className="mt-5 text-lg leading-8" {...props} />,
    ul: (props) => <ul className="mt-5 list-disc space-y-2 ps-6 text-lg leading-8 marker:text-accent" {...props} />,
    ol: (props) => <ol className="mt-5 list-decimal space-y-2 ps-6 text-lg leading-8 marker:text-accent" {...props} />,
    a: (props) => <a className="font-medium text-accent underline underline-offset-4" {...props} />,
    hr: () => <hr className="my-12 border-line" />,
    blockquote: (props) => <blockquote className="mt-5 border-s-4 border-accent ps-4 text-muted" {...props} />,
    table: (props) => (
      <div className="mt-6 overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-start text-base" {...props} />
      </div>
    ),
    th: (props) => <th className="border-b border-line bg-surface-2 px-4 py-2.5 text-start font-bold" {...props} />,
    td: (props) => <td className="border-b border-line px-4 py-2.5 align-top leading-7" {...props} />,
    figure: CodeFigure,
    code: (props: ElementProps) =>
      "data-language" in props || "data-theme" in props ? (
        <code {...props} />
      ) : (
        <code dir="ltr" className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.88em]" {...props} />
      ),
    Callout,
    Checklist,
    Glossary,
    MiniQuiz,
    PromptBuilder,
    TokenCalculator,
    Library,
    LibraryItem,
    Prompt,
    PromptCompare,
    RecapCards,
    Tabs,
    Tab,
    ...components,
  };
}
