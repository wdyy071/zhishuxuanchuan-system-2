import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, List, TrendingUp, TrendingDown, Filter, Search, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { MOCK_HOTSPOTS, getMockPanoramaData } from '../constants';
import { HotspotEvent, PanoramaData } from '../types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Skeleton from '../components/Skeleton';
import Toast from '../components/Toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'HOTSPOT' | 'PANORAMA'>('HOTSPOT');
  const [toast, setToast] = useState<string | null>(null);
  const [panoramaData, setPanoramaData] = useState<PanoramaData[]>([]);
  
  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCode, setFilterCode] = useState('');
  const [filterSelfSelect, setFilterSelfSelect] = useState<'ALL' | 'YES'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING'>('PENDING');

  // Ref for scroll target
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading data
    setPanoramaData(getMockPanoramaData());
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/analysis/${id}`);
  };

  const handleIgnore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setToast("已忽略该热点");
  };

  const handleCreate = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/workbench');
  };

  const scrollToToolbar = () => {
    setTimeout(() => {
      toolbarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleViewSwitch = (mode: 'HOTSPOT' | 'PANORAMA') => {
    setViewMode(mode);
    if (mode === 'PANORAMA') {
      setFilterSelfSelect('YES');
      setFilterStatus('ALL'); 
    } else {
      setFilterStatus('PENDING');
      setFilterSelfSelect('ALL');
    }
  };

  const handleSelfSelectClick = () => {
    if (filterSelfSelect === 'YES') {
      setFilterSelfSelect('ALL');
    } else {
      setFilterSelfSelect('YES');
      setFilterStatus('ALL');
      scrollToToolbar();
    }
  };

  const handlePendingClick = () => {
    if (viewMode === 'PANORAMA') return; 

    if (filterStatus === 'PENDING') {
      setFilterStatus('ALL');
    } else {
      setFilterStatus('PENDING');
      setFilterSelfSelect('ALL');
      scrollToToolbar();
    }
  };

  const pendingCount = MOCK_HOTSPOTS.filter(h => h.status === 'PENDING').length;
  const selfSelectCount = MOCK_HOTSPOTS.filter(h => h.isSelfSelect).length;

  const filteredHotspots = MOCK_HOTSPOTS.filter(h => {
    if (filterCode && !h.code.includes(filterCode) && !h.name.includes(filterCode)) return false;
    if (filterSelfSelect === 'YES' && !h.isSelfSelect) return false;
    if (filterStatus === 'PENDING' && h.status !== 'PENDING') return false;
    return true;
  }).sort((a, b) => b.time.localeCompare(a.time));

  const filteredPanorama = panoramaData.filter(p => {
    if (filterCode && !p.code.includes(filterCode) && !p.name.includes(filterCode)) return false;
    if (filterSelfSelect === 'YES' && !p.isSelfSelect) return false;
    return true;
  });

  const selfSelectedTrends = MOCK_HOTSPOTS
    .filter(h => h.isSelfSelect)
    .reduce((acc, current) => {
      if (!acc.find(item => item.code === current.code)) {
        acc.push(current);
      }
      return acc;
    }, [] as HotspotEvent[])
    .slice(0, 4)
    .map((h, index) => {
       const isPositive = index % 3 !== 2;
       const changePercent = isPositive ? +(Math.random() * 2 + 0.1).toFixed(2) : -(Math.random() * 2 + 0.1).toFixed(2);
       const price = 0.8 + Math.random() * 0.5;
       const change = price * changePercent / 100;
       
       const points = [];
       let v = price * (1 - changePercent/100);
       for(let i=0; i<20; i++) {
          v = v * (1 + (Math.random() - 0.45) * 0.04);
          points.push({ value: v });
       }
       points.push({ value: price });

       return {
         id: h.id,
         name: h.name,
         code: h.code,
         value: price,
         change: change,
         changePercent: changePercent,
         data: points
       };
    });

  const PctCell = ({ value }: { value: number }) => (
    <span className={`font-mono tabular-nums font-medium ${value > 0 ? 'text-red-600' : value < 0 ? 'text-green-600' : 'text-slate-400'}`}>
      {value > 0 ? '+' : ''}{value.toFixed(2)}%
    </span>
  );

  const NumCell = ({ value, suffix = '', colorize = false }: { value: number, suffix?: string, colorize?: boolean }) => (
    <span className={`font-mono tabular-nums ${colorize ? (value > 0 ? 'text-red-600' : value < 0 ? 'text-green-600' : 'text-slate-400') : 'text-slate-700'}`}>
      {colorize && value > 0 ? '+' : ''}{value.toFixed(2)}{suffix}
    </span>
  );

  return (
    <div className="space-y-6 relative font-sans">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* 1. Self-Selected Product Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selfSelectedTrends.map((product) => (
          <div 
            key={product.code} 
            onClick={() => handleCardClick(product.id)}
            className="bg-white p-4 rounded-sm border border-slate-300 cursor-pointer hover:border-brand transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm text-slate-600 font-bold flex items-center gap-2 group-hover:text-brand">
                  {product.name}
                  <span className="text-xs bg-slate-100 px-1 rounded-sm text-slate-500 font-mono">{product.code}</span>
                </h3>
                <div className={`text-xl font-mono font-bold mt-1 tabular-nums ${product.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.value.toFixed(3)}
                </div>
                <div className={`text-xs flex items-center gap-1 tabular-nums font-medium ${product.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {product.change > 0 ? '+' : ''}{product.change.toFixed(3)} ({product.change > 0 ? '+' : ''}{product.changePercent}%)
                </div>
              </div>
              <div className="h-12 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={product.data}>
                    <defs>
                      <linearGradient id={`grad${product.code}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={product.change >= 0 ? "#dc2626" : "#16a34a"} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={product.change >= 0 ? "#dc2626" : "#16a34a"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={product.change >= 0 ? "#dc2626" : "#16a34a"} 
                      fill={`url(#grad${product.code})`} 
                      strokeWidth={1.5}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
        {selfSelectedTrends.length === 0 && (
           <div className="col-span-full p-4 bg-white rounded-sm border border-slate-300 text-center text-slate-400 text-sm">
             暂无自选关注产品
           </div>
        )}
      </div>

      {/* 2. Task Counters */}
      <div className="flex gap-6 bg-white px-6 py-4 rounded-sm border border-slate-300 items-center select-none">
        <div className="text-base font-bold text-slate-800">今日任务</div>
        <div className="h-8 w-[1px] bg-slate-200"></div>
        
        {/* Total */}
        <div 
          onClick={() => {
            setFilterSelfSelect('ALL');
            setFilterStatus('ALL');
          }}
          className="flex items-baseline gap-2 cursor-pointer group hover:opacity-80 transition-opacity"
        >
          <span className="text-3xl font-bold font-mono text-slate-900">{MOCK_HOTSPOTS.length}</span>
          <span className="text-xs text-slate-500 font-medium">热点总数</span>
        </div>

        {/* Self Select */}
        <div 
          onClick={handleSelfSelectClick}
          className={`flex items-baseline gap-2 cursor-pointer transition-all ${filterSelfSelect === 'YES' ? 'opacity-100' : 'opacity-100 hover:opacity-80'}`}
        >
          <span className="text-3xl font-bold font-mono text-orange-600">{selfSelectCount}</span>
          <span className={`text-xs font-medium ${filterSelfSelect === 'YES' ? 'text-orange-700 font-bold bg-orange-50 px-1 rounded-sm' : 'text-orange-600'}`}>自选关注</span>
        </div>

        {/* Pending */}
        <div 
          onClick={handlePendingClick}
          className={`flex items-baseline gap-2 relative transition-all ${
            viewMode === 'PANORAMA' 
              ? 'opacity-40 cursor-not-allowed grayscale' 
              : (filterStatus === 'PENDING' ? 'opacity-100 cursor-pointer' : 'opacity-100 hover:opacity-80 cursor-pointer')
          }`}
          title={viewMode === 'PANORAMA' ? "全景监控模式下不支持按状态筛选" : ""}
        >
          <span className="text-3xl font-bold font-mono text-red-600">{pendingCount}</span>
          <span className={`text-xs font-medium ${filterStatus === 'PENDING' ? 'text-red-700 font-bold bg-red-50 px-1 rounded-sm' : 'text-red-600'}`}>待处理</span>
        </div>
      </div>

      {/* 3. Controls & Sticky Toolbar */}
      <div 
        ref={toolbarRef}
        className="sticky top-0 z-40 bg-[#f8fbff] py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-transparent transition-all"
      >
        <div className="bg-slate-200 p-[2px] rounded-sm flex items-center">
          <button 
            onClick={() => handleViewSwitch('HOTSPOT')}
            className={`px-4 py-1.5 rounded-sm text-sm font-bold transition-all flex items-center gap-2 ${
              viewMode === 'HOTSPOT' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            热点聚焦
          </button>
          <button 
            onClick={() => handleViewSwitch('PANORAMA')}
            className={`px-4 py-1.5 rounded-sm text-sm font-bold transition-all flex items-center gap-2 ${
              viewMode === 'PANORAMA' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List className="w-4 h-4" />
            全景监控
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold transition-colors border ${
              isFilterOpen 
                ? 'bg-brand text-white border-brand' 
                : 'bg-white text-slate-600 border-slate-300 hover:border-brand hover:text-brand'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>高级筛选</span>
            {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Advanced Filter Panel */}
          {isFilterOpen && (
            <div className="absolute right-0 top-12 w-[800px] max-w-[90vw] bg-white rounded-sm shadow-xl border border-slate-300 p-6 z-50 animate-in slide-in-from-top-1 fade-in">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                
                {/* 1. Basic Search */}
                <div className="col-span-2 space-y-4 pb-4 border-b border-slate-100">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">代码查找</label>
                       <div className="relative">
                         <input 
                           type="text" 
                           placeholder="输入代码或名称" 
                           value={filterCode}
                           onChange={(e) => setFilterCode(e.target.value)}
                           className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                         />
                         <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">是否自选</label>
                       <div className="flex bg-slate-100 p-0.5 rounded-sm">
                          <button 
                            onClick={() => setFilterSelfSelect('ALL')}
                            className={`flex-1 py-1 text-xs font-bold rounded-sm transition-colors ${filterSelfSelect === 'ALL' ? 'bg-white shadow-sm text-slate-800 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                          >全部</button>
                          <button 
                             onClick={() => setFilterSelfSelect('YES')}
                             className={`flex-1 py-1 text-xs font-bold rounded-sm transition-colors ${filterSelfSelect === 'YES' ? 'bg-white shadow-sm text-brand border border-slate-200' : 'text-slate-500 hover:text-brand'}`}
                          >是</button>
                       </div>
                    </div>
                    {viewMode === 'HOTSPOT' && (
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">状态</label>
                         <div className="flex bg-slate-100 p-0.5 rounded-sm">
                            <button 
                               onClick={() => setFilterStatus('ALL')}
                               className={`flex-1 py-1 text-xs font-bold rounded-sm transition-colors ${filterStatus === 'ALL' ? 'bg-white shadow-sm text-slate-800 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                            >全部</button>
                            <button 
                               onClick={() => setFilterStatus('PENDING')}
                               className={`flex-1 py-1 text-xs font-bold rounded-sm transition-colors ${filterStatus === 'PENDING' ? 'bg-white shadow-sm text-red-600 border border-slate-200' : 'text-slate-500 hover:text-red-600'}`}
                            >待处理</button>
                         </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Product Type */}
                <div className="col-span-2 space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm">产品类型</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 mt-0.5">
                        <input type="checkbox" id="stock" className="w-4 h-4 rounded-sm border-slate-300 text-brand focus:ring-brand" defaultChecked />
                        <label htmlFor="stock" className="text-sm font-medium text-slate-700">股票</label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['规模指数(宽基)', '风格因子', '行业', '主题', '指数增强'].map(t => (
                          <button key={t} className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-sm text-xs text-slate-600 transition-colors font-medium">
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-6">
                      {['债券', '商品', '货币'].map(t => (
                        <div key={t} className="flex items-center gap-2">
                          <input type="checkbox" id={t} className="w-4 h-4 rounded-sm border-slate-300 text-brand focus:ring-brand" />
                          <label htmlFor={t} className="text-sm text-slate-600">{t}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Tracking Index */}
                <div className="space-y-3">
                   <h4 className="font-bold text-slate-800 text-sm">跟踪指数</h4>
                   <div className="relative">
                     <input type="text" placeholder="请输入指数名称/代码" className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand" />
                   </div>
                </div>

                {/* 4. Scale */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm">产品规模</h4>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input type="number" placeholder="0" className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-sm text-sm text-right pr-10 font-mono" />
                        <span className="absolute right-3 top-1.5 text-xs text-slate-400">亿元</span>
                      </div>
                      <span className="text-slate-400 font-bold">-</span>
                      <div className="relative flex-1">
                        <input type="number" placeholder="Max" className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-sm text-sm text-right pr-10 font-mono" />
                        <span className="absolute right-3 top-1.5 text-xs text-slate-400">亿元</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Change & Volume */}
                <div className="space-y-3">
                   <h4 className="font-bold text-slate-800 text-sm">涨跌幅</h4>
                   <div className="grid grid-cols-2 gap-2">
                      {['上一交易日', '近1周', '近1月', '近3月'].map(t => (
                        <button key={t} className="px-2 py-2 bg-slate-50 hover:bg-brand hover:text-white hover:border-brand border border-slate-200 rounded-sm text-xs text-slate-600 transition-colors text-center font-bold">
                          {t}
                        </button>
                      ))}
                   </div>
                   <h4 className="font-bold text-slate-800 text-sm pt-2">日均成交额</h4>
                   <div className="grid grid-cols-2 gap-2">
                      {['近1周', '近1月'].map(t => (
                        <button key={t} className="px-2 py-2 bg-slate-50 hover:bg-brand hover:text-white hover:border-brand border border-slate-200 rounded-sm text-xs text-slate-600 transition-colors text-center font-bold">
                          {t}
                        </button>
                      ))}
                   </div>
                </div>

                {/* 6. Constituents */}
                <div className="space-y-4">
                   <div className="space-y-2">
                     <h4 className="font-bold text-slate-800 text-sm">成分股</h4>
                     <input type="text" placeholder="请输入股票名称/代码" className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand" />
                   </div>
                </div>

              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setFilterCode('');
                    setFilterSelfSelect('ALL');
                    if (viewMode === 'HOTSPOT') setFilterStatus('ALL');
                  }}
                  className="px-6 py-2 text-slate-500 hover:text-slate-700 font-bold text-sm"
                >
                  重置
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="px-6 py-2 bg-brand hover:bg-brand-dark text-white rounded-sm font-bold text-sm transition-colors border border-brand-dark"
                >
                  确认筛选
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Content Area */}
      {viewMode === 'HOTSPOT' ? (
        loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-24 w-full rounded-sm" />
            <Skeleton className="h-24 w-full rounded-sm" />
            <Skeleton className="h-24 w-full rounded-sm" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredHotspots.map((hotspot) => (
              <HotspotCard 
                key={hotspot.id} 
                data={hotspot} 
                onClick={() => handleCardClick(hotspot.id)}
                onIgnore={handleIgnore}
                onCreate={handleCreate}
              />
            ))}
            {filteredHotspots.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Filter className="w-8 h-8 text-slate-300" />
                </div>
                <p>暂无符合筛选条件的热点</p>
                <button 
                  onClick={() => {
                    setFilterCode('');
                    setFilterSelfSelect('ALL');
                    setFilterStatus('ALL');
                  }}
                  className="mt-4 text-brand text-sm hover:underline font-bold"
                >
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        /* PANORAMA MODE */
        <div className="bg-white rounded-sm border border-slate-300 overflow-hidden shadow-none">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
              <thead className="bg-[#f0f4f8] text-slate-600 font-bold border-b border-slate-300">
                <tr>
                  <th className="px-4 py-3 sticky left-0 z-20 bg-[#f0f4f8] border-r border-slate-300 min-w-[160px] shadow-[4px_0_4px_-2px_rgba(0,0,0,0.05)]">代码/名称</th>
                  <th className="px-4 py-3 min-w-[120px] border-r border-slate-200">跟踪指数</th>
                  <th className="px-4 py-3 min-w-[160px] border-r border-slate-200">触发状态</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">最新价</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">涨跌幅</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">溢价率</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">规模(亿)</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">成交额(亿)</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">换手率</th>
                  
                  {/* Performance */}
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">昨日涨跌</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近1周</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近1月</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近3月</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">年初至今</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近1年</th>
                  
                  {/* Avg Vol */}
                  <th className="px-4 py-3 text-right border-r border-slate-200">日均额(1周)</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">1月</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">3月</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">年初至今</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200">1年</th>
                  
                  {/* Inflow */}
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">净流入(昨)</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近1周</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近1月</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">近3月</th>
                  <th className="px-4 py-3 text-right border-r border-slate-200 bg-slate-50/50">年初至今</th>
                  <th className="px-4 py-3 text-right bg-slate-50/50">近1年</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPanorama.map((row) => (
                  <tr key={row.id} className="hover:bg-brand-light/20 transition-colors cursor-pointer group" onClick={() => handleCardClick(row.id)}>
                    <td className="px-4 py-2 sticky left-0 z-10 bg-white border-r border-slate-300 group-hover:bg-[#f8fbff] shadow-[4px_0_4px_-2px_rgba(0,0,0,0.05)] transition-colors">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{row.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{row.code}</div>
                        </div>
                        {row.isSelfSelect && <Eye className="w-3 h-3 text-orange-500 ml-1" />}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-slate-700 truncate max-w-[150px] border-r border-slate-100" title={row.trackingIndex}>{row.trackingIndex}</td>
                    <td className="px-4 py-2 border-r border-slate-100">
                      {row.triggerStatus ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-bold bg-red-50 text-red-700 border border-red-200 truncate max-w-[140px]" title={row.triggerStatus}>
                          {row.triggerStatus}
                        </span>
                      ) : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-medium text-slate-800 border-r border-slate-100">{row.price.toFixed(3)}</td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.changePercent} /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.premiumRate} /></td>
                    <td className="px-4 py-2 text-right font-mono text-slate-600 border-r border-slate-100">{row.scale.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-mono text-slate-600 border-r border-slate-100">{row.volume.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-mono text-slate-600 border-r border-slate-100">{row.turnoverRate.toFixed(2)}%</td>
                    
                    {/* Performance */}
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.changePrevDay} /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.change1W} /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.change1M} /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.change3M} /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.changeYTD} /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><PctCell value={row.change1Y} /></td>
                    
                    {/* Avg Vol */}
                    <td className="px-4 py-2 text-right border-r border-slate-100 font-mono text-slate-600">{row.avgVol1W.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right border-r border-slate-100 font-mono text-slate-600">{row.avgVol1M.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right border-r border-slate-100 font-mono text-slate-600">{row.avgVol3M.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right border-r border-slate-100 font-mono text-slate-600">{row.avgVolYTD.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right border-r border-slate-100 font-mono text-slate-600">{row.avgVol1Y.toFixed(2)}</td>
                    
                    {/* Inflow */}
                    <td className="px-4 py-2 text-right border-r border-slate-100"><NumCell value={row.inflowPrevDay} colorize /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><NumCell value={row.inflow1W} colorize /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><NumCell value={row.inflow1M} colorize /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><NumCell value={row.inflow3M} colorize /></td>
                    <td className="px-4 py-2 text-right border-r border-slate-100"><NumCell value={row.inflowYTD} colorize /></td>
                    <td className="px-4 py-2 text-right"><NumCell value={row.inflow1Y} colorize /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPanorama.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                暂无符合筛选条件的产品
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for Hotspot Card
const HotspotCard: React.FC<{ 
  data: HotspotEvent; 
  onClick: () => void;
  onIgnore: (e: React.MouseEvent) => void;
  onCreate: (e: React.MouseEvent) => void;
}> = ({ data, onClick, onIgnore, onCreate }) => {
  return (
    <div 
      onClick={onClick}
      className="w-full bg-white rounded-sm border border-slate-300 p-4 cursor-pointer transition-all hover:border-brand group relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
           <span className="bg-[#eef6ff] text-brand-dark text-xs px-1.5 py-0.5 rounded-sm font-mono font-bold">{data.time}</span>
           <h3 className="text-base font-bold text-slate-800 flex items-center gap-1 group-hover:text-brand transition-colors">
              {data.name} 
              <span className="text-sm font-normal text-slate-400 font-mono">({data.code})</span>
              {data.status === 'PENDING' && (
                <span className="w-2 h-2 bg-red-600 rounded-full ml-1"></span>
              )}
           </h3>
           {data.status === 'PROCESSING' && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-sm font-bold">已处理</span>}
        </div>
        {data.isSelfSelect && <Eye className="w-4 h-4 text-orange-500" />}
      </div>

      {/* Main Trigger Info */}
      <div className="bg-[#f0f9ff] border border-blue-100 rounded-sm px-3 py-2 mb-2 flex justify-between items-center">
        <span className="text-xs text-slate-600 font-bold">{data.triggerReason}</span>
        <span className="text-lg font-bold font-mono text-brand tabular-nums">{data.metricValue}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed truncate">
        {data.description}
      </p>

      {/* Actions */}
      <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-[max-height] duration-200 ease-in-out">
        <div className="flex gap-2 pt-3 mt-2 border-t border-slate-100">
          <button 
            onClick={onCreate}
            className="flex-1 bg-brand hover:bg-brand-dark text-white text-sm py-1.5 rounded-sm font-bold transition-colors"
          >
            去编辑
          </button>
          <button 
            onClick={onIgnore}
            className="px-4 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-sm text-sm font-bold transition-colors"
          >
            忽略此条消息
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;