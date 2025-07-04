import { fetchJson } from "../../../lib/fetcher";
import { QuoteRequest } from "../../../types/product";
import { QuotesStats } from "./_components/quotes-stats";
import { QuotesTable } from "./_components/quotes-table";

async function getQuotes(): Promise<QuoteRequest[]> {
  try {
    return await fetchJson<QuoteRequest[]>("/api/v1/admins/quotes");
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return [];
  }
}

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Requests</h1>
          <p className="text-muted-foreground">
            Manage customer quote requests
          </p>
        </div>
      </div>

      <QuotesStats quotes={quotes} />
      <QuotesTable initialQuotes={quotes} />
    </div>
  );
}
