import React from 'react'
import { TextAreaStyled } from './TextAreaStyled';

const TextArea = ({placeholder, register}) => {
  return (
    <TextAreaStyled placeholder={placeholder} {...register}/>
  )
}

export default TextArea;