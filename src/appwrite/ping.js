import { client } from "./client";

let pingStarted = false;

export function pingAppwrite() {
  if (pingStarted) return;
  pingStarted = true;

  client
    .ping()
    .then((response) => {
      console.log("Appwrite connection successful:", response);
    })
    .catch((error) => {
      console.error("Appwrite connection failed:", error);
      pingStarted = false;
    });
}