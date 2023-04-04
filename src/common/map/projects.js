// 投射，投影
import Projection from 'ol/proj/Projection';
export const PROJECTION_4326 = 'EPSG:4326';
// web墨卡托投影坐标系
export const PROJECTION_3857 = 'EPSG:3857';
export const projCGCS2000 = new Projection({
  code: 'EPSG:4490',
  extent: [0, 0, 180, 90],
  units: 'degrees',
});
