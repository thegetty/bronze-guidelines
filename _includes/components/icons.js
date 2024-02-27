//
// CUSTOMIZED FILE -- Bronze Guidelines
// Added some icons and made sure they were consistent weight and size
// Video: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:play_circle:FILL@0;wght@500;GRAD@0;opsz@20&icon.query=video
// Layers: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:layers:FILL@0;wght@500;GRAD@0;opsz@20&icon.query=layer
// Rotation: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:360:FILL@0;wght@500;GRAD@0;opsz@20&icon.query=rotat
// Table: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:table:FILL@0;wght@500;GRAD@0;opsz@20&icon.query=table
// Text size: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:format_size:FILL@0;wght@500;GRAD@0;opsz@20&icon.query=format+size
//
const { html } = require('~lib/common-tags')

/**
 * This file contains inline SVG elements which can be referenced elsewhere in
 * the templates. This file can be included at the end of the <body> tag.
 */
module.exports = function(eleventyConfig) {
  return function(params) {
    return html`
      <svg style="display:none">
        <symbol id="left-arrow-icon" viewBox="0 0 18 32">
          <path d="M23.1,11.1L21,9l-9,9l9,9l2.1-2.1L16.2,18L23.1,11.1z"/>
        </symbol>
        <symbol id="right-arrow-icon" viewBox="0 0 18 32">
          <path d="M12.9,11.1L15,9l9,9l-9,9l-2.1-2.1l6.9-6.9L12.9,11.1z"/>
        </symbol>
        <symbol id="search-icon" viewBox="0 0 32 32">
          <path d="M18.6,16.4h-1.2L17,16c1.5-1.7,2.3-3.9,2.3-6.3C19.3,4.3,15,0,9.7,0S0,4.3,0,9.7s4.3,9.7,9.7,9.7c2.4,0,4.6-0.9,6.3-2.3
        l0.4,0.4v1.2l7.4,7.4l2.2-2.2L18.6,16.4z M9.7,16.4C6,16.4,3,13.4,3,9.7S6,3,9.7,3s6.7,3,6.7,6.7S13.4,16.4,9.7,16.4z"/>
        </symbol>
        <symbol id="nav-icon" viewBox="0 0 32 32">
          <path d="M0,6.7h24.9V3.1H0V6.7z M0,13.8h24.9v-3.6H0V13.8z M0,20.9h24.9v-3.6H0V20.9z M28.4,20.9H32v-3.6h-3.6V20.9z M28.4,3.1v3.6
        H32V3.1H28.4z M28.4,13.8H32v-3.6h-3.6V13.8z"/>
        </symbol>
        <symbol id="arrow-forward-icon" viewBox="0 0 32 32">
          <path d="M16,5.3l-1.9,1.9l7.4,7.5H5.3v2.7h16.2l-7.4,7.5l1.9,1.9L26.7,16L16,5.3z"/>
        </symbol>
        <symbol id="home-icon" viewBox="0 0 32 32">
          <path d="M11,18V6l-8.5,6L11,18z M11.5,12l8.5,6V6L11.5,12z"/>
        </symbol>
        <symbol id="start-icon" viewBox="0 0 32 32">
          <path d="M8,5v14l11-7L8,5z"/>
        </symbol>
        <symbol id="down-arrow-icon" viewBox="0 0 32 32">
          <path d="M16.6,8.6L12,13.2L7.4,8.6L6,10l6,6l6-6L16.6,8.6z"/>
        </symbol>
        <symbol id="link-icon" viewBox="0 0 20 20">
          <path d="M3.3,16.7c-1.4-1.4-1.4-3.7,0-5.1l3.3-3.3L5,6.7L1.7,10c-2.3,2.3-2.3,6,0,8.3s6,2.3,8.3,0l3.3-3.3l-1.6-1.6l-3.3,3.3
            C7,18.1,4.7,18.1,3.3,16.7z M7.5,14.1l6.6-6.6l-1.7-1.7l-6.6,6.6L7.5,14.1z M10,1.7L6.7,5l1.6,1.6l3.3-3.3c1.4-1.4,3.7-1.4,5.1,0
            s1.4,3.7,0,5.1l-3.3,3.3l1.6,1.6l3.3-3.3c2.3-2.3,2.3-6,0-8.3S12.3-0.6,10,1.7z"/>
        </symbol>
        <symbol id="close-icon" viewBox="0 -960 960 960">
          <path d="M291-232.348 232.348-291l189-189-189-189L291-727.652l189 189 189-189L727.652-669l-189 189 189 189L669-232.348l-189-189-189 189Z"/>
        </symbol>
        <symbol id="download-icon" viewBox="0 0 32 32">
          <path d="M28.4,16v12.4H3.6V16H0v12.4c0,2,1.6,3.6,3.6,3.6h24.9c2,0,3.6-1.6,3.6-3.6V16H28.4z M17.8,17.2l4.6-4.6l2.5,2.5L16,24
            l-8.9-8.9l2.5-2.5l4.6,4.6V0h3.6V17.2z"/>
        </symbol>
        <symbol id="plus-icon" viewBox="0 0 16 16">
          <path
            d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z" />
          <path
            d="M38.5 25H27V14c0-.553-.448-1-1-1s-1 .447-1 1v11H13.5c-.552 0-1 .447-1 1s.448 1 1 1H25v12c0 .553.448 1 1 1s1-.447 1-1V27h11.5c.552 0 1-.447 1-1s-.448-1-1-1z" />
        </symbol>
        <symbol id="fullscreen-icon" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </symbol>
        <symbol id="add-circle-icon" viewBox="0 0 20 20">
          <path d="M9.25 14h1.5v-3.25H14v-1.5h-3.25V6h-1.5v3.25H6v1.5h3.25Zm.75 4q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z"/>
        </symbol>
        <symbol id="rotation-icon" viewBox="0 -960 960 960" height="20" width="20">
          <path d="m382.804-173.782-53.391-53.631 58.891-58.652q-135.543-14.478-217.989-68.794Q87.869-409.174 87.869-480q0-86.696 114.153-143.413Q316.174-680.131 480-680.131q163.826 0 277.978 56.598Q872.131-566.935 872.131-480q0 65.022-67.653 115.913Q736.826-313.195 624-293.869v-84.761q72-15.805 118.565-44.587Q789.13-452 789.13-480q0-46.478-95.087-81.804Q598.957-597.13 480-597.13q-117.957 0-213.543 35.826Q170.87-525.478 170.87-480q0 34 61.63 66.565t147.63 43.565l-50.717-50.717 53.391-53.631L533.022-324 382.804-173.782Z"/>
        </symbol>
        <symbol id="video-icon" viewBox="0 -960 960 960" height="20" width="20">
          <path d="M382.087-308.652 651.348-480 382.087-651.348v342.696Zm98.189 220.783q-81.189 0-152.621-30.618-71.432-30.618-124.991-84.177-53.559-53.559-84.177-124.949-30.618-71.391-30.618-152.845 0-81.455 30.618-152.387t84.177-124.491q53.559-53.559 124.949-84.177 71.391-30.618 152.845-30.618 81.455 0 152.387 30.618t124.491 84.177q53.559 53.559 84.177 124.716 30.618 71.156 30.618 152.344 0 81.189-30.618 152.621-30.618 71.432-84.177 124.991-53.559 53.559-124.716 84.177-71.156 30.618-152.344 30.618ZM480-170.87q129.043 0 219.087-90.043Q789.13-350.957 789.13-480t-90.043-219.087Q609.043-789.13 480-789.13t-219.087 90.043Q170.87-609.043 170.87-480t90.043 219.087Q350.957-170.87 480-170.87ZM480-480Z"/>
        </symbol>  
        <symbol id="table-icon" viewBox="0 -960 960 960" height="20" width="20">
          <path d="M135.869-218.87v-522.26q0-34.483 24.259-58.742t58.742-24.259h522.26q34.483 0 58.742 24.259t24.259 58.742v522.26q0 34.483-24.259 58.742t-58.742 24.259H218.87q-34.483 0-58.742-24.259t-24.259-58.742Zm83.001-388.195h522.26V-741.13H218.87v134.065Zm198.087 194.717h126.086v-122.717H416.957v122.717Zm0 193.478h126.086v-121.478H416.957v121.478ZM218.87-412.348h126.087v-122.717H218.87v122.717Zm396.173 0H741.13v-122.717H615.043v122.717ZM218.87-218.87h126.087v-121.478H218.87v121.478Zm396.173 0H741.13v-121.478H615.043v121.478Z"/>
        </symbol>
        <symbol id="layers-icon" viewBox="0 -960 960 960" height="20" width="20">
          <path d="M479.761-122.478 130.608-397l66.848-52.935 282.305 221.587 282.783-221.587L829.392-397 479.761-122.478Zm0-205.87L130.608-602.63l349.153-274.283L828.913-602.63 479.761-328.348Zm0-268.282Zm0 162.412L693.978-602.63 479.761-770.804 265.544-602.63l214.217 168.412Z"/>
        </symbol>
        <symbol id="text-size-icon" viewBox="0 -960 960 960">
          <path d="M576.239-183.869v-488.609H383.522v-103.653h488.609v103.653H679.652v488.609H576.239Zm-368.13 0v-288.957H87.869v-103.413h343.892v103.413H311.522v288.957H208.109Z"/>
        </symbol>
      </svg>
    `
  }
}
