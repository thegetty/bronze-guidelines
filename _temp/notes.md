# NOTES

- Case Studies were transmitted with a "CS1" label and a "Case Study 1" title, and then the full title as a subtitle. Is that right? If we don't need the "CS1" would prefer labeling them as Case Study 1. Will mean that we'll need some new short titles for these.
- How/where should abstracts be used other than in metadata? On the section landing pages?
- How should "additional contributors" be used?
- What should the About the Contributors page include?
- Along with the citation pop-ups and the full bibliography in the back of the book, should the bibliographies for each page also be listed at the bottom of the page?

## TODO

- Update figure caption shortcode to process q-cite and q-def shortcodes
- Tag languages with HTML language attributes, like: `<span lang="zh">翻铸</span>`

## REGEX

To find citations and not also pick up figure shortcodes: find, `\{([^\{|<].*?)\}`; replace, `{{< q-cite "$1" >}}`.

To find numbers at beginning of Headings and wrap them in a span:
`# ([0-9|\.]+) `
`# <span class="head-num">$1 </span>`

## IMAGES

- Add a batch of images to a folder and run `magick identify -format "%f,%w,%h\n" *`
- Copy and paste the output into the filename, width and height columns of the Bronze GuideLines Images sheet, evaluation tab
- If it is a JPG, rename it like 100.jpg and add it to the magick folder
- If it is a PDF, SVG, TIF, or PSD, open it. If it's in layers, flatten it and save a static version to the magick folder while leaving the original as it is. Also mark it as "layers" in the type column of the spreadsheet. If it is not layers, save a static JPG or TIF to the magick folder
- Once the batch has been gone through, run `bin/magick.sh` in the project to create the image derivatives.
- Download the yaml sheet as a csv and covert it at https://www.convertcsv.com/csv-to-yaml.htm. Update figures.yml

## TEXT

for f in *.docx; do pandoc --markdown-headings=atx --wrap=none "$f" -s -t markdown-smart-simple_tables-multiline_tables-grid_tables+pipe_tables -o "${f%.docx}.md"; done


## VOCAB

Work from the `transmittal-files/vocabulary.md` and `transmittal-files/vocabulary-french.md` files. In Atom, got to View > Toggle Soft Wrap which will allow the plaintext translation tables in the file to be much more legible.

Copy and paste each English term and its info into a new Markdown file in the `content/vocabulary` directory.

The page YAML for each file should include:

```yaml
title:
weight:
type: page
layout: vocabulary
toc: false
menu: false
definition: ""
```

The `title` is the term itself. The page `weight` should increment by 5 so that we have room to add things as/if needed.

Then following the editorial notes below, and copy and pasting the info from `transmittal-files/vocabulary-french.md` as needed, format the page.

Make notes on any editorial oddities that may need to be addressed. For instance, there are instances of a source given only as Treccani that are directly hyperlinked to a page in https://www.treccani.it/vocabolario/. Should this hyperlink instead be visible so that it appears in the print edition or should Treccani itself be part of references.yml? Also, similarly, in the Italian there are references to Battaglia 1961 which then include the word “here” hyperlinked, in lieu of a page number.

## Editorial Guide

- Any "Note:" should be wrapped in `<div class="backmatter">` whether it appears in the main section or under a translation.
- Figures should be in a comma-separated list in a q-figure-group shortcode with a grid of 3: `{{< q-figure-group grid="3" id="1, 284" >}}`. The shortcode should appear at the top of the page, but below any Note.
- All terms, except for those in the “Translation” headings noted below, should be in normal Roman text, not bold
- List of terms under the “To Be Distinguished From” or “Synonyms” headings should be comma-separated on a single line
- Under the “Sources” heading, the type of source should not be a heading, but rather be in plain text followed by a colon and then a semicolon-separated list of the sources. Each source type should be on its own line. If there is no type, it would just be the semicolon-separated list of sources.
- Everything in the Translations section should be wrapped in a single `<div class="accordion">`
- Each language should be a heading level three, with the term itself bolded: `### German: **Nachguss**`. If there is a parenthetical note with the main term, add it as a `<div class="backmatter">` note on its own line, without the parentheses.
- Under the language, the “Sources” area should be handled the same as above.
- In the “Alternate Translations” area, each term should be a list item on its own line preceded by a hyphen and a space. If there are sources use a line break HTML character (`<br />`) and then list the sources below. If there is no source type, the word “Sources” should be added followed by a colon and then a semicolon-separated list of sources. As in the main section.

