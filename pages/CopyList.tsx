import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Calendar, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import Toast from '../components/Toast';

const CopyList: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'DRAFT' | 'PUBLISHED'>('ALL');

  const mockCopies = [
    {
      id: 1,
      title: '半导体ETF午盘速递：大基金利好引爆行情',
      product: '半导体ETF (512480)',
      status: 'DRAFT',
      updatedAt: '2023-11-28 11:45',
      preview: '受大基金三期落地消息刺激，今日半导体产业链表现强势。截至10:42，半导体ETF(512480)盘中成交额已突破10亿元...'
    },
    {
      id: 2,
      title: '收盘点评：酒ETF逆势流入，机构左侧布局？',
      product: '酒ETF (512690)',
      status: 'PUBLISHED',
      updatedAt: '2023-11-27 15:30',
      preview: '盘中价格下跌超1%，但资金逆势大幅买入，流入强度达1.5%，显示机构左侧布局意愿强烈。建议投资者关注...'
    },
    {
      id: 3,
      title: '科创50早报：纳指新高带动科技情绪',
      product: '科创50ETF (588000)',
      status: 'PUBLISHED',
      updatedAt: '2023-11-27 09:15',
      preview: '隔夜美股纳指创新高，映射A股科技板块情绪回暖。科创50ETF开盘微涨，关注半导体设备方向...'
    },
    {
      id: 4,
      title: '新能源车周报：锂价企稳，反弹窗口开启',
      product: '新能源车ETF (515030)',
      status: 'DRAFT',
      updatedAt: '2023-11-26 18:00',
      preview: '本周碳酸锂价格企稳回升，电池级碳酸锂重回10万元/吨。乘联会预测11月销量突破90万辆...'
    },
    {
      id: 5,
      title: '黄金ETF创新高，避险资产怎么配？',
      product: '黄金ETF (518880)',
      status: 'DRAFT',
      updatedAt: '2023-11-25 10:20',
      preview: '国际金价突破2600美元/盎司，再创历史新高。全球央行持续购金，地缘政治风险加剧...'
    }
  ];

  const filteredCopies = mockCopies.filter(c => {
    if (activeTab === 'ALL') return true;
    return c.status === activeTab;
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setToast('文案已删除');
  };

  const handleEdit = () => {
    navigate('/workbench');
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">智能文案中心</h1>
          <p className="text-xs text-slate-500 mt-1">管理您的所有营销文案，支持一键生成与多渠道分发</p>
        </div>
        <button 
          onClick={() => navigate('/workbench')}
          className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-sm hover:bg-brand-dark transition-colors font-bold text-sm border border-brand-dark"
        >
          <Plus className="w-4 h-4" />
          新建文案
        </button>
      </div>

      <div className="flex justify-between items-center bg-white p-1 rounded-sm border border-slate-300">
        <div className="flex gap-1">
          {['ALL', 'DRAFT', 'PUBLISHED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-colors ${
                activeTab === tab
                  ? 'bg-slate-100 text-slate-800 border border-slate-200 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {tab === 'ALL' ? '全部文案' : tab === 'DRAFT' ? '草稿箱' : '已发布'}
            </button>
          ))}
        </div>
        <div className="relative mr-2">
           <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
           <input 
             type="text" 
             placeholder="搜索标题或产品..." 
             className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:outline-none focus:border-brand w-64"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCopies.map((item) => (
          <div 
            key={item.id} 
            onClick={handleEdit}
            className="group bg-white rounded-sm border border-slate-300 p-4 cursor-pointer hover:border-brand transition-all flex flex-col h-[200px] relative hover:shadow-none"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm border ${
                item.status === 'PUBLISHED' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {item.status === 'PUBLISHED' ? '已发布' : '草稿'}
              </span>
              <button className="text-slate-300 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-brand transition-colors">
              {item.title}
            </h3>
            
            <div className="text-xs text-brand font-bold bg-blue-50/50 px-1.5 py-0.5 rounded-sm w-fit mb-3 border border-blue-100">
              {item.product}
            </div>

            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-auto">
              {item.preview}
            </p>

            <div className="pt-3 mt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-mono">
               <div className="flex items-center gap-1">
                 <Calendar className="w-3 h-3" />
                 {item.updatedAt}
               </div>
               
               <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleEdit}
                    className="p-1 hover:bg-slate-100 text-slate-400 hover:text-brand rounded-sm" 
                    title="编辑"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-sm" 
                    title="删除"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
          </div>
        ))}
        
        <div 
          onClick={() => navigate('/workbench')}
          className="border border-dashed border-slate-300 rounded-sm flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-brand hover:text-brand hover:bg-brand-light/5 transition-all h-[200px]"
        >
           <div className="w-10 h-10 rounded-sm bg-slate-100 flex items-center justify-center mb-2 group-hover:bg-white group-hover:shadow-sm">
             <Plus className="w-5 h-5" />
           </div>
           <span className="font-bold text-xs">新建空白文案</span>
        </div>
      </div>
    </div>
  );
};

export default CopyList;