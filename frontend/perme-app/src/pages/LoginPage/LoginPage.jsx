import React from 'react';
import LoginContainer from "../../containers/LoginContainer/LoginContainer";
import { LoginPageStyled, ImageContainer } from "./LoginPageStyled";
import ImageComponent from "../../micro/Image/Image";

const LoginPage = () => {
  return (
    <LoginPageStyled>
      <ImageContainer>
        <ImageComponent src="../../assets/images/imageLogin.png" />
      </ImageContainer>
      <LoginContainer></LoginContainer>
    </LoginPageStyled>
  );
};

export default LoginPage;
