# CLAUDE.md — ameliebrazelton.com

## Who you're working for
Amelie owns this site. She is a writer and designer, not a developer.
Explain changes in plain language. Show preview links, not diffs.
Never ask her to run commands, edit files, or log into Vercel, GitHub, or Namecheap.

## Shipping workflow (every change)
1. Work on a new branch, never directly on main.
2. Run `npm run build` locally. If it fails, fix it. Never push a failing build.
3. Push the branch and give Amelie the Vercel preview URL.
4. Ask her to check it on desktop and phone. Check 375px width yourself too.
5. Merge to main ONLY after she explicitly approves. Main = the live site.
6. Afterward, tell her in one or two sentences what changed and how to undo it.

## Commit identity
Vercel's free plan only deploys commits authored by the account owner (Amelie).
Commit as `Amelie Brazelton <350789430+abrazelton3@users.noreply.github.com>`
(her GitHub noreply address; set with `git config user.name` / `user.email` in this repo).
If Paul pushes a fix, it ships only after she merges it.

## Hosting
Vercel project `biggins` in Amelie's Hobby team "Bigs" (biggins-three.vercel.app),
moved from Paul's account on Nov 1, 2026. Sanity publishes rebuild the site through
a Deploy Hook on `main`.

## Design rules
- Change only what she asked for. No unrequested restyling or "cleanup."
- All design tokens live as CSS variables in styles.css :root. Change tokens, not scattered values.
- Keep existing class names; styles.css depends on them.
- Preserve the four conventions: emphasis substring, opt-in clip notes,
  field frames rendered twice, empty social images show a placeholder.
- Images go through urlFor() with width/format/quality. Never ship raw asset URLs
  or inline background-image pointing at unoptimized files.

## Content rules
- Content lives in Sanity, never hardcoded in templates. New editable text = a Sanity field.
- Never invent content: no placeholder articles, fake URLs, or filler essays.
- Never edit or delete Sanity documents without Amelie asking for that exact change.
- NEVER re-run scripts/migrate-to-sanity.mjs. It overwrites Amelie's edits with old data.

## Schema changes
- Additive only: add fields and types freely. Never rename or remove a field that holds
  data without migrating it first and getting Amelie's OK.
- Every image field keeps options: { hotspot: true }.
- After a schema change, redeploy the Studio so she sees the new fields.
- New repeating section = new document type + index page + detail page.
- New one-off page = new route + a singleton for its editable text.

## Off-limits (escalate to Paul instead)
- DNS, the domain, email forwarding, Namecheap anything.
- Vercel project settings, environment variables, deploy hooks, plan changes.
- Sanity project settings, API tokens, webhooks, dataset visibility.
- Never commit secrets. Never ask Amelie for passwords or API keys.
- No major-version dependency upgrades unless asked.

## If production breaks
Revert the offending merge on main and push; the site redeploys the last good version.
Then tell Amelie what happened in plain words, and fix forward on a branch.
