# bronze-guidelines

https://www.getty.edu/publications/bronze-guidelines/

| branch | about |
| --- | --- |
| `main` | The primary branch. Currently the similar to `prototype`. |
| `prototype` | An early prototype of the catalogue using the Hugo version of Quire. |
| `first-pages` | Partial first pages with the Hugo version of Quire. |
| `first-pages-11ty` | Partial first pages with the 11ty version of Quire. |
| `forthcoming` | **Not yet created.** A static placeholder page that is displayed at the book’s final URL on getty.edu prior to publication |
| second-pages`, `final-pages`| **Not yet created.**. Future 11ty versions of the project at various stages. |

## Using the 11ty Version

1. Clone this repository and select the appropriate branch.

2. In Terminal, make sure you are using Node 16.15.0 or higher, with `node --version`. (See section on NVM below.)

3. Run `npm install` to install the project dependencies. This just needs to be done once when first cloning the project, or whenever the core template/code files are updated.

4. Enter the following command to add the preview URL to your environment variables. This is hopefully temporary, but currently required because of the way IIIF images are set up. Doing so with `export URL=http://localhost:8080` adds it just for the current session. This will need to be repeated each time you close and reopen your command-line shell. Or you can add it to your .bash-profile to make it persist.

    ```
    export URL=http://localhost:8080
    ```

5. See the preview with `npm run dev`. I find it needs to be stopped and restarted often to get it to refresh changes, especially with YAML.

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

While the paged.js work is ongoing, a PDF of *Bronze Guidelines* can be created with PrinceXML on the command line.

1. Comment out `outputs: [pdf, epub]` from `content/print-half-title-page.md`, `content/print-title-page.md`, and `content/print-copyright.md` so that these pages will appear online.

2. Run `npm run dev` to see the preview.

3. With the preview running, run this command in another Terminal window.

    ```
    prince http://localhost:8080/ http://localhost:8080/print-half-title-page/ http://localhost:8080/print-title-page/ http://localhost:8080/print-copyright/ http://localhost:8080/contents/ http://localhost:8080/foreword/ http://localhost:8080/acknowledgements/ http://localhost:8080/intro/ http://localhost:8080/vol-1/ http://localhost:8080/vol-1/1/ http://localhost:8080/vol-1/2/ http://localhost:8080/vol-1/3/ http://localhost:8080/vol-1/4/ http://localhost:8080/vol-1/5/ http://localhost:8080/vol-1/6/ http://localhost:8080/vol-1/7/ http://localhost:8080/vol-1/8/ http://localhost:8080/vol-1/9/ http://localhost:8080/vol-2/ http://localhost:8080/vol-2/1/ http://localhost:8080/vol-2/2/ http://localhost:8080/vol-2/3/ http://localhost:8080/vol-2/4/ http://localhost:8080/vol-2/5/ http://localhost:8080/vol-2/6/ http://localhost:8080/vol-2/7/ http://localhost:8080/vol-2/8/ http://localhost:8080/vol-2/9/ http://localhost:8080/case-studies/ http://localhost:8080/case-studies/1/ http://localhost:8080/case-studies/2/ http://localhost:8080/case-studies/3/ http://localhost:8080/case-studies/4/ http://localhost:8080/case-studies/5/ http://localhost:8080/case-studies/6/ http://localhost:8080/case-studies/7/ http://localhost:8080/vocabulary/ http://localhost:8080/vocabulary/after-cast/ http://localhost:8080/vocabulary/armature/ http://localhost:8080/vocabulary/as-cast-surface/ http://localhost:8080/vocabulary/brass/ http://localhost:8080/vocabulary/brazing/ http://localhost:8080/vocabulary/bronze/ http://localhost:8080/vocabulary/cast-n/ http://localhost:8080/vocabulary/cast-v/ http://localhost:8080/vocabulary/cast-on-repair/ http://localhost:8080/vocabulary/castability/ http://localhost:8080/vocabulary/casting-defect/ http://localhost:8080/vocabulary/casting-plan/ http://localhost:8080/vocabulary/chaplet/ http://localhost:8080/vocabulary/chasing/ http://localhost:8080/vocabulary/chef-modele/ http://localhost:8080/vocabulary/chiseling/ http://localhost:8080/vocabulary/coating/ http://localhost:8080/vocabulary/cold-shut/ http://localhost:8080/vocabulary/core/ http://localhost:8080/vocabulary/core-pin/ http://localhost:8080/vocabulary/core-support/ http://localhost:8080/vocabulary/corrosion/ http://localhost:8080/vocabulary/edition/ http://localhost:8080/vocabulary/engraving/ http://localhost:8080/vocabulary/fettling/ http://localhost:8080/vocabulary/flashing/ http://localhost:8080/vocabulary/founder/ http://localhost:8080/vocabulary/foundry-model/ http://localhost:8080/vocabulary/gilding/ http://localhost:8080/vocabulary/inlay/ http://localhost:8080/vocabulary/inter-model/ http://localhost:8080/vocabulary/investment/ http://localhost:8080/vocabulary/life-casting/ http://localhost:8080/vocabulary/lost-wax-casting/ http://localhost:8080/vocabulary/metal-plating/ http://localhost:8080/vocabulary/metallurgical-joint/ http://localhost:8080/vocabulary/model/ http://localhost:8080/vocabulary/mold/ http://localhost:8080/vocabulary/mold-extension/ http://localhost:8080/vocabulary/overlay/ http://localhost:8080/vocabulary/patch/ http://localhost:8080/vocabulary/patina/ http://localhost:8080/vocabulary/peening/ http://localhost:8080/vocabulary/piece-mold/ http://localhost:8080/vocabulary/plug/ http://localhost:8080/vocabulary/porosity/ http://localhost:8080/vocabulary/pour/ http://localhost:8080/vocabulary/punch/ http://localhost:8080/vocabulary/refractory-mold/ http://localhost:8080/vocabulary/replica/ http://localhost:8080/vocabulary/roman-joint/ http://localhost:8080/vocabulary/sand-casting/ http://localhost:8080/vocabulary/seam-line/ http://localhost:8080/vocabulary/shrinkage/ http://localhost:8080/vocabulary/soldering/ http://localhost:8080/vocabulary/sprue/ http://localhost:8080/vocabulary/variant/ http://localhost:8080/vocabulary/welding/ http://localhost:8080/visual-atlas/ http://localhost:8080/bibliography/ http://localhost:8080/contributors/ --style=bin/application.css --style=content/_assets/styles/custom.css -o output.pdf
    ```

