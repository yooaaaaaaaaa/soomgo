import axios from "axios";

import MyAccount from "./MyAccount";

const isProduction = process.env.NODE_ENV === "production";
const DOMAIN = isProduction ? "/" : "https://fogos1982.iwinv.net/";

class APIs {
  static userLogin = `${DOMAIN}usr/login`; // 로그인

  static userJoin = `${DOMAIN}usr/join`; // 회원가입

  // 로그인 성공하면 받은 accessToken을 local 에 저장해 두었다가, 자동로그인용 토큰검증.
  static userAuth = `${DOMAIN}usr/auth`;

  // 네이버 영화검색.
  static filmSearch = `${DOMAIN}flm/search`;

  // 일기 하나 새로 쓰거나, 수정.
  static filmDiarySave = `${DOMAIN}flm/diarySave`;

  // 일기 하나 상세정보.
  static filmDiaryDetail(dId) {
    return `${DOMAIN}flm/diaryDetail/${dId}`;
  }

  // 모든 태그 정보 가져오기.
  static filmTags = `${DOMAIN}flm/tags`;

  // 일기 최신순으로 가져오기.
  static filmDiaryList(page, pageSize) {
    return `${DOMAIN}flm/diaryList/${page}/${pageSize}`;
  }

  // 일기 하나 삭제하기.
  static filmDiaryDelete = `${DOMAIN}flm/diaryDelete`;
}

class NetTool {
  mFormData = null;

  mUrl;

  mHandler = (data, error) => {};

  static request = (url) => {
    const ns = new NetTool();
    ns.mUrl = url;
    console.log(`== Networking 시작 : ${ns.mUrl}`);
    return ns;
  };

  progressStart = () => {
    // TODO: 통신이 시작되었다는걸 화면에 표시.
    console.log("통신이 시작되었다는걸 화면에 표시.");
  };

  progressStop = () => {
    // TODO: 프로그레스 끝났음을 알려주기.
    console.log("통신 프로그레스 끝.");
  };

  appendFormData = (name, value) => {
    if (!value) {
      return this;
    }
    if (this.mFormData == null) {
      this.mFormData = new FormData();
    }
    this.mFormData.append(name, value);

    console.log(`== ${name} == ${value}`);
    return this;
  };

  exec = (isProgressUI = false) =>
    new Promise((resolve, reject) => {
      const url = encodeURI(this.mUrl);

      let opt;
      if (this.mFormData == null) {
        opt = { method: "get", url };
      } else {
        opt = { method: "post", url, data: this.mFormData };
      }

      if (MyAccount.atkn != null) {
        const auth = `Bearer ${MyAccount.atkn}`;
        opt.headers = { Authorization: auth };
        console.log(`== 헤더 Authorization 토큰 : ${auth}`);
      }

      if (isProgressUI) {
        this.progressStart();
      }

      axios(opt)
        .then((response) => {
          this.progressStop();
          console.log(`== Networking 끝. : ${this.mUrl}`);
          console.log(response.data);
          const json = response.data;

          if (isProgressUI) {
            // console.log('화면 막은거 풀어주자.')
          }

          if (json == null) {
            const err = `Parsing Error : ${response.toString()}`;
            console.error(err);
            reject(err);
          } else if (json.isSuccess) {
            resolve(json.data);
          } else {
            reject(json.error);
          }
        })
        .catch((error) => {
          this.progressStop();
          const err = `axios error : ${error}`;
          console.error(err);
          reject(err);
        });
    });
}

export { APIs, NetTool };
