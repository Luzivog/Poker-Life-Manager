import { supabase } from "../Auth.native";
import { Session } from "@/config/types";
import { Alert } from "react-native";

export interface SessionWithId extends Session {
  id: string;
}

/**
 * Fetches all sessions from the database
 * @returns An array of sessions with their IDs
 */
export const fetchSessions = async (): Promise<{ 
  sessions: SessionWithId[];
  error: Error | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('start_time', { ascending: false });
    
    if (error) {
      console.error('Error fetching sessions:', error);
      return { sessions: [], error: new Error(error.message) };
    }
    
    return { sessions: data || [], error: null };
  } catch (error) {
    console.error('Exception fetching sessions:', error);
    return { 
      sessions: [], 
      error: error instanceof Error ? error : new Error('An unknown error occurred') 
    };
  }
};

/**
 * Saves a new session to the database
 * @param session The session to save
 * @param userId The ID of the user creating the session
 * @returns The created session or null if there was an error
 */
export const saveSession = async (
  session: Session,
  userId: string
): Promise<{
  session: SessionWithId | null;
  error: Error | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: userId,
        game_type: session.game_type,
        small_blind: session.small_blind,
        big_blind: session.big_blind,
        buy_in: session.buy_in,
        cash_out: session.cash_out,
        table_size: session.table_size,
        location: session.location,
        start_time: session.start_time.toISOString(),
        end_time: session.end_time.toISOString(),
        stack_size_updates: session.stack_size_updates,
        notes: session.notes
      })
      .select();
    
    if (error) {
      console.error('Error saving session:', error);
      return { session: null, error: new Error(error.message) };
    }
    
    return { session: data?.[0] || null, error: null };
  } catch (error) {
    console.error('Exception saving session:', error);
    return { 
      session: null, 
      error: error instanceof Error ? error : new Error('An unknown error occurred') 
    };
  }
};

/**
 * Updates an existing session in the database
 * @param session The session data to update
 * @param sessionId The ID of the session to update
 * @returns The updated session or null if there was an error
 */
export const updateSession = async (
  session: Session,
  sessionId: string
): Promise<{
  session: SessionWithId | null;
  error: Error | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .update({
        game_type: session.game_type,
        small_blind: session.small_blind,
        big_blind: session.big_blind,
        buy_in: session.buy_in,
        cash_out: session.cash_out,
        table_size: session.table_size,
        location: session.location,
        start_time: session.start_time.toISOString(),
        end_time: session.end_time.toISOString(),
        stack_size_updates: session.stack_size_updates,
        notes: session.notes
      })
      .eq('id', sessionId)
      .select();
    
    if (error) {
      console.error('Error updating session:', error);
      return { session: null, error: new Error(error.message) };
    }
    
    return { session: data?.[0] || null, error: null };
  } catch (error) {
    console.error('Exception updating session:', error);
    return { 
      session: null, 
      error: error instanceof Error ? error : new Error('An unknown error occurred') 
    };
  }
};