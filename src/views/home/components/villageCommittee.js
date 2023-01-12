import React, { memo, useCallback, useEffect, useState } from 'react'
import Nav from './Nav'

import styles from './index.less'


export default memo(() => {

    useEffect(() => {

    })
    return (
        <>
            {/* <div className={styles.todo}>
                <div className={styles.information}>你有5个待办还未处理！</div>
                <div className={styles.badge}>99+</div>
            </div> */}
            <Nav />
        </>
    )
})