import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import type { SendMailOptions } from "nodemailer";
import type { ComponentProps } from "react";
// biome-ignore lint/correctness/noUnusedImports: Need it for tsx execution
import React from "react";
import { sendEmail } from "../helpers/sendEmail";
import { brandFooterText, brandName } from "./brand";
import { Logo } from "./components/Logo";
import {
  codeStyle,
  container,
  footerText,
  heading,
  hr,
  main,
  paragraph,
} from "./styles";

interface Props {
  code: string;
}

export const VerificationCodeEmail = ({ code }: Props) => (
  <Html>
    <Head />
    <Preview>Il tuo codice di verifica per {brandName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Heading style={heading}>
          Il tuo codice di verifica per {brandName}
        </Heading>
        <code style={codeStyle}>{code}</code>
        <Text style={paragraph}>
          Questo codice sarà valido solo per la prossima ora.
        </Text>
        <Hr style={hr} />
        <Text style={footerText}>{brandFooterText}</Text>
      </Container>
    </Body>
  </Html>
);

VerificationCodeEmail.PreviewProps = {
  code: "free-rrree-free-rrree",
} as Props;

export default VerificationCodeEmail;

export const sendVerificationCodeEmail = async ({
  to,
  ...props
}: Pick<SendMailOptions, "to"> &
  ComponentProps<typeof VerificationCodeEmail>) =>
  sendEmail({
    to,
    subject: `Codice di verifica ${brandName}`,
    html: await render(<VerificationCodeEmail {...props} />),
  });
