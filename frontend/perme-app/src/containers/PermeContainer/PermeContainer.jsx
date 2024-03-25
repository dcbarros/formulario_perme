import { React, useCallback, useEffect, useMemo, useState, useContext } from "react";
import {
  AisleContainer,
  AisleInputs,
  ButtonsContainer,
  OptionsContainer,
  OptionsList,
  PatientContainer,
  PatientData,
  PermeContainerStyled,
  ProtocolContainer,
  QuestionGroup,
} from "./PermeContainerStyled";
import { useParams } from "react-router-dom";
import Text from "../../components/Text/Text";
import api from "../../services/api";
import FormContent from "../../components/FormContent/FormContent";
import Input from "../../micro/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import {useAuth} from '../../contexts/auth';


const permeLevelProtocols = [
  {
    title: "NÍVEL 1 - Perme: 0-6 pontos (Paciente não responsivo ou letárgico)",
    protocols: [
      "Posicionamento;",
      "Decúbito elevado (fowler 60º);",
      "Mobilização ativo-assistida de MMSS* e MMII** (2x ao dia com 15 repetições - de acordo com a identificação de déficit que o paciente obtiver na avaliação).",
      "→ diagonais funcionais de MMSS; flexão-extensão de cotovelo; flexão-extensão de punho; tríplice flexão de MMII; exercícios metabólicos de extremidades; descarga de peso em MMII.",
      "Propriocepção articular;",
      "Alongamento estático;",
      "Estimulação elétrica neuromuscular.",
    ],
    minScore: 0,
    maxScore: 6,
  },
  {
    title: "NÍVEL 2 - Perme: 7-11 pontos (Paciente acordado e alerta)",
    protocols: [
      "Posicionamento;",
      "Decúbito elevado (fowler 60º);",
      "Mobilização ativa de MMSS e MMII (idem ao nível 1);",
      "Sedestação fora do leito pelo menos 20 minutos – passiva ou ativa assistida;",
      "Propriocepção articular;",
      "Alongamento estático;",
      "Estimulação elétrica neuromuscular (30 minutos, largura de pulso (ms) 0,35, frequência (Hz) 35, intensidade:contração visível).",
    ],
    minScore: 7,
    maxScore: 11,
  },
  {
    title:
      "NÍVEL 3 - Perme: 12-21 pontos (Paciente alerta e consciente, com MRC de MMSS e MMII ≥ 3)",
    protocols: [
      "Posicionamento;",
      "Decúbito elevado (fowler 60º) ou ortostatismo assistido e/ou ativo;",
      "Mobilização aeróbica ativa de MMSS e MMII (2 x ao dia com 15 repetições - de acordo com a identificação de déficit que o paciente obtiver na avaliação);",
      "Sedestação no leito sem apoio pelo menos 20 minutos. Sedestação na poltrona com assistência (20 min/dia);",
      "Transferência do paciente para beira leito (exercícios de controle de tronco e equilíbrio);",
      "Propriocepção articular;",
      "Alongamento estático;",
      "Cicloergômetro (2x ao dia - manhã e tarde – 15 minutos, carga progressiva diariamente).",
    ],
    minScore: 12,
    maxScore: 21,
  },
  {
    title:
      "NÍVEL 4 - Perme: 22-32 pontos (Paciente com MRC de MMSS e MMII ≥ 4)",
    protocols: [
      "Posicionamento;",
      "Decúbito elevado (fowler 60º) ou ortostatismo ativo;",
      "Treino de força com exercícios resistidos de MMSS e MMII: agachamento, push-up, ponte (2 x ao dia com 15 repetições - de acordo com a identificação de déficit que o paciente obtiver na avaliação);",
      "Transferência ativa ou com mínima assistência para a poltrona (no mínimo 20min/dia);",
      "Treino de ortostatismo;",
      "Deambulação;",
      "Alongamento estático;",
      "Cicloergômetro (idem ao nível 3).",
    ],
    minScore: 22,
    maxScore: 32,
  },
];

