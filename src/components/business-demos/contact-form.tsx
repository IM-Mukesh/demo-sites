"use client";

import { useState, type FormEvent } from "react";
import { contactFormSchema, type ContactFormValues } from "../../lib/contact-schema";

const initialValues: ContactFormValues = {
  fullName: "",
  phone: "",
  email: "",
  projectType: "",
  projectLocation: "",
  budget: "",
  description: "",
  consent: false,
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const update = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    setStatus("idle");
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    // Demo mode intentionally stops here: no personal data is sent or logged.
    setErrors({});
    setStatus("success");
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="concept-strip" style={{ marginBottom: 28 }}>
        <p className="concept-note" style={{ margin: 0 }}>
          <span>This is a demo form. It validates your enquiry locally but does not send or store personal details until a delivery service is configured.</span>
        </p>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" name="fullName" autoComplete="name" value={values.fullName} onChange={(event) => update("fullName", event.target.value)} />
          {errors.fullName ? <span className="form-error">{errors.fullName}</span> : null}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} />
          {errors.phone ? <span className="form-error">{errors.phone}</span> : null}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address <span>(optional)</span></label>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} />
          {errors.email ? <span className="form-error">{errors.email}</span> : null}
        </div>
        <div className="form-field">
          <label htmlFor="projectType">Project type</label>
          <select id="projectType" name="projectType" value={values.projectType} onChange={(event) => update("projectType", event.target.value)}>
            <option value="">Choose one</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="interior">Interior / spatial planning</option>
            <option value="glass-facade">Glass / façade question</option>
            <option value="visualization">Visualization / concept study</option>
            <option value="other">Something else</option>
          </select>
          {errors.projectType ? <span className="form-error">{errors.projectType}</span> : null}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="projectLocation">Project location</label>
          <input id="projectLocation" name="projectLocation" autoComplete="street-address" placeholder="City, neighbourhood or site context" value={values.projectLocation} onChange={(event) => update("projectLocation", event.target.value)} />
          {errors.projectLocation ? <span className="form-error">{errors.projectLocation}</span> : null}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="budget">Approximate budget range <span>(optional)</span></label>
          <input id="budget" name="budget" placeholder="A range is enough, if known" value={values.budget} onChange={(event) => update("budget", event.target.value)} />
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="description">Tell us about the project</label>
          <textarea id="description" name="description" placeholder="What are you hoping to change, make or understand?" value={values.description} onChange={(event) => update("description", event.target.value)} />
          {errors.description ? <span className="form-error">{errors.description}</span> : null}
        </div>
        <label className="form-checkbox" htmlFor="consent">
          <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} />
          <span>I consent to these details being used to respond to this enquiry. I understand this demonstration does not currently transmit the form.</span>
        </label>
        {errors.consent ? <span className="form-error">{errors.consent}</span> : null}
      </div>
      <div className="form-footer">
        <button className="button" type="submit">Preview enquiry</button>
        {status === "success" ? <p className="form-status" role="status">Your enquiry is valid for the demo. No message was sent.</p> : <p className="muted" style={{ margin: 0, fontSize: "0.78rem" }}>Fields marked optional can be left blank.</p>}
      </div>
    </form>
  );
}
