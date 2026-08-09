function validEmail(value: string | undefined) {
  return Boolean(value && /^\S+@\S+\.\S+$/.test(value));
}

export function getContactConfig() {
  const provider = process.env.CONTACT_PROVIDER;
  const formId = process.env.FORMSPREE_FORM_ID;
  const fallbackEmail = process.env.CONTACT_FALLBACK_EMAIL;
  return {
    enabled: provider === "formspree" && Boolean(formId),
    fallbackEmail: validEmail(fallbackEmail) ? fallbackEmail : undefined,
  };
}
