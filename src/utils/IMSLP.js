import axios from 'axios'

//use google API

export const getIMSLPData=function(searchText,startIndex,callback){
  axios({
    method:"get",
    url:"https://www.googleapis.com/customsearch/v1",
    params:{
      key:"AIzaSyC_YkGpYGbU84huJRb86Pnlb5t6JA7_dBs",
      q:searchText,
      cx:"000793084630826721470:j016fsoqtti",
      siteSearch:"imslp.org",
      start:startIndex
    }
  }).then(data=>{
    callback(null,data);
  }).catch(error=>{
    throw(error);
  });

};