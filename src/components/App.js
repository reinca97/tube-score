import React, { Component } from 'react'
import Profile from './User/Profile'
import Search from './Search/Search'
import Result from './Result/Result'
import Favorite from './Favorite/Favorite'
import {getYoutubeData} from '../utils/youtube'
import {getIMSLPData} from '../utils/IMSLP'

import firebase from '../services/firebase'
// const uuidv4 = require('uuid/v4');
/* global chrome */



class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLogin: false,
      token: "",
      userData: {
        uid:"",
        userName: "",
        userPhotoUrl: "",
        userEmail: ""
      },

      favorite: [
        // {date:"0000-00-00",link:"",title:""}
      ],
      filteredFavorite:[],
      favoriteCopy:[],

      pageUrlTap: "",
      pageUrlOut: "",

      isYoutubeUrlTap: false,
      videoTitleTap: "",
      searchTextTap: "", //(현재 사이트 주소)검색할 텍스트 찾아서 설정하기

      isYoutubeUrlOut:false,
      searchInputUrl: "",
      videoTitleOut: "",
      searchTextOut: "", //(input 창 주소)검색할 텍스트 찾아서 설정하기

      currentSearchIndex:1,
      searchText:"",
      dataItems:[],
      checkedTempItems:[],

      currentComponent:true
    };
  }

  componentDidMount() {
    //로그인 확인
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.

        var userSetting = {
          userName: user.displayName,
          userPhotoUrl: user.photoURL,
          userEmail: user.email,
          uid: user.uid
        };

        this.setState({
          isLogin: true,
          userData: userSetting
        });

        ///////////////////////////////////
        //자동로그인시 유저 데이터베이스 읽어오기 추가//
        ///////////////////////////////////
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            console.log(user);

            var userSetting = {
              userName: user.displayName,
              userPhotoUrl: user.photoURL,
              userEmail: user.email,
              uid: user.uid
            };

            this.setState({
              isLogin: true,
              userData: userSetting
            });


            //uid로 데이터 읽어오기
            firebase.database().ref(`/users/${user.uid}`).once('value')
              .then((snapshot) => {
                var userInfo = (snapshot.val());
                //아이디가 있는경우
                if (userInfo) {
                  console.log("uid exist");

                  //user database에서 즐겨찾기 정보만 가져옴
                  let tempFavorite = userInfo.favorite;
                  this.setState({
                    favorite: tempFavorite,
                    filteredFavorite: tempFavorite,
                    favoriteCopy: tempFavorite
                  })

                } else {
                  //uid 없는경우(최초 접속) : set
                  console.log("no uid found");
                  firebase.database().ref(`users/${user.uid}`).set({
                    email: user.email
                  });
                }
              });


          } else {
            // No user is signed in.
            var userSetting = {
              userName: "",
              userPhotoUrl: "",
              userEmail: ""
            };
            this.setState({
              isLogin: false,
              userData: userSetting,
              favorite:[],
              favoriteCopy:[],
              filteredFavorite:[]
            });
            console.log("no user")
          }
        });
        ///////////////끝///////////////////

      } else { // No user is signed in.

        var userSetting = {
          userName: "",
          userPhotoUrl: "",
          userEmail: "",
          uid: ""
        };

        this.setState({
          isLogin: false,
          userData: userSetting
        });

      }
    });

    //영상 타이틀 가져오기
    this.getTapURL();

  };

  onClickLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      var token = result.credential.accessToken;

      // The signed-in user info.
      var user = result.user;

      var userSetting = {
        userName: user.displayName,
        userPhotoUrl: user.photoURL,
        userEmail: user.email,
        uid: user.uid
      };
      //reset user data
      this.setState({
        token: token,
        isLogin: true,
        userData: userSetting
      });

    })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log(`error:${errorCode} at ${email}. ${errorMessage}. ${credential}`)
      });

    var startAuth = (interactive) => {
      // Request an OAuth token from the Chrome Identity API.
      chrome.identity.getAuthToken({interactive: !!interactive}, function (token) {
        if (chrome.runtime.lastError && !interactive) {
          console.log('It was not possible to get a token programmatically.');
        } else if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else if (token) {
          // Authorize Firebase with the OAuth Access Token.
          var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
          firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function (error) {
            // The OAuth token might have been invalidated. Lets' remove it from cache.
            if (error.code === 'auth/invalid-credential') {
              chrome.identity.removeCachedAuthToken({token: token}, function () {
                startAuth(interactive);
              });
            }
          });
        } else {
          console.error('The OAuth Token was null');
        }
      });
    };
    startAuth(true);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(user);

        var userSetting = {
          userName: user.displayName,
          userPhotoUrl: user.photoURL,
          userEmail: user.email,
          uid: user.uid
        };

        this.setState({
          isLogin: true,
          userData: userSetting
        });


        //uid로 데이터 읽어오기
        firebase.database().ref(`/users/${user.uid}`).once('value')
          .then((snapshot) => {
            var userInfo = (snapshot.val());
            //아이디가 있는경우
            if (userInfo) {
              console.log("uid exist");

              //user database에서 즐겨찾기 정보만 가져옴
              let tempFavorite = userInfo.favorite;
              console.log("read from fb",tempFavorite);

              this.setState({
                favorite: tempFavorite,
                filteredFavorite: tempFavorite,
                favoriteCopy: tempFavorite
              })

            } else {
              //uid 없는경우(최초 접속) : set
              console.log("no uid found");
              firebase.database().ref(`users/${user.uid}`).set({
                email: user.email
              });
            }



          });


      } else {
        // No user is signed in.
        var userSetting = {
          userName: "",
          userPhotoUrl: "",
          userEmail: ""
        };
        this.setState({
          isLogin: false,
          userData: userSetting
        });
        console.log("no user")
      }
    });
  };

  onClickLogout = () => {
    if (this.state.isLogin) {
      this.setState({
        isLogin: false,
        searchText:"",
        dataItems:[],
        favorite:[],
        filteredFavorite:[],
        favoriteCopy:[]
      })
    }

    chrome.identity.getAuthToken({interactive: true}, (token) => {
      chrome.identity.removeCachedAuthToken({token: this.state.token});
    });

    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
      throw(error);
    });

  };

  //현재창 주소로 영상 타이틀 가져오기
  getTapURL = () => {
    chrome.tabs.getSelected(null, tab => {
      var tablink = tab.url;
      //1.현재 주소가 youtube 아닌경우
      if (tablink.indexOf("https://www.youtube.com") !== -1) {
        // 1) youtube 메인페이지일 경우(검색 불가)
        if (tablink === "https://www.youtube.com"||tablink ==="https://www.youtube.com/") {
          this.setState({
            isYoutubeUrlTap: true,
            videoTitleTap: "메인 페이지 입니다. 유튜브 동영상을 선택해주세요."
          });

        }else{
          // 2)youtube 페이지인 경우: API 요청
          getYoutubeData(tablink, (error, data) => {
            if (error) {
              window.alert("유효한 주소가 아닙니다. 주소를 다시 확인해주세요.")

            } else {
              console.log(data);
              var tempTitle = "";
              if (data.data.items[0]) {
                tempTitle = data.data.items[0].snippet.title;
                this.setState({
                  isYoutubeUrlTap: true,
                  videoTitleTap: tempTitle,
                  pageUrlTap: tablink,
                  searchTextTap:""  //수정하기
                })

              } else {
                //youtube 주소이지만 해당 주소의 동영상이 없는 경우
                tempTitle = "유효한 주소가 아닙니다. 주소를 다시 확인해주세요.";
                this.setState({
                  isYoutubeUrlTap: false,
                  videoTitleTap: tempTitle,
                })
              }

            }
          })
        }
      }else {
        // 2. 현재 주소가 youtube 아닌 경우
        this.setState({
          isYoutubeUrlTap: false,
          videoTitleTap: "이 기능은 유튜브 사이트 내에서 이용 가능합니다."
        });
      }

    });
  };

  //input 의 url 로 타이틀 가져오기
  getInputURL = (text) => {
    var tablink = text;

    //1.현재 주소가 youtube인경우
    if (tablink.indexOf("https://www.youtube.com") !== -1) {
      // 1) youtube 메인페이지일 경우(검색 불가)
      if (tablink ==="https://www.youtube.com"||tablink ==="https://www.youtube.com/" ) {
        this.setState({
          isYoutubeUrlOut: true,
          videoTitleOut :"메인 페이지 입니다. 유튜브 동영상을 선택해주세요."
        });

      }else{
        // 2)youtube 페이지인 경우: API 요청
        getYoutubeData(tablink, (error, data) => {
          if (error) {
            window.alert("유효한 주소가 아닙니다. 주소를 다시 확인해주세요.")

          } else {
            var tempTitle = "";
            if (data.data.items[0]) {
              tempTitle = data.data.items[0].snippet.title;
              this.setState({
                isYoutubeUrlOut: true,
                videoTitleOut: tempTitle,
                pageUrlOut: tablink,
                searchTextOut:""  //수정하기
              })

            } else {
              //youtube 주소이지만 해당 주소의 동영상이 없는 경우
              tempTitle = "유효한 주소가 아닙니다. 주소를 다시 확인해주세요.";
              this.setState({
                isYoutubeUrlOut: false,
                videoTitleOut: tempTitle,
              })
            }

          }
        });
      }
    }else {
      // 2. 현재 주소가 youtube 아닌 경우
      this.setState({
        isYoutubeUrlOut: false,
        videoTitleOut: "이 기능은 유튜브 사이트 내에서 이용 가능합니다."
      });
    }
  };

  //input으로 favorite 내부 검색
  getInputText = (text) =>{
    console.log("favoriteSearch",text);
    let tempFavorite=this.state.favorite.slice();
    let tempFilterdFavorite=[];

    for(var i=0;i<tempFavorite.length;i++){
      var titleItem=tempFavorite[i].title.toUpperCase();
      if(titleItem.indexOf(text.toUpperCase())!==-1){
        tempFilterdFavorite.push(tempFavorite[i]);
      }
    }

    this.setState({
      filteredFavorite:tempFilterdFavorite
    })

  };

  //현재창 주소로 IMSLP 악보 찾기 ㄱㄱ
  onSearchThisScore =()=>{
    var searchText= this.state.videoTitleTap;

    getIMSLPData(searchText,this.state.currentSearchIndex, (error,data)=>{

      //starLighting 에서 쓸 isFavorite 항목 만들어주기
      //검색 결과가 있는 경우
      if(data.data.items){
        var rawItem= data.data.items.slice();
        var tempItems=[];

        for(var i=0;i<rawItem.length;i++){

          var tempObj = {
            "title": rawItem[i].title,
            "link": rawItem[i].link,
            "date": new Date(),
            "isFavorite":rawItem[i].isFavorite&&false

          };

          tempItems.push(tempObj);
        }

        // tempItem[i] = {title: ,link: ,date: ,isFavorite:false }
        var currentFavorite=[];
        //이미 database 에 favorite 가진 경우에는 복사해오기
        if(this.state.favorite){
          currentFavorite = this.state.favorite.slice();

          for(var i=0;i<tempItems.length;i++){
            for(var k=0;k<currentFavorite.length;k++){
              //db favorite 과 일치하는 것 미리 true 로 바꿔주기
              if(tempItems[i].link===currentFavorite[k].link){
                tempItems[i].isFavorite=true;
              }
            }
          }

        }

        this.setState({
          searchText:searchText, //view more 용 공통 텍스트
          dataItems:tempItems
        })

      }else{

        //검색 결과가 없는 경우
        this.setState({
          searchText:searchText,
          dataItems:"no-result"
        })

      }

    });

  };

  // input 의 url 로 IMSLP 악보 찾기 ㄱ ㄱ **위에거 참고해서 수정수정***
  onSearchOtherScore=()=>{
    var searchText = this.state.videoTitleOut;

    getIMSLPData(searchText,this.state.currentSearchIndex, (error,data)=>{

      //starLighting 에서 쓸 isFavorite 항목 만들어주기
      //검색 결과가 있는 경우
      if(data.data.items){
        var rawItem= data.data.items.slice();
        var tempItems=[];

        for(var i=0;i<rawItem.length;i++){

          var tempObj = {
            "title": rawItem[i].title,
            "link": rawItem[i].link,
            "date": new Date(),
            "isFavorite":rawItem[i].isFavorite&&false

          };

          tempItems.push(tempObj);
        }

        // tempItem[i] = {title: ,link: ,date: ,isFavorite:false }
        var currentFavorite=[];
        //이미 database 에 favorite 가진 경우에는 복사해오기
        if(this.state.favorite){
          currentFavorite = this.state.favorite.slice();

          for(var i=0;i<tempItems.length;i++){
            for(var k=0;k<currentFavorite.length;k++){
              //db favorite 과 일치하는 것 미리 true 로 바꿔주기
              if(tempItems[i].link===currentFavorite[k].link){
                tempItems[i].isFavorite=true;
              }
            }
          }

        }

        this.setState({
          searchText:searchText, //view more 용 공통 텍스트
          dataItems:tempItems
        })

      }else{

        //검색 결과가 없는 경우
        this.setState({
          searchText:searchText,
          dataItems:"no-result"
        })

      }

    });


  };

  viewMore=()=>{
    var tempIndex=this.state.currentSearchIndex+10;

    this.setState({
      currentSearchIndex:tempIndex
    });

    getIMSLPData(this.state.searchText,tempIndex,(error,data)=>{
      var tempItem= this.state.dataItems.concat(data.data.items);

      this.setState({
        dataItems:tempItem
      })

    });

  };

  starLighting=(index)=>{

    //*****1) 현재 result 표시되는 data*****
    var tempItems=[];
    if(this.state.dataItems){
      tempItems = this.state.dataItems.slice();
    }
    //1에 클릭된 것 반영 (setState 전)
    tempItems[index].isFavorite = !tempItems[index].isFavorite;

    //****2)db 에서 가져온 data*****
    var dbfavoriteItems=[];


    //1.Light On
    if(tempItems[index].isFavorite){
      /////////////get db favorite////////////////////
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.database().ref(`/users/${user.uid}`).once('value')
            .then((snapshot) => {
              var userInfo = (snapshot.val());

              if(userInfo.favorite){
                dbfavoriteItems=userInfo.favorite;
              }

              //light on item 추가
              dbfavoriteItems.push(tempItems[index]);

              this.setState({
                dataItems:tempItems,
                favorite:dbfavoriteItems,
                favoriteCopy:dbfavoriteItems
              });

              // db 로 보내버림 ㅂㅂ
              firebase.database().ref(`users/${this.state.userData.uid}`).update({
                favorite:dbfavoriteItems
              });

            });
        }
      });
      ///////////////끝///////////////////

      //2. Light Off
    }else{

      /////////////get db favorite////////////////////
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.database().ref(`/users/${user.uid}`).once('value')
            .then((snapshot) => {
              var userInfo = (snapshot.val());
              //****2)db 에서 가져온 data*****
              dbfavoriteItems=userInfo.favorite;
              //light off item 삭제

              if(dbfavoriteItems){
                for(var i=0;i<dbfavoriteItems.length;i++){
                  if(tempItems[index].link===dbfavoriteItems[i].link){
                    dbfavoriteItems.splice(i,1);
                  }
                }
              }

              this.setState({
                dataItems:tempItems,
                favorite:dbfavoriteItems,
                favoriteCopy:dbfavoriteItems
              });

              // db 로 보내버림 ㅂㅂ
              firebase.database().ref(`users/${this.state.userData.uid}`).update({
                favorite:dbfavoriteItems
              });

            });
        }
      });
      ///////////////끝///////////////////
    }

  };

  favoriteStarLighting=(index)=>{
    var tempFavorite=[]; //all true / 갯수 변화함
    var tempFavoriteCopy=[]; //true,false 가짐 / 갯수변화 없음
    if(this.state.favorite){
      tempFavorite = this.state.favorite.slice();
      tempFavoriteCopy = this.state.favoriteCopy.slice();
    }

    //상태 변경
    tempFavoriteCopy[index].isFavorite =
      !tempFavoriteCopy[index].isFavorite;

    //검색용 키워드 정의(현재클릭한애)
    var selectedItemUrl=tempFavoriteCopy[index].link;

    //1.Favorite Light Off
    if(!tempFavoriteCopy[index].isFavorite){
      for(var i=0;i<tempFavorite.length;i++){
        if(tempFavorite[i].link===selectedItemUrl){
          tempFavorite.splice(i,1);
        }
      }

      //2.Favorite Light On
    }else{
      tempFavorite.push(tempFavoriteCopy[index]);
    }

    this.setState({
      favorite:tempFavorite,
      favoriteCopy:tempFavoriteCopy
    });

    // db 로 보내버림 ㅂㅂ
    firebase.database().ref(`users/${this.state.userData.uid}`).update({
      favorite:tempFavorite
    });

  };


  goToFavorite=()=>{

    if(this.state.isLogin){
      //uid로 데이터 읽어오기
      firebase.database().ref(`/users/${this.state.userData.uid}`).once('value')
        .then((snapshot) => {
          var userInfo = (snapshot.val());
          //아이디가 있는경우
          if (userInfo) {
            let tempFavorite = userInfo.favorite;

            this.setState({
              favorite: tempFavorite,
              filteredFavorite: tempFavorite,
              favoriteCopy: tempFavorite,
              currentComponent:false
            })

          }
        });
    }

  };

  returnToMain=()=>{
    if(this.state.isLogin){
      //uid로 데이터 읽어오기
      firebase.database().ref(`/users/${this.state.userData.uid}`).once('value')
        .then((snapshot) => {
          var userInfo = (snapshot.val());
          //아이디가 있는경우
          if (userInfo) {
            let tempFavorite = userInfo.favorite;

            this.setState({
              dataItems:[],
              favorite: tempFavorite,
              filteredFavorite: tempFavorite,
              favoriteCopy: tempFavorite,
              currentComponent:true
            })

          }
        });
    }
  };

  render() {

    return (
      <div className="App">

        <div id="main" className={this.state.currentComponent? ("current"):("")}>
          <h1>TubeScore</h1>

          <Profile
            userData={this.state.userData}
            isLogin={this.state.isLogin}
            onClickLogout={this.onClickLogout}
            onClickLogin={this.onClickLogin}
          />

          <Search
            getInputURL={this.getInputURL}
            onSearchThisScore={this.onSearchThisScore}
            onSearchOtherScore={this.onSearchOtherScore}
            isYoutubeUrlTap={this.state.isYoutubeUrlTap}
            isYoutubeUrlOut={this.state.isYoutubeUrlOut}
            videoTitleTap={this.state.videoTitleTap}
            videoTitleOut={this.state.videoTitleOut}
          />

          <Result
            starLighting={this.starLighting}
            viewMore={this.viewMore}
            dataItems={this.state.dataItems}
            popUpScore={this.popUpScore}
          />

          <h3 className="go-to-favorite" onClick={this.goToFavorite}>
            My Favorite
          </h3>

        </div>

        <div id="favorite" className={this.state.currentComponent? (""):("current")} >
          <Favorite
            returnToMain={this.returnToMain}
            getInputText={this.getInputText}
            starLighting={this.favoriteStarLighting}
            viewMore={this.viewMore}
            favoriteItems={this.state.filteredFavorite}
            popUpScore={this.popUpScore}
          />
        </div>

      </div>
    );
  }

};

export default App;
