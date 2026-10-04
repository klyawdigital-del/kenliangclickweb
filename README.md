# kenliang.click

Ken Liang personal website. Chinese and English, responsive static HTML/CSS/JavaScript; no build step or backend required.

## Preview
Serve the repository root with a static server, for example `python -m http.server 8080`, then open http://localhost:8080.

## Features
- Scroll-driven particle doorway with reduced-motion support.
- One continuous scroll journey: services, ten portfolio images in perspective, founder desk portrait, and hologram hands holding the two audience choices.
- Slow ambient particle-grid movement, language switching with saved preference, and reduced-motion support.
- Project inquiry CTA opens the supplied Marketing Pro Suite form only on click. No form data is handled by this repository.
- Free resources CTA links to https://get.kenliang.click.

## Deployment
Publish this directory as static assets. The entry is index.html. There is no build command and no package installation required. Hosting provider and domain settings are configured separately.

## Validation
Desktop 1440×960 and mobile 390×844 checks passed for the inquiry popup, close/reopen, Escape, focus restoration, resource URL and horizontal overflow. The actual hosted form was visually checked without submitting it. The existing scroll sequence was also checked with reduced motion.

## Assets
The hologram hand and earlier doorway illustrations were generated for this project. Founder photography was supplied by the owner. Portfolio images were supplied via the owner's existing https://kenliang.click website. Preserve asset filenames when publishing.
