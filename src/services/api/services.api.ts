export async function getServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/services`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch services. Backend might be down:", error);
    return [];
  }
}
