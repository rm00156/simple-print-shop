import { handleContact } from "@/lib/handlers/contact";

export const runtime = "nodejs";

// The implementation lives in lib/ so the Cloudflare Worker can share it verbatim.
export function POST(request: Request) {
  return handleContact(request);
}
