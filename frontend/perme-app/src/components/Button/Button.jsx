import React from "react";
import { ButtonStyled } from "./ButtonStyled";
import Text from "../Text/Text";
import { ReactComponent as Spinner } from '../../assets/images/spinner.svg';

const Button = ({ id, text, onClick, type, disabled, loading }) => {
  const loadingClass = loading ? 'ButtonLoading' : '';
  const textId = ['NoFillButtonSmall', 'NoFillButtonMedium', 'NoFillButtonLarge'].includes(id) ? 'TextoBotaoPreto' : 'TextoBotaoBranco';
  return (
      <ButtonStyled className={`${id} ${loadingClass}`} id={id} onClick={onClick} type={type} disabled={disabled}>
        { !loading ? <Text id={textId} text={`${text}`} /> : <Spinner className="spinner" /> }
      </ButtonStyled>
  );
};
export default Button;
