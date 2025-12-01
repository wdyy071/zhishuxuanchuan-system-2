import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Plus, Trash2, Edit } from 'lucide-react';

const ConfigCenter: React.FC = () => {
  const navigate = useNavigate();

  const configs = [
    { code: '512480', name: '半导体ETF', active: true },
    { code: '159915', name: '创业板ETF', active: true },
    { code: '510300', name: '300ETF', active: true },
    { code: '588000', name: '科创50ETF', active: false },
    { code: '515030', name: '新能源车ETF', active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">监控策略配置</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-sm hover:bg-brand-dark transition-colors font-bold text-sm border border-brand-dark">
          <Plus className="w-4 h-4" />
          新增监控产品
        </button>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {configs.map((item) => (
          <div key={item.code} className="break-inside-avoid bg-white p-5 rounded-sm border border-slate-300 shadow-none hover:border-brand transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">{item.name}</h3>
                <div className="text-xs text-slate-500 font-mono">{item.code}</div>
              </div>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-sm border ${item.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                {item.active ? '运行中' : '已暂停'}
              </span>
            </div>
            
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">成交额阈值</span>
                <span className="font-mono font-bold text-slate-700">10亿</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">涨幅触发</span>
                <span className="font-mono font-bold text-slate-700">&gt;3.5%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">关联竞品</span>
                <span className="font-mono font-bold text-slate-700">3个</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
               <button 
                 onClick={() => navigate('/config-detail')}
                 className="flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold text-brand bg-white border border-brand/20 hover:bg-brand-light/10 rounded-sm transition-colors"
               >
                 <Edit className="w-3.5 h-3.5" /> 编辑
               </button>
               <button className="px-3 py-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-sm transition-colors border border-slate-200 hover:border-red-200">
                 <Trash2 className="w-3.5 h-3.5" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigCenter;