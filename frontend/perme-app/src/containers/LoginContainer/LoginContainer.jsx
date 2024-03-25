import React from "react";
import Text from "../../components/Text/Text";
import FormContent from "../../components/FormContent/FormContent.jsx";
import {
  LoginContainerStyled,
  InputLine,
  LogoLine,
  ButtonArea,
  FormStyled,
} from "./LoginContainerStyled.js";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import {useAuth} from '../../contexts/auth';

const LoginContainer = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    if (isSubmitting) {
      return;
    }
    try {
      await login(data.username, data.password);
    } catch (error) {
      const { status } = error.response;
      if (status === 401) {
        setError('username', {type: 'custom', message: 'Usuário ou senha inválidos.'});
        return;
      }
      setError('username', {type: 'custom', message: 'Erro desconhecido, tente novamente mais tarde.'})
    }
  };

  return (
    <LoginContainerStyled>
      <LogoLine>
        <Text id="TituloLogin" text="Hospital Eduardo de Menezes"></Text>
      </LogoLine>
      <Text id="Subtitulo" text="Login"></Text>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <InputLine>
          <FormContent
            label="Identificador"
            placeholder="Digite seu identificador"
            error={errors.username && errors.username.message}
            {...{ register: register("username", { required: 'Preencha o identificador.', pattern: { value: /^\d{5}$/, message: 'O identificador deve possuir apenas 5 números.' } }) }}
          />
        </InputLine>
        <InputLine>
          <FormContent
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            error={errors.password && errors.password.message}
            {...{ register: register("password", { required: 'Informe sua senha.' }) }}
          />
        </InputLine>
        <ButtonArea>
          <Button id="ButtonLarge" text="Enviar" type="submit" loading={isSubmitting} disabled={isSubmitting}></Button>
        </ButtonArea>
      </FormStyled>
    </LoginContainerStyled>
  );
};

export default LoginContainer;
