import React from 'react';
import { ArrowLeft, Save, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConfigDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">策略配置详情 - 半导体ETF (512480)</h1>
      </div>

      {/* Threshold Config */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
           <h3 className="font-bold text-slate-700">阈值设置</h3>
           <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">盘中成交额里程碑 (亿)</label>
              <div className="flex gap-2">
                <input type="number" defaultValue={5} className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none" />
                <input type="number" defaultValue={10} className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none" />
                <input type="number" defaultValue={20} className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">日环比放大倍数</label>
              <div className="relative">
                <input type="number" step="0.1" defaultValue={1.5} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none" />
                <span className="absolute right-3 top-2 text-slate-400 text-sm">x 昨日全天</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">单日净流入阈值 (亿)</label>
              <input type="number" defaultValue={1} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">单日涨幅阈值</label>
              <div className="relative">
                <input type="number" step="0.1" defaultValue={3.5} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none" />
                <span className="absolute right-3 top-2 text-slate-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Config */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
           <h3 className="font-bold text-slate-700">竞品追踪</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
             {['159995 - 芯片ETF', '512660 - 半导体龙头', '159813 - 半导体50'].map((comp, idx) => (
               <div key={idx} className="flex items-center gap-4">
                 <input type="text" value={comp} className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-600" readOnly />
                 <button className="text-sm text-red-500 hover:text-red-700">删除</button>
               </div>
             ))}
             <button className="w-full py-2 border border-dashed border-slate-300 rounded text-slate-500 hover:border-brand hover:text-brand transition-colors text-sm">
               + 添加竞品关联
             </button>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
           <h3 className="font-bold text-slate-700">资讯关键词标签</h3>
        </div>
        <div className="p-6">
          <textarea 
            className="w-full h-32 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand focus:border-brand outline-none resize-none"
            defaultValue="半导体, 芯片, 集成电路, 存储, 大基金, 韦尔股份, 中芯国际, 北方华创, 科技股, 晶圆"
          ></textarea>
          <p className="mt-2 text-xs text-slate-500">多个关键词请用逗号分隔。系统将自动抓取包含以上关键词的实时财经快讯。</p>
        </div>
      </div>

      <div className="flex justify-end pt-4 pb-12">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-bold shadow-lg shadow-brand/20">
          <Save className="w-4 h-4" />
          保存所有配置
        </button>
      </div>
    </div>
  );
};

export default ConfigDetail;