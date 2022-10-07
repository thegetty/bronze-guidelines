---
title: Vocabulary
order: 400
layout: page
class: full-width
---

<table class="vocab-table">
  <thead>
    <tr>
      <th>English</th>
      <th>German</th>
      <th>French</th>
      <th>Italian</th>
      <th>Chinese</th>
    </tr>
  </thead>
  <tbody>
{% assign vocabPages = collections.vocabulary | sort: 'data.order' %}
{% for page in vocabPages %}
  <tr>
    <td><a href="{{ page.url}}">{{ page.data.title }}</a></td>
    <td>{{ page.data.lang.de }}</td>
    <td>{{ page.data.lang.fr }}</td>
    <td>{{ page.data.lang.it }}</td>
    <td>{{ page.data.lang.zh }}</td>
  </tr>
{% endfor %}
  </tbody>
</table>

