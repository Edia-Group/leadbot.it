import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
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
  url: string;
  code: string;
}

export const LoginCodeEmail = ({ url, code }: Props) => (
  <Html>
    <Head />
    <Preview>Il tuo codice di accesso per {brandName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Heading style={heading}>
          Il tuo codice di accesso per {brandName}
        </Heading>
        <code style={codeStyle}>{code}</code>
        <Text style={paragraph}>
          Questo codice sarà valido solo per i prossimi 5 minuti.
        </Text>
        <Text style={paragraph}>
          Puoi anche accedere <Link href={url}>cliccando qui</Link>.
        </Text>
        <Hr style={hr} />
        <Text style={footerText}>{brandFooterText}</Text>
      </Container>
    </Body>
  </Html>
);

LoginCodeEmail.PreviewProps = {
  url: "https://app.nucleoai.it",
  code: "654778",
} as Props;

export default LoginCodeEmail;

export const sendLoginCodeEmail = async ({
  to,
  ...props
}: Pick<SendMailOptions, "to"> & ComponentProps<typeof LoginCodeEmail>) =>
  sendEmail({
    to,
    subject: `Accedi a ${brandName}`,
    html: await render(<LoginCodeEmail {...props} />),
  });
