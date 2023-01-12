/* eslint-disable */
import React from 'react';
import { loadProvinces, loadChildrenArea, getAllParentsRegion } from 'framework/services/region';
import { Picker } from 'antd-mobile';
import Input from '../Input';
import _ from 'lodash';
import sleep from 'framework/utils/sleep';
//
export default class extends React.Component {
  state = {
    localValue: [],
    pickerVisible: false,
    provinces: [], //省
    citys: [], //市
    districts: [], //区
    streets: [] //街道
  };

  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps() {
    this.handleRegion();
  }

  waitProvinces = async () => {
    for (let i = 0; i < 100000; i++) {
      const { provinces } = this.state;
      if (provinces.length > 0) {
        break;
      }
      await sleep(50);
    }
    await sleep(100);
  };

  handleRegion = (() => {
    let isSyncing = false;
    return async () => {
      while (isSyncing) {
        await sleep(50);
      }
      isSyncing = true;
      await this.waitProvinces();
      let valueGroup = await this.getValueGroup();
      await this.handlePickerChange(valueGroup);
      isSyncing = false;
    };
  })();

  loadAllProvinces = () => {
    return new Promise(async (resolve) => {
      const provinces = await loadProvinces();
      this.setState({ provinces }, () => {
        resolve(provinces);
      });
    });
  };

  init = async () => {
    const provinces = await this.loadAllProvinces();
    if (provinces.length > 0) {
      const citys = await this.loadCityByProvinceAreaCode(provinces[0].areaCode);
      if (citys.length > 0) {
        const districts = await this.loadDistrictByCityAreaCode(citys[0].areaCode);
        if (districts.length > 0) {
          await this.loadStreetByDistrictAreaCode(districts[0].areaCode);
        }
      }
    }
    // await this.handlePickerChange([]);
    this.handleRegion();
  };

  handleInputClick = () => {
    const { readonly } = this.props;
    if (!readonly) {
      this.init();
      this.setState({ pickerVisible: true });
    }
  };

  handleOk = () => {
    this.setState({ pickerVisible: false });
    const val = this.state.localValue;
    const { onChange } = this.props;
    const valDetail = this.getValDetail(val);
    const value = val.filter(item => !!item).pop();
    onChange(value, valDetail);
  };
  getValDetail = val => {
    const [provinceAreaCode, cityAreaCode, districeAreaCode, streetAreaCode] = val;
    const { provinces, citys, districts, streets } = this.state;
    return {
      province: provinces.find(item => item.areaCode === provinceAreaCode),
      city: citys.find(item => item.areaCode === cityAreaCode),
      district: districts.find(item => item.areaCode === districeAreaCode),
      street: streets.find(item => item.areaCode === streetAreaCode)
    };
  };
  handleDismiss = () => {
    this.setState({ pickerVisible: false });
  };

  getValueGroup = () => {
    const { value } = this.props;
    if (!value) {
      return [];
    } 
    const regions = getAllParentsRegion(value);
    let provinceAreaCode = _.get(regions[0], 'areaCode') || '';
    let cityAreaCode = _.get(regions[1], 'areaCode') || '';
    let districeAreaCode = _.get(regions[2], 'areaCode') || '';
    let streetAreaCode = _.get(regions[3], 'areaCode') || '';
    //
    if (cityAreaCode === provinceAreaCode) {
      cityAreaCode = '';
    }
    if ([provinceAreaCode, cityAreaCode].includes(districeAreaCode)) {
      districeAreaCode = '';
    }
    if (streetAreaCode.length < 8) {
      streetAreaCode = '';
    }
    //
    return [provinceAreaCode, cityAreaCode, districeAreaCode, streetAreaCode].filter(item => !!item);
  };

  getValueText = () => {
    const value = this.getValueGroup();
    const { province, city, district, street } = this.getValDetail(value);
    return [province, city, district, street]
      .filter(item => !!item)
      .map(item => item.cityName)
      .join('');
  };

  //根据省份筛选城市
  getCityAreaByProvince = province => {
    const { citys } = this.state;
    return citys
      .filter(city => {
        return city.parentAreaCode === province.areaCode;
      })
      .map(city => {
        const { areaCode: value, cityName: label } = city;
        const children = this.getDistrictAreaByCity(city);
        return { value, label, children };
      });
  };

