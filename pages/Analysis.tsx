import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Share2, Settings, Zap, Award, ChevronDown, MoreHorizontal
} from 'lucide-react';
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ReferenceDot, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getCompetitorsForProduct, getNewsForProduct, generateChartData, generateHistoricalData, MOCK_HOTSPOTS, getMockPanoramaData } from '../constants';
import Toast from '../components/Toast';

const Analysis: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('实时');

  const showCompetitor = selectedCompetitors.length > 0;
  const currentHotspot = MOCK_HOTSPOTS.find(h => h.id === id);

  let displayData = currentHotspot;
  
  if (!displayData) {
     const panoramaData = getMockPanoramaData();
     const found = panoramaData.find(p => p.id === id || p.code === id);
     if (found) {
        displayData = {
          id: found.id,
          name: found.name,
          code: found.code,
          triggerReason: found.triggerStatus || '常态监控',
          metricValue: found.triggerStatus ? '触发异动' : '运行平稳',
          triggerType: 'PRICE',
          status: 'COMPLETED',
          time: '实时',
          isSelfSelect: found.isSelfSelect,
          description: '当前产品处于常态监控中，各项指标运行平稳。'
        } as any;
     }
  }

  if (!displayData) {
     displayData = {
      id: 'default',
      name: '半导体ETF',
      code: '512480',
      triggerReason: '盘中成交额突破10亿元',
      metricValue: '10.2亿',
      triggerType: 'VOLUME',
      status: 'PENDING',
      isSelfSelect: true,
      time: '10:42',
      description: '行业利好消息刺激，早盘资金大幅涌入，成交额创近30日新高。'
    } as any;
  }

  const competitors = getCompetitorsForProduct(displayData.code);
  const { news: newsList, announcements: announcementList } = getNewsForProduct(displayData.code);

  useEffect(() => {
    setSelectedCompetitors([]);
  }, [displayData.code]);

  useEffect(() => {
    if (timeRange === '实时') {
      setChartData(generateChartData(competitors));
    } else {
      setChartData(generateHistoricalData(timeRange, competitors));
    }
  }, [displayData.code, timeRange]);

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

  const latestData = timeRange === '实时' ? (chartData[chartData.length - 1] || {}) : {};
  const preClose = timeRange === '实时' ? (chartData[0]?.value || 1.0) : 0;
  const currentPrice = timeRange === '实时' ? (latestData.value || 0) : 0;
  const currentIOPV = timeRange === '实时' ? (latestData.iopv || 0) : 0; 
  
  const priceChange = currentPrice - preClose;
  const priceChangePct = preClose !== 0 ? (priceChange / preClose) * 100 : 0;
  
  const triggerPoint = timeRange === '实时' ? chartData.find(p => p.isTrigger) : null;

  const allValues: number[] = [];
  chartData.forEach(d => {
      if (typeof d.value === 'number') allValues.push(d.value);
      if (showCompetitor && d.competitors) {
          selectedCompetitors.forEach(code => {
             if (typeof d.competitors[code] === 'number') allValues.push(d.competitors[code]);
          });
      }
      if (timeRange === '实时' && !showCompetitor && typeof d.iopv === 'number') {
          allValues.push(d.iopv);
      }
  });
  
  const minVal = allValues.length > 0 ? Math.min(...allValues) : 0;
  const maxVal = allValues.length > 0 ? Math.max(...allValues) : 1;
  const range = maxVal - minVal || minVal * 0.02; 
  const yDomain: [number, number] = [minVal - range * 0.1, maxVal + range * 0.1];

  const getCompData = (code: string) => competitors.find(c => c.code === code);

  const IntradayTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const price = data.value;
      const change = price - preClose;
      const changePct = preClose !== 0 ? (change / preClose) * 100 : 0;
      const vol = data.volume || 0;
      
      return (
        <div className="bg-white p-2 border border-slate-300 shadow-none rounded-sm text-xs z-50 min-w-[180px]">
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

            {showCompetitor && selectedCompetitors.map(code => {
              const compName = competitors.find(c => c.code === code)?.name || code;
              const val = data.competitors?.[code] || 0;
              return (
                <React.Fragment key={code}>
                   <span className="text-slate-500 truncate" title={compName}>{compName}:</span>
                   <span className="font-mono font-medium text-slate-500 text-right">{val.toFixed(3)}</span>
                </React.Fragment>
              );
            })}

            <div className="col-span-2 h-[1px] bg-slate-200 my-1"></div>
            
            <span className="text-slate-600">涨跌:</span>
            <span className={`font-mono font-bold text-right ${change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {change > 0 ? '+' : ''}{change.toFixed(3)}
            </span>
            
            <span className="text-slate-600">涨跌幅:</span>
            <span className={`font-mono font-bold text-right ${changePct >= 0 ? 'text-red-600' : 'text-green-600'}`}>
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

  const HistoricalTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-slate-300 shadow-none rounded-sm text-xs min-w-[150px]">
          <div className="font-mono text-slate-500 mb-2">{data.date}</div>
          
          <div className="flex justify-between gap-4 mb-1">
             <span className="text-slate-600 font-bold">我司产品:</span>
             <span className={`font-bold font-mono ${data.value >= 0 ? 'text-red-600' : 'text-green-600'}`}>
               {data.value >= 0 ? '+' : ''}{data.value.toFixed(2)}%
             </span>
          </div>

          {showCompetitor && selectedCompetitors.map(code => {
              const val = data.competitors?.[code] || 0;
              const name = competitors.find(c => c.code === code)?.name || code;
              return (
                <div key={code} className="flex justify-between gap-4">
                  <span className="text-slate-500 truncate max-w-[100px]">{name}:</span>
                  <span className={`font-medium font-mono ${val >= 0 ? 'text-red-600' : 'text-green-600'}`}>
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
    <div className="space-y-4">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Top Toolbar */}
      <div className="flex justify-between items-center bg-white p-3 rounded-sm border border-slate-300">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack} 
            className="p-1.5 hover:bg-slate-100 rounded-sm text-slate-500 transition-colors"
            title="返回上一页"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {displayData.name} <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm font-mono border border-slate-200">{displayData.code}</span>
            </h1>
            <div className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
              <Zap className="w-3 h-3" />
              触发热点: {displayData.triggerReason} <span className="font-bold font-mono">{displayData.metricValue}</span> ({displayData.time})
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={handleConfigClick}
             className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-brand bg-white border border-slate-300 hover:border-brand rounded-sm transition-colors text-sm font-bold"
           >
            <Settings className="w-4 h-4" />
            规则配置
          </button>
          <button 
             onClick={() => navigate('/workbench')}
             className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-sm transition-colors text-sm font-bold border border-brand-dark"
           >
            <Share2 className="w-4 h-4" />
            去制作文案
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 space-y-4">
          
          <div>
            <div className="bg-white rounded-sm border border-slate-300 overflow-hidden">
              {timeRange === '实时' && (
                <div className="px-4 pt-4 pb-2 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">业绩走势</h2>
                  <div className="flex items-start gap-12">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                          <span className="w-3 h-1 bg-[#0e57b4] rounded-none"></span>
                          <span className="text-xs font-bold text-slate-500">价格</span>
                          <span className={`text-sm font-bold ml-1 tabular-nums ${priceChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {priceChange > 0 ? '+' : ''}{priceChangePct.toFixed(2)}%
                          </span>
                      </div>
                      <div className="font-mono text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
                        {currentPrice.toFixed(3)}
                      </div>
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                          <span className={`w-3 h-1 rounded-none ${showCompetitor ? 'bg-slate-400' : 'bg-[#fbbf24]'}`}></span>
                          <span className="text-xs font-bold text-slate-500 flex items-center">
                            {showCompetitor ? '竞品' : 'IOPV'}
                            {!showCompetitor && (
                              <span className="ml-1 w-3 h-3 rounded-full border border-slate-300 text-[8px] flex items-center justify-center text-slate-400">i</span>
                            )}
                          </span>
                      </div>
                      <div className="font-mono text-3xl font-medium text-slate-400 tracking-tight tabular-nums">
                        {!showCompetitor ? currentIOPV.toFixed(3) : (selectedCompetitors.length === 1 ? '...' : '...')} 
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {timeRange !== '实时' && (
                <div className="px-4 pt-4 pb-2 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-700 mb-1">业绩走势</h2>
                  <div className="text-xs text-slate-400">累计涨跌幅(%)</div>
                </div>
              )}

              <div className="h-[360px] w-full px-2 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  {timeRange === '实时' ? (
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0e57b4" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0e57b4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      
                      <XAxis 
                        dataKey="time" 
                        axisLine={true} 
                        tickLine={true} 
                        tick={{fontSize: 10, fill: '#64748b', fontFamily: 'Roboto Mono'}}
                        ticks={['09:30', '11:30', '15:00']}
                        interval={0}
                        tickFormatter={(val) => val === '11:30' ? '11:30/13:00' : val}
                      />
                      
                      <YAxis 
                        yAxisId="left"
                        domain={yDomain} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#64748b', fontFamily: 'Roboto Mono'}}
                        tickFormatter={(val) => val.toFixed(3)}
                        width={45}
                      />

                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={yDomain}
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#64748b', fontFamily: 'Roboto Mono'}}
                        tickFormatter={(val) => {
                          const pct = ((val - preClose) / preClose) * 100;
                          return `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
                        }}
                        width={45}
                      />
                      
                      <Tooltip content={<IntradayTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      
                      {showCompetitor ? (
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="value"
                          stroke="#0e57b4"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          name="我司产品"
                          isAnimationActive={false}
                        />
                      ) : (
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0e57b4" 
                          strokeWidth={1.5}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                          name="价格"
                          isAnimationActive={false}
                        />
                      )}
                      
                      {showCompetitor ? (
                        selectedCompetitors.map(code => (
                          <Line
                            key={code}
                            yAxisId="left"
                            type="monotone"
                            dataKey={`competitors.${code}`}
                            stroke="#94a3b8" 
                            strokeWidth={1}
                            dot={false}
                            name={competitors.find(c => c.code === code)?.name}
                            isAnimationActive={false}
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
                          isAnimationActive={false}
                        />
                      )}

                      <Line yAxisId="right" dataKey="value" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />

                      {!showCompetitor && triggerPoint && (
                        <ReferenceDot 
                          yAxisId="left"
                          x={triggerPoint.time} 
                          y={triggerPoint.value} 
                          r={4} 
                          fill="#ef4444" 
                          stroke="white" 
                          strokeWidth={1.5}
                        />
                      )}
                      {!showCompetitor && triggerPoint && (
                        <ReferenceLine yAxisId="left" x={triggerPoint.time} stroke="#ef4444" strokeDasharray="3 3" />
                      )}
                    </AreaChart>
                  ) : (
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e0f1ff" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#e0f1ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        axisLine={true} 
                        tickLine={true}
                        tick={{fontSize: 10, fill: '#64748b', fontFamily: 'Roboto Mono'}}
                        ticks={chartData.length > 0 ? [chartData[0].date, chartData[chartData.length - 1].date] : []}
                        interval={0}
                      />
                      <YAxis 
                        domain={yDomain}
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#64748b', fontFamily: 'Roboto Mono'}}
                        tickFormatter={(val) => `${val.toFixed(2)}%`}
                        width={45}
                      />
                      <Tooltip content={<HistoricalTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      
                      {showCompetitor ? (
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0e57b4"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          name="我司产品"
                          isAnimationActive={false}
                        />
                      ) : (
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0e57b4"
                          strokeWidth={2}
                          fill="url(#colorHist)"
                          isAnimationActive={false} 
                        />
                      )}

                      {showCompetitor && selectedCompetitors.map(code => (
                        <Line
                          key={code}
                          type="monotone"
                          dataKey={`competitors.${code}`}
                          stroke="#94a3b8"
                          strokeWidth={1}
                          dot={false}
                          name={competitors.find(c => c.code === code)?.name}
                          isAnimationActive={false}
                        />
                      ))}
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="flex border-t border-slate-300 mt-2 bg-slate-50">
                {['实时', '近1月', '近3月', '近6月', '更多'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setTimeRange(t)}
                      className={`flex-1 py-2 text-xs font-bold transition-colors relative flex items-center justify-center gap-1 border-r border-slate-200 last:border-r-0
                        ${timeRange === t ? 'text-brand bg-white border-b-2 border-b-brand' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                    >
                      {t}
                      {t === '更多' && <ChevronDown className="w-3 h-3" />}
                    </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-slate-500 uppercase">添加对比:</span>
            {competitors.filter(c => !c.isLeader).map(comp => (
              <button
                key={comp.code}
                onClick={() => handleCompetitorToggle(comp.code)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-sm border text-xs font-bold transition-all ${
                  selectedCompetitors.includes(comp.code)
                    ? 'bg-slate-700 text-white border-slate-700' 
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                }`}
              >
                <span className="opacity-50 text-[10px]">VS</span>
                <span>{comp.name}</span>
              </button>
            ))}
          </div>

        </div>

        <div className="col-span-12 lg:col-span-5">
           <div className="bg-white p-4 rounded-sm border border-slate-300 h-full flex flex-col">
             <h2 className="text-sm font-bold text-slate-700 mb-3 border-b border-slate-100 pb-2">横向对比</h2>
             
             <div className="overflow-hidden border border-slate-300 overflow-x-auto flex-1">
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-slate-50">
                    <tr>
                       <th className="px-3 py-2 text-left font-bold text-slate-600 border-b border-r border-slate-300 bg-slate-100 w-24">指标</th>
                       <th className="px-3 py-2 text-right font-bold text-brand border-b border-r border-slate-300 min-w-[90px] bg-blue-50/50">
                         {displayData.name.replace('ETF', '')}
                       </th>
                       {selectedCompetitors.map(code => (
                         <th key={code} className="px-3 py-2 text-right font-medium text-slate-500 border-b border-r border-slate-300 min-w-[90px]">
                           {getCompData(code)?.name?.replace('ETF', '').replace(/\(.*\)/, '') || code}
                         </th>
                       ))}
                       {selectedCompetitors.length === 0 && (
                          <th className="px-3 py-2 text-center font-normal text-slate-400 italic bg-slate-50">
                            --
                          </th>
                       )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { label: '成交额', key: 'volume', default: '10.5亿' },
                      { label: '最新价', key: 'price', value: currentPrice, format: (v:any) => `¥${v.toFixed(3)}` },
                      { label: '溢折率', key: 'premiumRate', default: '0.12%' },
                      { label: '净流入额', key: 'netInflow', default: '+1.2亿' },
                      { label: '产品规模', key: 'scale', default: '256.5亿' },
                      { label: '市场份额', key: 'marketShare', default: '42.5%' },
                      { label: '近1月收益', key: 'change1M', default: '+5.2%' },
                      { label: '近1月流入', key: 'inflow1M', default: '+15.6亿' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2 text-slate-600 font-medium border-r border-slate-300 bg-slate-50">{row.label}</td>
                        <td className="px-3 py-2 text-right font-mono text-slate-800 border-r border-slate-300 bg-blue-50/10 font-bold">
                           {row.value !== undefined ? row.format(row.value) : (getCompData(displayData.code) as any)?.[row.key] || row.default}
                        </td>
                        {selectedCompetitors.map(code => (
                          <td key={code} className="px-3 py-2 text-right font-mono text-slate-600 border-r border-slate-300">
                            {row.key === 'price' 
                              ? `¥${latestData?.competitors?.[code]?.toFixed(3) || '-'}` 
                              : (getCompData(code) as any)?.[row.key] || '-'}
                          </td>
                        ))}
                        {selectedCompetitors.length === 0 && <td className="px-3 py-2 text-center text-slate-300">-</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             <div className="mt-4 bg-[#f8fbff] p-3 rounded-sm border border-blue-100">
                <h4 className="text-xs font-bold text-brand-dark mb-1 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  竞争优势分析
                </h4>
                <p className="text-[10px] text-brand-dark/80 leading-relaxed text-justify">
                  当前我司产品成交额显著领先市场竞品，流动性优势明显；且在溢价率上保持合理区间，资金承接力度强。
                </p>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-sm border border-slate-300 h-full">
        <div className="grid grid-cols-2 gap-8">
          
          <div>
             <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-700">资讯、提醒</h2>
                <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer hover:text-brand" />
             </div>
             <div className="space-y-1 h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {newsList.map(item => (
                  <div key={item.id} className="flex items-start gap-2 text-xs group cursor-pointer hover:bg-slate-100 p-1.5 rounded-sm border-b border-transparent hover:border-slate-200">
                     <span className="text-slate-400 font-mono whitespace-nowrap min-w-[36px]">{item.date}</span>
                     <span className="text-slate-500 font-bold border border-slate-200 px-1 rounded-sm whitespace-nowrap scale-90 origin-left">[{item.tag}]</span>
                     <span className="text-slate-700 group-hover:text-brand line-clamp-1 flex-1 font-medium" title={item.title}>{item.title}</span>
                  </div>
                ))}
             </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-700">公告、研报</h2>
                <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer hover:text-brand" />
             </div>
             <div className="space-y-1 h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {announcementList.map(item => (
                  <div key={item.id} className="flex items-start gap-2 text-xs group cursor-pointer hover:bg-slate-100 p-1.5 rounded-sm border-b border-transparent hover:border-slate-200">
                     <span className="text-slate-400 font-mono whitespace-nowrap min-w-[36px]">{item.date}</span>
                     <span className="text-slate-500 font-bold border border-slate-200 px-1 rounded-sm whitespace-nowrap scale-90 origin-left">[{item.tag}]</span>
                     <span className="text-slate-700 group-hover:text-brand line-clamp-1 flex-1 font-medium" title={item.title}>{item.title}</span>
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