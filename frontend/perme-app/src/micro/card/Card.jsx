import React from 'react'
import {CardStyled} from './CardStyled'

 const Card = ({id, cardContent}) => {
  return (
    <CardStyled id={id} className={`${id}`}>{cardContent}</CardStyled>
  )
}

export default Card;