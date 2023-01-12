import React, { memo, useState, useCallback, useRef } from "react";
import styles from '../index.less'
import { pushUrl } from "framework/utils/url";
import Button from "framework/components/Button";
import Form from "../../../components/Form";
import TextArea from '../../../components/Form/entry/TextArea';
import ImageUpload from "../../../components/Form/entry/ImageUpload";
import Modal from "framework/components/Modal";
import VideoUpload from "framework/components/VideoUpload";
import { Switch } from 'antd-mobile';
import address from 'assets/images/newImg/address1.png';
import { addNeighborhood } from 'services/neighborhood.js';
import message from 'framework/utils/message';
import classnames from 'classnames';
import { showLoading, hideLoading } from 'framework/utils/loading';

const { FormItem } = Form;

document.title = '乡邻圈'
export default memo(() => {
    const [form, setform] = useState({
        image: [],
        location: "",
        type: 1
    })
    const [visible, setVisible] = useState(false)
    const [uploadType, setUploadType] = useState("")
    const [uploadShow, setUploadShow] = useState(true)
    const [show, setShow] = useState(false)
    const [disabled, setdisabled] = useState(false)
    const [jingwiedu, setjingwiedu] = useState([])

    const handleChange = useCallback((fieldName) => (e) => {
        const value = e && e.target ? e.target.value : e;
        if (fieldName === "image" && value.length <= 0) {
            setUploadShow(true)
        }
        setform((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    }, [uploadType])

    const handleRelease = useCallback(async () => {
        setdisabled(true)
        if (form.image.length === 0 && !form.content) {
            setdisabled(false)
            message.toast('请输入你想说的或者上传图片')
            return
        } else {
            setdisabled(true)
            const newForm = JSON.parse(JSON.stringify(form))
            newForm.image = newForm.image.join(",")
            if (uploadType === 'image') {
                newForm.type = 1
            } else if (uploadType === 'video') {
                newForm.type = 2
            }
            const { state } = await addNeighborhood(newForm)
            if (state === 200) {
                message.toast('发布成功')
                pushUrl({ pathname: "/neighborhood" })
            }
        }
        setdisabled(false)
    }, [form, uploadType])
    // modal 弹窗 区分上传视频和图片
    const handleUploadType = useCallback((str) => {
        setUploadShow(false)
        setVisible(false)
        setUploadType(str)
    }, [])

    const imageUploadRef = useCallback(node => {
        node && node.triggerFileChoose()
    }, [uploadShow]);
    const handleUploadShow = useCallback(() => {
        if (uploadType === 'image') {
            return <ImageUpload
                ref={imageUploadRef}
                maxLength={9}
                value={form && form.image || ""}
                onChange={handleChange("image")}
            />
        } else if (uploadType === 'video') {
            return <VideoUpload
                className={classnames(form.image.length > 0 && styles.videoUpload)}
                ref={imageUploadRef}
                maxLength={1}
                value={form.image}
                onChange={handleChange("image")}
            />
        }
    }, [uploadType, form])

    const handleSwitchChange = useCallback(() => {
        if (show) {
            setShow(false)
            setform((prev) => ({ ...prev, location: "" }))
        } else {
            showLoading({ duration: 999, content: "获取定位" });
            var map = new window.AMap.plugin('AMap.PlaceSearch', () => {
                var geolocation = new window.AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                });
                geolocation.getCurrentPosition(function (status, result) {
                    console.log(result, status, 1);
                    if (status == 'complete') {
                        setform((prev) => ({ ...prev, location: result.formattedAddress }))
                        setShow(true)
                    } else {
                        message.toast('当前定位失败')
                        console.log(result, status, 2);
                    }
                    hideLoading()
                });
            })

        }
    }, [show])

    // const address = useCallback((result1) => {
    //     new window.AMap.plugin('AMap.Geocoder', () => {
    //         var geolocation = new window.AMap.Geocoder({
    //             radius: 1000,
    //             extensions: "all"
    //         });
    //         console.log('result1', result1)
    //         geolocation.getAddress(result1, function (status, result) {
    //             console.log(result);
    //             if (status === 'complete' && result.info === 'OK') {
    //             } else {
    //                 // ElMessage.error('无地址，请重新选择');
    //             }

    //         });
    //     })
    // }, [])

    return <div className={styles.neightborhoodReleaseContainer}>
        <Form model={form} >
            <FormItem className={styles.formItem}>
                <TextArea maxLength={800} placeholder={"请输入你想说的"} value={(form && form.content) || ""} onChange={handleChange("content")} />
            </FormItem>
            <FormItem>
                {uploadShow ? <div className={styles.upload} onClick={() => setVisible(true)}>
                    <i className={styles.uploadWidth}></i>
                    <i className={styles.uploadHeight}></i>
                </div> : handleUploadShow()}
            </FormItem>
            <FormItem className={styles.formItem1}>
                <img src={address} />
                <div className={styles.location}>{show ? form.location : '显示位置'}</div>
                <Switch
                    checked={show}
                    color="#26A2FF"
                    onChange={handleSwitchChange}
                />
            </FormItem>
        </Form>
        <Button disabled={disabled} onClick={handleRelease}>发布</Button>
        <Modal visible={visible} popup animationType="slide-up" footer={null} className={styles.myModal} >
            <div onClick={() => handleUploadType('image')}>照片</div>
            <div onClick={() => handleUploadType('video')}>视频</div>
            <div onClick={() => setVisible(false)}>取消</div>
        </Modal>
    </div >
}) 