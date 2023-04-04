<template>
  <div class="container">
    <div id="map" class="map">
      <div class="mouse-position">
        <div>经纬度(</div>
        <div id="mouse-position" />
        <div>)</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 显示鼠标当前位置的经纬度
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import map from '@/common/map/map.js';
import { onBeforeUnmount, onMounted, reactive} from "vue";


onMounted(() => {
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(3),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position')||'',
  });
  map.addControl(mousePositionControl);
  map.setTarget('map');
  console.log(map);
  
});
onBeforeUnmount(() => {
  // data.map=null;
})
</script>
<style lang="less" scoped>
.container {
  .map {
    height: 86vh;
    width: 100%;
  .mouse-position {
    position: absolute;
    bottom: 0px;
    width: 170px;
    height: 24px;
    left: calc(50% - 100px);
    z-index: 99999999;
    background: rgba(255, 255, 255, 0.6);
    line-height: 24px;
    text-align: center;
    color: #333;
    font-size: 12px;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
  }
  }
}
</style>
