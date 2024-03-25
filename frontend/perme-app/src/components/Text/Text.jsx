import React from "react";
import { TextStyled } from "./TextStyled";

const Text = ({ id, text }) => {
  return (
    <TextStyled className={`${id}`} id={id}>
      {text}
    </TextStyled>
  );
};
export default Text;
