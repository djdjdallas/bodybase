// /app/api/calendar/route.js
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export async function GET(req) {
  const session = await getServerSession({ req, authOptions });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  auth.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth });

  try {
    const calendarRes = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    return new Response(JSON.stringify(calendarRes.data.items), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Google Calendar events:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Google Calendar events" }),
      {
        status: 500,
      }
    );
  }
}
