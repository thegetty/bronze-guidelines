---
title: Choices Demo
order: 2100
layout: page
---

- Choices images should use checkboxes rather than buttons so that multiple choices can be selected and layered.
- So that the labels may function effectively as a kind of key to their image, I'd like to suggest they could have three possible values: `text`, `icon`, and `color`.
- Labels for each choice require either `label.text` or `label.icon` or both, and may have `label.color`
- A choice without `label.text` or `label.icon` has no checkbox and is always visible
- Any choice that is `default: true` should be in view (checked) when the page first loads. Multiple choices in a single figure can be `default: true`.
- If a choice is `media_type: iiif` it should be tiled, and the tiles should be used in the viewer. Currently the manifests still list the static image files.
- Choices figures should be interactive on the page AND in the lightbox modal. The figure label should open the modal.

One pitfall to using checkboxes over buttons is that with non-transparent choices, users could check a box and not see the choice come into in view if it is under another choice that is already checked. Perhaps, would it be possible to indicate in the YAML somehow if the choices should be checkboxes or radio buttons?

There’s also a problem with the `color` option as the font color will need to be adjusted based on the background color chosen. Perhaps we could create a filter that would determine the optimal choice of text color between black and white?

The YAML mark up to support the three label options adds some complication

<style type="text/css">
.quire-toggles { text-align: left; margin: .75rem 0; }
.quire-toggles .toggle { background-color: white; color: black; padding: .1rem 0; display: inline-flex; align-items: center; cursor: pointer; margin-right: 1rem; height: 1.5rem; border-radius: .75rem; }
.quire-toggles .toggle.color { margin-right: .25rem; padding-left: .7rem; padding-right: .7rem; }
.quire-toggles .toggle label { margin-left: .25rem; font-size: .75rem; font-weight: 700; }
.quire-toggles .toggle label img { height: 1rem; width: auto; vertical-align: middle; margin-left: .25rem; }
.q-figure__label .q-figure__label-icon { height: 0; margin-top: -1.65rem; }
</style>

<figure id="fig-043" class="q-figure">
<img alt="" class="q-figure__image" src="/_assets/images/figures/043.jpg" />
<fieldset class="quire-toggles">
  <span class="toggle">
    <input type="checkbox" id="lanterns" name="lanterns" checked>
    <label for="lanterns">Lanterns</label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="heads" name="heads" checked>
    <label for="heads">Heads</label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="arm" name="arm" checked>
    <label for="arm">Arm</label>
  </span>
</fieldset>
<figcaption class="q-figure__caption"> <span class="q-figure__label q-figure__label--below"> <a href="#fig-043" class="q-figure__modal-link"> <span class="q-figure__label-icon" ><svg class="remove-from-epub"> <switch> <use xlink:href="#fullscreen-icon"></use> <foreignObject width="24" height="24"> <img src="/_assets/images/icons/fullscreen.png" alt="Expand" /> </foreignObject> </switch> </svg> <span class="visually-hidden remove-from-epub" >Expand</span > </span> <span class="q-figure__label-text">Figure 43</span> </a> </span> <span class="q-figure__caption-content" >Annotated X-radiograph of a sand cast. Both Dejanira’s and Hercules’s heads were cast separately and secured at the neck with Roman sleeve joints (yellow overlay). Roman joints also secure Dejanira’s proper right arm as well as Hercules’s proper left arm.... </span></figcaption>
</figure>

<figure id="fig-043" class="q-figure">
<img alt="" class="q-figure__image" src="/_assets/images/figures/043.jpg" />
<fieldset class="quire-toggles">
  <span class="toggle">
    <input type="checkbox" id="lanterns" name="lanterns" checked>
    <label for="lanterns">Lanterns <img src="/_assets/images/figures/choices/fig-043-lanterns--label.png" /></label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="heads" name="heads" checked>
    <label for="heads">Heads <img src="/_assets/images/figures/choices/fig-043-heads--label.png" /></label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="arm" name="arm" checked>
    <label for="arm">Arm <img src="/_assets/images/figures/choices/fig-043-arm--label.png" /></label>
  </span>
