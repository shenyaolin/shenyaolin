import React, { memo } from 'react'
import styles from './index.less'
import storage from '../../framework/utils/storage';
import VillagerEnd from './components/VillagerEnd'
import VillageCommittee from './components/VillageCommittee';


document.title = "随手拍"
export default memo(() => {

    const userType = storage.get('userType')


    return (
        <div className={styles.clapCasuallyContainer}>
            {userType === 2 && <VillagerEnd />}
            {userType === 1 && <VillageCommittee />}
        </div>
    )

})