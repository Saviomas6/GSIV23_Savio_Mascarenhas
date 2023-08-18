import { Container, StyledLink } from "../../styles/sharedStyles";

import logo from "../../assets/logo.svg";
import {
  Heading,
  Logo,
  LogoWrapper,
  NavbarContainer,
  NavbarMainContainer,
} from "./style";

const Navbar = () => {
  return (
    <NavbarMainContainer>
      <Container width="90%">
        <NavbarContainer>
          <StyledLink to="/">
            <LogoWrapper>
              <Logo src={logo} alt="logo" />
            </LogoWrapper>
          </StyledLink>
          <StyledLink to="/">
            <Heading>GSynergy</Heading>
          </StyledLink>
        </NavbarContainer>
      </Container>
    </NavbarMainContainer>
  );
};

export default Navbar;
