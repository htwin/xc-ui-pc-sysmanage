//public是对axios的工具类封装，定义了http请求方法
import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
export const page_list = (page,size,params)=>{
  let query = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+"?"+query);
}
export  const page_add = (params)=>{
  return http.requestPost(apiUrl+'/cms/page/add',params);
}
export const page_get = id=>{
  return http.requestQuickGet(apiUrl+"/cms/page/get/"+id);
}
