import React from "react";
import { AuthWrapper } from "../../component";
import Auth from "../../component/auth/Auth";

const Register = () => {
  return (
    <AuthWrapper>
      <Auth type="register" />
    </AuthWrapper>
  );
};

export default Register;