  //根据城市筛选区县
  getDistrictAreaByCity = city => {
    const { districts } = this.state;
    return districts
      .filter(district => {
        return district.parentAreaCode === city.areaCode;
      })
      .map(district => {
        const { areaCode: value, cityName: label } = district;
        const children = this.getStreetAreaByDistrict(district);
        return { value, label, children };
      });
  };

  //根据区县筛选街道
  getStreetAreaByDistrict = district => {
    const { streets } = this.state;
    return streets
      .filter(street => {
        return street.parentAreaCode === district.areaCode;
      })
      .map(street => {
        const { areaCode: value, cityName: label } = street;
        const children = [];
        return { value, label, children };
      });
  };
  getAreaData = () => {
    const { provinces } = this.state;
    return provinces.map(province => {
      const { areaCode: value, cityName: label } = province;
      const children = this.getCityAreaByProvince(province);
      return { value, label, children };
    });
  };
  addAreas = areas => {
    ['citys', 'districts', 'streets'].forEach(key => {
      const area = _.get(this, `state.${key}`, []);
      (areas[key] || []).forEach(item => {
        if (!area.find(areaItem => areaItem.areaCode === item.areaCode)) {
          area.push(item);
        }
      });
      this.setState({ [key]: area });
    });
  };
  //根据省份加载城市
  loadCityByProvinceAreaCode = async provinceAreaCode => {
    const citys = await loadChildrenArea(provinceAreaCode);
    this.addAreas({ citys });
    if (citys[0]) {
      await this.loadDistrictByCityAreaCode(citys[0].areaCode);
    }
    return citys;
  };
  //根据城市加载区县
  loadDistrictByCityAreaCode = async cityAreaCode => {
    const districts = await loadChildrenArea(cityAreaCode);
    this.addAreas({ districts });
    if (districts[0]) {
      await this.loadStreetByDistrictAreaCode(districts[0].areaCode);
    }
    return districts;
  };
  //根据区县加载街道
  loadStreetByDistrictAreaCode = async districtAreaCode => {
    const streets = await loadChildrenArea(districtAreaCode);
    this.addAreas({ streets });
    return streets;
  };
  handlePickerChange = async val => {
    const { showColsNum } = this.props;
    const { localValue } = this.state;
    this.setState({ localValue: [...val] });
    let [provinceAreaCode, cityAreaCode, districtAreaCode, streetAreaCode] = val;
    const { provinces } = this.state;
    if (!provinceAreaCode) {
      provinceAreaCode = provinces[0].areaCode;
    }
    if (provinceAreaCode) {
      const citys = await this.loadCityByProvinceAreaCode(provinceAreaCode);
      if (!cityAreaCode && citys[0]) {
        cityAreaCode = citys[0].areaCode;
      }
    }
    if (cityAreaCode) {
      const districts = await this.loadDistrictByCityAreaCode(cityAreaCode);
      if (!districtAreaCode && districts[0]) {
        districtAreaCode = districts[0].areaCode;
      }
    }
    if (districtAreaCode) {
      const streets = await this.loadStreetByDistrictAreaCode(districtAreaCode);
      if (!streetAreaCode && streets[0]) {
        streetAreaCode = streets[0].areaCode;
      }
    }
    const cols = localValue.length > 3 ? 4 : 3;
    const data = [provinceAreaCode, cityAreaCode, districtAreaCode, streetAreaCode];

    this.setState({ localValue: data.splice(0, showColsNum || cols).filter(item => !!item) });
  };

  render() {
    const { placeholder, showColsNum } = this.props;
    const { provinces, pickerVisible, localValue } = this.state;
    const areaData = this.getAreaData();
    const valueText = this.getValueText();
    const cols = localValue.length > 3 ? 4 : 3;
    return provinces.length > 0 ? (
      <Picker visible={pickerVisible} value={localValue} data={areaData} onPickerChange={this.handlePickerChange} cols={showColsNum || cols} onOk={this.handleOk} onDismiss={this.handleDismiss}>
        <Input readonly value={valueText} placeholder={placeholder} onClick={this.handleInputClick} />
      </Picker>
    ) : null;
  }
}
