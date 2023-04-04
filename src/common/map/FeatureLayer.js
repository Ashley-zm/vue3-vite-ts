import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import VectorImageLayer from 'ol/layer/VectorImage.js';
import VectorSource from 'ol/source/Vector.js';
import { FEATURE_PROPERTIES } from '@/common/map/keys.js';
import { FEATURE_LAYER } from '@/common/map/layer-ids.js';

export default class FeatureLayer {
  constructor() {
    this.id = FEATURE_LAYER;
    this.instance = null;
    this.source = new VectorSource();
    this.layer = new VectorImageLayer({
      id: this.id,
      source: this.source,
      zIndex: 999,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FeatureLayer();
    }
    return this.instance;
  }

  getSource() {
    return this.source;
  }

  getLayer() {
    return this.layer;
  }

  getId() {
    return this.id;
  }

  getFeaturesType(type) {
    const allFeatures = this.getSource().getFeatures();
    if (!type) {
      return allFeatures;
    }
    const features = allFeatures.filter((f) => {
      const featureType = f.get('type');
      return featureType ? featureType === type : false;
    });
    return features;
  }

  static changeToPointFeatures(items, styleFunc, type) {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    const features = [];
    items.forEach((c) => {
      if (c.lng && c.lat) {
        const feature = new Feature({
          geometry: new Point([c.lng, c.lat]),
          [FEATURE_PROPERTIES]: { ...c },
          type,
        });
        feature.setStyle(styleFunc(feature));
        features.push(feature);
      }
    });
    return features;
  }

  clearFeaturesType(type) {
    this.getFeaturesType(type).forEach((f) => {
      this.getSource().removeFeature(f);
    });
  }

  // 默认先清除地图选中河道，在进行添加河道
  addFeaturesType(features, type, isClear = true) {
    if (isClear) {
      this.clearFeaturesType(type);
    }
    if (features && Array.isArray(features)) {
      this.getSource().addFeatures(features);
    }
  }

  addFeatures(features) {
    if (features && Array.isArray(features)) {
      this.getSource().addFeatures(features);
    }
  }

  addFeature(feature) {
    if (feature) {
      this.getSource().addFeature(feature);
    }
  }
}
