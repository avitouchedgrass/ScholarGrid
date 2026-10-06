# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Students searching for and applying to scholarships, using the product directly for
themselves. There is no counselor seat, no parent view, and no institutional buyer in
scope: the person who searches is the person who applies. The profile model in code is
single-subject (one GPA, one test score, one intended major, one tag set, one essay
vault), which matches this.

## Product Purpose

A scholarship **database** platform. The student's job is to find the opportunities that
are genuinely theirs out of a large corpus, judge which ones are worth the work, and
then finish the applications before the deadlines pass.

Success is a student who applies to more scholarships that they can actually win, with
less wasted effort on ones they were never eligible for.

## Positioning

Four mechanisms, all confirmed as core and none subordinate:

1. **Auditable match scoring.** A match percentage decomposes into weighted, inspectable
   criteria (major, GPA, tag alignment, application status), each passing or failing with
   a reason. The student can see what is blocking a match, not just a number.
2. **Write once, apply many.** An essay vault holds reusable core essays with word counts
   and targets; a single essay attaches to many applications.
3. **Deadline command center.** Finding is not the hard part; finishing is. Per-application
   pipeline status, checklists, notes, and impending-deadline surfacing.
4. **Eligibility tag matrix.** Demographics, residency, and academic attributes are
   structured data rather than free-text keywords, so the profile itself is the query and
   matches are exact rather than fuzzy.

## Operating Context

Deep filtering is central to how the corpus is navigated, not a secondary refinement
panel. Confirmed filter dimensions include keyword, minimum match score, application
effort load, and **effort-to-return** (award value weighed against work required), plus
sorting by match, award amount, and deadline. Additional filter dimensions are expected;
the product is understood as filter-rich.

Working shape in the current build: a saved-opportunity pipeline with metrics, a
filters/search surface, a profile/feature-store surface, an explore surface for new
matches, a match-breakdown drawer, and an application workspace modal.

## Capabilities and Constraints

- React 18 + Vite 5, Tailwind CSS v4 (`@import "tailwindcss"`, CSS-first config),
  `lucide-react` icons, `gsap` for motion, `three` present but currently unused in the
  rendered app.
- No router. Surfaces switch through a single `activeTab` state value in `src/App.jsx`.
  A new route-like surface requires either adding routing or an explicit pre-app gate.
- No authentication, no backend, no persistence. State is React state only and resets
  on reload.
- Theme is a `data-theme` attribute on `<html>` with a CSS custom-property token set;
  it initializes from `prefers-color-scheme` and toggles manually. Both light and dark
  are first-class, not one plus a variant.
- Effort-to-return exists as raw material (`amount`, `effortLevel`, `essayCount`,
  `reqLetterCount`) but is not yet an implemented filter control.

## Brand Commitments

- Name: **ScholarGrid**. Current tagline in code: "Precision Application Command."
- **Grid** is the identity motif, literally: a grid background is a pinned visual
  commitment, taken from the name.
- **Dark mode:** predominantly neutral with a slight cool tinge.
- **Light mode:** predominantly neutral with a slight warm tinge — very slight.
- Both modes stay neutral-dominant. Neither is a colored theme.

## Evidence on Hand

**There is none. Every piece of data in the product is mock.** This is a prototype.

- `src/data/mockData.js` holds six invented scholarships and three invented essays.
- Those records name real organizations as providers — NVIDIA, Google, IEEE, Y Combinator,
  the Thiel Foundation, Apple, Meta, the Society of Women Engineers. **These affiliations
  are fabricated.** They may not be presented anywhere as partners, sources, funders, or
  logos.
- No scholarship corpus, no corpus size, no match-accuracy figure, no user count, no
  awarded-dollars figure, no testimonial, no case study, no press, no institutional
  customer exists. None of these may be invented or implied.
- Illustrative in-product data may be authored at full fidelity and shown as a
  demonstration, labeled as such wherever a visitor could mistake it for real inventory.

## Product Principles

1. **Show the work.** A score the student cannot interrogate is a score they cannot act
   on; transparency of matching is the product, not a feature of it.
2. **Effort is a first-class cost.** Award value alone is not worth; value against work
   required is worth.
3. **Structured beats fuzzy.** Eligibility is data. Never degrade it into keyword search.
4. **The corpus is large, so filtering is the interface.** Navigating down is the primary
   verb.
5. **Finishing counts, not finding.** A found scholarship that is never submitted is
   worth nothing.
6. **Never overstate.** The product is a prototype with mock data; no surface may claim
   corpus, accuracy, outcomes, or affiliation.

## Accessibility & Inclusion

No product-specific standard has been established yet. Both light and dark themes are
required and must each be legible on their own terms.
