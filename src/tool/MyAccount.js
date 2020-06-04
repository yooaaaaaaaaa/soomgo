const LOCAL_STORAGE_ATKN_KEY = "at";

let instance;

class MyAccount {
  constructor() {
    if (instance) {
      return instance;
    }

    this.uId = 0;
    this.nickname = null;
    this.email = null;
    this.isNotLogin = true;

    this.atkn = localStorage.getItem(LOCAL_STORAGE_ATKN_KEY);

    instance = this;
  }

  updateMyAccount(jsonData) {
    if (jsonData.atkn != null) {
      this.atkn = jsonData.atkn;
      localStorage.setItem(LOCAL_STORAGE_ATKN_KEY, jsonData.atkn);
    }

    this.uId = jsonData.uId;
    this.nickname = jsonData.nickname;
    this.email = jsonData.email;
    this.isNotLogin = false;
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_ATKN_KEY);
    window.location.href = "/";
  }
}

export default new MyAccount();
