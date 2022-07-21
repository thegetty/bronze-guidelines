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

## Customizations Made to 11ty Templates/Files

**_includes/def.liquid**
Custom include to create definition pop-ups.

**_layouts/page.liquid**
Added class(es) to markup based on value of `presentation` and `tags` in the frontmatter.

**_layouts/visual-atlas.liquid**
New layout specifically to create grid of all figure images.

**_plugins/filters/index.js**
**_plugins/filters/processShortcodes.js**
Custom filter to process text with shortcodes in it.

**_plugins/markdown/index.js**
Added config to remove the default `<hr />` element that was being inserted. Added as Jira issue DEV-12804 for core Quire.

**_plugins/shortcodes/def.js**
Placeholder shortcode for {% def %} which is to display vocabulary terms.

**_plugins/shortcodes/figureGroup.js**
Rewrote to output a wrapped set of figures, not broken down into rows.

**_plugins/shortcodes/index.js**

**_plugins/shortcodes/pageinfo.js**
Custom shortcode to process text with shortcodes in it.

**content/_assets/javascript/web-components/lightbox/index.js**
Added overriding CSS to create a side-by-side layout for the caption and image in the lightbox modal.

**content/_assets/javascript/custom.js**
**content/_assets/styles/custom.css**
