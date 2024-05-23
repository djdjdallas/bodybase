// app/dashboard/page.js

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
export default async function Dashboard() {
  return (
    <main className="min-h-screen min-w-[300px] pb-24">
      <section className="max-w-xl space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
      </section>
    </main>
  );
}
