# TOK Exhibition Inspirer

A static, GitHub Pages-friendly starter project for generating TOK Exhibition thinking rather than student answers.

## Run it

Open `index.html` directly in a browser, or use a simple local server such as VS Code Live Server.

## Edit the teaching content

You should normally only need to edit files in `/data`:

- `prompts.js`: approved exhibition prompts
- `objects.js`: approved inspiration-object library
- `lenses.js`: TOK thinking questions
- `challenges.js`: Bronze to Nightmare progression

Each object has an `enabled` field. Set it to `false` to hide the object without deleting it.

## Add an object

Copy an existing object in `data/objects.js`, give it a unique id and edit its fields:

```js
{
  id: "OBJ010",
  name: "A short, recognisable object label",
  shortDescription: "Why this object may be interesting for TOK thinking.",
  category: "Technology",
  contextType: "Personal",
  themes: ["Knowledge and technology"],
  concepts: ["evidence", "perspective"],
  promptMatches: [1, 3, 5],
  difficulty: 1,
  enabled: true
}
```

Use lens ids from `data/lenses.js` in the `concepts` array. Use prompt numbers from `data/prompts.js` in `promptMatches`.

## Important prompt note

The included prompt list is starter/sample content. Replace it with the exact approved wording used by your school before classroom deployment.

## Current V1 features

- Prompt selection and random prompt
- Structured random generation of three contrasting objects
- Individual object rerolls
- Object-specific random TOK lenses
- Connection-strength self-assessment
- Bronze to Nightmare challenge ladder with editable “Inspire me” thinking nudges
- Student planning board stored locally in the browser
- Print-friendly planning view
- No accounts, database, API or AI required

## Suggested next development steps

1. Expand and approve the object library.
2. Replace the sample prompts.
3. Add object filters by theme, context and difficulty.
4. Add teacher preview and data validation.
5. Add export/import for student planning data.

### Lens behaviour

Clicking **Another lens** will not immediately repeat the lens currently shown. If an object has only one eligible enabled lens, that lens must repeat.

### Progressive challenge inspiration

Each challenge level has its own editable `inspirations` array in `data/challenges.js`. Clicking **Inspire me** gives a different nudge from the one currently displayed.
