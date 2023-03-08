---
title: Vocabulary
order: 400
layout: vocab-index
class: full-width vocabulary-index
contributor:
  - id: jbassett
  - id: fbewer
  - id: dbourgarit
  - first_name: Yi
    last_name: Chen
    type: secondary
    bio: |
      Yi Chen received her PhD in Chinese archaeology from the University of Oxford. She is a former curator of early Chinese collections and now a visiting researcher at the British Museum. In addition, she is an academic advisor of the Dresden Porcelain Project of the Staatliche Kunstsammlungen Dresden and a consultant on Chinese art for Bonhams. Before she joined the British Museum in 2015, she was the Christensen Fellow in Chinese Painting at the Ashmolean Museum of Art and Archaeology in Oxford.
  - first_name: Joachim
    last_name: Kreutner
    type: secondary
    bio: |
      Joachim Kreutner (Metals Conservator, Bavarian Nationalmuseum, Munich) received his degree in conservation, restoration, and art technology at the Technische Universität, Munich. Since 2016 he has been supervisor to the metals conservation team at the Bavarian Nationalmuseum. His research interests are focused on preventative conservational conditions of museum silver collections and the technique of bronze casting. He is deputy spokesperson for the conservation working group at Deutscher Museumsbund.
  - first_name: Elisabeth
    last_name: Lebon
    type: secondary
    bio: |
      Elisabeth Lebon holds a doctorate in art history from Paris I Panthéon-Sorbonne. She is an independent researcher in nineteenth- and twentieth-century French sculpture and the author of the catalogues raisonnés of Antoine Pevsner (in collaboration with Pierre Brullé), Charles Despiau, and Jean Joire. She specializes in the history of art foundries and casting processes in France, and is the author of *Dictionnaire des fondeurs de bronze d’art. France 1890–1950* (2003), *Le Fondeur et le sculpteur: Technique du bronze et histoire de l’art* (2012), and *Fonte au sable – fonte à cire perdue: histoire d’une rivalité* (2012). She has been brought to work on a wide range of artists through this specialty.
  - first_name: Linda Y.
    last_name: Lin
    type: secondary
    bio: |
      Linda Y. Lin (Conservator, Shangri La, Museum of Islamic Arts, Culture and Design, Honolulu) received her MA in conservation of archaeological and ethnographic materials from UCLA / Getty Conservation Program in 2010. She was formerly the conservator for arts of Asia at the Newark Museum, New Jersey. She has translated articles in the areas of archaeology, conservation, and technical research published in both Chinese and English journals. Her most recent translation projects include ancient Chinese bronze-casting technology and Chinese lacquer, in collaboration with the Smithsonian Institution’s National Museum of Asian Art.
  - id: lmorigi
  - first_name: Ruven
    last_name: Pillay
    type: secondary
    bio: |
      Ruven Pillay (Research Scientist, Centre de Recherche et de Restauration des Musées de France [C2RMF], Paris) holds an MPhys in physics from the University of Manchester, an MSc in computer science from the University of Edinburgh, and a PhD in hyperspectral imaging from NTNU, Norway. His research interests include the application of advanced imaging, data processing and visualization, and other techniques to the study of art. In addition to his work at the C2RMF he has more than twenty-five years of experience working in major art galleries, and has also worked at the National Gallery in London, the National Museum in Stockholm, and as an invited scholar at the J. Paul Getty Museum in Los Angeles.
  - first_name: Jeremy
    last_name: Warren
    type: secondary
    bio: |
      Jeremy Warren (Honorary Curator of Sculpture, Ashmolean Museum, Oxford and Sculpture Research Curator, the National Trust) is a specialist in Renaissance and later European sculpture. His numerous publications include catalogues of *Medieval and Renaissance Sculpture in the Ashmolean Museum* (2014) and of *Italian Sculpture in the Wallace Collection* (2016), as well as articles on the sculptors Antico, Giovanni Bandini, Giambologna, Vincenzo and Gian Gerolamo Grandi, Leone Leoni and Severo da Ravenna.  Exhibitions include *Beauty and Power: Renaissance and Baroque Bronzes from the Peter Marino Collection* (2010). He has also written extensively on the history of collecting.
  - id: jmwelter
contributor_as_it_appears: Edited by Jane Bassett and David Bourgarit
additional_contributors: Ann Boulton, Anne-Lise Desmas, Jean Dubos, Irene Gunston, Patricia Harpring, Sharon Hecker, Andrew Lacey, Marjee Levine, Jeffrey Maish, Benoît Mille, Peta Motture, Uve Peltz, David Reid, Dominique Robcis, Lise Saussus, Harold Schulze, Jeffrey Springer, Nicolas Thomas, Quanyu Wang, Jeremy Warren, Frank Willer, Dimitrios Zikos
---

<div class="section-landing-page__text">

{{ introductions.vocabulary | markdownify }}

</div>

<table class="vocab-table pdf-full-width">
  <thead>
    <tr>
      <th>English</th>
      <th>French</th>
      <th>German</th>
      <th>Italian</th>
      <th>Chinese</th>
    </tr>
  </thead>
  <tbody>
{% assign vocabPages = collections.vocabulary | sort: 'data.order' %}
{% for page in vocabPages %}
  <tr>
    <td><a href="{{ page.url}}">{{ page.data.title }}</a></td>
    <td><a href="{{ page.url}}">{{ page.data.lang.fr }}</a></td>
    <td><a href="{{ page.url}}">{{ page.data.lang.de }}</a></td>
    <td><a href="{{ page.url}}">{{ page.data.lang.it }}</a></td>
    <td><a href="{{ page.url}}">{{ page.data.lang.zh }}</a></td>
  </tr>
{% endfor %}
  </tbody>
</table>

