"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "../../lib/contact-schema";
import { getWhatsAppUrl, getCallUrl } from "../../lib/site-utils";

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

    setErrors({});
    setStatus("success");
  };

  const studioPhone = "+91 94669 40493";
  const whatsappBriefText = `Hello ARCHITECT Studio (Sector 57, Gurugram). I am submitting a project enquiry:
• Name: ${values.fullName || "Prospective Client"}
• Phone: ${values.phone || "Not specified"}
• Project Type: ${values.projectType || "General Architectural Consultation"}
• Location: ${values.projectLocation || "Sector 57 / Gurugram"}
• Budget Range: ${values.budget || "To Discuss"}
• Details: ${values.description || "Looking to discuss spatial planning and design direction."}`;

  const whatsappUrl = getWhatsAppUrl(studioPhone, whatsappBriefText);
  const callUrl = getCallUrl(studioPhone);

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="concept-strip mb-6 bg-stone-900/40 border border-white/10 p-4 rounded-xl">
        <p className="concept-note text-xs text-stone-300 m-0 leading-relaxed">
          <span>
            <strong>Sector 57 Studio Consultation:</strong> Share your project location and spatial brief below to preview your enquiry, or connect directly with our design team via WhatsApp.
          </span>
        </p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="e.g. Vikramaditya Sharma"
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
          />
          {errors.fullName ? <span className="form-error">{errors.fullName}</span> : null}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
          {errors.phone ? <span className="form-error">{errors.phone}</span> : null}
        </div>

        <div className="form-field">
          <label htmlFor="email">
            Email address <span>(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="contact@domain.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
          />
          {errors.email ? <span className="form-error">{errors.email}</span> : null}
        </div>

        <div className="form-field">
          <label htmlFor="projectType">Project type</label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(event) => update("projectType", event.target.value)}
          >
            <option value="">Choose one</option>
            <option value="residential">Luxury Residential Villa</option>
            <option value="commercial">Commercial / Workplace</option>
            <option value="interior">Interior / Spatial Planning</option>
            <option value="glass-facade">Structural Glass & Façade</option>
            <option value="visualization">Visualization / Massing Study</option>
            <option value="other">Bespoke Scope</option>
          </select>
          {errors.projectType ? <span className="form-error">{errors.projectType}</span> : null}
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="projectLocation">Project location</label>
          <input
            id="projectLocation"
            name="projectLocation"
            autoComplete="street-address"
            placeholder="e.g. Sector 57, Golf Course Extension, DLF Phase 1, Gurugram"
            value={values.projectLocation}
            onChange={(event) => update("projectLocation", event.target.value)}
          />
          {errors.projectLocation ? <span className="form-error">{errors.projectLocation}</span> : null}
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="budget">
            Approximate budget range <span>(optional)</span>
          </label>
          <input
            id="budget"
            name="budget"
            placeholder="A range is helpful, if known"
            value={values.budget}
            onChange={(event) => update("budget", event.target.value)}
          />
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="description">Tell us about your spatial vision</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe your site, plot dimensions, daylight requirements, or architectural priorities..."
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
          />
          {errors.description ? <span className="form-error">{errors.description}</span> : null}
        </div>

        <label className="form-checkbox" htmlFor="consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span>
            I consent to these details being used by ARCHITECT - Sector 57 to assess this project enquiry.
          </span>
        </label>
        {errors.consent ? <span className="form-error">{errors.consent}</span> : null}
      </div>

      <div className="form-footer mt-6 pt-4 border-t border-stone-800">
        <div className="flex flex-wrap items-center gap-3">
          <button className="button" type="submit">
            Validate Brief
          </button>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="button bg-emerald-700 hover:bg-emerald-600 text-white border-transparent inline-flex items-center gap-2"
            >
              <MessageCircle size={15} /> WhatsApp Studio Directly
            </a>
          )}
          {callUrl && (
            <a
              href={callUrl}
              className="button button--outline inline-flex items-center gap-2"
            >
              <Phone size={14} /> Call {studioPhone}
            </a>
          )}
        </div>

        {status === "success" && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Enquiry Brief Validated</span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Your details are structured and ready. Click &ldquo;WhatsApp Studio Directly&rdquo; to send this enquiry straight to our Sector 57 architectural lead!
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
