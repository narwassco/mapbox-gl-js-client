/**
 * Adds area switcher.
 * @param {Object} options
 * @param {Array} [options.area] - Array of area objects:
 * @param {String} options.area.label - Area label to display on switcher
 * @param {String} options.area.latlng - Latitude and Longitude to display
 * @param {String} options.area.zoom - Zoom level to display
 * @param {Function} [options.onChange] - Triggered on area change. Accepts `area` object
 */

export default class AreaSwitcherControl {
  constructor(areas) {
    this.areas = areas || AreaSwitcherControl.DEFAULT_AREAS;
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
    this.mapAreaContainer = document.createElement("div");
    this.areaButton = document.createElement("button");
    this.mapAreaContainer.classList.add("mapboxgl-area-list");
    for (const area of this.areas) {
        const styleElement = document.createElement("button");
        styleElement.innerText = area.title;
        styleElement.classList.add(area.title.replace(/[^a-z0-9-]/gi, '_'));
        styleElement.value = JSON.stringify({
          center: area.latlng,
          zoom: area.zoom,
        });
        styleElement.addEventListener("click", event => {
            const srcElement = event.srcElement;
            this.map.jumpTo(JSON.parse(srcElement.value));
            // this.map.setStyle(JSON.parse(srcElement.dataset.uri));
            this.mapAreaContainer.style.display = "none";
            this.areaButton.style.display = "block";
            const elms = this.mapAreaContainer.getElementsByClassName("active");
            while (elms[0]) {
                elms[0].classList.remove("active");
            }
            srcElement.classList.add("active");
        });
        if (area.title === AreaSwitcherControl.DEFAULT_AREA) {
            styleElement.classList.add("active");
        }
        this.mapAreaContainer.appendChild(styleElement);
    }
    this.areaButton.classList.add("mapboxgl-ctrl-icon");
    this.areaButton.classList.add("mapboxgl-area-switcher");
    this.areaButton.addEventListener("click", () => {
        this.areaButton.style.display = "none";
        this.mapAreaContainer.style.display = "block";
    });
    document.addEventListener("click", this.onDocumentClick);
    this.controlContainer.appendChild(this.areaButton);
    this.controlContainer.appendChild(this.mapAreaContainer);
    return this.controlContainer;
  }
  
  onRemove() {
    if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.areaButton) {
      return;
    }
    this.areaButton.removeEventListener("click", this.onDocumentClick);
    this.controlContainer.parentNode.removeChild(this.controlContainer);
    document.removeEventListener("click", this.onDocumentClick);
    this.map = undefined;
  }

  onDocumentClick(event) {
    if (this.controlContainer && !this.controlContainer.contains(event.target)
        && this.mapAreaContainer && this.areaButton) {
        this.mapAreaContainer.style.display = "none";
        this.areaButton.style.display = "block";
    }
  }
};

AreaSwitcherControl.DEFAULT_AREA = "Narok";
AreaSwitcherControl.DEFAULT_AREAS = [{
  title: 'Narok',
  latlng: [35.87063, -1.08551],
  zoom: 14,
}, {
  title: "Ololulung'a",
  latlng: [35.65072, -1.0085],
  zoom: 13
}, {
  title: "Kilgoris",
  latlng: [34.87533, -1.00278],
  zoom: 14
}, {
  title: "Suswa",
  latlng: [36.33078, -1.05307],
  zoom: 13
}
];