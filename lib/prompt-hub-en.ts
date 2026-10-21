import type { HubCategory } from "@/lib/prompt-hub";

export const promptHubEn: HubCategory[] = [
  {
    id: "debug",
    label: "Debugging",
    prompts: [
      { title: "Full bug report", prompt: "What I did: [action]. What I expected: [result]. What happened: [what I saw]. Since when: [after which change]. Full error: [paste]. Find the root cause, and don't fix anything yet." },
      { title: "Investigate without changes", prompt: "Suggest three possible causes for the problem, from most to least likely. For each one: how we'd check it without changing code.", tip: "Works best in plan mode." },
      { title: "What broke it?", prompt: "This worked in yesterday's commit and broke since. Compare against the recent commits in git and tell me which change most likely caused it." },
      { title: "A fix, not a cover-up", prompt: "Fix the root cause. No try/catch that swallows errors, no ts-ignore, and no disabling checks. After the fix, run it again and show me the error is gone." },
      { title: "Build error", prompt: "Run npm run build. If there are errors, fix the root cause of each and run it again, until the build passes. At the end, summarize each fix in one sentence." },
    ],
  },
  {
    id: "refactor",
    label: "Refactoring",
    prompts: [
      { title: "Plan before changing", prompt: "Propose a refactor of @[file] without changing any behavior. Start with a plan in small steps, and only after I approve, do one step at a time with a build after each." },
      { title: "Split a huge file", prompt: "@[file] is too long. Split it into small components by responsibility, without changing what the user sees. Show me the proposed structure before you start." },
      { title: "Clean dead code", prompt: "Find unused functions, files and dependencies in the project. List them with proof that each is unused, and don't delete anything until I approve." },
      { title: "Clearer names", prompt: "Go through @[file] and suggest clearer names for variables and functions. Renames only, no logic changes." },
    ],
  },
  {
    id: "git",
    label: "Git & PRs",
    prompts: [
      { title: "What changed?", prompt: "What changed since the last commit? Summarize file by file, one sentence per file." },
      { title: "Clean commits", prompt: "Commit the changes in git. One commit per topic, with a short first line that says what and why. Don't push." },
      { title: "New branch", prompt: "Create a new branch called feature/[name] from main and switch to it." },
      { title: "Open a PR", prompt: "Push the branch and open a Pull Request to main. In the description: what changed and why, how to test manually, and the risks. Show me the description before you create the PR." },
      { title: "Safe rollback", prompt: "The last commit broke something. Undo it with git revert, without deleting history, and explain what was undone." },
    ],
  },
  {
    id: "tests",
    label: "Testing",
    prompts: [
      { title: "Tests for a file", prompt: "Write tests for @[file], including edge cases: empty, zero, large numbers and non-English text. Run them. If a test fails, tell me whether the problem is in the code or the test." },
      { title: "Reproduce a bug in a test", prompt: "Before fixing, write a test that reproduces the bug and fails. Then fix it and show the test passing. Show me the output of both runs." },
      { title: "Try to break it", prompt: "Try to break the [name] feature. Think like a confused user, a hurried user, and a user trying to mess around. What happens in each case? Don't fix anything yet." },
      { title: "Browser check", prompt: "Open localhost:3000, go through the flow [description], and check after every action whether there are console errors.", tip: "Needs claude --chrome (chapter 13)." },
    ],
  },
  {
    id: "rtl",
    label: "RTL & i18n",
    prompts: [
      { title: "Convert to RTL", prompt: "Make the site right-to-left: set lang and dir=\"rtl\" on html, and across the CSS replace ml/mr/pl/pr with ms/me/ps/pe. Check that arrow icons point the right way." },
      { title: "Add a second language", prompt: "Add an English version of the site under /en with a language switcher in the header. Move all UI strings into one dictionary file per language. Show me the plan first." },
      { title: "Mixed-direction text", prompt: "Find places in the UI where right-to-left text and English words or numbers share a line and render in the wrong order. Fix them with dir=\"auto\" or a bdi wrapper, and show me before and after." },
      { title: "Full RTL audit", prompt: "Go through every page and check: alignment, column order, arrow direction, forms, and mobile menus. Report by page, and don't fix anything yet." },
    ],
  },
];
