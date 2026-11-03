const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteTableId: import.meta.env.VITE_APPWRITE_TABLE_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  tinyMceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

const missingValues = Object.entries(conf)
  .filter(([, value]) => !value || !value.trim())
  .map(([key]) => key);

if (missingValues.length > 0) {
  throw new Error(
    `Missing Appwrite configuration: ${missingValues.join(", ")}`
  );
}

export default conf;