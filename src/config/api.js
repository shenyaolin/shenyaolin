const api = {
  user: {
    GET_USER_MSG: "/xinyang-future-village/api/v1/app/user/getUserInfoByOpenId",
    ADD_USER_MSG: "/xinyang-future-village/api/v1/app/user/add",
    UPDATE: '/xinyang-future-village/api/v1/app/user/updateReadStates',
    REGION: '/hydra-base-data/api/v1/address/all-regions',
  },
  // 随手拍
  list: {
    GET_LIST: "/xinyang-future-village/api/v1/app/snapshot/list",
    ADD_LIST: "/xinyang-future-village/api/v1/app/snapshot/add",
    GET_LIST_DETAILS: "/xinyang-future-village/api/v1/app/snapshot/get",
    SET_ACCEPTANCE: "/xinyang-future-village/api/v1/app/snapshot/accept",
    SET_FINISH: "/xinyang-future-village/api/v1/app/snapshot/acceptSubmission",
    EVALUATE: "/xinyang-future-village/api/v1/app/snapshot/evaluate",
  },
  // 书记信箱
  mailbox: {
    GET_LIST: "/xinyang-future-village/api/v1/app/secretary-mailbox/list",
    ADD_LIST: "/xinyang-future-village/api/v1/app/secretary-mailbox/add",
    GET_LIST_DETAILS:
      "/xinyang-future-village/api/v1/app/secretary-mailbox/get",
    EVALUATE: "/xinyang-future-village/api/v1/app/secretary-mailbox/evaluate",
  },
  entrepreneurialSpace: {
    GET_LIST:
      "/xinyang-future-village/api/v1/app/appointment-record/getSpaceInfo",
    GET_RECORD_Deatail:
      "/xinyang-future-village/api/v1/app/appointment-record/get",
    ADD_RECORD: "/xinyang-future-village/api/v1/app/appointment-record/add",
    GET_RECORD: "/xinyang-future-village/api/v1/app/appointment-record/list",
  },
  common: {
    // 功能定制接口-列表
    TRACE_DYNAMIC_FUN: "/trace/dynamic/fun/list/noToken",
    // 功能定制接口-详情
    TRACE_DYNAMIC_FUN_DETAIL: "/trace/dynamic/fun/getById/noToken",
    // 获取一户一码户id
    GET_HOUDEHOLD_ID: "/digital-village/hydra-digital-village/api/v1/family-code-bind/getH5"
  },
  // 创业政策
  entrepreneurshipPolicy: {
    GET_LIST: "/xinyang-future-village/api/v1/app/policy/list",
    GET_LIST_DETAILS: "/xinyang-future-village/api/v1/app/policy/get",
  },
  // 乡邻圈
  neighborhood: {
    GET_LIST: "/xinyang-future-village/api/v1/app/neighborhood/list",
    ADD_SUBSCRIPTION:
      "/xinyang-future-village/api/v1/app/neighborhood/addSubscription",
    ADD_NEIGHBORHOOD: "/xinyang-future-village/api/v1/app/neighborhood/add",
    ADD_APPROVE: "/xinyang-future-village/api/v1/app/neighborhood/approve",
    GET_LIST_DETAILS: "/xinyang-future-village/api/v1/app/neighborhood/get",
    ADD_COMMENT: "/xinyang-future-village/api/v1/app/neighborhood/comment",
  },
  //村贤事迹
  famousVillager: {
    GET_LIST: "/xinyang-future-village/api/v1/app/talent/list",
    GET_LIST_DETAILS: "/xinyang-future-village/api/v1/app/talent/get",
  },
  //美丽庭院
  beautifulYard: {
    GET_LIST: "/xinyang-future-village/api/v1/app/beautiful-garden/list",
    GET_LIST_DETAILS: "/xinyang-future-village/api/v1/app/beautiful-garden/get",
  },
  // 巡检管理
  myPatrol: {
    GET_LIST: "/xinyang-future-village/api/v1/app/inspection/list",
    GO_SIGNIN: "/xinyang-future-village/api/v1/app/inspection/signIn",
    GET_ONE_LIST: "/xinyang-future-village/api/v1/app/inspection/get",
    INSPECTION: "/xinyang-future-village/api/v1/app/inspection/inspection",
    GET_INSPECTIONOVERVIEW:
      "/xinyang-future-village/api/v1/app/inspection/getInspectionOverview",
    GET_ALLOVERVIEW:
      "/xinyang-future-village/api/v1/app/inspection/getAllOverview",
    GET_ALLINSPECTION:
      "/xinyang-future-village/api/v1/app/inspection/getAllInspection",
    GET_MYINSPECTION:
      "/xinyang-future-village/api/v1/app/inspection/getMyInspection",
    GET_INSPECTIONDETAILLIST:
      "/xinyang-future-village/api/v1/app/inspection/getInspectionDetailList",
  },
  // 我的积分
  myPoints: {
    ADD_SIGN: "/xinyang-future-village/api/v1/app/sign-in/add",
    GET_SIGN: "/xinyang-future-village/api/v1/app/sign-in/get",
    GET_MONTH_SIGN: "/xinyang-future-village/api/v1/app/sign-in/getMonth",
    GET_SCORE_RANK: "/xinyang-future-village/api/v1/app/user-credits/getList",
    GET_PRODUCT_LIST:
      "/xinyang-future-village/api/v1/app/integral-merchandise/list",
    GET_PRODUCT_DETAILS:
      "/xinyang-future-village/api/v1/app/integral-merchandise/get",
    ADD_EXCHANGE: "/xinyang-future-village/api/v1/app/exchange/add",
    GET_EXCHANGE: "/xinyang-future-village/api/v1/app/exchange/get",
    ADD_POINTS: "/xinyang-future-village/api/v1/app/user-point-record/add",
    GET_POINTS_LIST:
      "/xinyang-future-village/api/v1/app/user-point-record/list",
    REDEEM_EXCHANGE: "/xinyang-future-village/api/v1/app/exchange/redeem",
    GET_EXCHANGE_LIST: "/xinyang-future-village/api/v1/app/exchange/list",
    GET_CHECK_EXCHANGE: "/xinyang-future-village/api/v1/app/exchange/check",
    GET_TOTAL_SCORE:
      "/xinyang-future-village/api/v1/app/user-credits/getTotalScore",
  },
  //我的信息
  myMessage: {
    // 消息列表
    list: {
      LIST: "/xinyang-future-village/api/v1/app/user/getCMMessage",
      VILL_LIST: "/xinyang-future-village/api/v1/app/user/getCWMessage",
    },
    // 随手拍
    takePicMess: {
      LIST: "/xinyang-future-village/api/v1/app/snapshot/getCMList", //村民
      VILL_LIST: "/xinyang-future-village/api/v1/app/snapshot/getCWList", //村委
      UPDATE: '/xinyang-future-village/api/v1/app/snapshot/batchUpdate'
    },
    // 信息上报 村民
    reportMess: {
      LIST: "/xinyang-future-village/api/v1/app/message-report/getAppList", //村民
      UPDATE: '/xinyang-future-village/api/v1/app/message-report/batchUpdate'
    },
    // 巡检任务 村委
    inspecMess: {
      LIST: "/xinyang-future-village/api/v1/app/inspection/getCWList",
    },
    // 创业空间
    buSpaceMess: {
      LIST: "/xinyang-future-village/api/v1/app/appointment-record/list",
      VILL_LIST: "/xinyang-future-village/api/v1/app/appointment-record/getAppList",
      UPDATE: '/xinyang-future-village/api/v1/app/appointment-record/batchUpdate'
    },
    // 书记信箱
    secreMess: {
      LIST: "/xinyang-future-village/api/v1/app/secretary-mailbox/list",
      VILL_LIST:
        "/xinyang-future-village/api/v1/app/secretary-mailbox/getAppList",
      UPDATE: '/xinyang-future-village/api/v1/app/secretary-mailbox/batchUpdate'
    },
  },
  //信息上报
  informationReport: {
    ADD_MESSAGE_REPORT: '/xinyang-future-village/api/v1/app/message-report/add',
    GET_CM_LIST: '/xinyang-future-village/api/v1/app/message-report/listCM',
    GET_CW_LIST: '/xinyang-future-village/api/v1/app/message-report/listCW',
    GET_LIST_DETAILS: '/xinyang-future-village/api/v1/app/message-report/get',
    ADD_EVALUATION: '/xinyang-future-village/api/v1/app/message-report/evaluation',
  },
  //我的庭院
  myGarden: {
    GET_MY_GARDEN: '/xinyang-future-village/api/v1/app/beautiful-garden/getMyGarden'
  },
  // 我的问题
  myProblem: {
  },
  // 我的信息
  myDetail: {
    EDIT: '/xinyang-future-village/api/v1/app/user/update'

  },
  //云上集市
  villagersMart: {
    //我家宝贝
    GET_VILLAGE_TREASURE_LIST:
      "/digital-village/hydra-digital-village/api/v1/farm-baby/getH5List",
    //民宿酒店
    GET_HOTEL_LIST:
      "/digital-village/hydra-digital-village/api/v1/hotel/getHotelList",
    // 景点
    GET_LIST:
      "/digital-village/hydra-digital-village/api/v1/attractions/getH5AttractionsList",
  },
  //新闻动态
  news: {
    GET_NEWS: "/xinyang-future-village/api/v1/app/news/getNews",
    GET_LIST: "/xinyang-future-village/api/v1/app/news/getList",
    GET_NEWS_DETAIL: "/xinyang-future-village/api/v1/app/news/getNewsById",
  },
  //地图点位
  mapPoint: {
    GET_LIST: "/xinyang-future-village/api/v1/app/map/getList",
    GET_MAP_DETAIL: "/xinyang-future-village/api/v1/app/map/getOne",
  }
};

export default api;