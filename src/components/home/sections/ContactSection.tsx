import React, { useId, useState } from "react";
import Reveal from "./Reveal";
import { CalendarIcon, MailIcon } from "./icons";
import CalLink from "../../shared/CalLink";
import { CONTACT_EMAIL, CONTACT_ID, SOCIALS } from "./homeLinks";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (v: Record<Field, string>, consent: boolean): Errors => {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Escribe tu nombre.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Escribe un email válido, por ejemplo tu@empresa.com.";
  if (v.message.trim().length < 10) e.message = "Cuéntame un poco más (mínimo 10 caracteres).";
  if (!consent) e.consent = "Necesito tu aceptación de la política de privacidad para responderte.";
  return e;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjywvjgd";

const buildMailto = (v: Record<Field, string>) => {
  const subject = `Proyecto — ${v.name.trim()}`;
  const body = `${v.message.trim()}\n\n—\n${v.name.trim()}\n${v.email.trim()}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

type SendState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; mailto: string };

interface FormspreeError {
  errors?: { message?: string }[];
  error?: string;
}

const readError = async (res: Response): Promise<string> => {
  try {
    const data = (await res.json()) as FormspreeError;
    const msg = data.errors?.map((x) => x.message).filter(Boolean).join(" ") || data.error;
    if (msg) return msg;
  } catch {
    /* respuesta sin JSON */
  }
  return `El servidor respondió con un error (${res.status}).`;
};

/**
 * Contacto: valida en el cliente y envía a Formspree (fetch + JSON).
 * Solo muestra éxito si la respuesta es ok; si falla, ofrece el email directo.
 */
const ContactSection: React.FC = () => {
  const uid = useId();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [send, setSend] = useState<SendState>({ kind: "idle" });
  const [gotcha, setGotcha] = useState("");
  const [consent, setConsent] = useState(false);

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
    gotcha: `${uid}-gotcha`,
    consent: `${uid}-consent`,
    status: `${uid}-status`,
  };

  const sending = send.kind === "sending";

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (send.kind === "success" || send.kind === "error") setSend({ kind: "idle" });
    if (touched) setErrors(validate(next, consent));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setTouched(true);
    const errs = validate(values, consent);
    setErrors(errs);
    const first = (Object.keys(errs) as (Field | "consent")[])[0];
    if (first) {
      document.getElementById(ids[first])?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      privacidad_aceptada: "Sí (política de privacidad del sitio)",
      _subject: `Nuevo mensaje desde el portfolio — ${values.name.trim()}`,
      _gotcha: gotcha,
    };
    const mailto = buildMailto(values);
    setSend({ kind: "sending" });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSend({ kind: "success" });
        setValues({ name: "", email: "", message: "" });
        setConsent(false);
        setTouched(false);
        setErrors({});
      } else {
        setSend({ kind: "error", message: await readError(res), mailto });
      }
    } catch {
      setSend({
        kind: "error",
        message: "No pude conectar con el servidor. Revisa tu conexión.",
        mailto,
      });
    }
  };

  const errorId = (f: Field) => `${ids[f]}-error`;
  const fieldProps = (f: Field) => ({
    id: ids[f],
    name: f,
    value: values[f],
    onChange: update(f),
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? errorId(f) : undefined,
    required: true,
  });

  return (
    <section className="contact" id={CONTACT_ID} aria-labelledby="contacto-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="wrap contact__grid">
        <Reveal className="contact__info">
          <h2 className="h2" id="contacto-title">
            Construyamos
            <br />
            <em>algo que funcione.</em>
          </h2>
          <p className="sec-head__sub">
            Cuéntame qué quieres resolver. Suelo responder en menos de 24 horas.
          </p>
          <div className="channels">
            <a className="channel" href={`mailto:${CONTACT_EMAIL}`}>
              <span className="ico"><MailIcon /></span>
              <div>
                <small>Email</small>
                <b>{CONTACT_EMAIL}</b>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
            <CalLink className="channel" aria-label="Agendar llamada de 30 minutos (Cal.com)">
              <span className="ico"><CalendarIcon /></span>
              <div>
                <small>Agendar llamada</small>
                <b>Videollamada · 30 min</b>
              </div>
              <i aria-hidden="true">↗</i>
            </CalLink>
          </div>
          <ul className="socials" aria-label="Redes sociales">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name}: ${s.handle} (se abre en otra pestaña)`}
                >
                  <span>{s.name}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form className="form" noValidate onSubmit={onSubmit} aria-labelledby="contacto-title" aria-busy={sending || undefined}>
            <label htmlFor={ids.name}>
              <span>Nombre</span>
              <input type="text" autoComplete="name" placeholder="Tu nombre" {...fieldProps("name")} />
              {errors.name ? <small className="form__err" id={errorId("name")}>{errors.name}</small> : null}
            </label>
            <label htmlFor={ids.email}>
              <span>Email</span>
              <input type="email" autoComplete="email" inputMode="email" placeholder="tu@empresa.com" {...fieldProps("email")} />
              {errors.email ? <small className="form__err" id={errorId("email")}>{errors.email}</small> : null}
            </label>
            <label htmlFor={ids.message}>
              <span>Mensaje</span>
              <textarea rows={5} placeholder="Cuéntame sobre tu negocio y qué te gustaría automatizar…" {...fieldProps("message")} />
              {errors.message ? <small className="form__err" id={errorId("message")}>{errors.message}</small> : null}
            </label>
            <div className="form__consent">
              <input
                id={ids.consent}
                type="checkbox"
                checked={consent}
                required
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? `${ids.consent}-error` : undefined}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (touched) setErrors(validate(values, e.target.checked));
                }}
              />
              <label htmlFor={ids.consent}>
                Acepto la{" "}
                <a href="/privacidad" target="_blank" rel="noopener">política de privacidad</a>
              </label>
              {errors.consent ? <small className="form__err" id={`${ids.consent}-error`}>{errors.consent}</small> : null}
            </div>
            {/* Honeypot anti-spam (Formspree): invisible para personas */}
            <div className="form__hp" aria-hidden="true">
              <label htmlFor={ids.gotcha}>No completes este campo</label>
              <input
                id={ids.gotcha}
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
              />
            </div>
            <div className="form__foot">
              <button className="btn btn--dark" type="submit" disabled={sending} aria-disabled={sending || undefined}>
                {sending ? "Enviando…" : "Enviar mensaje"} <i className="arr" aria-hidden="true">↗</i>
              </button>
            </div>
            <div id={ids.status} role="status" aria-live="polite" className="form__live">
              {send.kind === "success" ? (
                <p className="form__status form__status--ok">¡Gracias! Te respondo pronto.</p>
              ) : null}
              {send.kind === "sending" ? <span className="sr-only">Enviando mensaje…</span> : null}
            </div>
            <div role="alert" className="form__live">
              {send.kind === "error" ? (
                <p className="form__status form__status--err">
                  No se pudo enviar el mensaje: {send.message.replace(/[.\s]*$/, ".")}{" "}
                  Puedes escribirme directamente a{" "}
                  <a href={send.mailto}>{CONTACT_EMAIL}</a>.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
