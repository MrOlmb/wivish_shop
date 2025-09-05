import { Client } from "@elastic/elasticsearch";

if (!process.env.ELASTICSEARCH_CLOUD_ID) {
  throw new Error('ELASTICSEARCH_CLOUD_ID is not defined in the environment variables');
}

const client = process.env.ELASTICSEARCH_CLOUD_ID ? new Client({
  cloud: {
    id: process.env.ELASTICSEARCH_CLOUD_ID || "",
  },
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY || "",
  },
}) : null;

export default client;
