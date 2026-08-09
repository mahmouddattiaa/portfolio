import { NextRequest, NextResponse } from "next/server";
import { getContactConfig } from "@/lib/contact-config";
import { type Enquiry, validateEnquiry } from "@/lib/contact";

const requests = new Map<string, number[]>();
const limitWindow = 15 * 60 * 1000;
const limitCount = 5;

function limited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((time) => now - time < limitWindow);
  if (recent.length >= limitCount) return true;
  requests.set(key, [...recent, now]);
  return false;
}

export async function POST(request: NextRequest) {
  const config = getContactConfig();
  if (!config.enabled) return NextResponse.json({ error: "Online enquiry delivery is not available." }, { status: 503 });
  if (limited(request)) return NextResponse.json({ error: "Please wait before trying again." }, { status: 429 });

  let values: Partial<Enquiry>;
  try { const body: unknown = await request.json(); values = body && typeof body === "object" ? body as Partial<Enquiry> : {}; } catch { return NextResponse.json({ error: "The form could not be read." }, { status: 400 }); }
  if (values.website) return NextResponse.json({ ok: true });
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const formId = process.env.FORMSPREE_FORM_ID;
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: values.name, email: values.email, company: values.company, country: values.country, problem: values.problem, outcome: values.outcome, offer: values.offer, timing: values.timing, budget: values.budget, link: values.link }),
    });
    if (!response.ok) return NextResponse.json({ error: "We could not send your enquiry. Your details are still available here—please try again." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not reach the enquiry service. Your details are still available here—please try again." }, { status: 503 });
  }
}
