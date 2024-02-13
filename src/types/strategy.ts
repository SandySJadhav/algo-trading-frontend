export interface instrument_prop {
  id?: string;
  token: any;
  symbol: string;
  name: string;
  expiry: string;
  lotsize: any;
  instrumenttype:
    | 'OPTFUT'
    | 'FUTCOM'
    | 'OPTSTK'
    | 'OPTIDX'
    | 'FUTSTK'
    | 'FUTIDX';
  exch_seg: string;
  tick_size: any;
  rel_keywords?: string[];
  matches?: any;
  displayName?: string;
}

export interface strategy_prop {
  id: string;
  buffer_points: number;
  candle_timeframe: 'ONE_HOUR';
  start_entry_after: number;
  stop_entry_after: number;
  max_entries_per_day: number;
  entries_taken_today: number;
  previous_candle: 'CROSSES';
  status: string;
  instrument_to_watch: any;
  trailing_sl_points: number;
  market_status?: 'OPEN' | 'CLOSED';
  order_status:
    | 'IDLE'
    | 'STRIKE_SELECTION'
    | 'PLACED'
    | 'PENDING'
    | 'COMPLETED'
    | 'FAILED'
    | 'RESET';
  lots: number;
}
