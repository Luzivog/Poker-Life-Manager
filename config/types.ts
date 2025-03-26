export const GAME_TYPES = ["NL Hold'em", "Pot Limit Omaha"] as const;
export const TABLE_SIZES = ["10-max", "9-max", "7-max", "6-max", "5-max", "4-max", "3-max", "heads-up"] as const;

export interface Session {
  game_type: typeof GAME_TYPES[number];
  small_blind: number;
  big_blind: number;
  buy_in: number;
  cash_out: number;
  table_size: typeof TABLE_SIZES[number];
  location: string;
  start_time: Date;
  end_time: Date;
  stack_size_updates: { time: Date; stack_size: number }[];
  notes: string;
}
