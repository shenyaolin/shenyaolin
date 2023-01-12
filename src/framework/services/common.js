import ajax from 'framework/utils/ajax';
import api from 'framework/config/api';
import storage from 'framework/utils/storage';
import _ from 'lodash';

export const getUnitConfig = async () => {
  const unitConfig = storage.get('unitConfig') || '';
  if(unitConfig){
    return unitConfig;
  } else{
    const { err, res } = await ajax.get('/hydra-intelligent-planting/valid/api/v1/mobile/dictionary/weight/unit');
    let unit = '';
    if(res && res.state == 200 && res.results.length > 0){
      res.results.map(k=>{
        if(k.enable == 1){
          unit = k.name;
        }
      })
    }
    storage.set('unitConfig', unit);
    return unit;
  }
}