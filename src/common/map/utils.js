import { find, toNumber } from 'lodash-es';
import TileLayer from 'ol/layer/Tile.js';
import WMTS from 'ol/source/WMTS.js';
// import { isArray } from 'util';
import Polygon from 'ol/geom/Polygon.js';
import SuperMapWmtsTileGrid from '@/common/map/SuperMapWmtsTileGrid.js';
import { PROJECTION_4326 } from '@/common/map/projects.js';
import config from '@/common/map/config.js';

function getTypeNames(types) {
  const names = types.map((t) => t.name);
  return names;
}
function formatCoordinates(coordinatesString) {
  if (!coordinatesString) {
    return [];
  }
  const coordinatesArray = coordinatesString.trim().split(' ');
  const coordinates = coordinatesArray.reduce((acc, cur) => {
    acc.push(cur.split(',').map(toNumber));
    return acc;
  }, []);
  return coordinates;
}
function getLayerFilter(layerId) {
  return {
    layerFilter: (layer) => layer.get('id') === layerId,
  };
}
function getFeatureAtPixelByTypes(map, pixel, types, layerId) {
  const feature = map.forEachFeatureAtPixel(
    pixel,
    (f) => {
      if (f) {
        const type = f.get('type');
        if (types.join(',').indexOf(type) !== -1) {
          return f;
        }
      }
      return false;
    },
    getLayerFilter(layerId),
  );
  return feature;
}
function panToPoint(map, point, zoom = 5) {
  const view = map.getView();
  view.setZoom(zoom);
  view.setCenter(point);
}
function panTo(map, feature, maxZoom = 14) {
  const view = map.getView();
  view.fit(feature.getGeometry(), {
    padding: [0, 0, 0, 0],
    maxZoom,
  });
}
function fit(map, feature) {
  const view = map.getView();
  view.fit(feature.getGeometry());
}
function panToDetail(map, feature, maxZoom = 17) {
  const view = map.getView();
  view.fit(feature.getGeometry(), {
    padding: [330, 0, 0, 290],
    maxZoom,
  });
}
function removeOverlays(map, key, value) {
  const overlays = map.getOverlays();
  overlays
    .getArray()
    .filter((o) => o.get(key) === value)
    .forEach((o) => {
      o.setElement(null);
      map.removeOverlay(o);
    });
}
function clearOverlays(map, key, value) {
  const overlays = map.getOverlays();
  overlays
    .getArray()
    .filter((o) => o.get(key) === value)
    .forEach((o) => {
      o.setPosition(undefined);
    });
}
function clearAllOverlays(map) {
  const overlays = map.getOverlays();
  overlays.forEach((o) => {
    o.setPosition(undefined);
  });
}
function findLayer(map, layerId) {
  const allLayers = map.getLayers().getArray();
  const layer = find(allLayers, (l) => l.get('id') === layerId);
  return layer;
}
function isTextMatched(name, searchText) {
  if (!searchText || searchText === '') {
    return true;
  }

  if (!name) {
    return false;
  }
  const regexp = new RegExp(searchText, 'i');
  return regexp.test(name);
}
function addWmts(map, item) {
  console.log('添加图层layer',item);
  const layer = new TileLayer({
    id: item.id,
    preload: Infinity,
    extent: config.map.extentWmts,
    source: new WMTS({
      url: item.url,
      layer: item.layer,
      matrixSet: item.matrixSet,
      format: 'image/png',
      tileGrid: SuperMapWmtsTileGrid(),
      requestEncoding: 'KVP',
      dpi: '96',
      cacheSize: 204800,
    }),
    visible: item.visible,
    projection: PROJECTION_4326,
  });
  map.addLayer(layer);
}
function includesArr(arr, target) {
  if (!arr) {
  // if (!arr || !isArray(arr)) {
    return false;
  }
  let result = false;
  arr.forEach((e) => {
    if (e === target) {
      result = true;
    }
  });
  return result;
}
function getRadians(startPoint, endPoint) {
  const latA = endPoint[1] - startPoint[1];
  let radians;
  // 纬度相同特殊处理
  if (latA === 0) {
    radians = endPoint[0] > startPoint[0] ? Math.PI / 2 : -Math.PI / 2;
  } else {
    radians = Math.atan((endPoint[0] - startPoint[0]) / latA);
    radians = latA > 0 ? radians : radians - Math.PI;
  }
  return radians;
}
const bw = () => {
  const UserAgent = navigator.userAgent.toLowerCase();
  console.log(UserAgent);
  return {
    isUc: /ucweb/.test(UserAgent), // UC浏览器
    isChrome: /chrome/.test(UserAgent), // Chrome浏览器
    isFirefox: /firefox/.test(UserAgent), // 火狐浏览器
    isOpera: /opera/.test(UserAgent), // Opera浏览器
    isSafire: /safari/.test(UserAgent) && !/chrome/.test(UserAgent), // safire浏览器
    is360: /360se/.test(UserAgent), // 360浏览器
    isBaidu: /bidubrowser/.test(UserAgent), // 百度浏览器
    isSougou: /metasr/.test(UserAgent), // 搜狗浏览器
    isIE6: /msie 6.0/.test(UserAgent), // IE6
    isIE7: /msie 7.0/.test(UserAgent), // IE7
    isIE8: /msie 8.0/.test(UserAgent), // IE8
    isIE9: /msie 9.0/.test(UserAgent), // IE9
    isIE10: /msie 10.0/.test(UserAgent), // IE10
    isIE11: /trident/.test(UserAgent) && /rv:11.0/.test(UserAgent), // IE11
    isLB: /lbbrowser/.test(UserAgent), // 猎豹浏览器
    isWX: /micromessenger/.test(UserAgent), // 微信内置浏览器
    isQQ: /qqbrowser/.test(UserAgent), // QQ浏览器
  };
};
const isActiveXObject = () => !!window.ActiveXObject || 'ActiveXObject' in window;
function degreeToRadian(degree) {
  return (Math.PI * degree) / 180;
}
/**
 * @param [x,y] center 扇形中心点
 * @param number randius 扇形半径 与中心点对应的坐标系单位
 * @param number sAngle 扇形起始边与X轴正方向夹角°
 * @param number angle 圆心角°（逆时针方向为正）
 * @returns {ol.geom.Polygon}
 * @constructor
 */
