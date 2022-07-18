---
title: Definitions Demo
order: 2000
layout: page
---

The cope and drag are reassembled and locked together. The metal alloy, which has in the meantime been liquefied, is {% def "pour" "poured" %} into the mold.

{% assign term = "pour" %}
{% assign display = "poured" %}
{% for page in collections.vocabulary %}
{% if page.data.title == term %}
<span class="quire-citation quire-definition expandable"><span class="quire-citation__button quire-definition__button" role="button" tabindex="0" aria-expanded="false">{% if display != "" %}{{ display }}{% else %}{{ term }}{% endif %}</span><span hidden class="quire-citation__content quire-definition__content"><span class="visually-hidden">Definition: </span><strong>{{ page.data.title }}: </strong>{{ page.data.definition | remove: "{% def \"" | remove: "\" %}" | truncate: 240 }} <a href="{{ page.url }}" class="quire-definition__content__more-link">More</a></span></span>
{% endif %}
{% endfor %}

A set-in repair is often geometric in shape; a {% def "cast-on repair" %} is often asymmetric.

{% assign term = "cast-on repair" %}
{% assign display = "" %}
{% for page in collections.vocabulary %}
{% if page.data.title == term %}
<span class="quire-citation quire-definition expandable"><span class="quire-citation__button quire-definition__button" role="button" tabindex="0" aria-expanded="false">{% if display != "" %}{{ display }}{% else %}{{ term }}{% endif %}</span><span hidden class="quire-citation__content quire-definition__content"><span class="visually-hidden">Definition: </span><strong>{{ page.data.title }}: </strong>{{ page.data.definition | remove: "{% def \"" | remove: "\" %}" | truncate: 240 }} <a href="{{ page.url }}" class="quire-definition__content__more-link">More</a></span></span>
{% endif %}
{% endfor %}


{% assign term = "" %}
{% assign display = "" %}
{% for page in collections.vocabulary %}
{% if page.data.title == term %}
<span class="quire-citation quire-definition expandable">
<span class="quire-citation__button quire-definition__button" role="button" tabindex="0" aria-expanded="false">
  {% if display != "" %}{{ display }}{% else %}{{ term }}{% endif %}
</span>
<span hidden class="quire-citation__content quire-definition__content">
  <span class="visually-hidden">Definition: </span>
  <strong>{{ page.data.title }}: </strong>
  {{ page.data.definition | remove: "{% def \"" | remove: "\" %}" | truncate: 240 }}
  <a href="{{ page.url }}" class="quire-definition__content__more-link">More</a>
</span>
</span>
{% endif %}
{% endfor %}
