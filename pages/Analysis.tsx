
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Share2, Search, Zap, 
  Settings, TrendingUp, DollarSign, Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MOCK_COMPETITORS, MOCK_NEWS, generateChartData, MOCK_HOTSPOTS } from '../constants';
import { CompetitorData } from '../types';
import Toast from '../components/Toast';

const Analysis: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<any[]>([]);
  const [showCompetitor, setShowCompetitor] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

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

  useEffect(() => {
    setChartData(generateChartData());
  }, [id]);

  const handleCompetitorToggle = (code: string) => {
    if (selectedCompetitor === code && showCompetitor) {
      setShowCompetitor(false);
      setSelectedCompetitor(null);
    } else {
      setSelectedCompetitor(code);
      setShowCompetitor(true);
    }
  };

  const handleConfigClick = () => {
    navigate('/config-detail');
  };

  const triggerPoint = chartData.find(p => p.isTrigger);

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Top Toolbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {displayData.name} <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{displayData.code}</span>
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

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Chart & Attribution (8/12) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-700">盘中实时走势</h2>
              {showCompetitor && (
                <div className="flex items-center gap-4 text-xs">
                   <div className="flex items-center gap-1">
                      <span className="w-3 h-1 bg-brand"></span>
                      <span>本基金</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <span className="w-3 h-1 bg-slate-400"></span>
                      <span>竞品对标</span>
                   </div>
                </div>
              )}
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" minTickGap={30} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis domain={['auto', 'auto']} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0e57b4" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                  {showCompetitor && (
                    <Line 
                      type="monotone" 
                      dataKey="competitorValue" 
                      stroke="#94a3b8" 
                      strokeWidth={1.5} 
                      dot={false} 
                      strokeDasharray="5 5" 
                    />
                  )}
                  {/* Trigger Point (Mocked at 10:42 for visual, ideally would match hotspot time) */}
                  {!showCompetitor && triggerPoint && (
                     <ReferenceDot 
                       x={triggerPoint.time} 
                       y={triggerPoint.value} 
                       r={6} 
                       fill="#ef4444" 
                       stroke="white" 
                       strokeWidth={2}
                     />
                  )}
                  {!showCompetitor && triggerPoint && (
                     <ReferenceLine x={triggerPoint.time} stroke="#ef4444" strokeDasharray="3 3" />
                  )}
                </LineChart>
              </ResponsiveContainer>
              
              {!showCompetitor && triggerPoint && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border border-red-100 animate-in fade-in zoom-in duration-300">
                  <div className="text-xs text-slate-500 mb-1">{displayData.time} 触发异动</div>
                  <div className="text-red-600 font-bold text-sm">{displayData.triggerReason} {displayData.metricValue}</div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-red-100"></div>
                </div>
              )}
            </div>

            {/* Competitor Selector */}
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {MOCK_COMPETITORS.filter(c => !c.isLeader).map(comp => (
                <button
                  key={comp.code}
                  onClick={() => handleCompetitorToggle(comp.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm whitespace-nowrap transition-all ${
                    selectedCompetitor === comp.code 
                      ? 'bg-slate-800 text-white border-slate-800' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <span>VS</span>
                  <span>{comp.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* News Feed */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-slate-700">热点归因资讯</h2>
               <div className="flex gap-2">
                 <span className="text-xs bg-brand-light text-brand-dark px-2 py-1 rounded-full">#{displayData.name}</span>
                 {['行业板块', '资金流向', '市场动态'].map(tag => (
                   <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">#{tag}</span>
                 ))}
               </div>
             </div>
             
             <div className="space-y-4">
               {MOCK_NEWS.map(news => (
                 <div key={news.id} className="group cursor-pointer">
                   <div className="flex justify-between items-start mb-1">
                     <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors line-clamp-1">{news.title}</h3>
                     <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{news.time}</span>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2">{news.summary}</p>
                   <div className="flex items-center gap-4 text-xs text-slate-400">
                     <span>{news.source}</span>
                     <span>阅读 {news.views}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Comparison Table (4/12) */}
        <div className="col-span-12 lg:col-span-4">
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full">
             <h2 className="text-lg font-bold text-slate-700 mb-4">核心指标横向对比</h2>
             
             <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                       <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">指标</th>
                       <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">我司产品</th>
                       <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">竞品均值</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <ComparisonRow label="最新价" value="0.892" compValue="0.910" prefix="¥" />
                    <ComparisonRow label="成交额" value={displayData.metricValue.includes('亿') ? displayData.metricValue : '10.5亿'} compValue="6.2亿" isWin />
                    <ComparisonRow label="溢折率" value="0.12%" compValue="0.04%" isWin />
                    <ComparisonRow label="资金净流入" value="+1.2亿" compValue="+0.4亿" isWin />
                    <ComparisonRow label="盘中涨幅" value="+3.5%" compValue="+3.1%" isWin />
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
    </div>
  );
};

const ComparisonRow: React.FC<{ label: string, value: string, compValue: string, isWin?: boolean, prefix?: string }> = ({ label, value, compValue, isWin, prefix = '' }) => (
  <tr>
    <td className="px-4 py-3 text-slate-600 font-medium">{label}</td>
    <td className="px-4 py-3 text-right font-mono font-bold text-slate-800 relative">
      {prefix}{value}
      {isWin && <div className="absolute top-1 right-0 -mr-1 w-2 h-2 bg-red-500 rounded-full"></div>}
    </td>
    <td className="px-4 py-3 text-right font-mono text-slate-400">{prefix}{compValue}</td>
  </tr>
);

export default Analysis;
