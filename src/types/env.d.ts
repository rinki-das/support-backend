declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    GROQ_API_KEY: string;
  }
}
