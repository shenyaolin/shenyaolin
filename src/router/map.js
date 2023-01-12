import asyncComponent from "../utils/asyncComponent";

export default [
  {
    path: "/",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/layout")
    ),
    exact: true,
  },
  // 首页
  {
    path: "/home",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/layout")
    ),
  },
  // 我的
  {
    path: "/mine",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/layout")
    ),
    exact: true,
  },
  // 服务大厅
  {
    path: "/serviceHall",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/layout")
    ),
    exact: true,
  },
  // 身份认证
  {
    path: "/authentication",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/authentication")
    ),
    exact: true,
  },
  // 随手拍
  {
    path: "/clapCasually",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/clapCasually/index"
      )
    ),
    exact: true,
  },
  // 随手拍-发布
  {
    path: "/clapCasually/release",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/clapCasually/components/Release"
      )
    ),
    exact: true,
  },
  // 随手拍-详情
  {
    path: "/clapCasually/details",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/clapCasually/components/Details"
      )
    ),
    exact: true,
  },
  // 随手拍-受理
  {
    path: "/clapCasually/acceptance",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/clapCasually/components/Acceptance"
      )
    ),
    exact: true,
  },
  // 随手拍-评价
  {
    path: "/clapCasually/evaluate",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/clapCasually/components/Evaluate"
      )
    ),
    exact: true,
  },
  //书记信箱
  {
    path: "/secretaryMailbox",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/secretaryMailbox/index"
      )
    ),
    exact: true,
  },
  //书记信箱-写信
  {
    path: "/secretaryMailbox/add",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/secretaryMailbox/components/add"
      )
    ),
    exact: true,
  },
  //书记信箱-详情
  {
    path: "/secretaryMailbox/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/secretaryMailbox/components/detail"
      )
    ),
    exact: true,
  },
  //书记信箱-评价
  {
    path: "/secretaryMailbox/evaluate",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/secretaryMailbox/components/evaluate"
      )
    ),
    exact: true,
  },
  //就业导师
  {
    path: "/employmentTutor",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/employmentTutor")
    ),
    exact: true,
  },
  //就业导师-详情
  {
    path: "/employmentTutor/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/employmentTutor/components/detail"
      )
    ),
    exact: true,
  },
  //创业空间
  {
    path: "/entrepreneurialSpace",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurialSpace/index"
      )
    ),
    exact: true,
  },
  //创业政策
  {
    path: "/entrepreneurshipPolicy",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurshipPolicy"
      )
    ),
    exact: true,
  },
  //创业空间-预约
  {
    path: "/entrepreneurialSpace/subscribe",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurialSpace/components/Subscribe"
      )
    ),
    exact: true,
  },
  //创业空间-我的预约
  {
    path: "/entrepreneurialSpace/mySubscribe",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurialSpace/components/MySubscribe.js"
      )
    ),
    exact: true,
  },
  //创业空间-预定时间
  {
    path: "/entrepreneurialSpace/reserve",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurialSpace/components/Reserve"
      )
    ),
    exact: true,
  },
  //创业空间-预定内容
  {
    path: "/entrepreneurialSpace/reserveContent",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurialSpace/components/ReserveContent"
      )
    ),
    exact: true,
  },
  //创业空间-我的预约详情
  {
    path: "/entrepreneurialSpace/mySubscribeDetail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurialSpace/components/MySubscribeDetail"
      )
    ),
    exact: true,
  },
  //创业政策-详情
  {
    path: "/entrepreneurshipPolicy/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/entrepreneurshipPolicy/components/detail"
      )
    ),
    exact: true,
  },
  //乡邻圈
  {
    path: "/neighborhood",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/neighborhood/index"
      )
    ),
    exact: true,
  },
  //乡邻圈-详情
  {
    path: "/neighborhood/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/neighborhood/components/Detail"
      )
    ),
    exact: true,
  },
  //乡邻圈-发布
  {
    path: "/neighborhood/release",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/neighborhood/components/Release"
      )
    ),
    exact: true,
  },
  //村贤事迹
  {
    path: "/famousVillager",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/famousVillager")
    ),
    exact: true,
  },
  //村贤事迹-详情
  {
    path: "/famousVillager/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/famousVillager/components/detail"
      )
    ),
    exact: true,
  },
  //村容风貌
  {
    path: "/villageLandscape",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/villageLandscape")
    ),
    exact: true,
  },
  //村容风貌-详情
  {
    path: "/villageLandscape/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/villageLandscape/components/detail"
      )
    ),
    exact: true,
  },
  //美丽庭院
  {
    path: "/beautifulYard",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/beautifulYard")
    ),
    exact: true,
  },
  //美丽庭院-详情
  {
    path: "/beautifulYard/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/beautifulYard/components/detail"
      )
    ),
    exact: true,
  },
  //我的巡检
  {
    path: "/myPatrol",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myPatrol")
    ),
    exact: true,
  },
  //我的巡检-任务
  {
    path: "/myPatrol/task",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myPatrol")
    ),
    exact: true,
  },
  //我的巡检-统计
  {
    path: "/myPatrol/statistics",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myPatrol")
    ),
    exact: true,
  },
  //我的巡检-统计(村委)
  {
    path: "/myPatrol/statisticscw",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myPatrol/components/Statistics")
    ),
    exact: true,
  },
  //我的巡检-统计明细
  {
    path: "/myPatrol/statistics/details",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPatrol/components/Details"
      )
    ),
    exact: true,
  },
  //我的巡检-签到
  {
    path: "/myPatrol/signIn",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPatrol/components/SignIn"
      )
    ),
    exact: true,
  },
  //我的巡检-详情
  {
    path: "/myPatrol/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPatrol/components/Detail"
      )
    ),
    exact: true,
  },
  //我的巡检-筛选
  {
    path: "/myPatrol/screen",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPatrol/components/Screen"
      )
    ),
    exact: true,
  },
  //我的巡检-纪要
  {
    path: "/myPatrol/summary",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPatrol/components/Summary"
      )
    ),
    exact: true,
  },
  //我的积分
  {
    path: "/myPoints",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myPoints/index")
    ),
    exact: true,
  },
  //我的积分-商品详情
  {
    path: "/myPoints/commodity",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPoints/components/Commodity"
      )
    ),
    exact: true,
  },
  //我的积分-兑换详情
  {
    path: "/myPoints/exchange",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPoints/components/Exchange"
      )
    ),
    exact: true,
  },
  //我的积分-积分规则
  {
    path: "/myPoints/rule",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPoints/components/Rule"
      )
    ),
    exact: true,
  },
  //我的积分-兑换记录
  {
    path: "/myPoints/record",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myPoints/components/Record"
      )
    ),
    exact: true,
  },

  //我的庭院
  {
    path: "/myGarden",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myGarden")
    ),
    exact: true,
  },
  // 我的消息
  {
    path: "/myMessage",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myMessage/index")
    ),
    exact: true,
  },
  //信息上报
  {
    path: "/informationReport",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/informationReport")
    ),
    exact: true,
  },
  //信息上报
  {
    path: "/informationReport/information",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/informationReport")
    ),
    exact: true,
  },
  //信息上报-意见箱
  {
    path: "/informationReport/opinionBox",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/informationReport")
    ),
    exact: true,
  },
  //信息上报-意见箱-村委
  {
    path: "/informationReport/cwOpinionBox",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/informationReport/components/OpinionBox"
      )
    ),
    exact: true,
  },
  //信息上报-留言上报
  {
    path: "/informationReport/messageReport",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/informationReport/components/MessageReporting"
      )
    ),
    exact: true,
  },
  //信息上报-详情
  {
    path: "/informationReport/detail",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/informationReport/components/Details"
      )
    ),
    exact: true,
  },
  //信息上报-评价
  {
    path: "/informationReport/evaluate",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/informationReport/components/Evaluate"
      )
    ),
    exact: true,
  },
  //我的消息--系统消息
  {
    path: "/myMessage/systemMess",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myMessage/components/systemMess"
      )
    ),
    exact: true,
  },
  //我的消息--随手拍
  {
    path: "/myMessage/takePicMess",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myMessage/components/takePicMess"
      )
    ),
    exact: true,
  },
  //我的消息--信息上报
  {
    path: "/myMessage/reportMess",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myMessage/components/reportMess"
      )
    ),
    exact: true,
  },
  //我的消息--创业空间
  {
    path: "/myMessage/buSpaceMess",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myMessage/components/buSpaceMess"
      )
    ),
    exact: true,
  },
  //我的消息--巡检任务
  {
    path: "/myMessage/inspecMess",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myMessage/components/inspecMess"
      )
    ),
    exact: true,
  },
  //我的消息--书记信箱
  {
    path: "/myMessage/secreMess",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myMessage/components/secreMess"
      )
    ),
    exact: true,
  },
  //我的问题
  {
    path: "/myProblem",
    component: asyncComponent(() =>
      import(
        /* webpackChunkName: "modules/app" */ "../views/myProblem/index.js"
      )
    ),
    exact: true,
  },
  //基本信息
  {
    path: "/myDetail",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/myDetail/index.js")
    ),
    exact: true,
  },

  // 数融农旅
  {
    path: "/agriculture",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/agriculture/index")
    ),
    exact: true,
  },
  // 数融农旅-详情
  {
    path: "/agriculture/detail",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/agriculture/Detail")
    ),
    exact: true,
  },
  // 新闻动态
  {
    path: "/news",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/news")
    ),
    exact: true,
  },
  // 新闻动态-详情
  {
    path: "/news/detail",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/news/detail")
    ),
    exact: true,
  },
  // 三务公开
  {
    path: "/threeServicePublicity",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/threeServicePublicity")
    ),
    exact: true,
  },
  // 三务公开-详情
  {
    path: "/threeServicePublicity/detail",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/threeServicePublicity/detail")
    ),
    exact: true,
  },
  // 智慧党建
  {
    path: "/smartPartyBuilding",
    component: asyncComponent(() =>
      import(/* webpackChunkName: "modules/app" */ "../views/smartPartyBuilding")
    ),
    exact: true,
  },
];
