---
title: About the Contributors
order: 1010
layout: page
class: pdf-backmatter
---

{% contributors context=publicationContributors type='primary' format='bio' %}

---

{%- capture contributors_list -%}
{%- for contributor in publication.contributor -%}
{%- if contributor.type == "secondary" -%}
{{- contributor.last_name }}|{{ contributor.first_name }}|{{ contributor.bio }}::
{%- endif -%}
{%- endfor -%}
{%- for page in collections.all -%}
{%- for contributor in page.data.contributor -%}
{%- if contributor.type == "secondary" -%}
{{- contributor.last_name }}|{{ contributor.first_name }}|{{ contributor.bio }}::
{%- endif -%}
{%- endfor -%}
{%- endfor -%}
{%- endcapture -%}
{% assign contributors_array = contributors_list | split: '::' | sort %}

<ul class="quire-contributors-list bio align-left">
{% for contributor in contributors_array %}
  {% assign contributor_vals = contributor | split: '|' %}
  {% if contributor_vals[0] %}
  <li class="quire-contributor" id="{{ contributor_vals[1] | downcase }}-{{ contributor_vals[0] | downcase }}">
  <div class="title is-5">
  <span class="quire-contributor__name">{{ contributor_vals[1] }} {{ contributor_vals[0] }}</span>
  </div>
  <div class="media">
  <div class="quire-contributor__details media-content">
  <div class="quire-contributor__bio">{{ contributor_vals[2] | markdownify }}</div>
  </div>
  </div>
  </li>
  {% endif %}
{% endfor %}
</ul>

<!-- The Liquid logic for the creation of the contributors_array above comes from: https://www.codeshopify.com/blog_posts/building-arrays-with-liquid-in-shopify -->
