import {React, useMemo, useState} from 'react';
import {
  NavbarStyled,
  ButtonsArea,
  LogoArea,
  Dropdown,
  Item,
  StyledLink,
} from "./NavbarStyled";
import Text from "../Text/Text";
import Button from "../Button/Button";
import {useAuth} from '../../contexts/auth';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { logout, user } = useAuth();

  const links = [
      {
          route: '/pacientes',
          title: 'Pacientes',
          roles: ['physio', 'admin'],
      },
      {
          route: '/gerenciamento',
          title: 'Gerenciamento',
          roles: ['admin'],
      },
      {
          route: '/painel',
          title: 'Painel',
          roles: ['admin'],
      },
  ];

  const roleLinks = useMemo(() => links.filter(link => link.roles.includes(user.role)), [user]);

  return (
    <NavbarStyled>
      <LogoArea className="logo-hospital">
        <Text
          id="TextoCorridoBoldWhite"
          text="HOSPITAL EDUARDO DE MENEZES | FISIOTERAPIA"
          color="text-dark"
        ></Text>
      </LogoArea>

      <ButtonsArea className="buttons-area">
          {roleLinks.map((link) => (
              <Item key={link.route}>
                  <StyledLink to={link.route}>
                      <Text id="TextoBotaoBranco" text={link.title.toUpperCase()}></Text>
                  </StyledLink>
              </Item>
          ))}
          <Item onClick={() => handleToggleDropdown()}>
              <StyledLink>
                  <Text id="TextoBotaoBranco" text={`Olá, ${user.name}`}></Text>
              </StyledLink>
              <Dropdown className="buttons-area" isOpen={isDropdownOpen}>
                  <StyledLink onClick={logout}>
                      <Button id="NoFillButtonMedium" text="Sair"></Button>
                  </StyledLink>
              </Dropdown>
          </Item>
      </ButtonsArea>
    </NavbarStyled>
  );
};

export default Navbar;
