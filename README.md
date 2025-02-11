This is the repository for *Guidelines for the Technical Examination of Bronze Sculpture*. This digital book was first published February 11, 2025, by the J. Paul Getty Museum. It is available online at https://www.getty.edu/publications/bronze-guidelines/ and may be downloaded there free of charge in multiple formats.

## About the Book

Since the fourth millennium BCE, bronze has been the preferred medium for some of the most prestigious and sacred works of art. But only through interdisciplinary research can the fabrication of these extraordinary objects be properly investigated, interpreted, and documented. This innovative publication bridges the expertise of myriad art-technological specialists to create a new framework for advancing the understanding of bronze sculpture.

Essential reading for curators, conservators, scientists, archaeologists, sculptors, metallurgists, founders, dealers, collectors, and anyone interested in the life cycle of a bronze, this volume explains how to identify the evidence of process steps, metals used, casting defects, and surface work and alterations before moving on to address analytical techniques ranging from visual exams to imaging, material analyses, and dating. The guidelines are accompanied by detailed illustrations, including videos, charts, and animations; a robust vocabulary, ensuring precision across English, German, French, Italian, and Chinese; a diverse selection of case studies; and a comprehensive bibliography.owned by artists.

## Using this Repository

This is one in series of multiformat publications using [Quire](http://quire.getty.edu)™, Getty’s multiformat publishing tool. 

We are dedicated to maintaining this publication for years to come at the permanent URL, https://www.getty.edu/publications/bronze-guidelines/, and in its various formats and incarnations. For any updates to the book, we will be following something between an app and traditional book publication model. Updates will only be made in regulated chunks as formal revisions and new editions and will always be thoroughly documented here in the repository, as well as in the revision history included with each of the book’s many formats.

The primary content pieces of the book can be found in the `content` directory. The `main` branch represents the current, published edition at all times, and the `revisions` branch, when present, will show changes currently under consideration. We invite you to submit suggestions or corrections via pull request on the revisions branch, by posting an issue, or by emailing us at [pubsinfo@getty.edu](mailto:pubsinfo@getty.edu).

## Development Notes

This project was last built with the following software versions:

- Node 18.20.5
- Quire CLI 1.0.0-rc.25

### Branches

| branch | about |
| --- | --- |
| `main` | The primary branch |
| `first-pages`, `second-pages`, `third-pages`, `final-pages`| Versions of the project at various stages |
| `first-pages-hugo`, `prototype`| Early, prototype versions of the project created for testing |
| `forthcoming` | A static placeholder page that was displayed at the book’s final URL on getty.edu prior to publication |
| `revisions` | Any revisions currently under consideration but not yet published |

### Figure Images Submodule

Many of figure images for *Bronze Guidelines* are licensed from third parties for use exclusively in this publication. As such, they are kept in a separate, private repository, https://github.com/thegetty/bronze-guidelines/, which is linked to this main publication repository as a submodule in `content/_assets/images/figures/`. When cloning this repo for further development, you’ll permissions for the private repository and will need to clone recursively in order to clone both the main repo and the submodule.

```
git clone --recursive https://github.com/thegetty/bronze-guidelines.git
```

## Build and Deploy the HTML Version

1. Set publication.url to https://www.getty.edu/publications/bronze-guidelines/

2. Run `quire build`

3. In `_site` find all instances of `src=\"/_assets/images/` and replace with `src=\"/publications/bronze-guidelines/_assets/images/`

4. Copy `content/embeds/` into `_site/`

5. Run `netlify deploy`

## Create a PDF Version

1. Build the current site: `npm run build`

2. Move needed files (which Vite is otherwise removing) into the _site directory: `rm -r _site/_assets/images/figures && cp -r content/_assets/images/figures _site/_assets/images/figures && cp public/pdf.html _site && cp public/pdf.css _site`

3. Fix the font paths: Open _site/pdf.css, find `/_assets/fonts/` and replace with `_assets/fonts/`

4. Output the PDF: `npm run build:prince`

## Create an EPUB Version

1. Set publication.url to http://localhost:8080/

2. Run `quire build`

3. Run the following regex find and replace patterns:

    ```
    href="visual-atlas/([0-9]{3})/
    href="page-94_print-visual-atlas.xhtml#fig-$1

    href="visual-atlas/v([0-9]{2})/
    href="page-94_print-visual-atlas.xhtml#vid-$1

    href="tables/([0-9]{2})/
    href="page-95_tables.xhtml#table-$1

    <video.*?video>
    [nothing]

    #fig-121"
    #fig-121-print"
    ```

4. Run `quire epub`

5. Unzip the resulting EPUB file, and in the package.opf file, run the following regex find and replace pattern:

    ```
    <item id="([0-9])
    <item id="pic-$1
    ```

6. Zip the file back up

7. Run EPUB validation to confirm

## Customizations Made to 11ty Templates/Files

**_includes/components/analytics.js**
**_layouts/base.11ty.js**
Added Google Analytics 4

**_includes/components/figure/caption.js**
Remove hard-coded `<em>` tags

**_includes/components/contributor/bio.js**
**_plugins/shortcodes/contributors.js**
Fix contributor `id` values to avoid EPUB validation errors

**_includes/components/copyright/licensing.js**
Customized licensing language

**_includes/components/figure/modal-link.js**
**_includes/components/figure/label.js**
**_includes/components/figure/video/element.js**
Linked figures to iframe viewer rather than modal

**_includes/components/figure/video/element.js**
Added Poster image to Vimeo output so that could show poster on page, and iframe embed in modal.

**_includes/components/figure/image/element.js**
**_includes/components/figure/image/html.js**
Allow annotated images to display in line on page, not just modal

**includes/components/figure/image/print.js**
Output ALL image layers for checkbox and radio button annotations

**_includes/components/figure/table/html.js**
Updated link to open iframe viewer instead of modal

**_includes/components/head.js**
**_includes/components/head-tags/opengraph.js**
**_includes/components/head-tags/twitter-card.js**
Update and clean-up handling for social sharing

**_includes/components/icons.js**
Add some icons and made sure they are consistent weight and size

**_includes/web-components/lightbox/index.js**
Add `<details>` element around lightbox captions

**_includes/components/modal/index.js**
Added class to enable styling in modal vs. inline

**_includes/components/navigation.js**
Removed title truncation in navbar, and show section titles/links in center instead of home page link

**_includes/components/object-filters/object-card/object-image.webc**
Fixed source of thumbnails for videos and embeds/tables

**_includes/components/page-header.js**
**_includes/components/table-of-contents/item/list.js**
**_layouts/table-of-contents.11ty.js**
Added handling for contributor_as_it_appears at the page-level

**_includes/components/page-title.js**
Wrap label, label divider, and title elements in their own spans.
Don't include an empty .quire-page-seperator element to avoid EPUB validation error

**_includes/components/scripts.js**
Add call for custom.js file

**_includes/def.liquid**
Custom include to create definition pop-ups.

**_includes/web-components/modal/index.js**
Allow links with .q-figure__modal-link classes anywhere, open figure in modal.

**_includes/translation-headings.liquid**
Assigns title with liquid variable to be used in vocab page accordions and includes accordionGlobalControls

**_layouts/base.11ty.js**
Add page layout as data attribute on `<body>` to facilitate styling

**_layouts/entry.liquid**
Use figureAllOutputs shortcode

**_layouts/entry-embed.liquid**
Variant of `layout: entry` but uses renderFile in place of canvas panel for special embeds (3d-models, svg, etc.)

**_layouts/page.case-study**
Copy of entry layout but with default `pageHeader` and no abstract or tombstone.

**_layouts/visual-atlas.liquid**
New layout specifically to create grid of all figure images.

**_plugins/filters/fullname.js**
Join names with a non-breaking space.

**_plugins/filters/getContributor.js**
Include local sort_as value if one is given, so page-level contributors are sorted whether defined on page or in publication.yaml

**_plugins/markdown/index.js**
**content/_assets/javascript/application/index.js**
Create better line breaks for URLs by inserting zero-width spaces, but remove space when copied to clipboard

**_plugins/shortcodes/accordion.js**
**content/_assets/styles/components/accordion.scss**
Adjusted appearance of accordions copy icon and tooltip

**_plugins/shortcodes/cite.js**
Return the `id`, highlighted in yellow, if citation is missing in references.yaml

**_plugins/shortcodes/contributors.js**
Refactor logic to handle oxford commas correctly

**_plugins/shortcodes/def.js**
Custom shortcode to display vocabulary pop-ups with definitions and links.

**_plugins/shortcodes/figure.js**
**_plugins/shortcodes/figureAllOutputs.js**
Exclude regular figures from EPUB and PDF

**_plugins/shortcodes/figureGroup.js**
Rewrote to output a wrapped set of figures, not broken down into rows.

**_plugins/shortcodes/objectGroup.js**
A variant of the figure group shortcode, but creates groups of simple figure thumbnails that are linked to open in the custom iframe viewer.

**_plugins/shortcodes/objectLink.js**
Based on `open` and previously `ref`, creates figure object links that open in iframe viewer

**_plugins/shortcodes/index.js**

**_plugins/transforms/outputs/epub/index.js**
**_plugins/transforms/outputs/epub/transform.js**
Copy embed image files to EPUB

**_layouts/page.liquid**
**content/_assets/javascript/application/iframe-viewer.js**
**content/_assets/styles/iframe-viewer.css**
Add iframe-based image viewer

**content/_assets/javascript/application/intersection-observer-factory.js**
Changed rootMargin to 0 for better slide triggering

**content/_assets/javascript/application/index.js**
Add script for iframe-based image viewer; allow only one pop-up to be open at a time; fix max-width of pop-ups, especially for narrower Visual Atlas text areas; manage loading indicator on case study pages

**content/_computed/eleventyComputed.js**
Add page tags value as classes, and contributor_as_it_appears as data item

**content/_assets/javascript/custom.js**
**content/_assets/styles/custom.css**

## Colophon

Headings are set in [Akrobat](https://www.fontfabric.com/fonts/akrobat/), by Fontfabric, available under a Free Font End User License Agreement. The body text is [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans), by Google, available under the SIL Open Font License (OFL).

## License

© 2025 J. Paul Getty Trust

The text of this work is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="license">Creative Commons Attribution-NonCommercial 4.0 International License</a>. All images are reproduced with the permission of the rights holders acknowledged in captions and are expressly excluded from the CC BY-NC license covering the rest of this publication. These images may not be reproduced, copied, transmitted, or manipulated without consent from the owners, who reserve all rights. 
