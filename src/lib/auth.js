import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_DATABASE_URL);
const db = client.db("Freelance-Microtask-Platform");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,      // রোল না থাকলে সাইনআপ হবে না
        input: true,         // এটিই ক্লায়েন্ট থেকে ইনপুট নেওয়ার অনুমতি দেয়
        defaultValue: "freelancer", // কোনো রোল না দিলে ডিফল্ট এটা হবে
      },
    },
  },
  });