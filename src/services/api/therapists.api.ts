export async function getTherapists() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/users/therapists`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch therapists. Backend might be down:", error);
    return [];
  }
}
