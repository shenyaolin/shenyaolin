import request from 'utils/request';
import api from 'config/api';

// 获取最新新闻
export const getNews = async (data) =>
    request({
        url: api.news.GET_NEWS,
        data,
        method: 'get'
    })

// 获取新闻详情
export const getNewsDetail = async (data) =>
    request({
        url: api.news.GET_NEWS_DETAIL,
        data,
        method: 'get'
    })
