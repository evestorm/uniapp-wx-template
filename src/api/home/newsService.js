import request from "@/utils/request";

// http api
const urlLists = {
  getNews: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 获取新闻
};

const getNews = params => {
  return request.post(urlLists.getNews, params, false);
};

export default {
  getNews,
};
