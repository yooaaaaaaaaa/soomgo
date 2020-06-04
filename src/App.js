import React, { Component } from "react";
import { Route } from "react-router-dom";
import { NetTool, APIs } from "./tool/NetTool";
import "./App.scss";
import MyAccount from "./tool/MyAccount";
import { Header } from "./component";
import {
  Login,
  MainContainer,
  MyPageContainer,
  DiaryDataContainer,
  Register,
  SearchMovieContainer,
} from "./containers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
  }

  componentDidMount() {
    this.authAccessToken();
  }

  authAccessToken = () => {
    if (MyAccount.atkn) {
      NetTool.request(APIs.userAuth)
        .exec()
        .then((resultData) => {
          console.log("자동 로그인 성공.");
          MyAccount.updateMyAccount(resultData);
          this.onChangeLoginState();
        })
        .catch((error) => alert(error));
    }
  };

  onChangeLoginState = () => {
    const isLogin = MyAccount.uId > 0;
    this.setState({ isLogin });
    console.log(isLogin);
  };

  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <Header isLogin={isLogin} />
        <Route component={MainContainer} path="/" exact />
        <Route component={DiaryDataContainer} path="/DiaryDataContainer/:dId" />
        <Route component={SearchMovieContainer} path="/SearchMovieContainer" />
        <Route
          path="/MyPageContainer"
          render={(props) => <MyPageContainer {...props} isLogin={isLogin} />}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              onChangeLoginState={this.onChangeLoginState}
              //this.isLogin 을 바꿔봄
              isLogin={isLogin}
            />
          )}
        />

        <Route component={Register} path="/register" />
      </div>
    );
  }
}

export default App;
