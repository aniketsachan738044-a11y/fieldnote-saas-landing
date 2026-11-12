# Fieldnote — SaaS Landing Page

A responsive landing page for **Fieldnote**, a lightweight project tracking and client-update SaaS built for small product teams and studios.

## Technologies Used
- **HTML5**: Semantic structure (`header`, `main`, `section`, `article`, `footer`) and accessible ARIA attributes.
- **CSS3**: CSS custom properties, Flexbox, CSS Grid, and responsive media queries (`960px` and `720px` breakpoints).
- **Vanilla JavaScript**: Interactive deliverable checklist in the hero, mobile navigation drawer, Monthly/Yearly pricing toggle, plan pre-selection, modal dialog, and form validation.

## Features Implemented
- Sticky navigation bar with smooth section scrolling and a mobile hamburger menu.
- Hero section with an **interactive deliverable checklist** where visitors can click tasks to toggle completion and update the live counter.
- 3-card Features grid, 3-step "How It Works" workflow, and 3-tier Pricing section (`Starter`, `Studio`, `Scale`) with a Monthly/Yearly toggle.
- Quick-start signup modal and Demo Request form with inline validation and success feedback.

## How to Run Locally
1. Download or clone the repository.
2. Open `index.html` in any modern web browser — no build step required.
   - Or run a local static server:
     ```bash
     npx serve .
     ```

## Design Choices & Challenges Solved (Submission Summary)
I chose a warm paper-and-ink palette (`#faf9f6` background, `#141413` text, `#0f766e` forest teal accent) paired with `Space Grotesk` headings and `DM Sans` body text to create a distinct editorial look rather than a standard white-and-indigo template. Instead of static placeholder images, I built an interactive deliverable board in the hero so visitors can click tasks to toggle their completion state and watch the progress counter update live. To keep the layout clean on narrow mobile screens, I used CSS Grid breakpoints (`960px` and `720px`) along with a collapsible mobile navigation menu. Client-side regex email validation and inline error states were added to both the demo form and signup modal so users get immediate feedback without a backend.
