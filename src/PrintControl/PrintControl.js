import PrintJS from 'print-js'

/**
 * Print Control.
 * @param {Object} options
 * @param {Function} [options.onChange] - Triggered on area change. Accepts `area` object
 */

export default class AreaSwitcherControl {
  constructor(areas) {
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  getDefaultPosition() {
    const defaultPosition = "top-right";
    return defaultPosition;
  }

  onAdd(map) {
    this.map = map;
    this.controlContainer = document.createElement("div");
    this.controlContainer.classList.add("mapboxgl-ctrl");
    this.controlContainer.classList.add("mapboxgl-ctrl-group");
    // this.mapPrintContainer = document.createElement("div");
    // this.printButton = document.createElement("button");
    // this.mapPrintContainer.classList.add("mapboxgl-area-list");

    this.printButton = document.createElement("button");
    this.printButton.classList.add("mapboxgl-print-control");
    // styleElement.innerText = area.title;
    // styleElement.classList.add(area.title.replace(/[^a-z0-9-]/gi, '_'));
    // this.printButton.value = JSON.stringify({
    //   center: area.latlng,
    //   zoom: area.zoom,
    // });

    var dpi = 300;
    Object.defineProperty(window, 'devicePixelRatio', {
        get: function() {return dpi / 96}
    });

    this.printButton.addEventListener("click", event => {
      const srcElement = event.srcElement;
      // const options = JSON.parse(srcElement.value);
      var content = map.getCanvas().toDataURL();
      console.log(content)
      // this.href = img
      PrintJS(content, 'image');

      // var img = new Image();
      // var mapCanvas = this.map.getCanvas(document.querySelector('.mapboxgl-canvas'));
      // img.src = mapCanvas.toDataURL();
      // printJS(img.src, 'image');
    });
   
    document.addEventListener("click", this.onDocumentClick);
    this.controlContainer.appendChild(this.printButton);
    return this.controlContainer;
  }
  
  onRemove() {
    if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.areaButton) {
      return;
    }
    this.printButton.removeEventListener("click", this.onDocumentClick);
    this.controlContainer.parentNode.removeChild(this.controlContainer);
    document.removeEventListener("click", this.onDocumentClick);
    this.map = undefined;
  }

  onDocumentClick(event) {
    if (this.controlContainer && !this.controlContainer.contains(event.target)
        && this.printButton) {

    }
  }
};

// AreaSwitcherControl.DEFAULT_AREA = "Narok";
// AreaSwitcherControl.DEFAULT_AREAS = [{
//   title: 'Narok',
//   latlng: [35.87063, -1.08551],
//   zoom: 14,
// }, {
//   title: "Ololulung'a",
//   latlng: [35.65072, -1.0085],
//   zoom: 13
// }, {
//   title: "Kilgoris",
//   latlng: [34.87533, -1.00278],
//   zoom: 14
// }, {
//   title: "Suswa",
//   latlng: [36.33078, -1.05307],
//   zoom: 13
// }
// ];