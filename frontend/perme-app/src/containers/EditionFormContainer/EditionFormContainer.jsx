import React, { useEffect, useState } from "react";
import Text from "../../components/Text/Text";
import FormContent from "../../components/FormContent/FormContent";
import Button from "../../components/Button/Button";
import {
  FisioRegisterForm,
  FullNameContent,
  AuthenticationContainer,
  ButtonContainer,
  EyeButton,
  Password
} from "./EditionFormContainerStyled";
import { ModalMessage } from "../../components/ModalMessage/ModalMessage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from '../../services/api';


const EditionFormContainer = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const [userData, setUserData] = useState({});

  const [isOpen, setOpenModal] = useState(false);
  const [isError, setIsErrorModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/physio/${id}`);
        const userDataFromBackend = { name: response.data.name, lastName: response.data.lastName, identifier: response.data.identifier };
        setUserData(userDataFromBackend);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.patch(`/physio/${id}`, {
        name: data.nome || userData.name,
        lastName: data.sobrenome || userData.lastName,
        password: data.senha || undefined,
        passwordConfirmation: data.confirmaSenha || undefined
      });
      setOpenModal(true);
    } catch (error) {
      setIsErrorModal(true);
      setOpenModal(true);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
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
    if (userData.passwordConfirmation && value !== userData.passwordConfirmation) {
      return "As senhas não coincidem.";
    }
    return true;
  };

  return (
    <>
      <FisioRegisterForm onSubmit={handleSubmit(onSubmit)}>
        <Text id="Subtitulo" text="Edição de dados" />
        <FullNameContent>
          <FormContent
            id="name"
            label="Nome"
            value={userData.name}
            error={errors.nome && "Digite um nome válido."}
            {...{ register: register("nome", userData.name ? { required: false } : { required: true }) }}
            onChange={handleInputChange}
          />
          <FormContent
            id="lastName"
            label="Sobrenome"
            value={userData.lastName}
            error={errors.sobrenome && "Digite um sobrenome válido."}
            {...{ register: register("sobrenome", userData.lastName ? { required: false } : { required: true }) }}
            onChange={handleInputChange}
          />
          <FormContent
            id="identifier"
            label="Identificador"
            value={userData.identifier}
            error={
              errors.identificador && "Digite um identificador válido."
            }
            {...{ register: register("identificador") }}
            disabled
          />
        </FullNameContent>
        <AuthenticationContainer>
          <Password>
            <FormContent
              id="password"
              type={showPassword ? "text" : "password"}
              label="Nova senha"
              error={errors.senha && "Digite uma senha válida."}
              {...{ register: register("senha") }}
              onChange={handleInputChange}
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
              id="passwordConfirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              label="Confirmação da nova senha"
              error={userData.password ? (errors.confirmaSenha && (errors.confirmaSenha.message || "As senhas não coincidem.")) : undefined}
              {...{
                register: register("confirmaSenha",
                  userData.password ? ({ required: true, validate: validatePassword }) : undefined)
              }}
              onChange={handleInputChange}
            />
            <EyeButton
              type="button"
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
            >
              <Text id="TextoMenorBold" text="0"></Text>
              <FontAwesomeIcon icon={showPasswordConfirmation ? faEye : faEyeSlash} />
            </EyeButton>
          </Password>
        </AuthenticationContainer>
        <ButtonContainer>
          <Button id="ButtonLarge" text="Editar" type="submit"></Button>
        </ButtonContainer>
        {isOpen && <ModalMessage isOpen={isOpen} isError={isError} />}
      </FisioRegisterForm>
    </>
  );
};

export default EditionFormContainer;
