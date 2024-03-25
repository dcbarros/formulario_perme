import React, { useState } from "react";
import Text from "../../components/Text/Text";
import FormContent from "../../components/FormContent/FormContent";
import Button from "../../components/Button/Button";
import {
  FisioRegisterForm,
  FullNameContent,
  AuthenticationContainer,
  ButtonContainer,
  EyeButton,
  Password,
} from "./FisioRegisterContainerStyled";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const FisioRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const senha = watch("senha", "");
  const confirmaSenha = watch("confirmaSenha", "");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/physio", {
        name: data.nome,
        lastName: data.sobrenome,
        identifier: data.identificador,
        password: data.senha,
        passwordConfirmation: data.confirmaSenha,
      });
      navigate("/gerenciamento");
    } catch (error) {
      console.error(error);
    }
  };

  const validatePassword = (value) => {
    const minLengthRegex = /.{6,20}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[\W_]/;
    const numberRegex = /\d/;

    if (!minLengthRegex.test(value)) {
      return "A senha deve ter entre 6 e 20 caracteres.";
    }
    if (!uppercaseRegex.test(value)) {
      return "A senha deve conter pelo menos uma letra maiúscula.";
    }
    if (!lowercaseRegex.test(value)) {
      return "A senha deve conter pelo menos uma letra minúscula.";
    }
    if (!specialCharRegex.test(value)) {
      return "A senha deve conter pelo menos um caractere especial.";
    }
    if (!numberRegex.test(value)) {
      return "A senha deve conter pelo menos um número.";
    }
    if (confirmaSenha && value !== confirmaSenha) {
      return "As senhas não coincidem.";
    }
    return true;
  };

  return (
    <FisioRegisterForm onSubmit={handleSubmit(onSubmit)}>
      <Text id="Subtitulo" text="Cadastrar fisioterapeuta" />
      <FullNameContent>
        <FormContent
          label="Nome"
          placeholder="Digite o nome"
          error={errors.nome && errors.nome.message}
          {...{
            register: register("nome", {
              required: "Digite um nome válido.",
              minLength: {
                value: 3,
                message: "Digite um nome válido (mínimo de 3 caracteres).",
              },
            }),
          }}
        />
        <FormContent
          label="Sobrenome"
          placeholder="Digite o sobrenome"
          error={errors.sobrenome && errors.sobrenome.message}
          {...{
            register: register("sobrenome", {
              required: "Digite um sobrenome válido.",
            }),
          }}
        />
        <FormContent
          label="Identificador"
          placeholder="Digite 5 números"
          error={errors.identificador && errors.identificador.message}
          {...{
            register: register("identificador", {
              required: "Digite um identificador válido.",
              pattern: {
                value: /^[0-9]{5}$/,
                message: "Digite um identificador com 5 números.",
              },
            }),
          }}
        />
      </FullNameContent>
      <AuthenticationContainer>
        <Password>
          <FormContent
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="Digite a senha"
            error={errors.senha && errors.senha.message}
            {...{
              register: register("senha", {
                required: "Digite uma senha válida.",
                validate: validatePassword,
              }),
            }}
          />
          <EyeButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Text id="TextoMenorBold" text="0"></Text>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </EyeButton>
        </Password>
        <Password>
          <FormContent
            type={showPasswordConfirmation ? "text" : "password"}
            label="Confirmar senha"
            placeholder="Confirme a senha"
            error={errors.confirmaSenha && errors.confirmaSenha.message}
            {...{
              register: register("confirmaSenha", {
                required: "Confirme a senha.",
                validate: validatePassword,
              }),
            }}
          />
          <EyeButton
            type="button"
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
          >
            <Text id="TextoMenorBold" text="0"></Text>
            <FontAwesomeIcon
              icon={showPasswordConfirmation ? faEye : faEyeSlash}
            />
          </EyeButton>
        </Password>
      </AuthenticationContainer>
      <ButtonContainer>
        <Button id="ButtonLarge" text="Cadastrar" type="submit" />
      </ButtonContainer>
    </FisioRegisterForm>
  );
};

export default FisioRegister;
