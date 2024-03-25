import React from 'react';
import Card from '../../micro/card/Card';
import Text from '../Text/Text';
import TextArea from '../../micro/TextArea/TextArea';
import Button from '../Button/Button';
import { ModalContainer, FormAlta, FormContentContainer, ButtonContainer, LabelStyled, RadioContainer, CustomRadio, RadioInput } from './ModalAltaStyled';
import { useForm } from 'react-hook-form';
import FormContent from '../FormContent/FormContent';
import format from 'date-fns/format';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";

const ModalAlta = ({ pacienteId, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {    
      const id = pacienteId;
     
      await api.patch(`/admission/${id}`, {
        dischargedAt: new Date().toISOString(),
        dischargedType: data.TipoAlta,
        observation: data.Observacoes
      });
    
      alert("Alta registrada com sucesso!");
      navigate(`/pacientes`);
     
      onClose();
    } catch (error) {
      console.error('Erro ao registrar a alta:', error);
    }
  };
  
  
  return (
    <ModalContainer>
      <Card
        id="Modal"
        cardContent={
          <FormAlta onSubmit={handleSubmit(onSubmit)}>
            <Text id="Titulo" text="Defina o tipo de alta" />            
            <FormContentContainer>
              <LabelStyled>
                <RadioContainer>
                  <RadioInput
                    type="radio"
                    id="AltaFisio"
                    className="withRadio"
                    value="Alta da fisioterapia"
                    {...register('TipoAlta', { required: true })}
                  />
                  <CustomRadio />
                  Alta da Fisioterapia
                </RadioContainer>
              </LabelStyled>
              <LabelStyled>
                <RadioContainer>
                  <RadioInput
                    type="radio"
                    id="AltaHosp"
                    className="withRadio"
                    value="Alta hospitalar"
                    {...register('TipoAlta', { required: true })}
                  />
                  <CustomRadio />
                  Alta Hospitalar
                </RadioContainer>
              </LabelStyled>
            </FormContentContainer>
            <ButtonContainer>
              <TextArea placeholder="Observações" {...{ register: register('Observacoes') }} />
              <Text
                id="TextoErro"
                text={errors.TipoAlta && 'Escolha uma opção de Alta.'}
              ></Text>
            </ButtonContainer>
            <Button id="ButtonExtraExtraLarge" type="submit" text="Dar a Alta" />
          </FormAlta>
        }
      />
    </ModalContainer>
  );
};

export default ModalAlta;
