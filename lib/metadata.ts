// TYPE DEFINITIONS FOR WIX RICH TEXT STRUCTURE
// Rich text is stored as a tree of nested nodes, similar to HTML DOM structure

// SINGLE NODE IN THE RICH TEXT TREE
// Example node structure:
// {
//   type: "PARAGRAPH",
//   nodes: [
//     { type: "TEXT", textData: { text: "Hello " } },
//     { type: "TEXT", textData: { text: "World" } }
//   ]
// }
type RichTextNode = {
  type?: string; // Node type: "TEXT", "PARAGRAPH", "HEADING", etc.
  nodes?: RichTextNode[]; // Child nodes (recursive structure for nesting)
  textData?: { text?: string }; // Actual text content (only present in TEXT nodes)
};

// ROOT RICH TEXT OBJECT FROM WIX API
// Example from your product JSON:
// {
//   nodes: [
//     {
//       type: "PARAGRAPH",
//       nodes: [
//         { type: "TEXT", textData: { text: "Premium full-grain leather shoes..." } }
//       ]
//     },
//     {
//       type: "PARAGRAPH",
//       nodes: [
//         { type: "TEXT", textData: { text: "Soft interior lining..." } }
//       ]
//     }
//   ]
// }
type RichText = {
  nodes?: RichTextNode[]; // Array of top-level nodes
};

// EXTRACT PLAIN TEXT FROM WIX RICH TEXT STRUCTURE
// Recursively walks through nested nodes to find all text content
//
// WHY WE NEED THIS:
// - Wix stores descriptions as rich text objects (tree structure)
// - We need plain text for meta descriptions, search, etc.
// - Must traverse entire tree to collect all text pieces
//
// EXAMPLE INPUT (from your product):
// {
//   nodes: [
//     {
//       type: "PARAGRAPH",
//       nodes: [
//         { type: "TEXT", textData: { text: "Premium full-grain leather shoes" } }
//       ]
//     },
//     {
//       type: "PARAGRAPH",
//       nodes: [
//         { type: "TEXT", textData: { text: "Soft interior lining" } }
//       ]
//     }
//   ]
// }
//
// EXAMPLE OUTPUT:
// "Premium full-grain leather shoes Soft interior lining"
export function extractRichText(desc?: RichText | null): string {
  // ARRAY TO COLLECT ALL TEXT PIECES AS WE TRAVERSE THE TREE
  // Example progression:
  // 1. parts = ["Premium full-grain leather shoes"]
  // 2. parts = ["Premium full-grain leather shoes", "Soft interior lining"]
  const parts: string[] = [];

  // RECURSIVE FUNCTION TO WALK THROUGH THE NODE TREE
  // "Recursive" means it calls itself to handle nested structures
  //
  // EXAMPLE TREE TRAVERSAL:
  // Root → PARAGRAPH → TEXT ("Premium...")
  //     ↓
  //     → PARAGRAPH → TEXT ("Soft...")
  //     ↓
  //     → PARAGRAPH → TEXT ("Perfect...")
  const walk = (node?: RichTextNode) => {
    // SAFETY CHECK: Stop if node doesn't exist
    if (!node) return;

    // CHECK IF THIS IS A TEXT NODE (contains actual text content)
    // Only TEXT nodes have textData with actual text
    // Other nodes like PARAGRAPH, HEADING are just containers
    //
    // Example TEXT node:
    // { type: "TEXT", textData: { text: "Premium full-grain leather shoes" } }
    if (node.type === "TEXT") {
      const t = node.textData?.text;
      if (t) parts.push(t); // Add text to our collection
    }

    // CHECK IF THIS NODE HAS CHILDREN (nested nodes)
    // Example: PARAGRAPH node contains TEXT nodes as children
    // {
    //   type: "PARAGRAPH",
    //   nodes: [
    //     { type: "TEXT", textData: { text: "Hello" } },
    //     { type: "TEXT", textData: { text: "World" } }
    //   ]
    // }
    if (Array.isArray(node.nodes)) {
      // RECURSIVELY WALK THROUGH EACH CHILD NODE
      // This allows us to handle deeply nested structures
      for (const child of node.nodes) walk(child);
    }
  };

  // START THE TREE TRAVERSAL FROM ROOT LEVEL NODES
  // Example: If desc has 4 PARAGRAPH nodes, we walk through all 4
  if (Array.isArray(desc?.nodes)) {
    for (const n of desc.nodes) walk(n);
  }

  // COMBINE ALL TEXT PIECES AND CLEAN UP
  //
  // Step 1: parts.join(" ")
  // Example: ["Premium leather", "Soft lining"] → "Premium leather Soft lining"
  //
  // Step 2: .replace(/\s+/g, " ")
  // Replace multiple spaces with single space
  // Example: "Premium  leather    shoes" → "Premium leather shoes"
  // Why? Rich text might have extra whitespace between nodes
  //
  // Step 3: .trim()
  // Remove leading/trailing whitespace
  // Example: "  Premium leather shoes  " → "Premium leather shoes"
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

// REAL USAGE EXAMPLE:
// const richText = {
//   nodes: [
//     { type: "PARAGRAPH", nodes: [
//       { type: "TEXT", textData: { text: "Premium leather" } }
//     ]},
//     { type: "PARAGRAPH", nodes: [
//       { type: "TEXT", textData: { text: "Soft interior" } }
//     ]}
//   ]
// };
//
// extractRichText(richText) → "Premium leather Soft interior"
