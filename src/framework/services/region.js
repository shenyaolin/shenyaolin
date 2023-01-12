import ajax from 'framework/utils/ajax';
import api from 'framework/config/api';
import storage from 'framework/utils/storage';
import asyncGet from './asyncGet';
import _ from 'lodash';
//获取所有省份
export const loadProvinces = async () => {
  const storageProvinces = storage.get('storageProvinces');
  if (storageProvinces && storageProvinces.length > 0) {
    return storageProvinces;
  }
  const { res } = await ajax.get(api.address.getProvinces);
  const provinces = _.get(res, 'results', []);
  storage.set('storageProvinces', provinces);
  return provinces;
};
//获取地区的所有下级区域
export const loadChildrenArea = async (areaCode) => {
  const storageAreas = storage.get(`storageArea-${areaCode}`);
  if (storageAreas) {
    return storageAreas;
  }
  const { res } = await ajax.get(`${api.address.getChildren}/${areaCode}`);
  const areas = _.get(res, 'results', []);
  storage.set(`storageArea-${areaCode}`, areas);
  return areas;
};


// 根据新增地区编码 获取行政地区名称
export const getAreaDetail = async (areaCode = '') => {
  const key = `save_area_${areaCode}`;
  let detail = storage.get(key);
  if (!detail && areaCode) {
    const { res } = await ajax.get(api.address.getDetail, { areaCode });
    detail = _.get(res, 'results');
    storage.set(key, detail);
  }
  return detail;
};
// (批量)根据新增地区编码 获取行政地区名称
export const getAreasDetail = async (areaCodes = []) => {
  let details = [];
  for (let i = 0, len = areaCodes.length; i < len; i++) {
    const detail = await getAreaDetail(areaCodes[i]);
    detail && details.push(detail);
  }
  return details;
};

//根据行政地区编码获取所有父级行政地区编码
export const getAllParentsRegion = (() => {
  const save = {};
  return (areaCode) => {
    if (save[areaCode]) {
      return save[areaCode];
    }
    console.log(21)
    let results = asyncGet(api.address.getAllRegion, { areaCode });
    results = _.get(results, 'results');
    const [
      province, provinceName, //省
      city, cityName, //市
      county, countyName, //区
      street, streetName, //街道
      village, villageName //社区
    ] = [
      _.get(results, 'province'), _.get(results, 'provinceName'),
      _.get(results, 'city'), _.get(results, 'cityName'),
      _.get(results, 'county'), _.get(results, 'countyName'),
      _.get(results, 'street'), _.get(results, 'streetName'),
      _.get(results, 'village'), _.get(results, 'villageName'),
    ];
    const allRegions = [];
    if (province && provinceName) {
      allRegions.push({ areaCode: province, cityName: provinceName });
    }
    if (city && cityName) {
      allRegions.push({ areaCode: city, cityName: cityName });
    }
    if (county && countyName) {
      allRegions.push({ areaCode: county, cityName: countyName });
    }
    if (street && streetName) {
      allRegions.push({ areaCode: street, cityName: streetName });
    }
    if (village && villageName) {
      allRegions.push({ areaCode: village, cityName: villageName });
    }
    if (allRegions.length > 0) {
      save[areaCode] = allRegions;
    }
    return allRegions;
  };
})();