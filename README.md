# Dipity Investor Deck

Single-file HTML investor deck with a built-in slide editor. No build step, no dependencies — `index.html` + `assets/` is the whole thing.

Design language mirrors the Dipity site ("Morgan's Rebuild" Webflow): Geist / Geist Mono, near-black neutrals, hairline outlines, violet `#c599ff` · pink `#ff88be` · lime `#a2f865` accents, dot-matrix textures, terminal cards, mono `// marginalia //`.

## Viewing

Open `index.html` in a browser. Navigate with arrow keys, space, or the dot rail on the right. Slides scroll-snap full screen.

## Editing (in the browser)

Bottom-left toolbar:

- **✎ Edit** — toggles edit mode. Click any text to edit it in place. ▲▼ buttons on each slide's left edge reorder slides; numbering and nav dots update automatically.
- **Export** — downloads a new `index.html` with your edits baked in. Replace the repo copy with it and commit.
- **Reset** — discards in-browser edits, restores the file's version.

Edits autosave to `localStorage` (per browser). They are NOT in the file until you Export.

## Deploying

The production deck is the Vercel project `sera-deck` (live at sera-deck-ochre.vercel.app). Deploy by copying this folder's contents into the Vercel-linked folder and running `vercel --prod`, or link this repo directly with `vercel link`.

## Editing beyond text

Media swaps, layout, colors, and new slide types are code edits in `index.html` — everything (CSS, markup, editor JS) lives in that one file. Assets are compressed with ffmpeg (`crf 31`, 1600px wide for background video loops) to keep the deck fast.
