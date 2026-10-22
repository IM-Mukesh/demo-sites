import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phone: z.string().trim().min(7, "Please enter a phone number."),
  email: z.string().trim().email("Please enter a valid email address.").optional().or(z.literal("")),
  projectType: z.string().min(1, "Please choose a project type."),
  projectLocation: z.string().trim().min(2, "Please add the project location."),
  budget: z.string().optional(),
  description: z.string().trim().min(20, "Please share a little more about the project."),
  consent: z.boolean().refine((value) => value, "Please confirm that we may use these details for this enquiry."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