</fieldset>
<figcaption class="q-figure__caption"> <span class="q-figure__label q-figure__label--below"> <a href="#fig-043" class="q-figure__modal-link"> <span class="q-figure__label-icon" ><svg class="remove-from-epub"> <switch> <use xlink:href="#fullscreen-icon"></use> <foreignObject width="24" height="24"> <img src="/_assets/images/icons/fullscreen.png" alt="Expand" /> </foreignObject> </switch> </svg> <span class="visually-hidden remove-from-epub" >Expand</span > </span> <span class="q-figure__label-text">Figure 43</span> </a> </span> <span class="q-figure__caption-content" >Annotated X-radiograph of a sand cast. Both Dejanira’s and Hercules’s heads were cast separately and secured at the neck with Roman sleeve joints (yellow overlay). Roman joints also secure Dejanira’s proper right arm as well as Hercules’s proper left arm.... </span></figcaption>
</figure>

<figure id="fig-043" class="q-figure">
<img alt="" class="q-figure__image" src="/_assets/images/figures/043.jpg" />
<fieldset class="quire-toggles">
  <span class="toggle color" style="background-color: #d06a77;">
    <input type="checkbox" id="lanterns" name="lanterns" checked>
    <label for="heads">Lanterns</label>
  </span>
  <span class="toggle color" style="background-color: #edec92;">
    <input type="checkbox" id="heads" name="heads" checked>
    <label for="heads">Heads</label>
  </span>
  <span class="toggle color" style="background-color: #4a59a6;">
    <input type="checkbox" id="arm" name="arm" checked>
    <label for="arm">Arm</label>
  </span>
</fieldset>
<figcaption class="q-figure__caption"> <span class="q-figure__label q-figure__label--below"> <a href="#fig-043" class="q-figure__modal-link"> <span class="q-figure__label-icon" ><svg class="remove-from-epub"> <switch> <use xlink:href="#fullscreen-icon"></use> <foreignObject width="24" height="24"> <img src="/_assets/images/icons/fullscreen.png" alt="Expand" /> </foreignObject> </switch> </svg> <span class="visually-hidden remove-from-epub" >Expand</span > </span> <span class="q-figure__label-text">Figure 43</span> </a> </span> <span class="q-figure__caption-content" >Annotated X-radiograph of a sand cast. Both Dejanira’s and Hercules’s heads were cast separately and secured at the neck with Roman sleeve joints (yellow overlay). Roman joints also secure Dejanira’s proper right arm as well as Hercules’s proper left arm.... </span></figcaption>
</figure>

<figure id="fig-043" class="q-figure">
<img alt="" class="q-figure__image" src="/_assets/images/figures/043.jpg" />
<fieldset class="quire-toggles">
  <span class="toggle color" style="background-color: #d06a77;">
    <input type="checkbox" id="lanterns" name="lanterns" checked>
    <label for="lanterns">Lanterns <img src="/_assets/images/figures/choices/fig-043-lanterns--label.png" /></label>
  </span>
  <span class="toggle color" style="background-color: #edec92;">
    <input type="checkbox" id="heads" name="heads" checked>
    <label for="heads">Heads <img src="/_assets/images/figures/choices/fig-043-heads--label.png" /></label>
  </span>
  <span class="toggle color" style="background-color: #4a59a6;">
    <input type="checkbox" id="arm" name="arm" checked>
    <label for="arm">Arm <img src="/_assets/images/figures/choices/fig-043-arm--label.png" /></label>
  </span>
</fieldset>
<figcaption class="q-figure__caption"> <span class="q-figure__label q-figure__label--below"> <a href="#fig-043" class="q-figure__modal-link"> <span class="q-figure__label-icon" ><svg class="remove-from-epub"> <switch> <use xlink:href="#fullscreen-icon"></use> <foreignObject width="24" height="24"> <img src="/_assets/images/icons/fullscreen.png" alt="Expand" /> </foreignObject> </switch> </svg> <span class="visually-hidden remove-from-epub" >Expand</span > </span> <span class="q-figure__label-text">Figure 43</span> </a> </span> <span class="q-figure__caption-content" >Annotated X-radiograph of a sand cast. Both Dejanira’s and Hercules’s heads were cast separately and secured at the neck with Roman sleeve joints (yellow overlay). Roman joints also secure Dejanira’s proper right arm as well as Hercules’s proper left arm.... </span></figcaption>
</figure>

{% figure "fig-043" %}

---

## Labels

