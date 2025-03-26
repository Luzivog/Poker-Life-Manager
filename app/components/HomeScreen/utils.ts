import { SessionWithId } from "../../services/sessionService";
import { calculateDurationMs } from "../SessionDetails/utils";

// Statistics interface
export interface SessionStats {
  totalSessions: number;
  totalProfit: number;
  totalHours: number;
  avgProfit: number;
  avgHourlyRate: number;
  biggestWin: number;
  biggestLoss: number;
  winRate: number;
}

/**
 * Checks if a session is completed (not live)
 * @param session Session to check
 * @returns Boolean indicating if the session is completed
 */
export const isCompletedSession = (session: SessionWithId): boolean => {
  return (
    session.status === 'completed' &&
    session.end_time !== null && 
    session.cash_out !== null && 
    session.cash_out !== undefined
  );
};

/**
 * Calculates statistics from session data, excluding live sessions
 * @param sessions Array of user's poker sessions
 * @returns Object with calculated statistics
 */
export const calculateStats = (sessions: SessionWithId[]): SessionStats => {
  if (!sessions || sessions.length === 0) {
    return {
      totalSessions: 0,
      totalProfit: 0,
      totalHours: 0,
      avgProfit: 0,
      avgHourlyRate: 0,
      biggestWin: 0,
      biggestLoss: 0,
      winRate: 0
    };
  }

  // Filter out live sessions
  const completedSessions = sessions.filter(isCompletedSession);
  
  if (completedSessions.length === 0) {
    return {
      totalSessions: 0,
      totalProfit: 0,
      totalHours: 0,
      avgProfit: 0,
      avgHourlyRate: 0,
      biggestWin: 0,
      biggestLoss: 0,
      winRate: 0
    };
  }

  let totalProfit = 0;
  let totalDurationMs = 0;
  let winningSessionsCount = 0;
  let biggestWin = 0;
  let biggestLoss = 0;

  completedSessions.forEach((session) => {
    const profit = session.cash_out! - session.buy_in;
    totalProfit += profit;
    
    // Calculate duration
    const durationMs = calculateDurationMs(session.start_time, session.end_time!);
    totalDurationMs += durationMs;
    
    // Track winning sessions
    if (profit > 0) {
      winningSessionsCount++;
      biggestWin = Math.max(biggestWin, profit);
    } else if (profit < 0) {
      biggestLoss = Math.min(biggestLoss, profit);
    }
  });

  // Calculate total hours
  const totalHours = totalDurationMs / (1000 * 60 * 60);
  
  // Calculate win rate (percentage of winning sessions)
  const winRate = (winningSessionsCount / completedSessions.length) * 100;

  return {
    totalSessions: completedSessions.length,
    totalProfit,
    totalHours,
    avgProfit: totalProfit / completedSessions.length,
    avgHourlyRate: totalProfit / totalHours,
    biggestWin,
    biggestLoss,
    winRate
  };
};

/**
 * Format currency with dollar sign
 * @param amount Numeric amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return `${amount >= 0 ? '+' : ''}${amount.toFixed(0)}$`;
};

/**
 * Format hourly rate with dollar sign per hour
 * @param rate Hourly rate to format
 * @returns Formatted hourly rate string
 */
export const formatHourlyRate = (rate: number): string => {
  return `${rate >= 0 ? '+' : ''}${rate.toFixed(2)}$/h`;
};

/**
 * Format a date for display
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};