import { Session } from "./types";

export const COLORS = {
    primary: "#32a850",
    secondary: "#9adbaa",
    background: "#0F0F0F",
    red: "#ff3b30"
};

export const SESSION_DEFAULTS: Session = {
    game_type: "NL Hold'em",
    small_blind: 1,
    big_blind: 2,
    buy_in: 0,
    cash_out: 0,
    table_size: "9-max",
    location: "Playground Poker Club",
    start_time: new Date(),
    end_time: new Date(),
    stack_size_updates: [],
    notes: ""
};


export const SUPABASE_CONFIG = {
    url: "http://192.168.0.22:54321",
    anon_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
};
