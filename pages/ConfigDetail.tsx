import React from 'react';
import { ArrowLeft, Save, HelpCircle, Activity, BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConfigDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-12">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 rounded-sm text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-800">策略配置详情 - 半导体ETF <span className="font-mono text-base font-normal text-slate-500">(512480)</span></h1>
      </div>

      <div className="bg-white rounded-sm border border-slate-300 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-300 flex justify-between items-center">
           <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
             <Activity className="w-4 h-4 text-brand" />
             跟踪指数维度
           </h3>
           <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
           <div className="space-y-2 p-3 bg-slate-50 rounded-sm border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block uppercase">超期涨幅</label>
              <div className="text-[10px] text-slate-500 mb-1">当日涨幅超过近10日平均波动幅度的 N 倍</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">倍数阈值 &gt;</span>
                <input type="number" step="0.1" defaultValue={1.5} className="w-20 px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                <span className="text-xs text-slate-400">倍</span>
              </div>
           </div>

           <div className="space-y-2 p-3 bg-slate-50 rounded-sm border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block uppercase">连涨/连跌</label>
              <div className="flex items-center justify-between gap-4">
                 <div className="flex-1">
                   <span className="text-[10px] text-slate-500 block mb-1">宽基连续天数</span>
                   <input type="number" defaultValue={3} className="w-full px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                 </div>
                 <div className="flex-1">
                   <span className="text-[10px] text-slate-500 block mb-1">行业连续天数</span>
                   <input type="number" defaultValue={4} className="w-full px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                 </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" defaultChecked className="text-brand focus:ring-brand rounded-sm w-3 h-3" />
                <span className="text-[10px] text-slate-500">过滤微涨噪音 (&lt;0.1%)</span>
              </div>
           </div>

           <div className="space-y-2 p-3 bg-slate-50 rounded-sm border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block uppercase">超跌反弹</label>
              <div className="text-[10px] text-slate-500 mb-1">连跌5日后，首次出现涨幅超过 N%</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">反弹阈值 &gt;</span>
                <input type="number" step="0.1" defaultValue={1.0} className="w-20 px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                <span className="text-xs text-slate-400">%</span>
              </div>
           </div>

           <div className="space-y-2 p-3 bg-slate-50 rounded-sm border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block uppercase">关键点位/历史新高</label>
              <div className="flex flex-col gap-1">
                 <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded-sm text-brand w-3 h-3" />
                    突破并站稳整数关口
                 </label>
                 <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded-sm text-brand w-3 h-3" />
                    突破上市以来最高纪录
                 </label>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-slate-300 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-300">
           <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
             <BarChart3 className="w-4 h-4 text-brand" />
             成交额维度
           </h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block uppercase">成交放量</label>
              <div className="text-[10px] text-slate-500 mb-1">今日成交额达到过去10天同一时段平均水平的 N 倍</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">放量倍数 &gt;</span>
                <input type="number" step="0.1" defaultValue={2.0} className="w-24 px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                <span className="text-xs text-slate-400">倍</span>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block uppercase">市占率吸纳</label>
              <div className="flex gap-4">
                 <div className="flex-1">
                   <span className="text-[10px] text-slate-500 block mb-1">相对份额涨幅 &gt;</span>
                   <div className="relative">
                     <input type="number" defaultValue={10} className="w-full px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                     <span className="absolute right-2 top-1 text-[10px] text-slate-400">%</span>
                   </div>
                 </div>
                 <div className="flex-1">
                   <span className="text-[10px] text-slate-500 block mb-1">成交占比提升 &gt;</span>
                   <div className="relative">
                     <input type="number" defaultValue={5} className="w-full px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                     <span className="absolute right-2 top-1 text-[10px] text-slate-400">%</span>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-slate-300 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-300">
           <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
             <TrendingUp className="w-4 h-4 text-brand" />
             净流入维度
           </h3>
        </div>
        <div className="p-5 space-y-4">
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block uppercase">巨额流入</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-600 block mb-1">巨型宽基 (&gt;100亿)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">流入强度&gt;</span>
                      <input type="number" step="0.1" defaultValue={0.5} className="w-12 px-1 py-0.5 border border-slate-300 rounded-sm text-xs font-mono" />
                      <span className="text-[10px] text-slate-500">%</span>
                    </div>
                 </div>
                 <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-600 block mb-1">中型行业 (10-100亿)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">流入强度&gt;</span>
                      <input type="number" step="0.1" defaultValue={2.0} className="w-12 px-1 py-0.5 border border-slate-300 rounded-sm text-xs font-mono" />
                      <span className="text-[10px] text-slate-500">%</span>
                    </div>
                 </div>
                 <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-600 block mb-1">微型/新发 (&lt;10亿)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">流入强度&gt;</span>
                      <input type="number" step="0.1" defaultValue={5.0} className="w-12 px-1 py-0.5 border border-slate-300 rounded-sm text-xs font-mono" />
                      <span className="text-[10px] text-slate-500">%</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase">连续吸金</label>
                <div className="flex items-center gap-2">
                   <span className="text-xs text-slate-600">连续</span>
                   <input type="number" defaultValue={5} className="w-16 px-2 py-1 border border-slate-300 rounded-sm text-xs font-mono" />
                   <span className="text-xs text-slate-600">日净流入大于0</span>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase">逆势流入</label>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                   <span>价格跌幅 &lt; -1% 且 流入强度 &gt;</span>
                   <input type="number" defaultValue={1} className="w-16 px-2 py-1 border border-slate-300 rounded-sm text-xs font-mono" />
                   <span>%</span>
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-slate-300 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-300">
           <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
             <PieChart className="w-4 h-4 text-brand" />
             规模/申赎维度
           </h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block uppercase">里程碑突破</label>
              <div className="flex flex-wrap gap-2">
                 {[5, 10, 20, 50, 100, 200, 500].map(val => (
                   <span key={val} className="px-2 py-0.5 bg-slate-100 rounded-sm text-xs text-slate-600 border border-slate-200 font-mono">{val}亿</span>
                 ))}
                 <button className="px-2 py-0.5 border border-dashed border-slate-300 rounded-sm text-xs text-brand hover:bg-brand-light">+ 自定义</button>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block uppercase">显著申购 (机构购买)</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">单日份额增长率 &gt;</span>
                <input type="number" step="0.1" defaultValue={3.0} className="w-16 px-2 py-1 border border-slate-300 rounded-sm focus:border-brand outline-none text-xs font-mono" />
                <span className="text-xs text-slate-400">%</span>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-slate-300 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-300">
           <h3 className="font-bold text-slate-700 text-sm">资讯关键词标签</h3>
        </div>
        <div className="p-5">
          <textarea 
            className="w-full h-24 px-3 py-2 border border-slate-300 rounded-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none resize-none text-sm text-slate-700"
            defaultValue="半导体, 芯片, 集成电路, 存储, 大基金, 韦尔股份, 中芯国际, 北方华创, 科技股, 晶圆"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-sm hover:bg-brand-dark transition-colors font-bold shadow-sm text-sm border border-brand-dark">
          <Save className="w-4 h-4" />
          保存所有配置
        </button>
      </div>
    </div>
  );
};

export default ConfigDetail;