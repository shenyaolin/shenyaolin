import React, {Provider, useState} from 'react';
import { BasicRoute } from './router';
import appContext from 'context';

import './assets/css/base.css';
import 'framework/assets/css/global.less';
import styles from './index.less';
//
function App(){
  
  const [headerObj, setHeaderObj] = useState({
    title: '郝享未来',
    showBack: true,
    showIcon: false,
    icon: '',
    backUrl: '',
    showHeader: false,
    iconClick: () => {},
  })

  return (
    <appContext.Provider value={{headerObj, setHeaderObj}}>
      <div className={styles.appWrap}>
        <div className={styles.containerWrap}>
          <BasicRoute/>
        </div>
      </div>
    </appContext.Provider>
  );

}
export default App;
