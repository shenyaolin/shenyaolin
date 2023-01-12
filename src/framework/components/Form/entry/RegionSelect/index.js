/* eslint-disable */
import React from 'react';
import { loadProvinces, loadChildrenArea } from 'framework/services/region';
import Input from '../Input';
import TextArea from '../TextArea';
import _ from 'lodash';
import sleep from 'framework/utils/sleep';
import style from './index.less';
//
export default class extends React.Component {
  state = {
    tabs: [],
    localValue: [],
    pickerVisible: false,
    provinces: [], //省
    citys: [], //市
    districts: [], //区
    streets: [], //街道
    villages: [],// 社区
    regionData: [], // 地区数据
    activeIndex: 0, // 区域高亮层级
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

  handleRegion = async () => {
    await this.waitProvinces();
    let valueGroup = await this.getValueGroup(); // 获取层级区域码
    await this.handlePickerChange(valueGroup);
  };

  loadAllProvinces = () => {
    return new Promise(async (resolve) => {
      const { value } = this.props;
      const provinces = await loadProvinces();
      this.setState({ provinces, regionData: value ? [] : provinces }, () => {
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
    this.setState({
      tabs: [],
      regionData: [],
      activeIndex: 0
    })
  };

  getValDetail = val => {
    const [provinceAreaCode, cityAreaCode, districeAreaCode, streetAreaCode, villageAreaCode] = val;
    const { provinces, citys, districts, streets, villages } = this.state;
    return {
      province: provinces.find(item => item.areaCode === provinceAreaCode),
      city: citys.find(item => item.areaCode === cityAreaCode),
      district: districts.find(item => item.areaCode === districeAreaCode),
      street: streets.find(item => item.areaCode === streetAreaCode),
      village: villages.find(item => item.areaCode === villageAreaCode)
    };
  };

  handleDismiss = () => {
    this.setState({
      pickerVisible: false,
      tabs: [],
      regionData: [],
      activeIndex: 0
    });
  };

  getValueGroup = () => {
    const { value } = this.props;
    if (!value) {
      return [];
    }
    let provinceAreaCode = `${value.substr(0, 2)}0000`;
    let cityAreaCode = `${value.substr(0, 4)}00`;
    let districeAreaCode = `${value.substr(0, 6)}`;
    let streetAreaCode = `${value.substr(0, 9)}000`;
    let villageAreaCode = `${value.substr(0, 12)}`;
    if (cityAreaCode === provinceAreaCode) {
      cityAreaCode = '';
    }
    if ([provinceAreaCode, cityAreaCode].includes(districeAreaCode)) {
      districeAreaCode = '';
    }
    if (streetAreaCode.length < 12) {
      streetAreaCode = '';
    }
    if (villageAreaCode.length < 12) {
      villageAreaCode = '';
    }
    return [provinceAreaCode, cityAreaCode, districeAreaCode, streetAreaCode, villageAreaCode].filter(item => !!item);
  };

  getValueText = () => { // 获取区域对应中文
    const value = this.getValueGroup();
    const { province, city, district, street, village } = this.getValDetail(value);
    return [province, city, district, street, village]
      .filter(item => !!item)
      .map(item => item.cityName)
      .join('');
  };

  // 编辑 获取this.state.tabs
  getTabs = async() => {
    let newRegionData = [];
    let newArr = [], count = 0;
    const { showColsNum = 3 } = this.props; // 3
    const value = this.getValueGroup();
    const { province, city, district, street, village } = this.getValDetail(value);
    [province, city, district, street, village].map((item, index) => {
      if (item && (index < showColsNum)) {
        newArr.push({ title: item.cityName, areaCode: item.areaCode, parentAreaCode: item.parentAreaCode || item.areaCode })
      }
    })
    if (newArr.length == 0) {
      newArr.push({ title: '请选择', areaCode: '' });
      count = 0;
      newRegionData = [...this.state.regionData]
    } else if (newArr.length < showColsNum) {
      newRegionData = await loadChildrenArea(newArr[newArr.length-1].areaCode);
      newArr.push({ title: '请选择', areaCode: newArr[newArr.length-1].areaCode });
      count = newArr.length - 1;
    } else {
      count = showColsNum - 1;
      newRegionData = [];
    }
    this.setState({
      tabs: newArr,
      activeIndex: count,
      regionData: newRegionData
    }, function(){
      if(this.props.value){
        document.getElementById('selectTit').scrollLeft = document.getElementById('active').offsetLeft;
      }
    })
  }

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
        const children = this.getVillageAreaByStreet(street);
        return { value, label, children };
      });
  };

  // 根据街道筛选社区
  getVillageAreaByStreet = street => {
    const { villages } = this.state;
    return villages
      .filter(village => {
        return village.parentAreaCode === street.areaCode;
      })
      .map(village => {
        const { areaCode: value, cityName: label } = village;
        const children = [];
        return { value, label, children };
      });
  }

  addAreas = areas => {
    ['citys', 'districts', 'streets', 'villages'].forEach(key => {
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
  // 根据街道获取社区
  loadVillageByStreetAreaCode = async streetAreaCode => {
    const villages = await loadChildrenArea(streetAreaCode);
    this.addAreas({ villages });
    return villages;
  };

  handlePickerChange = async val => {
    const { showColsNum = 3 } = this.props;
    const { localValue } = this.state;
    this.setState({ localValue: [...val] });
    let [provinceAreaCode, cityAreaCode, districtAreaCode, streetAreaCode, villageAreaCode] = val;
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
    if (streetAreaCode) {
      const villages = await this.loadVillageByStreetAreaCode(streetAreaCode);
      if (!villageAreaCode && villages[0]) {
        villageAreaCode = villages[0].areaCode;
      }
    }
    const cols = localValue.length > 3 ? 4 : 3;
    const data = [provinceAreaCode, cityAreaCode, districtAreaCode, streetAreaCode, villageAreaCode];
    this.setState({ localValue: data.splice(0, showColsNum || cols).filter(item => !!item) }, () => {
      this.getTabs();
    });
  };

  // 点击获取地区
  clickCity = async data => {
    const { showColsNum = 3 } = this.props;
    document.getElementById('regionList').scrollTop = 0;
    const { tabs } = this.state;
    const arr = [...tabs], newLocalValue = [];
    if ((arr[arr.length - 1].title == '请选择') || (arr.length == 1 && arr[arr.length - 1].title != '请选择')) {
      arr.pop(arr[arr.length - 1]);
    }
    let citys = [];
    // 判断同级行政区划是否已经存在
    let provinceStr = /^\d{2}0000$/;
    let cityStr = /^\d{4}00$/;
    let districtStr = /^\d{6}$/;
    let streetStr = /^\d{9}000$/;
    let villageStr = /^\d{12}$/; 
    if(arr.length > 1){
      if(provinceStr.test(arr[arr.length-1].areaCode) && provinceStr.test(data.areaCode)){ // 省
        arr.pop();
      } else if(cityStr.test(arr[arr.length-1].areaCode) && cityStr.test(data.areaCode)){ // 市
        arr.pop();
      } else if(arr[arr.length-1].areaCode.substr(4) != '00' && data.areaCode.substr(4) != '00' && districtStr.test(arr[arr.length-1].areaCode) && districtStr.test(data.areaCode)){ // 区
        arr.pop();
      } else if(streetStr.test(arr[arr.length-1].areaCode) && streetStr.test(data.areaCode)){ // 街道
        arr.pop();
      } else if(arr[arr.length-1].areaCode.substr(9) != '000' && data.areaCode.substr(9) != '000' && villageStr.test(arr[arr.length-1].areaCode) && villageStr.test(data.areaCode)){ // 社区
        arr.pop();
      }
    }
    arr.push({ title: data.cityName, areaCode: data.areaCode, parentAreaCode: data.parentAreaCode || data.areaCode});

    citys = await loadChildrenArea(data.areaCode);
    if ((citys && citys.length > 0) && arr.length < showColsNum) {
      arr[arr.length - 1].title != '请选择' && arr.push({ title: '请选择', areaCode: data.areaCode, parentAreaCode: data.parentAreaCode || data.areaCode })
    } else {
      citys = [];
      setTimeout(() => {
        this.handleOk();
      }, 500)
    }
    arr.map(k => {
      if (k.title != '请选择') {
        newLocalValue.push(k.areaCode)
      }
    })
    this.setState({
      tabs: arr,
      regionData: citys,
      activeIndex: arr.length - 1,
      localValue: newLocalValue
    }, function(){
      // 设置横向滚动区域
      document.getElementById('selectTit').scrollLeft = document.getElementById('active').offsetLeft;
    })
  }

  clickSingleRegion = async (data, index) => {
    document.getElementById('regionList').scrollTop = 0;
    const { tabs } = this.state;
    const arr = tabs.splice(0, index + 1);
    const newLocalValue = [];
    const citys = index != 0 ? data.title == '请选择' ? await loadChildrenArea(data.areaCode) : await loadChildrenArea(data.parentAreaCode) : await loadProvinces();
    arr.map(k => {
      if (k.title != '请选择') {
        newLocalValue.push(k.areaCode)
      }
    })
    this.setState({
      tabs: arr,
      regionData: citys,
      activeIndex: index,
      localValue: newLocalValue
    })
  }

  render() {
    const { placeholder, showColsNum = 3 } = this.props;
    const { pickerVisible, tabs, regionData, activeIndex } = this.state;
    const valueText = this.getValueText();
    return (
      <div>
        <div className={style.regionBox} style={{ display: pickerVisible ? 'block' : 'none' }}>
          <div className={style.regionContent}>
            <div className={style.regionHeader}>
              <span onClick={this.handleDismiss}>取消</span>
              <span onClick={this.handleOk}>确定</span>
            </div>
            <div className={style.selectVal}>
              <ul id="selectTit" className={style.selectTit}>
                {
                  tabs && tabs.length > 0 && tabs.map((item, index) => {
                    return <li key={item.areaCode+index} onClick={() => this.clickSingleRegion(item, index)}><span className={index == activeIndex ? style.active : ''} id={index == activeIndex?'active':''}>{item.title}</span></li>
                  })
                }
              </ul>
              <div id="regionList" className={style.regionList}>
                {
                  regionData && regionData.length > 0 && regionData.map(k => {
                    return <p className={style.regionItem} key={k.areaCode} onClick={() => this.clickCity(k)}>{k.cityName}</p>
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {/* {
          showColsNum > 3 ?
          <TextArea readonly value={valueText} placeholder={placeholder} onClick={this.handleInputClick} />:
          <div className={style.regionText}>
            <Input readonly value={valueText} placeholder={placeholder} onClick={this.handleInputClick} />
          </div>
        } */}
        <div onClick={this.handleInputClick} style={{minHeight: 30,height:'auto'}}>{valueText}</div>
      </div>
    );
  }
}
