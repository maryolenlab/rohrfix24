# RohrFix24

Responsive portfolio website for a fictional German plumbing and heating company. It demonstrates a commercial service website with German-language content, local imagery, and interactive contact flows.

## Live Demo

[View the live website](https://maryolenlab.github.io/rohrfix24/)

This link points to the earlier deployment. The safe demo interactions and legal pages in this copy may differ until a new version is published.

## My Role & AI-Assisted Development

I defined the project's visual and technical direction and guided its implementation through an iterative AI-assisted workflow. My responsibilities included:

- Defining the concept, design, page structure, and visual requirements.
- Establishing technical requirements for semantic HTML5, BEM, SCSS, and responsive layouts.
- Setting CSS class naming conventions and rules for code organization.
- Writing technical briefs and implementation instructions for Codex and other AI tools.
- Overseeing implementation, reviewing results, identifying issues, and directing corrections.
- Testing functionality, interface behavior, and responsive layouts across desktop, tablet, and mobile sizes.

AI tools assisted with code generation and revisions. My contribution combined project direction, technical specification, review, and testing.

## Technical Implementation Highlights

- Services, advantages, About, emergency calls to action, process, demo reviews, contact form, and footer.
- Responsive navigation with keyboard support and Escape-to-close behavior.
- Local form validation for required fields, email, phone, and privacy consent, with error, loading, and success states.
- Safe demo dialogs for phone, email, maps, and social controls; no calls, messages, or external profile navigation.
- Separate Impressum, Datenschutz, and AGB demonstration pages with return navigation.
- Local AVIF/WebP imagery, an SVG icon sprite, basic SEO metadata, and JSON-LD.
- Visible focus states, dialog focus management, and reduced-motion support.

## Technologies and Structure

HTML5, CSS3, SCSS, vanilla JavaScript, BEM, CSS Grid, and Flexbox. Dart Sass compiles the styles; Prettier formats SCSS. No frontend framework or bundler is used.

```text
assets/       Local images and icons
css/main.css  Compiled stylesheet used by every page
js/main.js    Form, navigation, dialog, and scroll interactions
scss/         Base, layout, component, section, and responsive source styles
index.html    Main landing page
impressum.html, datenschutz.html, agb.html  Demo information pages
package.json, package-lock.json, .gitignore
```

Layouts cover wide desktop (1280px+), compact desktop (1024–1279px), tablet (768–1023px), and mobile (below 768px). SCSS responsive overrides live in `scss/responsive/_responsive.scss`; image sources and the navigation script also contain viewport conditions.

## Run Locally

Requires Node.js 20.19 or newer and npm.

```bash
npm ci
npm run build:css
npx --yes http-server . -p 8080 -a 127.0.0.1 -c-1
```

Open [localhost:8080](http://127.0.0.1:8080). The last command runs an optional temporary static-server tool through npm; it is not a project dependency. Stop it with Ctrl+C.

Use `npm run watch:css` while editing styles, or `npm run format:scss` to format SCSS. Edit SCSS sources and rebuild `css/main.css`; retain the compiled CSS when deploying. A static host needs the HTML pages, `css/`, `js/`, and `assets/`.

## Demo Scope and Checks

RohrFix24 GmbH, contact information, opening hours, certifications, and reviews are fictional. Depicted people are AI-generated. The legal pages explain the demo context and are not legal documents for a real business.

The form checks inputs only in the browser, simulates loading, and explicitly confirms that nothing was sent. It has no submission endpoint or persistent form storage. Without JavaScript, submission stays disabled. Please use sample values.

Browser checks cover navigation, contact dialogs, form states, no-JavaScript submission safety, internal links, and layouts at 1440px, 768px, and 390px. These checks do not establish comprehensive accessibility conformance, browser compatibility, or production readiness.

A real business deployment would need verified company details, appropriate legal documents, a secure backend, and further testing. Original design references and AI development instructions are intentionally excluded from this portfolio copy.

## Repository

[github.com/maryolenlab/rohrfix24](https://github.com/maryolenlab/rohrfix24)
