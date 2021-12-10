require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/MapImageLayer",
  "esri/widgets/Legend",
], function (Map, MapView, MapImageLayer, Legend) {
  var layer = new MapImageLayer({
    url: "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/DrugPoisoningDeaths/FeatureServer/0",
    sublayers: [
      {
        id: 2,
        visible: false,
      },
      {
        id: 1,
        visible: false,
      },
      {
        id: 0,
        visible: false,
      },
    ],
  });

  var map = new Map({
    basemap: "streets",
    layers: [layer],
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 4,
    center: [-99, 39],
  });

  var sublayer = layer.findSublayerById(0);

  sublayer
    .createFeatureLayer()
    .then(function (featureLayer) {
      return featureLayer.load();
    })
    .then(createFeatureLayer);

  function createFeatureLayer(featureLayer) {
    featureLayer.visible = true;
    let legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: featureLayer,
          title: "Opioid Poisoning Deaths (in 2019) [By County in thousands]",
        },
      ],
    });

    view.ui.add(legend, "bottom-right");
    map.add(featureLayer);
    console.log("featureLayer: ", featureLayer);
  }
});
