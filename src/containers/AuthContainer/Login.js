import React from "react";
import { AuthWrapper } from "../../component";
import Auth from "../../component/auth/Auth";

const Login = ({ onChangeLoginState, isLogin }) => {
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
