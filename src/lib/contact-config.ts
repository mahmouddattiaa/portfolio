function validEmail(value: string | undefined) {
  return Boolean(value && /^\S+@\S+\.\S+$/.test(value));
}

export function getContactConfig() {
  const provider = process.env.CONTACT_PROVIDER;
  const formId = process.env.FORMSPREE_FORM_ID;
  // Server-side fallback (used by the API route).
  const fallbackEmail = process.env.CONTACT_FALLBACK_EMAIL;
  // Public fallback (NEXT_PUBLIC_*) so the route hero can render the verified
  // mailto link in both the available and unavailable form states without a
  // round trip. Sanitised on the server before being passed into the page.
  const publicFallbackEmail = process.env.NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL;
  return {
    enabled: provider === "formspree" && Boolean(formId),
    fallbackEmail: validEmail(fallbackEmail)
      ? fallbackEmail
      : validEmail(publicFallbackEmail)
        ? publicFallbackEmail
        : undefined,
  };
}
