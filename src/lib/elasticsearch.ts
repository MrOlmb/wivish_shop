import { Client } from "@elastic/elasticsearch";

// Temporarily disable Elasticsearch client for testing
// TODO: Configure proper Elasticsearch credentials
const client = process.env.ELASTICSEARCH_CLOUD_ID ? new Client({
  cloud: {
    id: process.env.ELASTICSEARCH_CLOUD_ID,
  },
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY || "",
  },
}) : null;

export default client;
