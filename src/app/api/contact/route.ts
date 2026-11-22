import { NextRequest, NextResponse } from "next/server";
import { getContactConfig } from "@/lib/contact-config";
import { type Enquiry, toProviderPayload, validateEnquiry } from "@/lib/contact";

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

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function stringField(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

export async function POST(request: NextRequest) {
  const config = getContactConfig();
  if (!config.enabled) return NextResponse.json({ error: "Online enquiry delivery is not available." }, { status: 503 });
  if (limited(request)) return NextResponse.json({ error: "Please wait before trying again." }, { status: 429 });

  let body: Record<string, unknown> | undefined;
  try {
    body = record(await request.json());
  } catch {
    return NextResponse.json({ error: "The form could not be read." }, { status: 400 });
  }
  if (!body) return NextResponse.json({ error: "The form could not be read." }, { status: 400 });
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const values: Partial<Enquiry> = {
    name: stringField(body.name),
    company: stringField(body.company),
    email: stringField(body.email),
    offer: stringField(body.offer) as Enquiry["offer"] | undefined,
    timing: body.timing === undefined ? undefined : body.timing as Enquiry["timing"],
    problem: stringField(body.problem),
    website: stringField(body.website),
  };
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  if (!config.providerUrl) return NextResponse.json({ error: "Online enquiry delivery is not available." }, { status: 503 });
  try {
    const response = await fetch(config.providerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(toProviderPayload(values as Enquiry)),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "We could not send your enquiry. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We could not reach the enquiry service. Please try again." },
      { status: 503 },
    );
  }
}
