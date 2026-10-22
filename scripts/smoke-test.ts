import assert from "node:assert/strict";
import { BUSINESS_DEMOS } from "../src/data/business-demos";
import { contactFormSchema } from "../src/lib/contact-schema";
import { getBusinessDemo, resolveDemoRoute } from "../src/lib/demo-route-resolver";

const demo = BUSINESS_DEMOS["architect-sector-57"];
assert.ok(demo, "the architecture demo should be registered");
assert.equal(demo.contact.phone, "+91 94669 40493");
assert.equal(demo.noIndex, true);

const validRoutes: readonly (readonly string[])[] = [
  [],
  ["about"],
  ["services"],
  ["services", "architectural-planning"],
  ["services", "glass-facade-solutions"],
  ["services", "interior-spatial-planning"],
  ["services", "3d-visualization"],
  ["projects"],
  ["projects", "courtyard-residence"],
  ["projects", "lightwell-house"],
  ["projects", "urban-glass-house"],
  ["projects", "warm-minimal-interior"],
  ["process"],
  ["insights"],
  ["insights", "planning-home-natural-light"],
  ["insights", "glass-stone-timber-material-harmony"],
  ["insights", "questions-before-architecture-project"],
  ["faq"],
  ["contact"],
  ["privacy"],
  ["terms"],
];

for (const path of validRoutes) {
  assert.ok(resolveDemoRoute("architect-sector-57", path), `route should resolve: ${path.join("/")}`);
}

assert.equal(getBusinessDemo("unknown-business"), null);
assert.equal(resolveDemoRoute("architect-sector-57", ["not-a-page"]), null);
assert.equal(resolveDemoRoute("architect-sector-57", ["projects", "missing-project"]), null);

const validForm = contactFormSchema.safeParse({
  fullName: "Asha Kapoor",
  phone: "+91 90000 00000",
  email: "asha@example.com",
  projectType: "residential",
  projectLocation: "Sector 57, Gurugram",
  budget: "To discuss",
  description: "We are exploring a calm family home with a shaded courtyard.",
  consent: true,
});
assert.equal(validForm.success, true);

const invalidForm = contactFormSchema.safeParse({
  fullName: "",
  phone: "",
  email: "not-an-email",
  projectType: "",
  projectLocation: "",
  description: "short",
  consent: false,
});
assert.equal(invalidForm.success, false);

process.stdout.write("smoke tests passed: registry, route boundaries and contact validation\n");
