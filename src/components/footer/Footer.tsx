import { Container, StyledLink } from "../../styles/sharedStyles";
import { FooterContainer, FooterContent } from "./style";

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          &copy; Savio Mascarenhas. All rights reserved.
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
