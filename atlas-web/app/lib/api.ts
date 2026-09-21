export type JourneyRequest = {
  id: string;
  full_name: string;
  nationality: string;
  current_country: string;
  destination_country: string;
  has_passport?: boolean;
  passport_valid?: boolean;
  has_criminal_record_certificate?: boolean;
  criminal_record_apostilled?: boolean;
  has_visa?: boolean;
};

export type JourneyResponse = {
  explorer_id: string;
  destination: string;
  next_step: string;
};

const CORE_URL = process.env.ATLAS_CORE_URL;

export async function getCoreHealth(): Promise<boolean> {
  if (!CORE_URL) {
    return false;
  }

  try {
    const response = await fetch(`${CORE_URL}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function getNextStep(
  request: JourneyRequest,
): Promise<JourneyResponse | null> {
  if (!CORE_URL) {
    return null;
  }

  try {
    // Atlas Core currently exposes this route without the RFC-008 /api/v1
    // prefix. Keep the transport adapter aligned with the deployed contract;
    // versioning can be introduced in the backend as a separate change.
    const response = await fetch(`${CORE_URL}/journeys/next-step`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as JourneyResponse;
  } catch {
    return null;
  }
}
