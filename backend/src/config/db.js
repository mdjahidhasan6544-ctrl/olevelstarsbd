import mongoose from "mongoose";

function getFallbackUri() {
  if (process.env.MONGO_URI_FALLBACK?.trim()) {
    return process.env.MONGO_URI_FALLBACK.trim();
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return "mongodb://127.0.0.1:27017/olevelstars";
}

async function connectWithUri(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });
}

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI?.trim();

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  try {
    await connectWithUri(mongoUri);
  } catch (error) {
    const fallbackUri = getFallbackUri();

    if (!fallbackUri || fallbackUri === mongoUri) {
      throw error;
    }

    const isSrvDnsIssue = error?.message?.includes("querySrv ENOTFOUND");

    if (!isSrvDnsIssue) {
      throw error;
    }

    console.warn(`Primary MongoDB SRV connection failed (${error.message}). Trying fallback URI.`);
    await connectWithUri(fallbackUri);
  }
}
