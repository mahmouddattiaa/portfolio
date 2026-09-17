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
  // Optional server-side endpoint override. Defaults to the real Formspree URL
  // when unset so production traffic stays unchanged. The override exists so
  // local QA can point /api/contact at a tiny mock without touching Formspree.
  const overrideEndpoint = process.env.CONTACT_PROVIDER_ENDPOINT?.trim();
  const providerUrl = overrideEndpoint && /^https?:\/\//i.test(overrideEndpoint)
    ? overrideEndpoint
    : formId
      ? `https://formspree.io/f/${formId}`
      : undefined;
  return {
    enabled: provider === "formspree" && Boolean(formId),
    providerUrl,
    fallbackEmail: validEmail(fallbackEmail)
      ? fallbackEmail
      : validEmail(publicFallbackEmail)
        ? publicFallbackEmail
        : undefined,
  };
}
