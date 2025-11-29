
import { HotspotEvent, HotspotStatus, MarketIndex, NewsItem, CompetitorData, ChartPoint, PanoramaData } from './types';

export const MOCK_INDICES: MarketIndex[] = [
  { 
    name: '上证指数', 
    value: 3058.23, 
    change: 12.45, 
    changePercent: 0.41,
    data: Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 3040 + Math.random() * 30 }))
  },
  { 
    name: '沪深300', 
    value: 3567.89, 
    change: -5.20, 
    changePercent: -0.15,
    data: Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 3560 + Math.random() * 20 }))
  },
  { 
    name: '科创50', 
    value: 890.12, 
    change: 15.67, 
    changePercent: 1.79,
    data: Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 880 + Math.random() * 25 }))
  },
  { 
    name: '中证红利', 
    value: 5200.45, 
    change: 32.10, 
    changePercent: 0.62,
    data: Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 5180 + Math.random() * 40 }))
  },
];

export const MOCK_HOTSPOTS: HotspotEvent[] = [
  {
    id: '15',
    time: '14:55',
    code: '512690',
    name: '酒ETF',
    triggerReason: '尾盘抢筹',
    triggerType: 'INFLOW',
    metricValue: '+0.8亿',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '尾盘白酒板块异动，北向资金加速流入，茅台等权重股拉升。'
  },
  {
    id: '4',
    time: '14:20',
    code: '588000',
    name: '科创50ETF',
    triggerReason: '短时快速上行',
    triggerType: 'PRICE',
    metricValue: '+1.8%/30m',
    status: HotspotStatus.COMPLETED,
    isSelfSelect: true,
    description: '尾盘突发利好，科技股集体异动，半导体设备领涨。'
  },
  {
    id: '14',
    time: '14:15',
    code: '512880',
    name: '证券ETF',
    triggerReason: '盘中成交额突破20亿元',
    triggerType: 'VOLUME',
    metricValue: '21.5亿',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '券商板块午后发力，市场博弈印花税传闻，交投情绪极度高涨。'
  },
  {
    id: '13',
    time: '13:45',
    code: '159941',
    name: '纳指ETF',
    triggerReason: '日环比显著放大',
    triggerType: 'VOLUME',
    metricValue: '2.1x',
    status: HotspotStatus.PROCESSING,
    isSelfSelect: true,
    description: '受隔夜美股大涨影响，溢价率走高，套利资金进场明显。'
  },
  {
    id: '2',
    time: '13:15',
    code: '159915',
    name: '创业板ETF',
    triggerReason: '盘中涨幅 > 3.5%',
    triggerType: 'PRICE',
    metricValue: '+3.8%',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '权重股宁德时代大涨带动指数快速拉升，光伏产业链配合上攻。'
  },
  {
    id: '12',
    time: '13:05',
    code: '513050',
    name: '中概互联ETF',
    triggerReason: '大额净流入触达',
    triggerType: 'INFLOW',
    metricValue: '+2.1亿',
    status: HotspotStatus.COMPLETED,
    isSelfSelect: false,
    description: '港股科技股午后反弹，抄底资金汹涌，单小时流入破亿。'
  },
  {
    id: '5',
    time: '11:05',
    code: '515030',
    name: '新能源车ETF',
    triggerReason: '日环比显著放大',
    triggerType: 'VOLUME',
    metricValue: '1.8x',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '成交量明显放大，换手率提升，锂矿板块反弹带动人气。'
  },
  {
    id: '1',
    time: '10:42',
    code: '512480',
    name: '半导体ETF',
    triggerReason: '盘中成交额突破10亿元',
    triggerType: 'VOLUME',
    metricValue: '10.2亿',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '行业利好消息刺激，早盘资金大幅涌入，成交额创近30日新高。'
  },
  {
    id: '11',
    time: '10:30',
    code: '515790',
    name: '光伏ETF',
    triggerReason: '盘中涨幅 > 3.5%',
    triggerType: 'PRICE',
    metricValue: '+4.1%',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '硅料价格见底信号明确，组件排产超预期，板块迎来久违大涨。'
  },
  {
    id: '10',
    time: '10:15',
    code: '512660',
    name: '军工ETF',
    triggerReason: '短时快速上行',
    triggerType: 'PRICE',
    metricValue: '+1.2%/10m',
    status: HotspotStatus.IGNORED,
    isSelfSelect: false,
    description: '地缘政治消息扰动，军工板块脉冲式拉升，但持续性存疑。'
  },
  {
    id: '9',
    time: '09:55',
    code: '510050',
    name: '上证50ETF',
    triggerReason: '大额净流入触达',
    triggerType: 'INFLOW',
    metricValue: '+3.5亿',
    status: HotspotStatus.PROCESSING,
    isSelfSelect: true,
    description: '大金融板块护盘，超级主力资金开盘半小时内大笔买入。'
  },
  {
    id: '3',
    time: '09:45',
    code: '510300',
    name: '300ETF',
    triggerReason: '大额净流入触达',
    triggerType: 'INFLOW',
    metricValue: '+1.5亿',
    status: HotspotStatus.PROCESSING,
    isSelfSelect: true,
    description: '国家队疑似进场，早盘持续净申购，托底意图明显。'
  },
  {
    id: '8',
    time: '09:40',
    code: '159995',
    name: '芯片ETF',
    triggerReason: '盘中成交额突破5亿元',
    triggerType: 'VOLUME',
    metricValue: '5.2亿',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '跟随半导体板块异动，早盘交投活跃，量比达到3.0。'
  },
  {
    id: '7',
    time: '09:35',
    code: '518880',
    name: '黄金ETF',
    triggerReason: '历史新高',
    triggerType: 'SCALE',
    metricValue: '450.5元',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '国际金价隔夜突破前高，国内黄金ETF开盘跳空高开，创历史新高。'
  },
  {
    id: '6',
    time: '09:31',
    code: '513180',
    name: '恒生科技指数ETF',
    triggerReason: '单日大幅上涨',
    triggerType: 'PRICE',
    metricValue: '+5.2%',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '受昨夜美股中概股暴涨影响，开盘直接高开5个点，情绪亢奋。'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    time: '10:40',
    title: '大基金三期落地，半导体板块掀起涨停潮',
    source: '财联社',
    summary: '注册资本3440亿元，重点投向先进制程及存储方向，受此影响，半导体产业链全线爆发。',
    views: 12503
  },
  {
    id: 'n2',
    time: '10:35',
    title: '存储芯片价格触底反弹，行业周期拐点已至',
    source: '证券时报',
    summary: '多家龙头厂商宣布提价，市场预期Q3业绩将大幅改善。',
    views: 8900
  },
  {
    id: 'n3',
    time: '10:15',
    title: '外资早盘净流入超50亿，重点加仓科技股',
    source: 'Wind资讯',
    summary: '北向资金结束连续流出，今日大幅回流，电子、计算机板块获重点增持。',
    views: 10200
  }
];

export const MOCK_COMPETITORS: CompetitorData[] = [
  {
    name: '半导体ETF (我司)',
    code: '512480',
    currentPrice: 0.892,
    volume: '10.5亿',
    premiumRate: '0.12%',
    netInflow: '+1.2亿',
    isLeader: true
  },
  {
    name: '芯片ETF (竞品A)',
    code: '159995',
    currentPrice: 1.023,
    volume: '8.2亿',
    premiumRate: '0.05%',
    netInflow: '+0.8亿',
    isLeader: false
  },
  {
    name: '半导体龙头 (竞品B)',
    code: '512660',
    currentPrice: 0.765,
    volume: '5.1亿',
    premiumRate: '-0.02%',
    netInflow: '+0.3亿',
    isLeader: false
  }
];

export const generateChartData = (): ChartPoint[] => {
  const points: ChartPoint[] = [];
  let value = 100;
  let compValue = 98;
  for (let i = 0; i < 240; i++) { // 4 hours * 60 mins
    value = value * (1 + (Math.random() - 0.45) * 0.005);
    compValue = compValue * (1 + (Math.random() - 0.45) * 0.005);
    
    const hour = 9 + Math.floor(i / 60);
    const min = i % 60;
    const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    
    // Skip lunch break roughly
    if (hour === 11 && min > 30) continue;
    if (hour === 12) continue;

    points.push({
      time: timeStr,
      value: Number(value.toFixed(2)),
      competitorValue: Number(compValue.toFixed(2)),
      isTrigger: timeStr === '10:42' // Mock trigger point
    });
  }
  return points;
};

