
export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  data: { time: string; value: number }[];
}

export enum HotspotStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  IGNORED = 'IGNORED'
}

export interface HotspotEvent {
  id: string;
  time: string;
  code: string;
  name: string;
  triggerReason: string; // e.g., "盘中成交额突破5亿"
  triggerType: 'VOLUME' | 'INFLOW' | 'PRICE' | 'SCALE';
  metricValue: string;
  status: HotspotStatus;
  isSelfSelect: boolean;
  description: string;
}

export interface PanoramaData {
  id: string;
  code: string;
  name: string;
  trackingIndex: string;
  price: number;
  changePercent: number;
  premiumRate: number;
  scale: number; // 亿元
  volume: number; // 亿元
  turnoverRate: number; // %
  triggerStatus: string | null; // The reason from HotspotEvent if exists
  isSelfSelect: boolean; // Support self-select filtering
  
  // Historical Change %
  changePrevDay: number;
  change1W: number;
  change1M: number;
  change3M: number;
  changeYTD: number;
  change1Y: number;

  // Avg Volume (Daily Avg in 亿元)
  avgVol1W: number;
  avgVol1M: number;
  avgVol3M: number;
  avgVolYTD: number;
  avgVol1Y: number;

  // Net Inflow (亿元)
  inflowPrevDay: number;
  inflow1W: number;
  inflow1M: number;
  inflow3M: number;
  inflowYTD: number;
  inflow1Y: number;
}

export interface NewsItem {
  id: string;
  time: string;
  title: string;
  source: string;
  summary: string;
  views: number;
}

export interface CompetitorData {
  name: string;
  code: string;
  currentPrice: number;
  volume: string;
  premiumRate: string;
  netInflow: string;
  isLeader: boolean; // Is our product leading?
}

export interface ChartPoint {
  time: string;
  value: number;
  competitorValue?: number;
  isTrigger?: boolean;
  volume: number;
}
