import React, { useState } from 'react';
import { Copy, Save, Send, Image as ImageIcon, FileText, ChevronRight, LayoutTemplate, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const Workbench: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast('文案已保存');
  };

  const handleBack = () => {
    navigate('/copy-list');
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="flex items-center gap-4 bg-white p-3 rounded-sm border border-slate-300">
         <button 
           onClick={handleBack} 
           className="p-1.5 hover:bg-slate-100 rounded-sm text-slate-500 transition-colors"
           title="返回列表"
         >
           <ArrowLeft className="w-5 h-5" />
         </button>
         <div className="h-6 w-[1px] bg-slate-200"></div>
         <div>
            <h1 className="text-base font-bold text-slate-800">半导体ETF午盘速递</h1>
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <span className="bg-slate-100 px-1.5 py-0.5 rounded-sm">草稿</span>
               <span className="font-mono">上次保存: 10:45</span>
            </div>
         </div>
         <div className="ml-auto flex gap-3">
             <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-700 hover:text-brand hover:border-brand transition-all font-bold">
                 <Save className="w-4 h-4" /> 保存草稿
             </button>
             <button className="flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white rounded-sm text-sm hover:bg-brand-dark transition-all font-bold border border-brand-dark">
                 <Send className="w-4 h-4" /> 一键发布
             </button>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-12rem)] min-h-[600px]">
        
        <div className="col-span-6 bg-white rounded-sm border border-slate-300 overflow-y-auto p-4 scrollbar-hide flex flex-col">
           <div className="mb-4 pb-4 border-b border-slate-100">
             <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <span className="w-1 h-3 bg-brand rounded-none"></span>
                热点参考
             </h3>
             <div className="flex justify-between items-baseline mt-2">
                <div className="text-xs text-brand font-bold bg-brand-light/20 px-2 py-1 rounded-sm border border-brand/20">半导体ETF (512480)</div>
                <div className="text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded-sm border border-red-200">成交额突破 10亿元</div>
             </div>
           </div>
           
           <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
             <div className="bg-slate-50 rounded-sm text-center h-48 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 gap-2">
               <ImageIcon className="w-8 h-8 opacity-40" />
               <span className="text-xs font-medium">(走势图引用区域)</span>
             </div>
             
             <div>
               <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">核心优势 PK</h4>
               <ul className="text-sm space-y-2">
                 <li className="flex justify-between items-center p-2 bg-slate-50 rounded-sm border border-slate-100">
                   <span className="text-slate-600 text-xs font-medium">成交额</span>
                   <div className="text-right flex items-center gap-2">
                      <div className="font-bold font-mono text-red-600">10.5亿</div>
                      <div className="text-[10px] text-white bg-red-500 px-1 rounded-sm inline-block">行业领先</div>
                   </div>
                 </li>
                 <li className="flex justify-between items-center p-2 bg-slate-50 rounded-sm border border-slate-100">
                   <span className="text-slate-600 text-xs font-medium">资金流入</span>
                   <div className="text-right flex items-center gap-2">
                      <div className="font-bold font-mono text-red-600">+1.2亿</div>
                      <div className="text-[10px] text-white bg-red-500 px-1 rounded-sm inline-block">同类第一</div>
                   </div>
                 </li>
                 <li className="flex justify-between items-center p-2 bg-slate-50 rounded-sm border border-slate-100">
                   <span className="text-slate-600 text-xs font-medium">溢价率</span>
                   <div className="text-right flex items-center gap-2">
                      <div className="font-bold font-mono text-slate-800">0.12%</div>
                      <div className="text-[10px] text-white bg-green-600 px-1 rounded-sm inline-block">估值合理</div>
                   </div>
                 </li>
               </ul>
             </div>

             <div className="bg-[#f0f9ff] p-3 rounded-sm border border-blue-100">
                <h4 className="text-xs font-bold text-blue-800 mb-2">AI 建议方向</h4>
                <p className="text-xs text-blue-800/80 leading-relaxed text-justify">
                  建议重点突出成交放量带来的流动性优势，并结合半导体行业大基金三期落地的利好消息，强调“左侧布局”和“硬核科技”属性。
                </p>
             </div>
           </div>
        </div>

        <div className="col-span-6 flex flex-col bg-white rounded-sm border border-slate-300 shadow-none overflow-hidden">
          <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-slate-50">
             <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
               <div className="bg-brand p-1 rounded-sm text-white">
                 <FileText className="w-3.5 h-3.5" />
               </div>
               智能文案编辑
             </h2>
             <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                AI 辅助已开启
             </div>
          </div>
          
          <div className="flex-1 p-6 bg-white relative">
             <textarea 
               className="w-full h-full resize-none outline-none text-slate-800 text-base leading-relaxed placeholder-slate-300 custom-scrollbar z-10 relative bg-transparent font-sans"
               placeholder="在此输入文案内容..."
               defaultValue={`【盘中异动】半导体板块全线爆发，ETF成交破10亿！🚀\n\n受大基金三期落地消息刺激，今日半导体产业链表现强势。截至10:42，半导体ETF(512480)盘中成交额已突破10亿元，交投十分活跃！📈\n\n资金面上，主力资金持续抢筹，盘中净流入超1.2亿元，显著优于同类产品。目前板块估值仍处于历史低位，配置性价比凸显。\n\n关注半导体ETF(512480)，一键布局硬核科技！💪`}
             ></textarea>
          </div>

          <div className="p-2 border-t border-slate-200 bg-slate-50 flex items-center gap-4 text-xs text-slate-500">
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 rounded-sm border border-green-200">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
               <span className="font-bold">合规检测通过</span>
             </div>
             <div className="h-4 w-[1px] bg-slate-300"></div>
             <span>已输入 <span className="font-mono font-bold text-slate-800">324</span> 字</span>
          </div>
        </div>
      </div>

      <div className="h-56 bg-white rounded-sm border border-slate-300 p-4 shrink-0 flex flex-col">
        <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2 text-sm">
           <LayoutTemplate className="w-4 h-4 text-brand" />
           素材库
        </h3>
        
        <div className="h-full overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">推荐模板</h4>
               <span className="text-xs text-brand cursor-pointer hover:underline font-bold">查看全部</span>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-3 overflow-y-auto pr-2 custom-scrollbar pb-1">
               {[
                 { title: '突发利好型', desc: '适用于政策/业绩突发利好', hot: true },
                 { title: '资金涌入型', desc: '强调资金流向与大单买入', hot: true },
                 { title: '行情突破型', desc: '重点描述技术面突破', hot: false },
                 { title: '早盘速递型', desc: '早间行情综述模板', hot: false },
                 { title: '尾盘拉升型', desc: '尾盘异动提示模板', hot: false },
                 { title: '定投推荐型', desc: '长期配置价值分析', hot: false },
                 { title: '风险提示型', desc: '市场波动风险预警', hot: false },
                 { title: '节日营销型', desc: '节假日主题营销文案', hot: false },
                 { title: '新发上市型', desc: '新产品上市宣传专用', hot: false },
                 { title: '分红公告型', desc: '基金分红消息推送', hot: false },
                 { title: '定期报告型', desc: '季报/年报核心观点提炼', hot: false },
                 { title: '直播预告型', desc: '基金经理路演预告', hot: false }
               ].map((t, i) => (
                 <div key={i} className="p-2.5 bg-white border border-slate-200 rounded-sm cursor-pointer hover:border-brand hover:bg-brand-light/10 transition-all group flex flex-col justify-center relative overflow-hidden h-16 shadow-none">
                   {t.hot && <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rotate-45 translate-x-3 -translate-y-3"></div>}
                   <div className="flex items-center justify-between mb-0.5">
                     <span className="text-xs font-bold text-slate-700 group-hover:text-brand-dark">{t.title}</span>
                     <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-brand" />
                   </div>
                   <p className="text-[10px] text-slate-400 group-hover:text-brand/60 truncate">{t.desc}</p>
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