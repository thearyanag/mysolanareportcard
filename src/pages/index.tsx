import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ReportCard } from "../components/ReportCard";

const Index = () => (
  <Container>
    <Nav />
    <Hero />
    <ReportCard />
    <Footer>
      <Text>Underdog ❤️ Solana</Text>
    </Footer>
  </Container>
);

export default Index;
