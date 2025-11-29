import React, { useState } from 'react';
import { Copy, Save, Send, Image as ImageIcon, FileText, ChevronRight } from 'lucide-react';
import Toast from '../components/Toast';

const Workbench: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast('文案已保存');
  };

  return (
    <div className="h-[calc(100vh-6rem)] grid grid-cols-12 gap-6">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Left: Reference Data (Read Only) */}
      <div className="col-span-3 bg-white rounded-xl border border-slate-200 overflow-y-auto p-4 scrollbar-hide">
         <div className="mb-4 pb-4 border-b border-slate-100">
           <h3 className="font-bold text-slate-700 mb-2">热点参考</h3>
           <div className="text-sm text-brand font-medium">半导体ETF (512480)</div>
           <div className="text-xs text-red-500 mt-1">成交额突破 10亿元</div>
         </div>
         
         <div className="space-y-4">
           <div className="bg-slate-50 p-3 rounded text-center h-40 flex items-center justify-center text-slate-400 border border-dashed border-slate-300">
             (走势图引用)
           </div>
           
           <div>
             <h4 className="text-xs font-bold text-slate-500 mb-2">核心优势 PK</h4>
             <ul className="text-xs space-y-2">
               <li className="flex justify-between">
                 <span className="text-slate-600">成交额</span>
                 <span className="font-bold text-red-500">10.5亿 (领先)</span>
               </li>
               <li className="flex justify-between">
                 <span className="text-slate-600">资金流入</span>
                 <span className="font-bold text-red-500">+1.2亿 (领先)</span>
               </li>
             </ul>
           </div>
         </div>
      </div>

      {/* Center: Editor */}
      <div className="col-span-6 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
           <h2 className="font-bold text-slate-700">智能文案编辑</h2>
           <div className="flex gap-2">
             <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:text-brand hover:border-brand transition-colors">
               <Save className="w-3 h-3" /> 保存
             </button>
             <button className="flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded text-xs hover:bg-brand-dark transition-colors">
               <Send className="w-3 h-3" /> 发送
             </button>
           </div>
        </div>
        
        <div className="flex-1 p-6">
           <textarea 
             className="w-full h-full resize-none outline-none text-slate-700 text-base leading-relaxed placeholder-slate-300"
             placeholder="在此输入文案内容，或从右侧选择模板..."
             defaultValue={`【盘中异动】半导体板块全线爆发，ETF成交破10亿！\n\n受大基金三期落地消息刺激，今日半导体产业链表现强势。截至10:42，半导体ETF(512480)盘中成交额已突破10亿元，交投十分活跃！\n\n资金面上，主力资金持续抢筹，盘中净流入超1.2亿元，显著优于同类产品。目前板块估值仍处于历史低位，配置性价比凸显。\n\n关注半导体ETF(512480)，一键布局硬核科技！`}
           ></textarea>
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 rounded-b-xl flex items-center gap-2 text-xs text-slate-500">
           <span className="w-2 h-2 bg-green-500 rounded-full"></span>
           <span>合规检测通过</span>
           <span className="ml-auto">324 字</span>
        </div>
      </div>

      {/* Right: Assets & Templates */}
      <div className="col-span-3 bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="font-bold text-slate-700 mb-4">素材库</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">推荐模板</h4>
            <div className="space-y-2">
               {['突发利好型', '资金涌入型', '行情突破型'].map(t => (
                 <div key={t} className="p-3 bg-slate-50 border border-slate-100 rounded cursor-pointer hover:border-brand hover:bg-brand-light/20 transition-all flex justify-between items-center group">
                   <div className="flex items-center gap-2">
                     <FileText className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                     <span className="text-sm text-slate-600 group-hover:text-brand-dark">{t}</span>
                   </div>
                   <ChevronRight className="w-3 h-3 text-slate-300" />
                 </div>
               ))}
            </div>
          </div>

          <div>
             <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">配图素材</h4>
             <div className="grid grid-cols-2 gap-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-slate-100 rounded border border-slate-200 flex items-center justify-center cursor-pointer hover:border-brand">
                    <ImageIcon className="w-6 h-6 text-slate-300" />
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workbench;