import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import { get as getProjection } from 'ol/proj.js';
import { getTopLeft } from 'ol/extent.js';
import { PROJECTION_4326 } from '@/common/map/projects.js';

export default function getSuperMapWmtsTileGrid() {
  const projection = getProjection(PROJECTION_4326);
  const projectionExtent = projection.getExtent();
  const resolutionschina = [
    0.703125,
    0.3515625,
    0.17578125,
    0.087890625,
    0.0439453125,
    0.02197265625,
    0.010986328125,
    0.0054931640625,
    0.00274658203125,
    0.001373291015625,
    6.866455078125e-4,
    3.4332275390625e-4,
    1.71661376953125e-4,
    8.58306884765625e-5,
    4.291534423828125e-5,
    2.1457672119140625e-5,
    1.0728836059570312e-5,
    5.364418029785156e-6,
    2.682209014892578e-6,
    1.341104507446289e-6,
  ];
  const matrixIds = new Array(20);
  for (let z = 0; z < 20; z += 1) {
    matrixIds[z] = z;
  }

  return new WMTSTileGrid({
    origin: getTopLeft(projectionExtent),
    resolutions: resolutionschina,
    matrixIds,
  });
}