const PermeContainer = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState([]);
  const [patientAisle, setPatientAisle] = useState(null);
  const [permeForm, setPermeForm] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const { user } = useAuth();

  const category = useMemo(
    () => permeForm.find((c) => c.position === currentCategory) ?? null,
    [currentCategory, permeForm]
  );
  const answersByCategory = useMemo(
    () => answers.filter((a) => a.categoryId === category?.id),
    [category, answers]
  );
  const canGoForward = useMemo(
    () => answersByCategory.length === category?.items?.length,
    [answersByCategory, category]
  );
  const canGoBackward = useMemo(() => currentCategory > 0, [currentCategory]);

  const score = useMemo(
    () => answers.reduce((score, answer) => score + answer.points, 0),
    [answers]
  );
  const scoreProtocols = useMemo(
    () =>
      permeLevelProtocols.find(
        (protocol) => score >= protocol.minScore && score <= protocol.maxScore
      ),
    [score]
  );

  useEffect(() => {
 async function fetchPatient() {
			const {data} = await api.get(`/patient/combined/${patientId}`);
			setPatient(data);
		}
    async function fetchPermeForm() {
      const { data } = await api.get("/perme");
      setPermeForm(data);
    }

    fetchPatient();
    fetchPermeForm();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await api.post("/measurement", {
        score: score,
        scoreTitle: scoreProtocols.title,
        physioId: user.id,
        admissionId: patient[0].admissions[0].id,
        hospitalSector: patientAisle,
      });

      navigate(`/gerenciarpaciente/${patientId}`);
    } catch (error) {
      console.error(error);
    }
  };



  const changePatientAisle = ({ target }) => setPatientAisle(target.value);

  const answerQuestion = useCallback(
    (categoryId, itemId, optionId, points) => {
      const filteredOutAnswers = answers.filter((a) => a.itemId !== itemId);
      setAnswers([
        ...filteredOutAnswers,
        { categoryId, itemId, optionId, points },
      ]);
    },
    [answers]
  );

  const hasAnswered = useCallback(
    (optionId) => Boolean(answers.find((a) => a.optionId === optionId)),
    [answers]
  );

  const goForward = () => setCurrentCategory(currentCategory + 1);

  const goBackward = () => setCurrentCategory(currentCategory - 1);


  return (
    <PermeContainerStyled>
      <PatientContainer>
        <Text id="Titulo" text="Paciente" />
        {patient && patient.length > 0 && (
          <PatientData>
            <FormContent label="Nome" value={patient[0].fullName} disabled />
            <FormContent
              label="Nº do prontuário"
              value={patient[0].internalCode}
              disabled
            />
           <FormContent
              label="Data de entrada"
           
            value={moment(patient[0].entryDate).format(
               "DD/MM/YYYY"
               )}
              disabled
            />
          </PatientData>
        )}
        <AisleContainer>
          <Text id="TextoMenorBold" text="O paciente encontra-se na:" />
          <AisleInputs>
            <Input
              type="radio"
              name="aisle"
              value="CTI"
              label="CTI"
              handleRadioChange={changePatientAisle}
            />
            <Input
              type="radio"
              name="aisle"
              value="Enfermaria"
              label="Enfermaria"
              handleRadioChange={changePatientAisle}
            />
          </AisleInputs>
        </AisleContainer>
      </PatientContainer>
      {patientAisle !== null &&
        (category !== null ? (
          <div>
            <Text id="Subtitulo" text={category.description} />
            {category.items.map((item) => (
              <QuestionGroup key={item.id}>
                <Text id="TextoMenorBold" text={item.description} />
                <OptionsContainer>
                  {item.options.map((option) => (
                    <OptionsList key={option.id}>
                      <Input
                        type="radio"
                        name={`category-${category.id}-item-${item.id}`}
                        value={option.id}
                        checked={hasAnswered(option.id)}
                        label={option.description}
                        handleRadioChange={() =>
                          answerQuestion(
                            category.id,
                            item.id,
                            option.id,
                            option.points
                          )
                        }
                      />
                    </OptionsList>
                  ))}
                </OptionsContainer>
              </QuestionGroup>
            ))}
            <ButtonsContainer>
              {canGoBackward && (
                <Button
                  id="RedButtonLarge"
                  text="Anterior"
                  onClick={goBackward}
                />
              )}
              {canGoForward && (
                <Button id="ButtonLarge" text="Próxima" onClick={goForward} />
              )}
            </ButtonsContainer>
          </div>
        ) : (
          <div>
            <Text id="TituloScore" text={`Score final: ${score} pontos`} />
            <Text id="SubtituloScore" text={scoreProtocols?.title ?? "N/A"} />

            <ProtocolContainer>
              {(scoreProtocols?.protocols ?? []).map((protocol, index) => (
                <OptionsList key={index}>
                  <Text id="TextoMenor" text={protocol} />
                </OptionsList>
              ))}
            </ProtocolContainer>
            <ButtonsContainer>
              {canGoBackward && (
                <Button
                  id="RedButtonLarge"
                  text="Anterior"
                  onClick={goBackward}
                />
              )}
              <Button id="ButtonLarge" text="Salvar" onClick={onSubmit} />
            </ButtonsContainer>
          </div>
        ))}
    </PermeContainerStyled>
  );
};

export default PermeContainer;
