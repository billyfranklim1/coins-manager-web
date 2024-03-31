export interface Group {
  id: number;
  name: string;
  description: string;
  coins: Coin[];
}

export interface Coin {
  id: number;
  name: string;
  symbol: string;
}