// Generator for Panorama Data (Full Market View)
export const getMockPanoramaData = (): PanoramaData[] => {
  const extraProducts = [
    { name: '医疗ETF', code: '512170', index: '中证医疗' },
    { name: '银行ETF', code: '512800', index: '中证银行' },
    { name: '传媒ETF', code: '512980', index: '中证传媒' },
    { name: '红利ETF', code: '510880', index: '上证红利' },
    { name: '中证500ETF', code: '510500', index: '中证500' },
    { name: '双创50ETF', code: '588400', index: '中证科创创业50' },
    { name: '基建ETF', code: '516970', index: '中证基建' },
    { name: '养殖ETF', code: '159865', index: '中证畜牧' },
    { name: '煤炭ETF', code: '515220', index: '中证煤炭' },
    { name: '钢铁ETF', code: '515210', index: '国证钢铁' },
    { name: '消费ETF', code: '159928', index: '中证消费' },
    { name: '地产ETF', code: '512200', index: '中证全指房地产' },
    { name: '军工龙头ETF', code: '512710', index: '中证军工' },
    { name: '5G通信ETF', code: '515050', index: '中证5G通信' },
    { name: '智能汽车ETF', code: '159888', index: '中证智能汽车' },
    { name: '电池ETF', code: '159755', index: '国证新能源电池' }
  ];

  const rnd = (min: number, max: number) => Number((Math.random() * (max - min) + min).toFixed(2));
  const rndPct = () => Number((Math.random() * 6 - 3).toFixed(2)); // -3% to +3%

  // 1. Map existing Hotspots to Panorama Data
  const hotspotData: PanoramaData[] = MOCK_HOTSPOTS.map(h => ({
    id: h.id,
    code: h.code,
    name: h.name,
    trackingIndex: h.name.replace('ETF', '指数'), // Simple mock mapping
    price: rnd(0.5, 3.5),
    changePercent: h.triggerType === 'PRICE' ? parseFloat(h.metricValue) : rndPct(),
    premiumRate: rnd(-0.2, 0.2),
    scale: rnd(10, 500),
    volume: h.triggerType === 'VOLUME' ? parseFloat(h.metricValue) : rnd(1, 10),
    turnoverRate: rnd(1, 15),
    triggerStatus: h.triggerReason,
    isSelfSelect: h.isSelfSelect,
    
    changePrevDay: rndPct(),
    change1W: rndPct() * 2,
    change1M: rndPct() * 3,
    change3M: rndPct() * 4,
    changeYTD: rndPct() * 5,
    change1Y: rndPct() * 6,

    avgVol1W: rnd(1, 5),
    avgVol1M: rnd(1, 5),
    avgVol3M: rnd(1, 5),
    avgVolYTD: rnd(1, 5),
    avgVol1Y: rnd(1, 5),

    inflowPrevDay: h.triggerType === 'INFLOW' ? parseFloat(h.metricValue) : rnd(-0.5, 0.5),
    inflow1W: rnd(-2, 2),
    inflow1M: rnd(-5, 5),
    inflow3M: rnd(-10, 10),
    inflowYTD: rnd(-20, 20),
    inflow1Y: rnd(-30, 30),
  }));

  // 2. Add extra products (Non-hotspot)
  const extraData: PanoramaData[] = extraProducts.map((p, i) => ({
    id: `extra-${i}`,
    code: p.code,
    name: p.name,
    trackingIndex: p.index,
    price: rnd(0.5, 2.0),
    changePercent: rndPct(),
    premiumRate: rnd(-0.1, 0.1),
    scale: rnd(5, 100),
    volume: rnd(0.1, 3),
    turnoverRate: rnd(0.5, 5),
    triggerStatus: null, // No trigger
    
    // Deterministically set some extra products as self-selected for demo purposes
    // Every 3rd item is self-selected
    isSelfSelect: i % 3 === 0, 

    changePrevDay: rndPct(),
    change1W: rndPct() * 2,
    change1M: rndPct() * 3,
    change3M: rndPct() * 4,
    changeYTD: rndPct() * 5,
    change1Y: rndPct() * 6,

    avgVol1W: rnd(0.5, 2),
    avgVol1M: rnd(0.5, 2),
    avgVol3M: rnd(0.5, 2),
    avgVolYTD: rnd(0.5, 2),
    avgVol1Y: rnd(0.5, 2),

    inflowPrevDay: rnd(-0.1, 0.1),
    inflow1W: rnd(-0.5, 0.5),
    inflow1M: rnd(-1, 1),
    inflow3M: rnd(-2, 2),
    inflowYTD: rnd(-5, 5),
    inflow1Y: rnd(-10, 10),
  }));

  return [...hotspotData, ...extraData].sort((a, b) => {
    // Put triggered ones first for demo visibility, but usually sorted by code or logic
    if (a.triggerStatus && !b.triggerStatus) return -1;
    if (!a.triggerStatus && b.triggerStatus) return 1;
    return 0;
  });
};
