

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Share2, Settings, Zap, Award, ChevronDown, MoreHorizontal
} from 'lucide-react';
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ReferenceDot, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MOCK_COMPETITORS, getNewsForProduct, generateChartData, generateHistoricalData, MOCK_HOTSPOTS } from '../constants';
import Toast from '../components/Toast';

const Analysis: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<any[]>([]);
  // Use array for multiple competitors
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('实时');

  const showCompetitor = selectedCompetitors.length > 0;

  // Find the specific hotspot event based on ID from URL
  const currentHotspot = MOCK_HOTSPOTS.find(h => h.id === id);

  // Fallback/Default data if ID not found (prevents crash, defaults to Semiconductor)
  const displayData = currentHotspot || {
    id: 'default',
    name: '半导体ETF',
    code: '512480',
    triggerReason: '盘中成交额突破10亿元',
    metricValue: '10.2亿',
    time: '10:42',
    description: '行业利好消息刺激，早盘资金大幅涌入，成交额创近30日新高。'
  };

  // Get dynamic news based on product code
  const { news: newsList, announcements: announcementList } = getNewsForProduct(displayData.code);

  useEffect(() => {
    if (timeRange === '实时') {
      setChartData(generateChartData());
    } else {
      setChartData(generateHistoricalData(timeRange));
    }
  }, [id, timeRange]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCompetitorToggle = (code: string) => {
    setSelectedCompetitors(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  const handleConfigClick = () => {
    navigate('/config-detail');
  };

  // Derived data for display (Intraday)
  const latestData = timeRange === '实时' ? (chartData[chartData.length - 1] || {}) : {};
  const preClose = timeRange === '实时' ? (chartData[0]?.value || 1.0) : 0;
  const currentPrice = timeRange === '实时' ? (latestData.value || 0) : 0;
  const currentIOPV = timeRange === '实时' ? (latestData.iopv || 0) : 0; 
  
  // Calculate changes (Intraday)
  const priceChange = currentPrice - preClose;
  const priceChangePct = preClose !== 0 ? (priceChange / preClose) * 100 : 0;
  
  const triggerPoint = timeRange === '实时' ? chartData.find(p => p.isTrigger) : null;

  // Calculate synchronized domain for Dual Y-Axis (Intraday & Historical)
  const allValues: number[] = [];
  chartData.forEach(d => {
      // Always add self value
      if (typeof d.value === 'number') allValues.push(d.value);
      
      // Add competitor values if selected
      if (showCompetitor && d.competitors) {
          selectedCompetitors.forEach(code => {
             if (typeof d.competitors[code] === 'number') allValues.push(d.competitors[code]);
          });
      }
      
      // Only for Real-time default mode, include IOPV
      if (timeRange === '实时' && !showCompetitor && typeof d.iopv === 'number') {
          allValues.push(d.iopv);
      }
  });
  
  const minVal = allValues.length > 0 ? Math.min(...allValues) : 0;
  const maxVal = allValues.length > 0 ? Math.max(...allValues) : 1;
  const range = maxVal - minVal || minVal * 0.02; 
  const yDomain: [number, number] = [minVal - range * 0.1, maxVal + range * 0.1];

  // Helper to get competitor mock data by code
  const getCompData = (code: string) => MOCK_COMPETITORS.find(c => c.code === code);

  // Tooltip for Real-time Chart
  const IntradayTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const price = data.value;
      const change = price - preClose;
      const changePct = preClose !== 0 ? (change / preClose) * 100 : 0;
      const vol = data.volume || 0;
      
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-xs z-50 min-w-[200px]">
          <div className="text-slate-500 mb-2 font-mono flex items-center justify-between gap-4">
             <span>{label}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-slate-600">我司价格:</span>
            <span className="font-mono font-bold text-slate-800 text-right">{price.toFixed(3)}</span>
            
            {!showCompetitor && (
              <>
                <span className="text-slate-600">IOPV:</span>
                <span className="font-mono font-medium text-slate-500 text-right">{data.iopv?.toFixed(3)}</span>
              </>
            )}

            {/* Competitors List */}
            {showCompetitor && selectedCompetitors.map(code => {
              const compName = MOCK_COMPETITORS.find(c => c.code === code)?.name || code;
              const val = data.competitors?.[code] || 0;
              return (
                <React.Fragment key={code}>
                   <span className="text-slate-500 truncate" title={compName}>{compName}:</span>
                   <span className="font-mono font-medium text-slate-500 text-right">{val.toFixed(3)}</span>
                </React.Fragment>
              );
            })}

            <div className="col-span-2 h-[1px] bg-slate-100 my-1"></div>
            
            <span className="text-slate-600">涨跌:</span>
            <span className={`font-mono font-bold text-right ${change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {change > 0 ? '+' : ''}{change.toFixed(3)}
            </span>
            
            <span className="text-slate-600">涨跌幅:</span>
            <span className={`font-mono font-bold text-right ${changePct >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {changePct > 0 ? '+' : ''}{changePct.toFixed(2)}%
            </span>
            
            <span className="text-slate-600">成交量:</span>
            <span className="font-mono font-bold text-slate-800 text-right">{vol}万</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Tooltip for Historical Chart
  const HistoricalTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded text-xs min-w-[150px]">
          <div className="font-mono text-slate-500 mb-2">{data.date}</div>
          
          {/* Self */}
          <div className="flex justify-between gap-4 mb-1">
             <span className="text-slate-600 font-bold">我司产品:</span>
             <span className={`font-bold font-mono ${data.value >= 0 ? 'text-red-500' : 'text-green-500'}`}>
               {data.value >= 0 ? '+' : ''}{data.value.toFixed(2)}%
             </span>
          </div>

          {/* Competitors */}
          {showCompetitor && selectedCompetitors.map(code => {
              const val = data.competitors?.[code] || 0;
              const name = MOCK_COMPETITORS.find(c => c.code === code)?.name || code;
              return (
                <div key={code} className="flex justify-between gap-4">
                  <span className="text-slate-500 truncate max-w-[100px]">{name}:</span>
                  <span className={`font-medium font-mono ${val >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {val >= 0 ? '+' : ''}{val.toFixed(2)}%
                  </span>
                </div>
              );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Top Toolbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            title="返回上一页"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {displayData.name} <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">{displayData.code}</span>
            </h1>
            <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3" />
              触发热点: {displayData.triggerReason} <span className="font-bold">{displayData.metricValue}</span> ({displayData.time})
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleConfigClick}
             className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-brand bg-slate-50 hover:bg-brand-light rounded-lg transition-colors text-sm font-medium"
           >
            <Settings className="w-4 h-4" />
            规则配置
          </button>
          <button 
             onClick={() => navigate('/workbench')}
             className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg transition-colors text-sm font-medium shadow-sm shadow-brand/30"
           >
            <Share2 className="w-4 h-4" />
            去制作文案
          </button>
        </div>
      </div>

      {/* Top Section: Chart & Comparison */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Chart (7/12) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          
          <div>
            {/* Chart Section */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              {/* 1. Header Metrics (Only for Real-time mode) */}
              {timeRange === '实时' && (
                <div className="px-6 pt-6 pb-2">
                  <h2 className="text-base font-bold text-slate-700 mb-4">业绩走势</h2>
                  <div className="flex items-start gap-12">
                    {/* Price Metric */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                          <span className="w-3 h-1 bg-[#0e57b4] rounded-full"></span>
                          <span className="text-xs font-bold text-slate-600">价格</span>
                          <span className={`text-sm font-bold ml-1 ${priceChange >= 0 ? 'text-[#d9001b]' : 'text-green-500'}`}>
                            {priceChange > 0 ? '+' : ''}{priceChangePct.toFixed(2)}%
                          </span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-slate-800 tracking-tight">
                        {currentPrice.toFixed(3)}
                      </div>
                    </div>
                    
                    {/* Secondary Metric: IOPV or Competitor */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                          <span className={`w-3 h-1 rounded-full ${showCompetitor ? 'bg-slate-400' : 'bg-[#fbbf24]'}`}></span>
                          <span className="text-xs font-bold text-slate-600 flex items-center">
                            {showCompetitor ? '竞品' : 'IOPV'}
                            {!showCompetitor && (
                              <span className="ml-1 w-3 h-3 rounded-full border border-slate-300 text-[8px] flex items-center justify-center text-slate-400">i</span>
                            )}
                          </span>
                      </div>
                      <div className="font-mono text-2xl font-medium text-slate-500 tracking-tight">
                        {!showCompetitor ? currentIOPV.toFixed(3) : (selectedCompetitors.length === 1 ? '...' : '...')} 
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Header for Historical */}
              {timeRange !== '实时' && (
                <div className="px-6 pt-6 pb-2">
                  <h2 className="text-base font-bold text-slate-700 mb-1">业绩走势</h2>
                  <div className="text-xs text-slate-400">累计涨跌幅(%)</div>
                </div>
              )}

              {/* 2. Chart Area */}
              <div className="h-[360px] w-full px-2">
                <ResponsiveContainer width="100%" height="100%">
                  {timeRange === '实时' ? (
                    // INTRADAY REAL-TIME CHART
                    <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0e57b4" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#0e57b4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fill: '#94a3b8'}}
                        ticks={['09:30', '11:30', '15:00']}
                        interval={0}
                        tickFormatter={(val) => {
                          if (val === '11:30') return '11:30/13:00';
                          return val;
                        }}
                      />
                      
                      <YAxis 
                        yAxisId="left"
                        domain={yDomain} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 11, fill: '#94a3b8'}}
                        tickFormatter={(val) => val.toFixed(3)}
                        width={50}
                      />

                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={yDomain}
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 11, fill: '#94a3b8'}}
                        tickFormatter={(val) => {
                          const pct = ((val - preClose) / preClose) * 100;
                          return `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
                        }}
                        width={50}
                      />
                      
                      <Tooltip content={<IntradayTooltip />} />
                      
                      {/* Self Product: Area (Normal) OR Thick Line (Comparison) */}
                      {showCompetitor ? (
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="value"
                          stroke="#0e57b4"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 4 }}
                          name="我司产品"
                          isAnimationActive={true}
                        />
                      ) : (
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0e57b4" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                          name="价格"
                        />
                      )}
                      
                      {/* Secondary: Competitor (Thin Gray) OR IOPV (Yellow) */}
                      {showCompetitor ? (
                        selectedCompetitors.map(code => (
                          <Line
                            key={code}
                            yAxisId="left"
                            type="monotone"
                            dataKey={`competitors.${code}`}
                            stroke="#94a3b8" // Slate-400 Gray
                            strokeWidth={1}
                            dot={false}
                            name={MOCK_COMPETITORS.find(c => c.code === code)?.name}
                            isAnimationActive={true}
                          />
                        ))
                      ) : (
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="iopv" 
                          stroke="#fbbf24" 
                          strokeWidth={1.5} 
                          dot={false}
                          name="IOPV"
                        />
                      )}

                      {/* Invisible line for Right Axis Scaling */}
                      <Line 
                        yAxisId="right" 
                        dataKey="value" 
                        stroke="none" 
                        dot={false} 
                        activeDot={false} 
                        isAnimationActive={false} 
                      />

                      {/* Trigger Dot: Only show if NOT in comparison mode */}
                      {!showCompetitor && triggerPoint && (
                        <ReferenceDot 
                          yAxisId="left"
                          x={triggerPoint.time} 
                          y={triggerPoint.value} 
                          r={5} 
                          fill="#ef4444" 
                          stroke="white" 
                          strokeWidth={2}
                        />
                      )}
                      {!showCompetitor && triggerPoint && (
                        <ReferenceLine yAxisId="left" x={triggerPoint.time} stroke="#ef4444" strokeDasharray="3 3" />
                      )}
                    </AreaChart>
                  ) : (
                    // HISTORICAL TREND CHART
                    <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e0f1ff" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#e0f1ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 11, fill: '#94a3b8'}}
                        ticks={chartData.length > 0 ? [chartData[0].date, chartData[chartData.length - 1].date] : []}
                        interval={0}
                      />
                      <YAxis 
                        domain={yDomain}
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 11, fill: '#94a3b8'}}
                        tickFormatter={(val) => `${val.toFixed(2)}%`}
                        width={50}
                      />
                      <Tooltip content={<HistoricalTooltip />} />
                      
                      {/* Self Product */}
                      {showCompetitor ? (
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0e57b4"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 4 }}
                          name="我司产品"
                          isAnimationActive={true}
                        />
                      ) : (
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#f59e0b" // Orange stroke
                          strokeWidth={2}
                          fill="url(#colorHist)" 
                        />
                      )}

                      {/* Competitors */}
                      {showCompetitor && selectedCompetitors.map(code => (
                        <Line
                          key={code}
                          type="monotone"
                          dataKey={`competitors.${code}`}
                          stroke="#94a3b8"
                          strokeWidth={1}
                          dot={false}
                          name={MOCK_COMPETITORS.find(c => c.code === code)?.name}
                          isAnimationActive={true}
                        />
                      ))}
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* 3. Bottom Tabs */}
              <div className="flex border-t border-slate-100 mt-2">
                {['实时', '近1月', '近3月', '近6月', '更多'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setTimeRange(t)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors relative flex items-center justify-center gap-1
                        ${timeRange === t ? 'text-[#0e57b4] bg-brand-light/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                      {t}
                      {t === '更多' && <ChevronDown className="w-3 h-3" />}
                      {timeRange === t && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0e57b4]"></div>}
                    </button>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor Selector (Moved outside chart card) */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-600">添加对比:</span>
            {MOCK_COMPETITORS.filter(c => !c.isLeader).map(comp => (
              <button
                key={comp.code}
                onClick={() => handleCompetitorToggle(comp.code)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                  selectedCompetitors.includes(comp.code)
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                <span>VS</span>
                <span>{comp.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Comparison Table (5/12) */}
        <div className="col-span-12 lg:col-span-5">
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full">
             <h2 className="text-lg font-bold text-slate-700 mb-4">横向对比</h2>
             
             <div className="overflow-hidden rounded-lg border border-slate-200 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                       <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 whitespace-nowrap sticky left-0 bg-slate-50 border-r border-slate-200 z-10">指标</th>
                       <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 whitespace-nowrap min-w-[100px]">
                         <div className="flex items-center justify-end gap-1 text-[#0e57b4] font-bold">
                           {displayData.name.replace('ETF', '')}
                           <span className="text-[10px] bg-blue-100 px-1 rounded">我司</span>
                         </div>
                       </th>
                       {selectedCompetitors.map(code => (
                         <th key={code} className="px-4 py-3 text-right text-xs font-medium text-slate-500 whitespace-nowrap min-w-[100px]">
                           {getCompData(code)?.name?.replace('ETF', '').replace(/\(.*\)/, '') || code}
                         </th>
                       ))}
                       {selectedCompetitors.length === 0 && (
                          <th className="px-4 py-3 text-center text-xs text-slate-400 font-normal">
                            (未选择竞品)
                          </th>
                       )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* 1. Volume */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">成交额</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                         {getCompData(displayData.code)?.volume || (displayData.metricValue.includes('亿') ? displayData.metricValue : '10.5亿')}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.volume || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 2. Latest Price */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">最新价</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-800">¥{currentPrice.toFixed(3)}</td>
                      {selectedCompetitors.map(code => (
                         <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                            ¥{latestData?.competitors?.[code]?.toFixed(3) || '-'}
                         </td>
                      ))}
                      {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 3. Premium Rate */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">溢折率</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                        {getCompData(displayData.code)?.premiumRate || '0.12%'}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.premiumRate || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 4. Net Inflow */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">净流入额</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                        {getCompData(displayData.code)?.netInflow || '+1.2亿'}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.netInflow || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 5. Product Scale */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">产品规模</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                        {getCompData(displayData.code)?.scale || '256.5亿'}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.scale || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 6. Market Share */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">市场份额占比</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                        {getCompData(displayData.code)?.marketShare || '42.5%'}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.marketShare || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 7. 1M Return */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">近1月收益率</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                        {getCompData(displayData.code)?.change1M || '+5.2%'}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.change1M || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                    {/* 8. 1M Inflow */}
                    <tr>
                      <td className="px-4 py-3 text-slate-600 font-medium sticky left-0 bg-white border-r border-slate-100">近1月净流入</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800">
                        {getCompData(displayData.code)?.inflow1M || '+15.6亿'}
                      </td>
                      {selectedCompetitors.map(code => (
                        <td key={code} className="px-4 py-3 text-right font-mono text-slate-600">
                          {getCompData(code)?.inflow1M || '-'}
                        </td>
                      ))}
                       {selectedCompetitors.length === 0 && <td className="px-4 py-3 text-center text-slate-300">-</td>}
                    </tr>

                  </tbody>
                </table>
             </div>

             <div className="mt-6 bg-brand-light p-4 rounded-lg">
                <h4 className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  竞争优势分析
                </h4>
                <p className="text-xs text-brand-dark/80 leading-relaxed">
                  当前我司产品成交额显著领先市场竞品，流动性优势明显；且在溢价率上保持合理区间，资金承接力度强。
                </p>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Hotspot News (Split into News/Alerts & Announcements/Reports) */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full">
        <div className="grid grid-cols-2 gap-8">
          
          {/* Left Column: News & Alerts */}
          <div>
             <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                <h2 className="text-base font-bold text-slate-700">资讯、提醒</h2>
                <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
             </div>
             <div className="space-y-2 h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {newsList.map(item => (
                  <div key={item.id} className="flex items-start gap-2 text-sm group cursor-pointer hover:bg-slate-50 p-1 rounded">
                     <span className="text-slate-400 font-mono whitespace-nowrap text-xs pt-0.5 min-w-[36px]">{item.date}</span>
                     <span className="text-slate-500 font-medium text-xs border border-slate-200 px-1 rounded whitespace-nowrap scale-90 origin-left">[{item.tag}]</span>
                     <span className="text-slate-700 group-hover:text-brand line-clamp-1 flex-1" title={item.title}>{item.title}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Column: Announcements & Reports */}
          <div>
             <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                <h2 className="text-base font-bold text-slate-700">公告、研报</h2>
                <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
             </div>
             <div className="space-y-2 h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {announcementList.map(item => (
                  <div key={item.id} className="flex items-start gap-2 text-sm group cursor-pointer hover:bg-slate-50 p-1 rounded">
                     <span className="text-slate-400 font-mono whitespace-nowrap text-xs pt-0.5 min-w-[36px]">{item.date}</span>
                     <span className="text-slate-500 font-medium text-xs border border-slate-200 px-1 rounded whitespace-nowrap scale-90 origin-left">[{item.tag}]</span>
                     <span className="text-slate-700 group-hover:text-brand line-clamp-1 flex-1" title={item.title}>{item.title}</span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analysis;
