# bronze-guidelines

https://www.getty.edu/publications/bronze-guidelines/

| branch | about |
| --- | --- |
| `main` | The primary branch. Currently the similar to `prototype`. |
| `prototype` | An early prototype of the catalogue using the Hugo version of Quire. |
| `first-pages-hugo` | Partial first pages with the Hugo version of Quire. |
| `first-pages` | Complete first pages with the 11ty version of Quire. |
| `forthcoming` | A static placeholder page that is displayed at the book’s final URL on getty.edu prior to publication |
| second-pages`, `final-pages`| Versions of the project at various stages |

## Using the 11ty Version

1. Clone this repository and select the appropriate branch.

2. In Terminal, make sure you are using Node 18.12.1, with `node --version`. (See section on NVM below.) And Quire 1.0.0-rc.0 with `quire --version`.

3. Run `npm install` to install the project dependencies. This just needs to be done once when first cloning the project, or whenever the core template/code files are updated.

4. See the preview with `quire preview`. I find it needs to be stopped and restarted often to get it to refresh changes, especially with YAML.

## Using NVM to Manage Different Node Verisons

The full instructions are here: https://github.com/nvm-sh/nvm. But this condensed version should cover the basics.

1. Install the script with the following command:

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```

2. Verify with this command, which should return `nvm`. If it does not, see the Troubleshooting info at https://github.com/nvm-sh/nvm#troubleshooting-on-macos.

    ```
    command -v nvm
    ```

3. Install the versions of node you want to use:

    ```
    nvm install 14.18.1
    ```

    ```
    nvm install 16.15.0
    ```

4. Optionally, set a default version to use with `nvm alias default 14.18.1` or `nvm alias default 16.15.0`. This default will be the one used every time you open a new Terminal window.

5. To choose/change a Node version to run use `nvm use 14` or `nvm use 16`. This will be the version used for as long as that Terminal window is open, or until you change it again.

## Creating a PDF Version

1. Build the current site: `npm run build`

2. Move needed files (which Vite is otherwise removing) into the _site directory: `rm -r _site/_assets/images/figures && cp -r content/_assets/images/figures _site/_assets/images/figures && cp public/pdf.html _site && cp public/pdf.css _site`

3. Fix the font paths: Open _site/pdf.css, find `/_assets/fonts/` and replace with `_assets/fonts/`

4. Output the PDF: `npm run build:prince`

## Editorial Production Notes

While it is a core principle of Quire for all content to only exist in one place in the Markdown and YAML files (chapter titles in the chapter Markdown file, references in `references.yaml`, etc.), a number of technical hurdles with this publication necessitated some duplication of content in a number of areas. They are documented here. Care should be taken that any changes should be made in **all** content locations.

- **Figure Captions**: Figure captions now exist both in the `figures.yaml` file as usual, and on the individual figure Markdown pages in the Visual Atlas (`/visual-atlas/`) section. Those in `figures.yaml` are used in the PDF and EPUB outputs and do not include any shortcode markup (instead of `{% cite 'Bourgarit 2019' %}` it is just "Bourgarit 2019"); those in the Visual Atlas are used online exclusively and include both `cite` and `ref` shortcodes.

- Definitions: Definitions for the Vocabulary section are stored as YAML on on each page so that they can be accessed with the `def` shortcode. However, they also need to appear on the pages themselves. They include shortcodes though and we were unable to process those from where the definitions were stored in YAML. For these pages, the definition exists in the YAML of the page, and in the Markdown section just below. Pages with this duplication have been marked `definition_has_shortcodes: true` for ready identification, though they are a majority of the Vocabulary pages.

## Customizations Made to 11ty Templates/Files

**_includes/components/figure/caption.js**
Remove hard-coded `<em>` tags

**_includes/components/figure/video/element.js**
Added Poster image to Vimeo output so that could show poster on page, and iframe embed in modal.

**includes/components/figure/image/print.js**
Output ALL image layers for checkbox and radio button annotations

**_includes/components/icons.js**
Add some icons and made sure they are consistent weight and size

**_includes/components/modal/index.js**
Added class to enable styling in modal vs. inline

**_includes/components/navigation.js**
Removed title truncation in navbar, and show section titles/links in center instead of home page link

**_includes/components/object-filters/object-card/object-image.webc**
Fixed source of thumbnails for videos

**_includes/components/page-header.js**
**_includes/components/table-of-contents/item/list.js**
**_layouts/table-of-contents.11ty.js**
Added handling for contributor_as_it_appears at the page-level

**_includes/components/page-title.js**
Wrap label, label divider, and title elements in their own spans.

**_includes/components/scripts.js**
Add call for custom.js file

**_includes/def.liquid**
Custom include to create definition pop-ups.

**_includes/web-components/modal/index.js**
Allow links with .q-figure__modal-link classes anywhere, open figure in modal.

**_includes/translation-headings.liquid**
Assigns title with liquid variable to be used in vocab page accordions and includes accordionGlobalControls

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

**_plugins/shortcodes/cite.js**
Return the `id`, highlighted in yellow, if citation is missing in references.yaml

**_plugins/shortcodes/contributors.js**
Refactor logic to handle oxford commas correctly

**_plugins/shortcodes/def.js**
Custom shortcode to display vocabulary pop-ups with definitions and links.

**_plugins/shortcodes/figureGroup.js**
Rewrote to output a wrapped set of figures, not broken down into rows.

**_plugins/shortcodes/objectGroup.js**
A variant of the figure group shortcode, but creates groups of simple figure thumbnails that are linked to open in the custom iframe viewer.

**_plugins/shortcodes/objectLink.js**
Based on `open` and previously `ref`, creates figure object links that open in iframe viewer

**_plugins/shortcodes/open.js**
Based on old `ref` shortcode, but changed to use `{% open 'fig-4, fig-5, fig-6' %}` instead of `{% open 'fig-4', 'fig-5', 'fig-6' %}`; add class ``.q-figure__modal-link`` to links so they'll open in the modal; remove "and" from list; and trim extra zeros if figure ids.

**_plugins/shortcodes/index.js**

**_layouts/page.liquid**
**content/_assets/javascript/application/iframe-viewer.js**
**content/_assets/styles/iframe-viewer.css**
Add iframe-based image viewer

**content/_assets/javascript/application/index.js**
Add script for iframe-based image viewer; allow only one pop-up to be open at a time; fix max-width of pop-ups, especially for narrower Visual Atlas text areas

**content/_computed/eleventyComputed.js**
Add page tags value as classes, and contributor_as_it_appears as data item

**content/_assets/javascript/custom.js**
**content/_assets/styles/custom.css**

## Colophon

Headings are set in [Akrobat](https://www.fontfabric.com/fonts/akrobat/), by Fontfabric, available under a Free Font End User License Agreement. The body text is [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans), by Google, available under the SIL Open Font License (OFL).