import { Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("6acc68d6001dad0e12e9");

export { client };