function getAnglePoints(center, radius, ssAngle, angle) {
  const sAngle = (360 - ssAngle + 90) % 360;
  const points = [];
  for (let i = 0; i <= angle; i += 1) {
    const x = center[0] + radius * Math.cos(degreeToRadian(sAngle + i));
    const y = center[1] + radius * Math.sin(degreeToRadian(sAngle + i));
    points.push([x, y]);
  }
  return points;
}
/**
 * @param {*} center
 * @param {Array} arrRadius  northeast/southeast/northwest/southeast
 * unit kilometer
 */
function createWindCicle(center, arrRadius) {
  const radius = arrRadius;
  const arrPoint2 = getAnglePoints(center, radius[0], 90, 90);
  const arrPoint3 = getAnglePoints(center, radius[1], 180, 90);
  const arrPoint1 = getAnglePoints(center, radius[2], 0, 90);
  const arrPoint4 = getAnglePoints(center, radius[3], 270, 90);
  const res = [].concat(arrPoint2, arrPoint1, arrPoint4, arrPoint3);
  return new Polygon([res]);
}

export {
  getTypeNames,
  formatCoordinates,
  panTo,
  panToDetail,
  removeOverlays,
  clearOverlays,
  clearAllOverlays,
  findLayer,
  isTextMatched,
  panToPoint,
  createWindCicle,
  getLayerFilter,
  getFeatureAtPixelByTypes,
  addWmts,
  includesArr,
  getRadians,
  bw,
  isActiveXObject,
  fit,
};
