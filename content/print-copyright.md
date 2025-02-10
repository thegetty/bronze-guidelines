---
title: Copyright
layout: page
classes: 
  - backmatter 
  - about-copyright-page
order: 4
outputs: [pdf, epub]
toc: false
menu: false
---

{{ config.quire_credit_line | markdownify }}

{{ publication.description.online_edition }}

{% copyright %}

First edition {{ publication.pub_date | date: "%Y" }}

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

Illustration Credits
Every effort has been made to contact the owners and photographers of illustrations reproduced here whose names do not appear in the captions or on p. 546. Anyone having further information concerning copyright holders is asked to contact Getty Publications so this information can be included in future printings.

Front cover: Bronze pour (still, video 18); X-radiograph of Venus *déhanchée* (fig. 65); *Head of a Ruler* (fig. 310)
Back cover: Modeling a metal armature for Andrew Lacey, *The Anatomy of Bronze* (detail, fig. 33); Barthélemy Prieur, *Funerary Genius* (detail, fig. 48); *Bodhisattva Avalokitesvara* (detail, fig. 151)
Inside cover: Bright field photomicrograph of an etched polished cross-section (fig. 419)

</div>
