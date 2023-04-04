import { GAODE_LAYER} from '@/common/map/layer-ids.js';

export default {
  map: {
    center: [120.233, 30.31],
    extentWmts: [-180, -90, 180, 90],
    extentTf: [-Infinity, -90, Infinity, 90],
    extent: [118.187, 29.078, 120.76, 30.601],
    maxZoom: 19,
    minZoom: 1,
    zoom: 13,
    wmts: [
      {
        id: GAODE_LAYER,
        name: '高德地图',
        url: `https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/`,
        layer: '0',
        // matrixSet: 'c',
        visible: true, // 配置默认第一次是否显示
      },
    ],
    // funcWfs: {
    //   featureNS: 'http://www.supermap.com.cn/jghl',
    //   featurePrefix: 'jghl',
    //   featureTypes: ['jghl'],
    //   uniqueFieldName: 'ID',
    //   url: '/iserver/services/data-jghl/wfs200/utf-8',
    // },
  },
};
