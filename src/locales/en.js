export const en = {
  "title": "Impeccable · Local help",
  "description": "Browse Impeccable commands without messaging the model",
  "search": "Search: ",
  "placeholder": "command or what you want to improve",
  "available": "Skill loaded · preparing does not execute",
  "unavailable": "Skill not loaded · reference only",
  "baseline": "Reference: Impeccable 4.2.0 · check your version",
  "listKeys": "{up}/{down} choose · {enter} details · {tab} ES/EN · {escape} close",
  "detailKeys": "{up}/{down} scroll · {left} back · {enter} prepare · {escape} close",
  "resize": "Enlarge the terminal to read help.",
  "noResults": "No matches. Remove part of the search.",
  "when": "When to use it",
  "avoid": "When not to",
  "effect": "Effect when executed",
  "example": "Example to prepare",
  "natural": "You can also ask naturally",
  "naturalPrefix": "Use Impeccable to: ",
  "scope": "Before sending: specify the surface, goal, and what to preserve.",
  "safety": "Browsing help does not call the model. Sending the skill command starts agent work.",
  "confirmTitle": "Replace the draft?",
  "confirmBody": "The editor already contains text. Preparing this command will replace it, without sending. Cancel to keep your draft.",
  "changed": "The draft changed while you were confirming. It was preserved; prepare the command again.",
  "missing": "Impeccable is not loaded in this session. Install the skill separately and reload Pi.",
  "tuiOnly": "This help requires the interactive Pi terminal.",
  "effects": {
    "review": "Diagnosis. The example requests no file changes; supporting tools still need an appropriate scope.",
    "plan": "Plans and may write documents; does not automatically implement the result.",
    "docs": "Creates or updates product or design documentation.",
    "refactor": "Changes components or tokens; requires regression checks.",
    "edit": "Changes the interface; check rendering, states, and behavior.",
    "live": "May start tools and change source. Use recoverable state and validate interactions.",
    "alias": "Deprecated alias; prefer an ordinary request for new UI."
  },
  "commands": {
    "critique": {
      "label": "Understand design problems",
      "when": "When a screen feels confusing or generic and the correction is not yet clear.",
      "avoid": "Not permission to redesign, or a guarantee of accessibility.",
      "example": "Review the current screen without modifying files. Prioritize observable problems and preserve the approved design."
    },
    "audit": {
      "label": "Check accessibility and technical quality",
      "when": "To examine states, responsiveness, performance, and accessibility in an implementation.",
      "avoid": "Does not replace actual tests or certify compliance.",
      "example": "Audit the current screen without modifying files. Separate checked findings from items that need testing."
    },
    "shape": {
      "label": "Decide structure and flow",
      "when": "Before implementing a screen or changing its navigation and hierarchy.",
      "avoid": "Do not repeat decisions already settled in an approved design.",
      "example": "Plan the specified screen flow before writing code. Preserve the approved requirements."
    },
    "init": {
      "label": "Establish product context",
      "when": "When shared users, goals, and constraints are missing.",
      "avoid": "Do not repeat routinely or replace reliable existing context.",
      "example": "Establish product context using existing documentation. Ask about missing decisions."
    },
    "document": {
      "label": "Record the visual system",
      "when": "To document an existing visual system worth preserving in DESIGN.md.",
      "avoid": "Do not turn accidental defects into rules or overwrite an approved source.",
      "example": "Document the existing visual system. Distinguish intentional patterns from inconsistencies."
    },
    "extract": {
      "label": "Reuse components and tokens",
      "when": "When actual duplication makes a consistent design hard to maintain.",
      "avoid": "Not documentation only, or justification for a speculative library.",
      "example": "Extract repeated patterns in the specified scope without changing appearance or behavior."
    },
    "polish": {
      "label": "Finish a working screen",
      "when": "When structure and behavior work and visible finishing details remain.",
      "avoid": "Do not fix an incorrect flow with cosmetic adjustments.",
      "example": "Polish spacing and typography in the specified screen. Preserve structure and behavior."
    },
    "layout": {
      "label": "Improve arrangement and spacing",
      "when": "To correct alignment, density, rhythm, and hierarchy between regions.",
      "avoid": "Do not invent panels or actions to fill space.",
      "example": "Improve the specified layout while preserving content, controls, and task order."
    },
    "typeset": {
      "label": "Improve typography and readability",
      "when": "When sizes, weights, or line lengths make reading and hierarchy difficult.",
      "avoid": "Do not replace approved fonts without a reason and permission.",
      "example": "Improve typographic hierarchy and readability while preserving the existing identity."
    },
    "clarify": {
      "label": "Clarify labels and messages",
      "when": "When instructions, errors, or action names cause uncertainty.",
      "avoid": "Do not change facts or invent product promises.",
      "example": "Clarify the specified labels and messages without changing meaning or product capabilities."
    },
    "distill": {
      "label": "Reduce visual complexity",
      "when": "When decoration or secondary content obscures the main task.",
      "avoid": "Do not remove necessary information or controls.",
      "example": "Simplify the specified screen while preserving necessary functions and information."
    },
    "harden": {
      "label": "Handle errors and edge cases",
      "when": "To improve recovery, translations, long text, and real application states.",
      "avoid": "Not a complete security audit or permission to change the backend.",
      "example": "Harden errors and edge cases in the specified scope; preserve contracts and test behavior."
    },
    "onboard": {
      "label": "Guide first use",
      "when": "For first steps and empty states that need to show how to begin.",
      "avoid": "Do not add a tutorial when contextual guidance is enough.",
      "example": "Improve first use of the specified flow without inventing data or capabilities."
    },
    "adapt": {
      "label": "Adapt to screens and devices",
      "when": "When the interface needs to support defined sizes or input methods.",
      "avoid": "Do not promise devices you cannot validate.",
      "example": "Adapt the screen to the agreed sizes and check content, focus, and controls."
    },
    "optimize": {
      "label": "Fix measured UI slowness",
      "when": "When slowness is measurable and the affected journey is identified.",
      "avoid": "Do not optimize blindly or add speculative caches.",
      "example": "Diagnose the specified slow journey, measure it, and apply the smallest verifiable correction."
    },
    "bolder": {
      "label": "Increase visual presence",
      "when": "When stronger expression is requested and fits the identity.",
      "avoid": "Not a substitute for diagnosis or permission to replace an approved direction.",
      "example": "Strengthen visual expression in the specified scope without changing content or behavior."
    },
    "quieter": {
      "label": "Reduce visual intensity",
      "when": "When color, contrast, or decoration compete for attention.",
      "avoid": "Do not remove focus indicators, accessible contrast, or important states.",
      "example": "Reduce visual noise while preserving hierarchy, focus, and state indicators."
    },
    "colorize": {
      "label": "Use color purposefully",
      "when": "When color can distinguish information or reinforce identity.",
      "avoid": "Do not convey states through color alone or impose a different palette.",
      "example": "Improve functional use of color while preserving the palette and contrast."
    },
    "animate": {
      "label": "Add useful motion",
      "when": "To explain transitions, cause and effect, or response to actions.",
      "avoid": "Do not add gratuitous movement or ignore reduced motion.",
      "example": "Add motion only where it clarifies interaction and respect reduced motion."
    },
    "delight": {
      "label": "Add personality",
      "when": "When product-specific details can improve the experience without distraction.",
      "avoid": "Do not put jokes in sensitive errors or add decoration without a purpose.",
      "example": "Propose personality details within the visual system without distracting from the task."
    },
    "overdrive": {
      "label": "Explore ambitious expression",
      "when": "When the brief explicitly requests an exceptional visual experience.",
      "avoid": "Not the default for operational tools or technical help.",
      "example": "Explore an ambitious visual direction for the agreed scope without sacrificing accessibility or performance."
    },
    "live": {
      "label": "Compare variants in a browser",
      "when": "To explore alternatives on a bounded, recoverable surface.",
      "avoid": "Do not accept visual copies without checking IDs, events, and state.",
      "example": "Explore variants of the specified component in an isolated environment. Preserve behavior and review the diff before accepting."
    },
    "craft": {
      "label": "Legacy alias for new work",
      "when": "To recognize older instructions; an ordinary new-UI request is sufficient today.",
      "avoid": "Not an additional required workflow step.",
      "example": "Design the specified surface from the approved brief without inventing capabilities."
    }
  }
};
