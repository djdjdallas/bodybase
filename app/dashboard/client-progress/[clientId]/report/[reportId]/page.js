import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/app/utils/supabaseClient";
import { Button } from "@/components/ui/button";

const ViewProgressReportPage = ({ params }) => {
  const { clientId, reportId } = params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from("progress_reports")
        .select("*")
        .eq("client_id", clientId)
        .eq("id", reportId)
        .single();

      if (error) {
        console.error("Error fetching progress report: ", error);
      } else {
        setReport(data);
      }
      setLoading(false);
    };

    fetchReport();
  }, [clientId, reportId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Progress Report</CardTitle>
              <CardDescription>
                Detailed view of the client's progress report.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <strong>Report Date:</strong> {report.report_date}
                </div>
                <div>
                  <strong>Weight (kg):</strong> {report.weight}
                </div>
                <div>
                  <strong>Body Fat Percentage (%):</strong>{" "}
                  {report.body_fat_percentage}
                </div>
                <div>
                  <strong>Measurements:</strong>
                  <ul>
                    <li>Chest: {report.measurements.chest} cm</li>
                    <li>Waist: {report.measurements.waist} cm</li>
                    <li>Hips: {report.measurements.hips} cm</li>
                  </ul>
                </div>
                <div>
                  <strong>Notes:</strong> {report.notes}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ViewProgressReportPage;