<fieldset class="quire-toggles">
  <span class="toggle">
    <input type="checkbox" id="lanterns" name="lanterns">
    <label for="lanterns">Lanterns</label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="heads" name="heads">
    <label for="heads">Heads</label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="arm" name="arm">
    <label for="arm">Arm</label>
  </span>
</fieldset>

```yaml
choices:
  - src: figures/choices/fig-043.jpg
  - src: figures/choices/fig-043-lanterns.jpg
    label:
      text: "Lanterns"
  - src: figures/choices/fig-043-heads.jpg
    label:
        text: "Heads"
  - src: figures/choices/fig-043-arm.jpg
    label:
        text: "Arm"
```

## Labels with Icons

<fieldset class="quire-toggles">
  <span class="toggle">
    <input type="checkbox" id="lanterns" name="lanterns">
    <label for="lanterns">Lanterns <img src="/_assets/images/figures/choices/fig-043-lanterns--label.png" /></label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="heads" name="heads">
    <label for="heads">Heads <img src="/_assets/images/figures/choices/fig-043-heads--label.png" /></label>
  </span>
  <span class="toggle">
    <input type="checkbox" id="arm" name="arm">
    <label for="arm">Arm <img src="/_assets/images/figures/choices/fig-043-arm--label.png" /></label>
  </span>
</fieldset>

```yaml
choices:
  - src: figures/choices/fig-043.jpg
  - src: figures/choices/fig-043-lanterns.jpg
    label:
      text: "Lanterns"
      icon: figures/choices/fig-043-lanterns--label.png
  - src: figures/choices/fig-043-heads.jpg
    label:
      text: "Heads"
      icon: figures/choices/fig-043-lanterns--heads.png
  - src: figures/choices/fig-043-arm.jpg
    label:
      text: "Arm"
      icon: figures/choices/fig-043-lanterns--arm.png
```

## Labels with Color

<fieldset class="quire-toggles">
  <span class="toggle color" style="background-color: #d06a77;">
    <input type="checkbox" id="lanterns" name="lanterns">
    <label for="heads">Lanterns</label>
  </span>
  <span class="toggle color" style="background-color: #edec92;">
    <input type="checkbox" id="heads" name="heads">
    <label for="heads">Heads</label>
  </span>
  <span class="toggle color" style="background-color: #4a59a6;">
    <input type="checkbox" id="arm" name="arm">
    <label for="arm">Arm</label>
  </span>
</fieldset>


```yaml
choices:
  - src: figures/choices/fig-043.jpg
  - src: figures/choices/fig-043-lanterns.jpg
    label:
      text: "Lanterns"
      color: "#d06a77"
  - src: figures/choices/fig-043-heads.jpg
    label:
      text: "Heads"
      color: "#edec92"
  - src: figures/choices/fig-043-arm.jpg
    label:
      text: "Arm"
      color: "#4a59a6"
```

## Labels with Icons and Color

<fieldset class="quire-toggles">
  <span class="toggle color" style="background-color: #d06a77;">
    <input type="checkbox" id="lanterns" name="lanterns">
    <label for="lanterns">Lanterns <img src="/_assets/images/figures/choices/fig-043-lanterns--label.png" /></label>
  </span>
  <span class="toggle color" style="background-color: #edec92;">
    <input type="checkbox" id="heads" name="heads">
    <label for="heads">Heads <img src="/_assets/images/figures/choices/fig-043-heads--label.png" /></label>
  </span>
  <span class="toggle color" style="background-color: #4a59a6;">
    <input type="checkbox" id="arm" name="arm">
    <label for="arm">Arm <img src="/_assets/images/figures/choices/fig-043-arm--label.png" /></label>
  </span>
</fieldset>

```yaml
choices:
  - src: figures/choices/fig-043.jpg
  - src: figures/choices/fig-043-lanterns.jpg
    label:
      text: "Lanterns"
      color: "#d06a77"
      icon: figures/choices/fig-043-lanterns--label.png
  - src: figures/choices/fig-043-heads.jpg
    label:
      text: "Heads"
      color: "#edec92"
      icon: figures/choices/fig-043-lanterns--heads.png
  - src: figures/choices/fig-043-arm.jpg
    label:
      text: "Arm"
      color: "#4a59a6"
      icon: figures/choices/fig-043-lanterns--arm.png
```
