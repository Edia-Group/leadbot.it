import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import type { ComponentProps } from "react";
// biome-ignore lint/correctness/noUnusedImports: Need it for tsx execution
import React from "react";
import { sendEmail } from "../helpers/sendEmail";
import { brandFooterText, botLabel } from "./brand";
import { Logo } from "./components/Logo";
import {
  container,
  footerText,
  hr,
  main,
  paragraph,
  primaryButton,
} from "./styles";

interface Props {
  workspaceName: string;
  typebotName: string;
  url: string;
  hostEmail: string;
  guestEmail: string;
}

export const GuestInvitationEmail = ({
  workspaceName,
  typebotName,
  url,
  hostEmail,
  guestEmail,
}: Props) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Logo />
          <Text style={paragraph}>
            Sei stato invitato da {hostEmail} a collaborare sul {botLabel}{" "}
            <strong>{typebotName}</strong>.
            <br />
            <br />
            Da ora vedrai questo {botLabel} nella dashboard del workspace
            &quot;{workspaceName}&quot; 👍
            <br />
            <br />
            Accedi con <i>{guestEmail}</i>.
          </Text>

          <Button href={url} style={primaryButton}>
            Vai alla piattaforma
          </Button>

          <Hr style={hr} />
          <Text style={footerText}>{brandFooterText}</Text>
        </Container>
      </Body>
    </Html>
  );
};

GuestInvitationEmail.PreviewProps = {
  workspaceName: "My Workspace",
  typebotName: "Assistente clienti",
  url: "https://app.nucleoai.it",
  hostEmail: "host@nucleoai.it",
  guestEmail: "guest@nucleoai.it",
} as Props;

export default GuestInvitationEmail;

export const sendGuestInvitationEmail = async (
  props: ComponentProps<typeof GuestInvitationEmail>,
) =>
  sendEmail({
    to: props.guestEmail,
    subject: `You've been invited to collaborate`,
    html: await render(<GuestInvitationEmail {...props} />),
    replyTo: props.hostEmail,
  });
