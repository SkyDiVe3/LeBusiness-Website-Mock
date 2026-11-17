"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus("submitting");
    setFeedback(null);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries()))
      });
      if (response.ok) {
        setStatus("success");
        setFeedback("Multumim. Mesajul a fost validat si transmis echipei DoingBusiness.ro.");
        formElement.reset();
      } else {
        setStatus("error");
        setFeedback("Verifica prenumele, numele, adresa de email si mesajul (minim 10 caractere).");
      }
    } catch {
      setStatus("error");
      setFeedback("Conexiunea a esuat. Incearca din nou.");
    }
  }

  return (
    <form onSubmit={(event) => void submit(event)} className="contact-form-grid">
      <div className="contact-form-2col">
        <div className="field-group">
          <label className="field-label" htmlFor="form_firstname">
            Prenume *
          </label>
          <input
            id="form_firstname"
            required
            minLength={2}
            className="field"
            name="firstName"
            autoComplete="given-name"
            placeholder="Introduceti prenumele *"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="form_lastname">
            Nume *
          </label>
          <input
            id="form_lastname"
            required
            minLength={2}
            className="field"
            name="lastName"
            autoComplete="family-name"
            placeholder="Introduceti numele *"
          />
        </div>
      </div>

      <div className="contact-form-2col">
        <div className="field-group">
          <label className="field-label" htmlFor="form_email">
            Email *
          </label>
          <input
            id="form_email"
            required
            className="field"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Introduceti email-ul *"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="form_phone">
            Telefon
          </label>
          <input
            id="form_phone"
            className="field"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Introduceti telefonul"
          />
        </div>
      </div>

      <div className="contact-form-2col">
        <div className="field-group">
          <label className="field-label" htmlFor="form_company">
            Companie
          </label>
          <input
            id="form_company"
            className="field"
            name="company"
            autoComplete="organization"
            placeholder="Introduceti compania"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="form_position">
            Pozitia
          </label>
          <input
            id="form_position"
            className="field"
            name="position"
            autoComplete="organization-title"
            placeholder="Introduceti functia"
          />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="form_message">
          Mesaj *
        </label>
        <textarea
          id="form_message"
          required
          minLength={10}
          className="field"
          name="message"
          rows={5}
          placeholder="Mesajul pentru noi *"
        />
      </div>

      <label className="sr-only">
        Nu completa acest camp
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div>
        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Se trimite..." : "Trimite mesajul"}
        </button>
      </div>

      {status === "success" && feedback ? (
        <p role="status" className="notice notice-success">
          {feedback}
        </p>
      ) : null}

      {status === "error" && feedback ? (
        <p role="alert" className="notice notice-error">
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
