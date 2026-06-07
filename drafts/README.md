# Drafts

This folder holds post drafts before they go live.

## Workflow

1. **Brief Po** — send a message like:
   > "Write a post about [topic]. My angle: [your take]. Tone: [whatever fits]."

2. **Po drafts** — writes the full HTML here as `drafts/slug-name.html`, then sends you a summary: title, subtitle, key sections, estimated read time.

3. **You review** — read the summary. Ask for changes, or say "publish it."

4. **Po publishes** — moves the file to `blog/slug-name.html`, adds the card to `blog/index.html`, commits, pushes. Live in ~30 seconds.

## Files here

- `template.html` — the base template for every new post. Po copies this and fills it in.
- `*.html` — active drafts waiting for your approval.

## Rules

- Nothing in `drafts/` ever goes live without your explicit sign-off.
- Po will always summarise before publishing, never push directly from draft.
- Old drafts stay here as a record — delete them when you're done with them.
