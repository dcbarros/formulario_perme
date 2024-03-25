import React from 'react';
import { QuestionContainer, RadiosContainer, ErrorContainer } from "./QuestionContentStyled";
import Text from '../Text/Text';
import FormContent from '../FormContent/FormContent'; 

const QuestionContent = ({ id, titulo, pergunta, primeiraAlternativa, segundaAlternativa, terceiraAlternativa, quartaAlternativa, register, error}) => {
  switch (id) {
    case 'threeAnswers':
      return (
        <QuestionContainer>
          <Text id="Titulo" text={titulo}/>
          <Text id="TextoCorrido" text={pergunta} />
          <FormContent id="withRadio" label={primeiraAlternativa} register={register}/>
          <FormContent id="withRadio" label={segundaAlternativa} register={register}/>
          <FormContent id="withRadio" label={terceiraAlternativa} register={register}/>
          <ErrorContainer>
      <Text id="TextoErro" text={error}></Text>
      </ErrorContainer>
        </QuestionContainer>
      );
    case 'fourAnswers':
      return (
        <QuestionContainer>
        <Text id="Título" text={titulo}/>
          <Text id="TextoCorrido" text={pergunta} />
          <RadiosContainer>
          <FormContent id="withRadio" type="radio" label={primeiraAlternativa} register={register}/>
          <FormContent id="withRadio" type="radio" label={segundaAlternativa} register={register}/>
          <FormContent id="withRadio" type="radio" label={terceiraAlternativa} register={register}/>
          <FormContent id="withRadio" type="radio" label={quartaAlternativa} register={register}/>
          <ErrorContainer>
      <Text id="TextoErro" text={error}></Text>
      </ErrorContainer>
          </RadiosContainer>
        </QuestionContainer>
      );
    default:
      return (
        <QuestionContainer>
         <Text id="Título" text={titulo}/>
          <Text id="TextoCorrido" text={pergunta} />
          <FormContent id="withRadio" type="radio" label={primeiraAlternativa} register={register}/>
          <FormContent id="withRadio" type="radio" label={segundaAlternativa} register={register}/>
          <ErrorContainer>
      <Text id="TextoErro" text={error}></Text>
      </ErrorContainer>
        </QuestionContainer>
      );
  }
}

export default QuestionContent;
