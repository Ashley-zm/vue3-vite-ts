import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { PROJECTION_4326 } from '@/common/map/projects.js';
import TileLayer from 'ol/layer/Tile.js';
import Tianditu from '@/common/map/Tianditu.js';
import { TIANDITU_IMAGE_LAYER,TIANDITU_IMAGE_Marker_LAYER } from '@/common/map/layer-ids.js';
import config from '@/common/map/config.js';
import FeatureLayer from '@/common/map/FeatureLayer.js';
import { addWmts } from '@/common/map/utils.js';
// 基本地图底图
const map = new Map({
  controls: [],
  layers: [
    // 矢量图层
    new TileLayer({
      id: TIANDITU_IMAGE_LAYER,
      preload: Infinity,
      source: new Tianditu({
        wrapX: true,
        projection: PROJECTION_4326,
        layerType: 'vec',
        cacheSize: 204800,
      }),
      visible: true,
    }),
    // 矢量图层标记
    new TileLayer({
      id: TIANDITU_IMAGE_Marker_LAYER,
      preload: Infinity,
      source: new Tianditu({
        wrapX: true,
        isLabel: true,
        projection: PROJECTION_4326,
        layerType: 'vec',
        cacheSize: 204800,
      }),
      visible: true,
    }),
  ],
  // 设置显示地图的视图
  view: new View({
    projection: PROJECTION_4326,
    center: config.map.center,
    extent: config.map.extent,
    maxZoom: config.map.maxZoom,
    minZoom: config.map.minZoom,
    zoom: config.map.zoom,
    constrainResolution: true,
    smoothResolutionConstraint: true,
  }),
});
// 添加xx背景图层
if (config.map.wmts.length>0) {
  console.log(config.map.wmts);
  config.map.wmts.forEach((item) => {
    addWmts(map, item);
  });
}
// 默认添加一层feature图层
map.addLayer(FeatureLayer.getInstance().getLayer());

console.log('1',map);
export default map;
