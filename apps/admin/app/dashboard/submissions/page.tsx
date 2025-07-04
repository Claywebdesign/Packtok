import { fetchJson } from "../../../lib/fetcher";
import { Submission } from "../../../hooks";
import { SubmissionsTable } from "./_components/submissions-table";

async function getSubmissions(): Promise<Submission[]> {
  try {
    return await fetchJson<Submission[]>("/api/v1/admins/submissions");
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return [];
  }
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Submissions
          </h1>
          <p className="text-gray-600">
            Review and moderate user-submitted products
          </p>
        </div>
      </div>

      <SubmissionsTable initialSubmissions={submissions} />
    </div>
  );
}
