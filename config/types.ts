export const GAME_TYPES = ["NL Hold'em", "Pot Limit Omaha"] as const;
export const TABLE_SIZES = ["10-max", "9-max", "7-max", "6-max", "5-max", "4-max", "3-max", "heads-up"] as const;
export const SESSION_STATUS = ["live", "completed"] as const;

// The base contains all common properties for every session
interface BaseSession {
  game_type: typeof GAME_TYPES[number];
  small_blind: number;
  big_blind: number;
  buy_in: number;
  table_size: typeof TABLE_SIZES[number];
  location: string;
  start_time: Date;
  stack_size_updates: { time: Date; stack_size: number }[];
  notes: string;
}

// A live session is ongoing: it has no end_time or cash_out
export interface LiveSession extends BaseSession {
  status: 'live';
  end_time?: undefined;
  cash_out?: undefined;
}

// A completed session must have an end_time and a cash_out
export interface CompletedSession extends BaseSession {
  status: 'completed';
  end_time: Date;
  cash_out: number;
}

// The Session type can be either a live or a completed session
export type Session = LiveSession | CompletedSession;

// The SessionWithId type extends the Session type with an id property
export type SessionWithId = Session & { id: string };
export type CompletedSessionWithId = CompletedSession & { id: string };
export type LiveSessionWithId = LiveSession & { id: string };