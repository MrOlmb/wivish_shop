import { NextResponse } from "next/server";
import client from "@/lib/elasticsearch";

// Define product type
interface Product {
  name: string;
  link: string;
  image: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || searchParams.get("search"); // Accept both q and search parameters

  if (!q || typeof q !== "string") {
    return NextResponse.json(
      {
        message: "Invalid search query",
      },
      { status: 400 }
    );
  } 

  try {
    if (!client) {
      return NextResponse.json(
        { error: 'Elasticsearch client is not initialized' },
        { status: 500 }
      );
    };
    // Search for products in Elasticsearch
    const searchResponse = await client.search({
      index: "products",
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ["name^2", "link"], // Boost name field for better relevance
            type: "best_fields",
            fuzziness: "AUTO" // Allow fuzzy matching for typos
          }
        },
        size: 20 // Limit to 20 results
      }
    });

    // Extract results from Elasticsearch response
    const results: Product[] = searchResponse.hits.hits.map((hit: any) => ({
      name: hit._source.name,
      link: hit._source.link,
      image: hit._source.image
    }));

    // Return results as a JSON response
    return NextResponse.json(results);
  } catch (error: any) {
    // Log the error and return a response
    console.error("Search error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
