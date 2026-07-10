const API_URL =
  import.meta.env["VITE_CONTACT_API_URL"] ?? "http://localhost:3000";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactApiError = {
  field: string;
  message: string;
};

export type ContactApiResponse = {
  success: boolean;
  message: string;
  errors?: ContactApiError[];
};

export async function submitContactForm(
  data: ContactPayload,
): Promise<ContactApiResponse> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = (await res.json()) as ContactApiResponse;
  return json;
}
