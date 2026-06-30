import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { brandFooterText, brandName } from "../../transactional/brand";
import { container, footer, link, main } from "../styles";

type Props = {
  children: React.ReactNode;
  preview: string;
};
export const NewsletterLayout = ({ preview, children }: Props) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text
          style={{
            fontSize: "28px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#1E40AF",
            margin: "0 0 24px",
          }}
        >
          {brandName}
        </Text>
        {children}
        <Text style={footer}>{brandFooterText}</Text>
        <Link
          href="{{unsubscribe}}"
          target="_blank"
          style={{ ...link, color: "#898989", fontSize: "12px" }}
        >
          Annulla iscrizione
        </Link>
      </Container>
    </Body>
  </Html>
);
