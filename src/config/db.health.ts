import { supabase } from "./supabase.client";

export const checkDbConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("conversations")
      .select("id")
      .limit(1);

    if (error) {
      throw error;
    }

    console.log("Supabase DB connected successfully");
    return true;
  } catch (err: any) {
    console.error("Supabase DB connection failed");
    console.error(err.message || err);
    return false;
  }
};
