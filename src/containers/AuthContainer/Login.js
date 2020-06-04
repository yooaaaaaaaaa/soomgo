import React from "react";
import { AuthWrapper } from "../../component";
import Auth from "../../component/auth/Auth";

// const Login = ({ onChangeLoginState, isLogin }) => {
const Login = (props) => {
  const { onChangeLoginState, isLogin } = props;
  console.log('@@@@ render login: ', props);  

  return (
    <AuthWrapper>
      <Auth
        isLogin={isLogin}
        onChangeLoginState={onChangeLoginState}
        type="login"
      />
    </AuthWrapper>
  );
};

export default Login;
