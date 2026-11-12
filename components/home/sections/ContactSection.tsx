import React, { useId, useState } from "react";
import Reveal from "./Reveal";
import { MailIcon } from "./icons";
import { CONTACT_EMAIL, CONTACT_ID, SOCIALS } from "./homeLinks";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (v: Record<Field, string>): Errors => {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Escribe tu nombre.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Escribe un email válido, por ejemplo tu@empresa.com.";
  if (v.message.trim().length < 10) e.message = "Cuéntame un poco más (mínimo 10 caracteres).";
  return e;
};

const buildMailto = (v: Record<Field, string>) => {
  const subject = `Proyecto — ${v.name.trim()}`;
  const body = `${v.message.trim()}\n\n—\n${v.name.trim()}\n${v.email.trim()}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Contacto. No hay backend todavía: el formulario valida y abre el correo
 * del visitante con el mensaje listo (mailto). No finge un envío.
 */
const ContactSection: React.FC = () => {
  const uid = useId();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [opened, setOpened] = useState(false);

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
    note: `${uid}-note`,
    status: `${uid}-status`,
  };

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    setOpened(false);
    if (touched) setErrors(validate(next));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(values);
    setErrors(errs);
    const first = (Object.keys(errs) as Field[])[0];
    if (first) {
      document.getElementById(ids[first])?.focus();
      return;
    }
    window.location.href = buildMailto(values);
    setOpened(true);
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
          <p className="eyebrow">05 — Contacto</p>
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
                  <em>{s.handle}</em>
                  <i aria-hidden="true">↗</i>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form className="form" noValidate onSubmit={onSubmit} aria-labelledby="contacto-title" aria-describedby={ids.note}>
            <div className="form__head" aria-hidden="true">
              <span className="dots"><i /><i /><i /></span>
              <span className="tag">Nuevo mensaje</span>
            </div>
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
            <div className="form__foot">
              <small id={ids.note}>
                Al enviar se abrirá tu app de correo con el mensaje listo para mandarlo a {CONTACT_EMAIL}.
              </small>
              <button className="btn btn--dark" type="submit">
                Enviar mensaje <i className="arr" aria-hidden="true">↗</i>
              </button>
            </div>
            <p className="form__status" id={ids.status} role="status" aria-live="polite">
              {opened
                ? `Abrimos tu app de correo con el mensaje listo. Si no se abrió, escríbeme directamente a ${CONTACT_EMAIL}.`
                : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
