import React from "react";
import Text from "../../components/Text/Text";
import FormContent from "../../components/FormContent/FormContent";
import Button from "../../components/Button/Button";
import {
  PatientRegisterForm,
  DateContent,
  ButtonContainer,
} from "./PatientRegisterStyled";
import { useForm } from "react-hook-form";
import api from '../../services/api';
import {useNavigate} from 'react-router-dom';
import moment from "moment"

const PatientRegisterContainer = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) {
      return;
    }
    try {
      await api.post('/patient', data);
      navigate('/pacientes');
    } catch ({response}) {
      const {message} = response.data;
      setError('internalCode', {type: 'custom', message});
    }
  };

  var dataAtual = new Date();
  var dataFormatada = moment(dataAtual).format(
    "DD/MM/YYYY"
    )

  return (
    <PatientRegisterForm onSubmit={handleSubmit(onSubmit)}>
      <Text id="Subtitulo" text="Cadastrar paciente"></Text>
      <FormContent
        label="Nome completo"
        placeholder="Digite o nome"
        error={errors.fullName && errors.fullName.message}
        {...{
          register: register("fullName", {
            required: 'Nome do paciente é obrigatório',
            minLength: {
              value: 3,
              message: "Digite um nome válido (mínimo de 3 caracteres).",
            },
          }),
        }}
      />
        <FormContent
          label="Nº do prontuário"
          placeholder="Digite o nº do Prontuário"
          error={errors.internalCode && errors.internalCode.message}
          {...{ register: register('internalCode', { required: 'Informe um prontuário válido.' }) }}
          />
        <DateContent>
        <FormContent
          label="Data de Entrada"
          placeholder="Digite o nº do Prontuário"
          value={dataFormatada}
          error={errors.entryDate && errors.entryDate.message}
          {...{ register: register('entryDate', {  valueAsDate: true }) }}
          
          />
          {/* <FormContent
          type="date"
          label="Data de Entrada"
          error={errors.entryDate && errors.entryDate.message}
          {...{ register: register('entryDate', { required: 'Informe uma data válida.', valueAsDate: true }) }}
          /> */}
        </DateContent>
      <ButtonContainer>
        <Button id="ButtonLarge" text="Cadastrar" type="submit" loading={isSubmitting} disabled={isSubmitting}></Button>
      </ButtonContainer>
    </PatientRegisterForm>
  );
};

export default PatientRegisterContainer;