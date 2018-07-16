import axios from 'axios'

const YOUTUBE_API_KEY = 'AIzaSyA-70GHModCHjYNTcLa5i2-Gtql_8AjI6Y';
let tokenUrl = "";

export const getYoutubeData=function(url,callback){
  axios({
    method:"get",
    url:`https://www.googleapis.com/youtube/v3/search?maxResults=1&part=snippet&q=${url}&type=video&key=${YOUTUBE_API_KEY}${tokenUrl}`,
  }).then(data=>{
    callback(null,data);
  }).catch(error=>{
    throw(error);
  });

};