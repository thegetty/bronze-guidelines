# Prototype for CAST:ING Book

- Quire: v0.18.0
- Hugo: v0.61.0
- Node: v10.16.0

https://jira.getty.edu/browse/DEV-4033

This is a prototype for the Quire project “Guidelines for Best Practice in the Technical Examination of Cast Bronze Sculpture,” slated for publication fall 2021. View it online at https://nervous-colden-8ee4be.netlify.com/. The prototype is an initial exploration of three features:

1. Accordion content sections
2. Inline figure pop-ups
3. Slide/parallax page type

## Accordion content sections

The primary content of this book is organized in a highly specific outline following a section 1, sub-section 1.1, sub-sub-section 1.1.1 type of structure. To make this more reader-friendly online, we'd like to have the sub-sections and sub-sub-sections collapse in accordions with each chapter.

In the prototype, this was done with a script and some minimal css from https://inclusive-components.design/collapsible-sections/. The nice thing about this particular implementation is that:

- it’s a progressive enhancement so that readers without JavaScript will still get the content cleanly
- it's explicitly designed to be accessible
- it requires no special markup in the markdown documents for each chapter, making for a much cleaner experience for our editors

One issue that became immediately clear and that would need to be addressed is that you can't connect to anchor links inside collapsed sections. Try, for example, clicking on a footnote link (the footnotes being in a collapsed section).

In this prototype implementation, the original script was designed to pick up only H2 elements as a basis for creating the sections. We wanted to do it differently, collapsing H3 and H4 sections instead, and H2 sections only when the H2 heading had an explicit `fold-up` class. To do this I just copied the script three times and made the necessary changes. There’s obviously a cleaner way to do this.

## Inline figure pop-ups

Rather than having figure images particularly assigned to individual chapters and appearing inline within the chapter texts, the authors have amassed a group of figure images, that they refer to multiply throughout the chapters as needed. Rather than have these interrupt the main text, they'll be available in small pop-ups modeled on the glossary and citation pop-ups we've used elsewhere. And the template code for the `q-img` pop-up was derived from those alternate versions.

You can see this feature in the Chapter 1 prototype, the only thing that will need to be done to the pop-up itself is to have some better logic and css applied to more gracfeully handle 1 versus 6+ images.

From these pop-ups currently, when you click on an image within it just goes to a page with that image alone, but in the final book, the vision is that clicking on one would open Quire's full-page viewing modal with zoom ability, captions, etc.

## Slide/parallax page type

The book also includes a series of Case Studies. These are envisioned being presented more as a scrolling slide or parallax view, both to separate them from the main text visually/conceptually and to tell a much more narrative story (these being exemplars of how the guidelines in the rest of the book were put to use in real world scenarios). Along with identifying the proper technical implementation for these, a significant amount of content choreography on the author/editor side will need to be done to make them feel right.

For the prototype, I tried two options. The first being [fullPage.js](https://github.com/alvarotrigo/fullPage.js) and the second being [Animate on Scroll (AOS)](https://github.com/michalsnik/aos/tree/v2). 

fullPage is more of a slide approach and while it handled movement from slide to slide well, it came apart when the content overflowed the slides, despite there being some options in the code that were supposed to handle this. fullPage is also semi-proprietary and required a modestly-priced license to use. For these reasons, I ultimately didn't include it in the prototype site, thought the code for it is still in the repo as a demo.

AOS offered a smoother scrolling experience and for the purposes of the prototype, enough animation effects that let us get a feel for how these Case Study sections might feel. However, it’s not been in active development for sometime, and is not quire full-featured enough to use in production. For instance, it would be good if classes could be subtracted from the navigation bar, not just added, so that only the current section was highlighted; or would be good if we could temporarily pin an image or block of text to a fixed point while other items continued to scroll).

A third library that might be good to look at is [ScrollMagic](https://github.com/janpaepke/ScrollMagic). And presumably there are others.

### Side navigation

One particular feature of these Case Studies will be the page navigation bar that lists the sections on the page, links to them individually and helps track progress of the reader. In the prototype, the navigation uses the H2 titles by default, or a short version if it was provided in the shortcodes wrapping each section, as in:

```markdown

{{< q-section "Internal Evidence" >}}

## Internal evidence of unique chaplets

The location of core supports is nearly invisible on the radiographs. Endoscopic examination of the interior metal walls of the Justice and the Peace where the core has been removed revealed a rather unique feature in both: the raised outline of what looks like a rectangular bronze patch with an integral faceted tapering point extending out from their center. That these features are idiosyncratic to these 2 casts is a strong indication of their production in the same foundry. No such chaplets could be observed in the radiographs of the Abundance due to the possible masking of the internal surface by the core.

{{< /q-section >}}
```



