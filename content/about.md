---
title: About
order: 2050
layout: page
classes: 
  - about-copyright-page
outputs: [html]
---

{{ publication.description.full }}

{% backmatter %}

<div class="citation-info">

## Citation Information

### Chicago

{% citation context='publication', type='chicago' %}

### MLA

{% citation context='publication', type='mla' %}

### Permanent URL

{{ publication.identifier.url }}

</div>
<div class="revision-history">

## Revision History

{{ publication.revision_statement | markdownify }}

{% for revision in publication.revision_history %}

### {{ revision.date }}

{% for item in revision.summary %}
- {{ item | markdownify }}
{% endfor %}

{% endfor %}

</div>
<div class="other-formats">

## Other Formats

{% for link in publication.resource_link %}
{% if link.type == "other-format" %}
- [{{ link.name }}]({{ link.url }})
{% endif %}
{% endfor %}

</div>
<div class="copyright">

## Copyright

{{ config.quire_credit_line | markdownify }}

{% copyright %}

</div>
<div class="publisher">

{% for press in publication.publisher %}
**Published by the {{ press.name }}, {{ press.location }}**
{{ press.address | markdownify }}
{% endfor %}

</div>
<div class="project-team">

{% for person in publication.project_team %}
- {{ person | markdownify }}
{% endfor %}

</div>
<div class="cip-data">

{{ publication.library_of_congress_cip | markdownify }}

</div>
<div class="cover-image-credits">

Illustration Credits
Every effort has been made to contact the owners and photographers of illustrations reproduced here whose names do not appear in the captions or on the illustration credits page. Anyone having further information concerning copyright holders is asked to contact Getty Publications so this information can be included.

Cover: Bronze pour (still, [video 18](/visual-atlas/v18/)); X-radiograph of Venus *déhanchée* ([fig. 65](/visual-atlas/065/)); *Head of a Ruler* ([fig. 310](/visual-atlas/310/))

</div>

{% endbackmatter %}

