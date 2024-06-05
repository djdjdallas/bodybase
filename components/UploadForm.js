"use client";
import { useState } from "react";
import Papa from "papaparse";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/utils/supabaseClient";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("No file selected");
      return;
    }

    setUploading(true);
    setError(null);

    // Upload the file to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(`fitness_clients/${file.name}`, file);

    if (uploadError) {
      console.error("Error uploading file: ", uploadError);
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    console.log("File uploaded successfully: ", uploadData);

    // Fetch the uploaded file from Supabase storage
    const { data: downloadData, error: downloadError } = await supabase.storage
      .from("uploads")
      .download(`fitness_clients/${file.name}`);

    if (downloadError) {
      console.error("Error downloading file: ", downloadError);
      setError(downloadError.message);
      setUploading(false);
      return;
    }

    // Read the file as text
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;

      // Parse the CSV data
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const parsedData = results.data;

          // Log the parsed data
          console.log("Parsed CSV Data:", parsedData);

          // Check for null values in the required fields
          for (const row of parsedData) {
            if (
              !row.first_name ||
              !row.last_name ||
              !row.date_of_birth ||
              !row.email
            ) {
              setError("Missing required fields in the CSV data");
              setUploading(false);
              return;
            }
          }

          // Insert parsed data into the database
          const { data: insertData, error: insertError } = await supabase
            .from("fitness_clients")
            .insert(parsedData);

          if (insertError) {
            console.error("Error inserting data: ", insertError);
            setError(insertError.message);
          } else {
            console.log("Data inserted successfully: ", insertData);
          }

          setUploading(false);
        },
      });
    };
    reader.readAsText(downloadData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload Fitness Data</CardTitle>
          <CardDescription>
            Upload a CSV file with your fitness data to get personalized
            insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="file">Select File</Label>
              <Input type="file" id="file" onChange={handleFileChange} />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
