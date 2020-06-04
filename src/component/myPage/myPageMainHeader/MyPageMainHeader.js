import React from "react";
import MyAccount from "../../../tool/MyAccount";

const MyPageMainHeader = ({ isLogin }) => (
  <div>
    {isLogin && (
      <>
        <div> {MyAccount.nickname}님</div>
      </>
    )}
    {!isLogin && <div>로그인 안 되어있음</div>}
  </div>
);

export default MyPageMainHeader;
