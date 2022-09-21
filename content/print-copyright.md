---
layout: base.11ty.js
class: backmatter
order: 4
outputs: [pdf, epub]
toc: false
menu: false
---

{{ config.quire_credit_line | markdownify }}

{{ publication.description.online_edition }}

{% copyright %}

First edition, {{ publication.pub_date | date: "%Y" }}

{{ publication.revision_statement | markdownify }}

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
<div class="distribution">

Distributed in the United States and Canada by the University of Chicago Press

Distributed outside the United States and Canada by Yale University Press, London

</div>
<div class="cip-data">

{{ publication.library_of_congress_cip | markdownify }}

</div>
<div class="cover-image-credits">

Front cover:
Back cover:

</div>
