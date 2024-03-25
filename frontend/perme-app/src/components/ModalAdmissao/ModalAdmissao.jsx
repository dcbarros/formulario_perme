import React from 'react';
import Card from '../../micro/card/Card';
import Text from '../Text/Text';
import Button from '../Button/Button';
import FormContent from '../FormContent/FormContent'
import { FormAdmissao, FormContainer, ButtonContainer, ModalContainer, TopContainer } from './ModalAdmissaoStyled';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useEffect, useState } from 'react';

const ModalAdmissao = ({ patientId, onClose, PatientFullName, PatientInternalCode }) => {
  console.log("patientId recebido no ModalAdmissao:", patientId);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const isDisabled = true;

  const onSubmit = async (data) => {
    try {
      if (!patientId) {
        console.error("patientId não está definido. Verifique como está sendo passado para o ModalAdmissao.");
        return;
      }
  
      const admissionData = {
        admittedAt: data.AdmissionDate, 
        patientId: patientId,
      };
      console.log('admissionData:', admissionData)
      const response = await api.post("/admission", admissionData);
  
      console.log("Resposta do Backend:", response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar dados para o backend:", error);
    }
  };
    
  return (   
    <ModalContainer>
    <Card
      id="Modal"
      cardContent={
        <>                    
        <FormContainer>                       
        <Text id="Titulo" text="Nova Admissão" /> 
        <Text id="Subtitulo" text="Paciente" />  
        <FormAdmissao onSubmit={handleSubmit(onSubmit)}>             
           <FormContent 
            label="Nome"
            id="FullName"
            type="Text"
            value={PatientFullName}                 
            {...{ register: register('FullName', {required : true})}}/>
              <FormContent 
            label="Número do prontuário"
            id="InternalCode"
            type="Text"
            value={PatientInternalCode}               
            {...{ register: register('InternalCode', {required : true})}}/>
              <FormContent 
            label="Data da Admissão"
            id="AdmissionDate"
            type="Text"
            value={currentDate}                          
            {...{ register: register('AdmissionDate', {required : true})}}/>
         
          <ButtonContainer>
          <Button id="ButtonExtraExtraLarge" type="submit" text="Atualizar" />      
          <Button id="NoFillButtonSmall" text="Fechar" type="button" onClick={onClose}/>        
          </ButtonContainer>          
        </FormAdmissao>
        </FormContainer>
        </>
      }
    />
  </ModalContainer>
);
};

export default ModalAdmissao;
