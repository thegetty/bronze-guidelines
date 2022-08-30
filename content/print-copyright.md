---
layout: base.11ty.js
class: backmatter
order: 4
outputs: [pdf, epub]
toc: false
menu: false
---

{% copyright %}

{% if publication.identifier.isbn %}
ISBN: {{ publication.identifier.isbn }}
{% endif %}