(Note that `bin/application.css`) is a static output of the SCSS styles in `content/_assets/styles/`. So changes to those files would necessitate manual changes be made to `bin/application.css` to keep them aligned.

## Customizations Made to 11ty Templates/Files

**_includes/components/figure/video/element.js**
Added Poster image to Vimeo output so that could show poster on page, and iframe embed in modal.

**_includes/components/lightbox/slides.js**
Wrap table output in a div wrapper to allow for scrolling.

**_includes/components/modal/index.js**
Added class to enable styling in modal vs. inline

**_includes/components/page-title.js**
Wrap label, label divider, and title elements in their own spans.

**_includes/def.liquid**
Custom include to create definition pop-ups.

**_includes/web-components/modal/index.js**
Allow links with .q-figure__modal-link classes anywhere, open figure in modal.

**_layouts/page.entry**
Use default `pageHeader` and remove bibliography.

**_layouts/page.liquid**
Remove bibliographies from all pages.

**_layouts/visual-atlas.liquid**
New layout specifically to create grid of all figure images.

**_plugins/filters/index.js**
**_plugins/filters/hasShortcodes.js**
Custom filter to process text with shortcodes in it.

**_plugins/shortcodes/def.js**
Custom shortcode to display vocabulary pop-ups with definitions and links.

**_plugins/shortcodes/figureGroup.js**
Rewrote to output a wrapped set of figures, not broken down into rows.

**_plugins/shortcodes/figureRef.js**
Change to use `{% ref 'fig-4, fig-5, fig-6' %}` instead of `{% ref 'fig-4', 'fig-5', 'fig-6' %}`, add class .q-figure__modal-link to links so they'll open in the modal, remove "and" from list, and trim extra zeros if figure ids.

**_plugins/shortcodes/index.js**

**_plugins/shortcodes/warn.js**
Custom shortcode to wrap content in a `<div>` with a "warn" class.

**content/_assets/javascript/custom.js**
**content/_assets/styles/custom.css**

**content/_computed/eleventyComputed.js**
Added class(es) to markup based on value of `presentation` and `tags` in the frontmatter.

## Colophon

Headings are set in [Akrobat](https://www.fontfabric.com/fonts/akrobat/), by Fontfabric, available under a Free Font End User License Agreement. The body text is [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans), by Google, available under the SIL Open Font License (OFL).