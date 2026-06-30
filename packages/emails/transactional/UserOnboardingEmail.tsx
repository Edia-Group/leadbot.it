import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import type { ComponentProps } from "react";
// biome-ignore lint/correctness/noUnusedImports: Need it for tsx execution
import React from "react";
import { brandFooterText, brandName, brandWebsiteUrl } from "../transactional/brand";
import { bodyText, container, footerText, main } from "./styles";

interface Props {
  unsubscribeUrl?: string;
}

export const UserOnboardingEmail = ({ unsubscribeUrl }: Props) => (
  <Html>
    <Head />
    <Preview>Benvenuto su {brandName}!</Preview>
    <Body style={main}>
      <Container
        align="left"
        style={{
          ...container,
          margin: "0",
          maxWidth: "100%",
          textAlign: "left",
        }}
      >
        <Text style={bodyText}>
          Ciao,
          <br />
          <br />
          Grazie per esserti registrato su {brandName}! 🙌
          <br />
          <br />
          {brandName} è il sistema operativo AI per PMI: chatbot, automazioni,
          documenti aziendali e workflow in un&apos;unica piattaforma.
          <br />
          <br />
          Per iniziare, accedi alla dashboard e crea il tuo primo chatbot:
          <br />
          <Link href="https://app.nucleoai.it">https://app.nucleoai.it</Link>
          <br />
          <br />
          Hai domande? Scrivici da{" "}
          <Link href={brandWebsiteUrl}>{brandWebsiteUrl}</Link>.
          <br />
          <br />
          A presto,
          <br />
          Il team {brandName}
        </Text>
        <Hr />
        <Text style={{ ...footerText, marginTop: "8px" }}>{brandFooterText}</Text>
        {unsubscribeUrl ? (
          <Text style={{ ...footerText, marginTop: "24px" }}>
            <Link href={unsubscribeUrl}>Annulla iscrizione</Link>
          </Text>
        ) : null}
      </Container>
    </Body>
  </Html>
);

UserOnboardingEmail.PreviewProps = {
  unsubscribeUrl: "https://nucleoai.it/emails/unsubscribe",
} satisfies Props;

export default UserOnboardingEmail;

export const renderUserOnboardingEmail = async (
  props: ComponentProps<typeof UserOnboardingEmail>,
) => render(<UserOnboardingEmail {...props} />);
