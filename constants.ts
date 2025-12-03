import { HotspotEvent, HotspotStatus, MarketIndex, NewsItem, CompetitorData, ChartPoint, PanoramaData, InfoItem, CopyItem } from './types';

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
    triggerReason: '逆势流入',
    triggerType: 'INFLOW',
    metricValue: '跌-1.2% / 流入强度+1.5%',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '盘中价格下跌超1%，但资金逆势大幅买入，流入强度达1.5%，显示机构左侧布局意愿强烈。'
  },
  {
    id: '4',
    time: '14:20',
    code: '588000',
    name: '科创50ETF',
    triggerReason: '超期涨幅',
    triggerType: 'PRICE',
    metricValue: '波动2.1倍',
    status: HotspotStatus.COMPLETED,
    isSelfSelect: true,
    description: '当日涨幅已达到该指数近10日平均波动幅度的2.1倍，尾盘突发利好，半导体设备领涨。'
  },
  {
    id: '14',
    time: '14:15',
    code: '512880',
    name: '证券ETF',
    triggerReason: '成交放量',
    triggerType: 'VOLUME',
    metricValue: '量比 2.5倍',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '今日成交额达到过去10天同一时段平均水平的2.5倍，市场博弈印花税传闻，交投情绪极度高涨。'
  },
  {
    id: '13',
    time: '13:45',
    code: '159941',
    name: '纳指ETF',
    triggerReason: '溢价抢购',
    triggerType: 'SCALE',
    metricValue: '溢价0.5% / 申购激增',
    status: HotspotStatus.PROCESSING,
    isSelfSelect: true,
    description: '受隔夜美股大涨影响，盘中溢价率超0.5%且仍有大量申购，套利资金与配置资金共振。'
  },
  {
    id: '2',
    time: '13:15',
    code: '159915',
    name: '创业板ETF',
    triggerReason: '超跌反弹',
    triggerType: 'PRICE',
    metricValue: '连跌5日后首涨+3.8%',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '连续5个交易日下跌后，今日首次出现实时涨幅超过1.0%，宁德时代大涨带动指数快速拉升。'
  },
  {
    id: '12',
    time: '13:05',
    code: '513050',
    name: '中概互联ETF',
    triggerReason: '巨额流入 (强度达标)',
    triggerType: 'INFLOW',
    metricValue: '+2.1亿 (强度2.5%)',
    status: HotspotStatus.COMPLETED,
    isSelfSelect: false,
    description: '作为中型行业ETF，单日净流入强度超过2.0%，港股科技股午后反弹，抄底资金汹涌。'
  },
  {
    id: '5',
    time: '11:05',
    code: '515030',
    name: '新能源车ETF',
    triggerReason: '市占率吸纳',
    triggerType: 'VOLUME',
    metricValue: '相对份额+12%',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '相对市场份额较前一工作日涨幅超过10%，成交占比显著提升，锂矿板块反弹带动人气。'
  },
  {
    id: '1',
    time: '10:42',
    code: '512480',
    name: '半导体ETF',
    triggerReason: '成交放量',
    triggerType: 'VOLUME',
    metricValue: '量比 2.1倍',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '早盘成交额已达过去10日均值的2倍以上，行业利好消息刺激，资金大幅涌入。'
  },
  {
    id: '11',
    time: '10:30',
    code: '515790',
    name: '光伏ETF',
    triggerReason: '连涨启动 (行业)',
    triggerType: 'PRICE',
    metricValue: '连续4日上涨',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '行业指数连续4个交易日收盘上涨，硅料价格见底信号明确，趋势性行情可能开启。'
  },
  {
    id: '10',
    time: '10:15',
    code: '512660',
    name: '军工ETF',
    triggerReason: '超期涨幅',
    triggerType: 'PRICE',
    metricValue: '波动1.8倍',
    status: HotspotStatus.IGNORED,
    isSelfSelect: false,
    description: '地缘政治消息扰动，涨幅超过近日平均波幅1.5倍，呈现脉冲式拉升。'
  },
  {
    id: '9',
    time: '09:55',
    code: '510050',
    name: '上证50ETF',
    triggerReason: '巨额流入 (宽基)',
    triggerType: 'INFLOW',
    metricValue: '+3.5亿 (强度0.6%)',
    status: HotspotStatus.PROCESSING,
    isSelfSelect: true,
    description: '巨型宽基ETF净流入强度超过0.5%，大金融板块护盘，超级主力资金开盘半小时内大笔买入。'
  },
  {
    id: '3',
    time: '09:45',
    code: '510300',
    name: '300ETF',
    triggerReason: '连续吸金',
    triggerType: 'INFLOW',
    metricValue: '连续5日净流入',
    status: HotspotStatus.PROCESSING,
    isSelfSelect: true,
    description: '连续5个交易日净流入大于0，国家队疑似进场，早盘持续净申购，托底意图明显。'
  },
  {
    id: '8',
    time: '09:40',
    code: '159995',
    name: '芯片ETF',
    triggerReason: '份额排名提升',
    triggerType: 'VOLUME',
    metricValue: '排名上升2位',
    status: HotspotStatus.PENDING,
    isSelfSelect: false,
    description: '在跟踪同一指数的竞品中，成交额排名较昨日显著上升，流动性聚集效应显现。'
  },
  {
    id: '7',
    time: '09:35',
    code: '518880',
    name: '黄金ETF',
    triggerReason: '历史新高',
    triggerType: 'SCALE',
    metricValue: '突破450元',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '价格突破上市以来最高纪录，国际金价隔夜突破前高，国内黄金ETF开盘跳空高开。'
  },
  {
    id: '6',
    time: '09:31',
    code: '513180',
    name: '恒生科技指数ETF',
    triggerReason: '关键点位突破',
    triggerType: 'PRICE',
    metricValue: '站稳年线',
    status: HotspotStatus.PENDING,
    isSelfSelect: true,
    description: '受昨夜美股中概股暴涨影响，价格突破并站稳重要整数关口，情绪亢奋。'
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

// --- REALISTIC INDUSTRY NEWS DATA ---

// Map Product Codes to Industry Categories
const PRODUCT_CATEGORY_MAP: Record<string, string> = {
  '512690': 'LIQUOR',    // 酒ETF
  '512480': 'SEMI',      // 半导体ETF
  '159995': 'SEMI',      // 芯片ETF
  '588000': 'SEMI',      // 科创50 (Associated with Semi)
  '512880': 'SEC',       // 证券ETF
  '515030': 'NEW_ENERGY',// 新能源车ETF
  '515790': 'NEW_ENERGY',// 光伏ETF
  '159915': 'NEW_ENERGY',// 创业板ETF
  '513180': 'HK_US',     // 恒生科技
  '513050': 'HK_US',     // 中概互联
  '159941': 'HK_US',     // 纳指
  '518880': 'GOLD',      // 黄金ETF
  '512660': 'DEFENSE',   // 军工ETF
  '510300': 'BROAD',     // 300ETF
  '510050': 'BROAD',     // 上证50
  
  // Extra mapping for mocks
  '515210': 'STEEL',
  '515220': 'COAL',
  '512170': 'MEDICAL',
  '512800': 'BANK',
  '512980': 'MEDIA',
  '159928': 'CONSUMER',
  '512200': 'REAL_ESTATE',
  '515050': 'COMM_5G',
  '159888': 'AUTO',
  '159755': 'BATTERY'
};

// Helper to get name from code if not in hotspots
export const getProductNameByCode = (code: string) => {
   const panoramaItem = getMockPanoramaData().find(p => p.code === code);
   return panoramaItem ? panoramaItem.name : '未知产品';
}

// News Database
const NEWS_DATABASE: Record<string, { news: InfoItem[], announcements: InfoItem[] }> = {
  'SEMI': {
    news: [
      { id: 's1', date: '11-28', tag: '资讯', title: '大基金三期已向华力微电子注资，半导体设备国产化加速' },
      { id: 's2', date: '11-28', tag: '资讯', title: '存储芯片价格延续涨势，DRAM现货价周涨幅超3%' },
      { id: 's3', date: '11-27', tag: '研报', title: '中信证券：AI算力需求爆发，看好先进封装产业链机遇' },
      { id: 's4', date: '11-27', tag: '资讯', title: '全球半导体销售额Q3同比增长15%，复苏迹象明显' },
      { id: 's5', date: '11-26', tag: '资讯', title: '台积电CoWoS产能紧缺，相关设备厂订单排至明年底' },
      { id: 's6', date: '11-26', tag: '提醒', title: '半导体板块午后异动，主力资金净流入超20亿' },
      { id: 's7', date: '11-25', tag: '资讯', title: '国产光刻机零部件取得重大突破，多项核心指标达标' },
      { id: 's8', date: '11-24', tag: '资讯', title: '英伟达H200出货量超预期，利好上游供应链' },
      { id: 's9', date: '11-23', tag: '资讯', title: '汽车芯片库存去化接近尾声，MCU价格企稳回升' }
    ],
    announcements: [
      { id: 'sa1', date: '11-15', tag: '公告', title: '关于半导体ETF(512480)新增流动性服务商的公告' },
      { id: 'sa2', date: '10-25', tag: '公告', title: '半导体ETF 2025年第3季度报告' },
      { id: 'sa3', date: '10-10', tag: '公告', title: '关于半导体ETF暂停大额申购的公告' },
      { id: 'sa4', date: '09-20', tag: '公告', title: '半导体ETF基金产品资料概要更新' },
      { id: 'sa5', date: '09-15', tag: '公告', title: '关于半导体ETF参与转融通证券出借业务的公告' },
      { id: 'sa6', date: '08-30', tag: '公告', title: '半导体ETF 2025年中期报告' },
      { id: 'sa7', date: '08-15', tag: '公告', title: '关于调整半导体ETF申购赎回清单的公告' }
    ]
  },
  'LIQUOR': {
    news: [
      { id: 'l1', date: '11-28', tag: '资讯', title: '贵州茅台宣布上调出厂价，白酒板块应声大涨' },
      { id: 'l2', date: '11-27', tag: '资讯', title: '中秋国庆白酒动销数据出炉，高端酒表现稳健' },
      { id: 'l3', date: '11-27', tag: '研报', title: '招商证券：白酒估值处于历史低位，长线布局正当时' },
      { id: 'l4', date: '11-26', tag: '资讯', title: '外资连续3日加仓白酒股，北向资金累计净买入超50亿' },
      { id: 'l5', date: '11-25', tag: '资讯', title: '五粮液经销商大会召开，明确明年增长目标' },
      { id: 'l6', date: '11-24', tag: '提醒', title: '白酒板块早盘快速拉升，多只个股涨幅超5%' },
      { id: 'l7', date: '11-23', tag: '资讯', title: '次高端白酒库存去化顺利，批价稳步回升' },
      { id: 'l8', date: '11-22', tag: '资讯', title: '白酒企业纷纷加大分红力度，提升股东回报' }
    ],
    announcements: [
      { id: 'la1', date: '11-20', tag: '公告', title: '酒ETF(512690)分红公告' },
      { id: 'la2', date: '10-28', tag: '公告', title: '酒ETF 2025年第3季度报告' },
      { id: 'la3', date: '10-15', tag: '公告', title: '关于酒ETF更新招募说明书的公告' },
      { id: 'la4', date: '09-30', tag: '公告', title: '酒ETF基金产品资料概要更新' },
      { id: 'la5', date: '09-10', tag: '公告', title: '关于酒ETF基金经理变更的公告' },
      { id: 'la6', date: '08-28', tag: '公告', title: '酒ETF 2025年中期报告' }
    ]
  },
  'SEC': {
    news: [
      { id: 'sc1', date: '11-28', tag: '资讯', title: '证监会鼓励头部券商并购重组，打造一流投资银行' },
      { id: 'sc2', date: '11-27', tag: '资讯', title: '两市成交额重回万亿，券商板块直接受益' },
      { id: 'sc3', date: '11-27', tag: '传闻', title: '市场传闻中信与中信建投合并，券商股午后异动' },
      { id: 'sc4', date: '11-26', tag: '资讯', title: '全面注册制改革深化，投行业务迎来新机遇' },
      { id: 'sc5', date: '11-25', tag: '研报', title: '中金公司：券商板块PB估值仅1.2倍，具备较高安全边际' },
      { id: 'sc6', date: '11-24', tag: '资讯', title: '印花税传闻再起，券商板块早盘高开' },
      { id: 'sc7', date: '11-23', tag: '资讯', title: '券商资管业务收入占比提升，业务结构持续优化' }
    ],
    announcements: [
      { id: 'sca1', date: '11-18', tag: '公告', title: '证券ETF(512880)基金产品资料概要更新' },
      { id: 'sca2', date: '10-26', tag: '公告', title: '证券ETF 2025年第3季度报告' },
      { id: 'sca3', date: '10-12', tag: '公告', title: '关于证券ETF新增做市商的公告' },
      { id: 'sca4', date: '09-25', tag: '公告', title: '证券ETF招募说明书(更新)' },
      { id: 'sca5', date: '08-29', tag: '公告', title: '证券ETF 2025年中期报告' }
    ]
  },
  'NEW_ENERGY': {
    news: [
      { id: 'ne1', date: '11-28', tag: '资讯', title: '碳酸锂价格企稳回升，电池级碳酸锂重回10万元/吨' },
      { id: 'ne2', date: '11-27', tag: '资讯', title: '乘联会：11月新能源乘用车零售销量预计突破90万辆' },
      { id: 'ne3', date: '11-27', tag: '资讯', title: '光伏组件出口数据超预期，欧洲市场需求强劲' },
      { id: 'ne4', date: '11-26', tag: '研报', title: '长江证券：光伏行业产能出清接近尾声，盈利拐点已至' },
      { id: 'ne5', date: '11-25', tag: '资讯', title: '宁德时代发布神行超充电池，开启电动车超充时代' },
      { id: 'ne6', date: '11-24', tag: '资讯', title: '特斯拉FSD入华进展顺利，智能驾驶板块受关注' },
      { id: 'ne7', date: '11-23', tag: '提醒', title: '创业板指涨超2%，新能源权重股集体大涨' }
    ],
    announcements: [
      { id: 'nea1', date: '11-10', tag: '公告', title: '新能源车ETF(515030)基金产品资料概要更新' },
      { id: 'nea2', date: '10-27', tag: '公告', title: '新能源车ETF 2025年第3季度报告' },
      { id: 'nea3', date: '10-05', tag: '公告', title: '关于新能源车ETF实施基金份额拆分的公告' },
      { id: 'nea4', date: '09-18', tag: '公告', title: '新能源车ETF更新招募说明书' },
      { id: 'nea5', date: '08-30', tag: '公告', title: '新能源车ETF 2025年中期报告' }
    ]
  },
  'HK_US': {
    news: [
      { id: 'hk1', date: '11-28', tag: '资讯', title: '腾讯控股连续第30日回购，累计回购金额超百亿港元' },
      { id: 'hk2', date: '11-27', tag: '资讯', title: '美联储会议纪要偏鸽派，纳指创新高，中概股普涨' },
      { id: 'hk3', date: '11-27', tag: '资讯', title: '南下资金今日净买入50亿港元，重点加仓美团、快手' },
      { id: 'hk4', date: '11-26', tag: '研报', title: '高盛：上调中国互联网行业评级，看好平台经济复苏' },
      { id: 'hk5', date: '11-25', tag: '资讯', title: '阿里财报超预期，云业务收入增长强劲' },
      { id: 'hk6', date: '11-24', tag: '资讯', title: '港股流动性改善，恒生科技指数周涨幅超5%' },
      { id: 'hk7', date: '11-23', tag: '资讯', title: '拼多多市值一度超越阿里，中概电商竞争格局生变' }
    ],
    announcements: [
      { id: 'hka1', date: '11-17', tag: '公告', title: '恒生科技指数ETF(513180)基金产品资料概要更新' },
      { id: 'hka2', date: '10-28', tag: '公告', title: '恒生科技指数ETF 2025年第3季度报告' },
      { id: 'hka3', date: '10-15', tag: '公告', title: '关于恒生科技指数ETF调整申购赎回限额的公告' },
      { id: 'hka4', date: '09-22', tag: '公告', title: '恒生科技指数ETF更新招募说明书' },
      { id: 'hka5', date: '08-28', tag: '公告', title: '恒生科技指数ETF 2025年中期报告' }
    ]
  },
  'GOLD': {
    news: [
      { id: 'g1', date: '11-28', tag: '资讯', title: '国际金价突破2600美元/盎司，再创历史新高' },
      { id: 'g2', date: '11-27', tag: '资讯', title: '全球央行持续购金，中国央行连续12个月增持黄金' },
      { id: 'g3', date: '11-27', tag: '研报', title: '世界黄金协会：地缘政治风险加剧，黄金避险属性凸显' },
      { id: 'g4', date: '11-26', tag: '资讯', title: '美联储降息预期升温，美元指数走弱利好金价' },
      { id: 'g5', date: '11-25', tag: '资讯', title: '国内黄金ETF规模创新高，投资者配置需求旺盛' },
      { id: 'g6', date: '11-24', tag: '资讯', title: '黄金股跟随金价上涨，山东黄金、中金黄金领涨' }
    ],
    announcements: [
      { id: 'ga1', date: '11-12', tag: '公告', title: '黄金ETF(518880)基金产品资料概要更新' },
      { id: 'ga2', date: '10-26', tag: '公告', title: '黄金ETF 2025年第3季度报告' },
      { id: 'ga3', date: '10-08', tag: '公告', title: '关于黄金ETF暂停黄金租赁业务的公告' },
      { id: 'ga4', date: '09-15', tag: '公告', title: '黄金ETF更新招募说明书' },
      { id: 'ga5', date: '08-29', tag: '公告', title: '黄金ETF 2025年中期报告' }
    ]
  },
  'DEFENSE': {
    news: [
      { id: 'd1', date: '11-28', tag: '资讯', title: '国防预算增速保持稳定，装备现代化建设持续推进' },
      { id: 'd2', date: '11-27', tag: '资讯', title: '中航沈飞发布新型号战机，军工主机厂订单饱满' },
      { id: 'd3', date: '11-26', tag: '研报', title: '安信证券：军工行业中期调整到位，关注导弹产业链' },
      { id: 'd4', date: '11-25', tag: '资讯', title: '卫星互联网建设加速，军工电子板块受益' },
      { id: 'd5', date: '11-24', tag: '资讯', title: '地缘局势紧张，全球军费开支普遍增加' }
    ],
    announcements: [
      { id: 'da1', date: '11-05', tag: '公告', title: '军工ETF(512660)基金产品资料概要更新' },
      { id: 'da2', date: '10-27', tag: '公告', title: '军工ETF 2025年第3季度报告' },
      { id: 'da3', date: '09-20', tag: '公告', title: '军工ETF更新招募说明书' },
      { id: 'da4', date: '08-30', tag: '公告', title: '军工ETF 2025年中期报告' }
    ]
  },
  'BROAD': {
    news: [
      { id: 'b1', date: '11-28', tag: '资讯', title: '10月社融数据超预期，实体经济融资需求回暖' },
      { id: 'b2', date: '11-27', tag: '资讯', title: '汇金公司增持四大行，释放维护市场稳定信号' },
      { id: 'b3', date: '11-26', tag: '资讯', title: '多家上市公司发布回购公告，用真金白银提振信心' },
      { id: 'b4', date: '11-25', tag: '资讯', title: '上交所：支持央企利用资本市场做优做强' },
      { id: 'b5', date: '11-24', tag: '研报', title: '中信建投：A股底部特征明显，岁末年初行情可期' },
      { id: 'b6', date: '11-23', tag: '资讯', title: 'LPR维持不变，货币政策保持宽松基调' }
    ],
    announcements: [
      { id: 'ba1', date: '11-15', tag: '公告', title: '300ETF(510300)基金产品资料概要更新' },
      { id: 'ba2', date: '10-28', tag: '公告', title: '300ETF 2025年第3季度报告' },
      { id: 'ba3', date: '10-10', tag: '公告', title: '关于300ETF调整最小申购赎回单位的公告' },
      { id: 'ba4', date: '09-25', tag: '公告', title: '300ETF更新招募说明书' },
      { id: 'ba5', date: '08-30', tag: '公告', title: '300ETF 2025年中期报告' }
    ]
  },
  'STEEL': { news: [], announcements: [] },
  'COAL': { news: [], announcements: [] },
  'MEDICAL': { news: [], announcements: [] },
  'BANK': { news: [], announcements: [] },
  'MEDIA': { news: [], announcements: [] },
  'CONSUMER': { news: [], announcements: [] },
  'REAL_ESTATE': { news: [], announcements: [] },
  'COMM_5G': { news: [], announcements: [] },
  'AUTO': { news: [], announcements: [] },
  'BATTERY': { news: [], announcements: [] }
};

// Populate empty categories with generic broad news for demo robustness
Object.keys(NEWS_DATABASE).forEach(key => {
    if (NEWS_DATABASE[key].news.length === 0) {
        NEWS_DATABASE[key].news = NEWS_DATABASE['BROAD'].news;
        NEWS_DATABASE[key].announcements = NEWS_DATABASE['BROAD'].announcements;
    }
});

// Helper to get news
export const getNewsForProduct = (code: string) => {
   const category = PRODUCT_CATEGORY_MAP[code] || 'BROAD';
   return NEWS_DATABASE[category] || NEWS_DATABASE['BROAD'];
};

// Keep existing exports for backward compatibility if needed, but they are now effectively replaced in usage
export const MOCK_INFO_LEFT = NEWS_DATABASE['BROAD'].news;
export const MOCK_INFO_RIGHT = NEWS_DATABASE['BROAD'].announcements;


export const MOCK_COMPETITORS: CompetitorData[] = [
  {
    name: '半导体ETF (我司)',
    code: '512480',
    currentPrice: 0.892,
    volume: '10.5亿',
    premiumRate: '0.12%',
    netInflow: '+1.2亿',
    scale: '256.5亿',
    marketShare: '42.5%',
    change1M: '+5.2%',
    inflow1M: '+15.6亿',
    isLeader: true
  },
  {
    name: '芯片ETF (竞品A)',
    code: '159995',
    currentPrice: 1.023,
    volume: '8.2亿',
    premiumRate: '0.05%',
    netInflow: '+0.8亿',
    scale: '185.2亿',
    marketShare: '28.3%',
    change1M: '+4.8%',
    inflow1M: '+8.2亿',
    isLeader: false
  },
  {
    name: '半导体龙头 (竞品B)',
    code: '512660',
    currentPrice: 0.765,
    volume: '5.1亿',
    premiumRate: '-0.02%',
    netInflow: '+0.3亿',
    scale: '89.5亿',
    marketShare: '12.8%',
    change1M: '+4.1%',
    inflow1M: '+3.5亿',
    isLeader: false
  }
];

// Expanded Competitor DB for generic fallback
// In a real app, this would be API driven.
const COMPETITOR_DATABASE: Record<string, CompetitorData[]> = {
    'SEMI': MOCK_COMPETITORS,
    'LIQUOR': [
        { name: '酒ETF (我司)', code: '512690', currentPrice: 0.75, volume: '5.5亿', premiumRate: '0.1%', netInflow: '+0.5亿', scale: '120亿', marketShare: '55%', change1M: '+2%', inflow1M: '+5亿', isLeader: true },
        { name: '食品饮料ETF', code: '515170', currentPrice: 0.82, volume: '2.1亿', premiumRate: '0.0%', netInflow: '+0.1亿', scale: '50亿', marketShare: '20%', change1M: '+1.5%', inflow1M: '+1亿', isLeader: false },
        { name: '消费龙头', code: '159928', currentPrice: 0.90, volume: '1.5亿', premiumRate: '-0.1%', netInflow: '-0.2亿', scale: '30亿', marketShare: '10%', change1M: '+1.2%', inflow1M: '-0.5亿', isLeader: false }
    ],
    'SEC': [
        { name: '证券ETF (我司)', code: '512880', currentPrice: 0.95, volume: '21.5亿', premiumRate: '0.2%', netInflow: '+2.5亿', scale: '350亿', marketShare: '40%', change1M: '+8%', inflow1M: '+20亿', isLeader: true },
        { name: '券商ETF', code: '512000', currentPrice: 0.88, volume: '15.2亿', premiumRate: '0.1%', netInflow: '+1.8亿', scale: '280亿', marketShare: '30%', change1M: '+7.5%', inflow1M: '+15亿', isLeader: false },
        { name: '证券龙头', code: '159993', currentPrice: 0.92, volume: '8.5亿', premiumRate: '0.0%', netInflow: '+0.5亿', scale: '100亿', marketShare: '15%', change1M: '+6%', inflow1M: '+5亿', isLeader: false }
    ],
    'NEW_ENERGY': [
        { name: '新能源车ETF (我司)', code: '515030', currentPrice: 1.12, volume: '8.5亿', premiumRate: '0.05%', netInflow: '+0.3亿', scale: '150亿', marketShare: '35%', change1M: '-2%', inflow1M: '-5亿', isLeader: true },
        { name: '电池ETF', code: '159755', currentPrice: 0.68, volume: '5.2亿', premiumRate: '0.0%', netInflow: '+0.1亿', scale: '80亿', marketShare: '20%', change1M: '-3%', inflow1M: '-2亿', isLeader: false },
        { name: '光伏ETF', code: '515790', currentPrice: 0.85, volume: '6.5亿', premiumRate: '0.1%', netInflow: '+0.5亿', scale: '120亿', marketShare: '25%', change1M: '-1%', inflow1M: '+1亿', isLeader: false }
    ],
    // Generic fallback for others
    'GENERIC': [
        { name: '相关ETF A', code: '999001', currentPrice: 1.00, volume: '1.0亿', premiumRate: '0.0%', netInflow: '0.0亿', scale: '10亿', marketShare: '10%', change1M: '0%', inflow1M: '0亿', isLeader: false },
        { name: '相关ETF B', code: '999002', currentPrice: 1.00, volume: '1.0亿', premiumRate: '0.0%', netInflow: '0.0亿', scale: '10亿', marketShare: '10%', change1M: '0%', inflow1M: '0亿', isLeader: false },
        { name: '相关ETF C', code: '999003', currentPrice: 1.00, volume: '1.0亿', premiumRate: '0.0%', netInflow: '0.0亿', scale: '10亿', marketShare: '10%', change1M: '0%', inflow1M: '0亿', isLeader: false }
    ]
};

export const getCompetitorsForProduct = (code: string): CompetitorData[] => {
    const category = PRODUCT_CATEGORY_MAP[code];
    let comps = COMPETITOR_DATABASE[category || 'GENERIC'] || COMPETITOR_DATABASE['GENERIC'];
    
    // Deep copy and mark the correct leader
    return comps.map(c => ({
        ...c,
        isLeader: c.code === code
    }));
};

export const generateChartData = (competitors: CompetitorData[] = [], triggerTime: string = '10:42'): ChartPoint[] => {
  const points: ChartPoint[] = [];
  
  // Find self
  const selfProduct = competitors.find(c => c.isLeader) || competitors[0] || { currentPrice: 1.0 };
  let value = selfProduct.currentPrice || 1.338;
  
  // Initialize mock values for each competitor based on their current price
  const compValues: Record<string, number> = {};
  competitors.forEach(c => {
    // Only init for competitors, not self (though self is also in the list, logic handles it)
    if (!c.isLeader) {
       compValues[c.code] = c.currentPrice || 1.0;
    }
  });

  // Morning Session: 09:30 - 11:30
  // 121 points (inclusive of start and end minute)
  for (let i = 0; i <= 120; i++) {
    const d = new Date();
    d.setHours(9, 30 + i, 0, 0);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    const timeStr = `${h}:${m}`;
    
    // Random walk for self (Price)
    // Slightly increased volatility for better demo
    value = value * (1 + (Math.random() - 0.45) * 0.004);
    
    // Calculate IOPV based on Price with a small random spread/noise
    // IOPV should tightly track Price (Arbitrage mechanics)
    // Spread e.g. -0.1% to +0.1%
    const spreadNoise = (Math.random() - 0.5) * 0.002; 
    const iopv = value * (1 + spreadNoise);
    
    // Random walk for competitors
    const currentCompValues: Record<string, number> = {};
    Object.keys(compValues).forEach(code => {
      compValues[code] = compValues[code] * (1 + (Math.random() - 0.45) * 0.003);
      currentCompValues[code] = Number(compValues[code].toFixed(3));
    });

    const volume = Math.floor(Math.random() * 5000) + 500;

    points.push({
      time: timeStr,
      value: Number(value.toFixed(3)),
      iopv: Number(iopv.toFixed(3)),
      competitors: currentCompValues,
      isTrigger: timeStr === triggerTime,
      volume
    });
  }

  // Afternoon Session: 13:00 - 15:00
  for (let i = 0; i <= 120; i++) {
    const d = new Date();
    d.setHours(13, i, 0, 0);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    const timeStr = `${h}:${m}`;
    
    value = value * (1 + (Math.random() - 0.45) * 0.004);
    
    // Calculate IOPV based on Price (tight tracking)
    const spreadNoise = (Math.random() - 0.5) * 0.002;
    const iopv = value * (1 + spreadNoise);

    const currentCompValues: Record<string, number> = {};
    Object.keys(compValues).forEach(code => {
      compValues[code] = compValues[code] * (1 + (Math.random() - 0.45) * 0.003);
      currentCompValues[code] = Number(compValues[code].toFixed(3));
    });

    const volume = Math.floor(Math.random() * 5000) + 500;

    points.push({
      time: timeStr,
      value: Number(value.toFixed(3)),
      iopv: Number(iopv.toFixed(3)),
      competitors: currentCompValues,
      isTrigger: timeStr === triggerTime,
      volume
    });
  }
  
  return points;
};

// Generate Historical Data (Daily Cumulative %)
export const generateHistoricalData = (range: string, competitors: CompetitorData[] = []): { date: string; value: number; competitors: Record<string, number> }[] => {
  const points: { date: string; value: number; competitors: Record<string, number> }[] = [];
  let days = 30; // Default 1M
  if (range === '近3月') days = 90;
  if (range === '近6月') days = 180;
  if (range === '更多') days = 365;

  let value = 0; // Cumulative percent starts at 0
  
  // Initialize competitor values at 0
  const compValues: Record<string, number> = {};
  competitors.forEach(c => {
    if (!c.isLeader) compValues[c.code] = 0;
  });

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  for (let i = 0; i <= days; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Random walk for cumulative percentage (Self)
    value = value + (Math.random() - 0.45) * 1.5; 

    // Random walk for competitors
    const currentCompValues: Record<string, number> = {};
    Object.keys(compValues).forEach(code => {
        compValues[code] = compValues[code] + (Math.random() - 0.45) * 1.5;
        currentCompValues[code] = Number(compValues[code].toFixed(2));
    });

    points.push({
      date: dateStr,
      value: Number(value.toFixed(2)),
      competitors: currentCompValues
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

export const MOCK_COPIES: CopyItem[] = [
  {
    id: 1,
    title: '半导体ETF午盘速递：大基金利好引爆行情',
    product: '半导体ETF (512480)',
    status: 'DRAFT',
    updatedAt: '2023-11-28 11:45',
    preview: '受大基金三期落地消息刺激，今日半导体产业链表现强势。截至10:42，半导体ETF(512480)盘中成交额已突破10亿元...',
    content: `【盘中异动】半导体板块全线爆发，ETF成交破10亿！🚀\n\n受大基金三期落地消息刺激，今日半导体产业链表现强势。截至10:42，半导体ETF(512480)盘中成交额已突破10亿元，交投十分活跃！📈\n\n资金面上，主力资金持续抢筹，盘中净流入超1.2亿元，显著优于同类产品。目前板块估值仍处于历史低位，配置性价比凸显。\n\n关注半导体ETF(512480)，一键布局硬核科技！💪`
  },
  {
    id: 2,
    title: '收盘点评：酒ETF逆势流入，机构左侧布局？',
    product: '酒ETF (512690)',
    status: 'PUBLISHED',
    updatedAt: '2023-11-27 15:30',
    preview: '盘中价格下跌超1%，但资金逆势大幅买入，流入强度达1.5%，显示机构左侧布局意愿强烈。建议投资者关注...',
    content: `【收盘点评】酒ETF(512690)逆势收红，资金借道抄底！🍷\n\n今日大盘调整，但酒ETF(512690)尾盘逆势翻红。数据显示，盘中资金呈净流入态势，全天净流入额超5000万元。从基本面看，白酒板块库存去化顺利，年底旺季将至，估值修复可期。`
  },
  {
    id: 3,
    title: '科创50早报：纳指新高带动科技情绪',
    product: '科创50ETF (588000)',
    status: 'PUBLISHED',
    updatedAt: '2023-11-27 09:15',
    preview: '隔夜美股纳指创新高，映射A股科技板块情绪回暖。科创50ETF开盘微涨，关注半导体设备方向...',
    content: `【早盘速递】科创50ETF(588000)高开，科技成长风格回归？\n\n隔夜美股纳指再创新高，提振全球科技股情绪。今日科创50指数高开，半导体、软件板块领涨。作为硬科技旗舰指数，科创50ETF(588000)具备高弹性特征，是反弹急先锋。`
  },
  {
    id: 14,
    title: '证券ETF异动提醒：成交放量，行情启动？',
    product: '证券ETF (512880)',
    status: 'DRAFT',
    updatedAt: '2023-11-29 14:00',
    preview: '证券板块午后异动，成交额显著放大。证券ETF(512880)量比达2.5倍，市场博弈政策预期...',
    content: `【异动提醒】证券ETF(512880)成交放量，牛市旗手归来？🐂\n\n午后证券板块快速拉升，证券ETF(512880)成交额突破20亿元，量比高达2.5倍！市场对于资本市场改革政策预期升温，券商板块作为高贝塔品种，有望率先受益。`
  }
];

export const getCopyById = (id: number | string): CopyItem | undefined => {
  return MOCK_COPIES.find(c => c.id.toString() === id.toString());
};