import React from 'react';
import { StyledImage } from './ImageStyled';
import imageLogin from '../../assets/images/imageLogin.png';

const ImageComponent = ({width, height}) => {
    return <StyledImage src={imageLogin} alt="Imagem de Login" width="100%" height={height} />;
};

export default ImageComponent;