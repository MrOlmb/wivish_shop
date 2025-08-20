import { NextResponse } from "next/server";

// Define product type
interface Product {
  name: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("search");

  if (!q || typeof q !== "string") {
    return NextResponse.json(
      {
        message: "Invalid search query",
      },
      { status: 400 }
    );
  }

  try {
    // Temporarily return empty results for testing
    // TODO: Re-enable Elasticsearch when environment variables are configured
    const results: Product[] = [];

    // Return results as a JSON response
    return NextResponse.json(results);
  } catch (error: any) {
    // Log the error and return a response
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
