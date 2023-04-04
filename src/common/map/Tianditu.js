import WmtsSource from 'ol/source/WMTS.js';
import WmtsTilegrid from 'ol/tilegrid/WMTS.js';
/**
 * WMTS，即Web地图瓦片服务（Web Map Tile Service），由OGC（开放地理信息联盟）制定。
 * 根据WMTS标准，可以使我们轻松的访问瓦片数据。
 * WMTS提供了一种采用预定义图块方法发布数字地图服务的标准化解决方案，
 * 它最重要的特征是采用瓦片缓存技术缓解WebGIS服务器端数据处理的压力，提高前后端交互响应速度。
 * 
 * 这里采用了WmtsSource作为地图源数据
 */
export default class Tianditu extends WmtsSource{
  constructor(opt) {
    console.log('optt',opt);
    Tianditu.layerLabelMap = {
      vec: 'cva',//矢量 矢量标注
      ter: 'cta',//地形 地形标注
      img: 'cia',//影像 影像标注
    };
    Tianditu.layerZoomMap = {
      vec: 18,
      ter: 14,
      img: 18,
    };
    const options = opt || {};
    options.layerType = options.layerType || 'vec';
    options.layerType = options.isLabel
      ? Tianditu.layerLabelMap[options.layerType]
      : options.layerType;
    // 投影坐标系参数矩阵集    c：经纬度直投    w：web墨卡托投影
    options.matrixSet = options.projection === 'EPSG:4326' || options.projection === 'EPSG:4490' ? 'c' : 'w';
    // 地图资源请求地址
    options.url = `http://t0.tianditu.gov.cn/${options.layerType}_${options.matrixSet}/wmts?tk=075fbb86f6f79ca1be0739988c6a8d9c`;
    console.log('optt',options.url);
    const tileGrid = options.tileGrid || Tianditu.getTileGrid(options.projection || 'EPSG:3857');
    super({
      version: options.version || '1.0.0', // WMTS版本
      format: options.format || 'tiles', // 图片格式
      dimensions: options.dimensions || {},
      layer: options.layerType, // 图层名
      maxZoom: Tianditu.layerZoomMap[options.layerType],
      // 投影坐标系矩阵集，一定要和WMTS capabilities文档中一致，否则会加载失败
      matrixSet: options.matrixSet, // 投影坐标系参数矩阵集
      tileGrid: tileGrid, // 投影坐标系
      url: options.url,
      urls: options.urls,
      projection: options.projection || 'EPSG:3857', // 投影坐标系
      wrapX: options.wrapX !== undefined ? options.wrapX : false,
      // tileLoadFunction: (imageTile, src) => {
      //   const imgElement = imageTile.getImage();
        // localforage
        //   .getItem(src)
        //   .then((value) => {
        //     if (value) {
        //       imgElement.src = URL.createObjectURL(value);
        //     } else {
        //       const xhr = new XMLHttpRequest();
        //       xhr.open('GET', `http://${window.location.host}${src}`);
        //       xhr.responseType = 'blob';

        //       xhr.onload = () => {
        //         Tianditu.readBlobAsDataURL(xhr.response, (data) => {
        //           localforage.setItem(src, data);
        //           imgElement.src = data;
        //         });
        //       };
        //       xhr.send();
        //     }
        //   })
        //   .catch(() => {
        //     imgElement.src = src;
        //   });
      // },

      // attributions: options.attributions,
      // attributionsCollapsible: options.attributionsCollapsible,
      // cacheSize: options.cacheSize,
      // crossOrigin: options.crossOrigin,
      // reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      // tileClass: options.tileClass,
      // tileLoadFunction: options.tileLoadFunction,
      // tilePixelRatio: options.tilePixelRatio,
      // transition: options.transition,
      // zDirection: options.zDirection,
    });
    
  }
  /**
   * @function Tianditu.getTileGrid
   * @description 获取瓦片网格
   * @param {Object} projection - 投影参考对象
   * @returns {ol.tilegrid.WMTS} 返回瓦片网格对象
   */
  static getTileGrid(projection) {
    if (projection === 'EPSG:4326' || projection === 'EPSG:4490') {
      return Tianditu.default4326TileGrid();
    }
    return Tianditu.default3857TileGrid();
  }

  /**
   * @function Tianditu.default4326TileGrid
   * @description 获取默认 4326 网格瓦片
   * @returns {ol.tilegrid.WMTS} 返回默认 4326 网格瓦片对象
   */
  static default4326TileGrid() {
    const tdtWgs84Resolutions = [];
    const matrixIds = [];
    for (let i = 1; i < 21; i += 1) {
      tdtWgs84Resolutions.push((0.703125 * 2) / 2 ** i);
      matrixIds.push(i);
    }
    const tileGird = new WmtsTilegrid({
      resolutions: tdtWgs84Resolutions, // 分辨率数组
      origin: [-180, 90], // 原点
      matrixIds, // 矩阵ID，就是瓦片坐标系z维度各个层级的标识
      minZoom: 1,
    });
    return tileGird;
  }

  /**
   * @function Tianditu.default3857TileGrid
   * @description 获取默认 3857 网格瓦片
   * @returns {ol.tilegrid.WMTS} 返回默认 3857 网格瓦片对象
   */
  static default3857TileGrid() {
    const tdtMercatorResolutions = [];
    const matrixIds = [];
    for (let i = 1; i < 19; i += 1) {
      tdtMercatorResolutions.push((78271.5169640203125 * 2) / 2 ** i);
      matrixIds.push(i);
    }
    const tileGird = new WmtsTilegrid({
      extent: [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
      resolutions: tdtMercatorResolutions,
      matrixIds,
      origin: [-20037508.3427892, 20037508.3427892],
      minZoom: 1,
    });
    return tileGird;
  }
}