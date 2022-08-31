<template>
  <div>
    <div class="ol-map" ref="olMap"></div>
  </div>
</template>
<script lang="ts" setup>
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { defaults, FullScreen, MousePosition, ScaleLine, ZoomSlider } from "ol/control";
import { XYZ } from "ol/source";
import { getCurrentInstance, onMounted, reactive } from "vue";
import { fromLonLat } from "ol/proj";
const state = reactive({
  map: {},
  mapLayers: {
    tianMap: {},
    tianSource: {},
    imageMap: {},
    imageSource: {},
    gaodeMap: {},
    gugeMap: {},
  },
});
const getBaseLayer = (layer: any) => {
  return new TileLayer({
    source: new XYZ({
      url: `http://t2.tianditu.com/DataServer?T=${layer}&x={x}&y={y}&l={z}&tk=075fbb86f6f79ca1be0739988c6a8d9c`,
    }),
  });
};
const getMarkerLayer = (layer: any) => {
  return new TileLayer({
    source: new XYZ({
      url: `http://t2.tianditu.com/DataServer?T=${layer}&x={x}&y={y}&l={z}&tk=075fbb86f6f79ca1be0739988c6a8d9c`,
    }),
  });
};
onMounted(() => {
  initMap();
});
const currentInstance = getCurrentInstance();
// 初始化地图
const initMap = () => {
  //天地图
  state.mapLayers.tianMap = getBaseLayer("vec_w");
  state.mapLayers.tianSource = getMarkerLayer("cva_w");
  // 天地图的影像地图
  state.mapLayers.imageMap = getBaseLayer("img_c");
  state.mapLayers.imageSource = getMarkerLayer("cia_c");
  //高德地图
  state.mapLayers.gaodeMap = new TileLayer({
    source: new XYZ({
      //使用高德
      url:
        "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    }),
  });
  //谷歌地图
  state.mapLayers.gugeMap = new TileLayer({
    source: new XYZ({
      url:
        "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0",
    }),
  });
  state.map = new Map({
    // 设置地图图层
    layers: [
      // state.mapLayers.imageMap,
      // state.mapLayers.imageSource,
      state.mapLayers.gaodeMap,
      // state.mapLayers.gugeMap,
      // state.mapLayers.tianMap,
      // state.mapLayers.tianSource,
    ], //地图源的瓦片图层
    //视图动画
    // loadTilesWhileAnimating: true,
    // 设置显示地图的视图
    view: new View({
      //   center: fromLonLat([104.06, 30.67], "EPSG:4326"), //地图中心点 经纬度
      center: fromLonLat([120.18928024510497, 30.19961553664213], "EPSG:4326"), //地图中心点 经纬度
      zoom: 12, // 缩放级别-显示层级
      minZoom: 0, // 最小缩放级别
      maxZoom: 18, // 最大缩放级别
      projection: "EPSG:4326",
      constrainResolution: true, // 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
    }),
    //olMap为map的地图容器
    target: currentInstance.ctx.$refs.olMap, // DOM容器
    //控制层
    controls: defaults().extend([
      new FullScreen(), // 全屏
      new MousePosition(), // 显示鼠标当前位置的经纬度
      new ScaleLine(), // 显示比例尺
      new ZoomSlider(), //缩放滑块刻度控件
    ]),
  });
};
</script>
<style lang="less" scoped>
.ol-map {
  width: 100%;
  height: 600px;
}
</style>
