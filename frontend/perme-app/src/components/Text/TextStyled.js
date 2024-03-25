import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { primary, secondary, textdark } from "../../utils/colors";

export const TextStyled = styled.span`
  font-family: "Lato";
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  line-height: 160%;
  font-style: normal;
  color: #1a1a1a;
  margin: 0 !important;
  @media (max-width: 1042px) {
    line-height: 120%;
  }

  &.TituloScore {
    font-size: ${toRem(40)};
    font-weight: 500;
    color: #008ea7;
  }

  &.SubtituloScore {
    font-size: ${toRem(24)};
    font-weight: 600;
    color: #006273;
  }

  &.Titulo {
    font-size: ${toRem(32)};
    font-weight: 600;
  }
  &.TituloLogin {
    font-size: ${toRem(32)};
    font-weight: 600;
    color: ${primary};
  }

  &.Subtitulo {
    font-size: ${toRem(24)};
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: ${toRem(30)};
    }
  }

  &.TextoGrande {
    font-size: ${toRem(20)};
    font-weight: 400;
  }

  &.TextoGrandeBold {
    font-size: ${toRem(20)};
    font-weight: 700;
  }

  &.TextoCorrido {
    font-size: ${toRem(20)};
    font-weight: 400;
  }

  &.TextoCorridoBold {
    font-size: ${toRem(20)};
    font-weight: 700;
  }

  &.TextoCorridoBoldWhite {
    font-size: ${toRem(20)};
    font-weight: 700;
    color: #eaefee;
  }
  &.TextoMenor {
    font-size: ${toRem(14)};
    font-weight: 400;
    @media (max-width: 768px) {
      font-size: ${toRem(20)};
    }
  }

  &.TextoMenorBold {
    font-size: ${toRem(14)};
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: ${toRem(20)};
    }
  }

  &.TextoErro {
    font-size: ${toRem(12)};
    font-weight: 400;
    color: ${secondary};
    @media (max-width: 768px) {
      font-size: ${toRem(18)};
    }
  }

  &.TextoBotaoBranco {
    font-size: ${toRem(14)};
    font-weight: 700;
    color: #eaefee;
    @media (max-width: 768px) {
      font-size: ${toRem(20)};
    }
    @media (min-width: 414px) {
      font-size: ${toRem(14)};
    }
  }
  &.TextoBotaoPreto {
    font-size: ${toRem(14)};
    font-weight: 700;
    color: #1a1a1a;
  }
  &.Legenda {
    font-size: ${toRem(12)};
    font-weight: 400;
    color: ${textdark};
  }
  &.TextoMenorPink {
    font-size: ${toRem(14)};
    font-weight: 400;
    color: ${secondary};
    @media (max-width: 768px) {
      font-size: ${toRem(20)};
    }
  }
  &.TextoCorridoBoldGreen {
    font-size: ${toRem(16)};
    font-weight: 700;
    color: ${primary};
  }
`;
