import React from 'react';
import { DiagramReportData } from '../types/diagram';
import { 
  TrendingUp, 
  ShieldAlert, 
  Coins, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

interface KpiSummaryProps {
  data: DiagramReportData;
  onSelectNodeById: (id: string) => void;
}

export const KpiSummary: React.FC<KpiSummaryProps> = ({ data, onSelectNodeById }) => {
  // Extract key values from nodes
  const totalOutstandingNode = data.nodes.find(n => n.id === 'node-total-outstanding');
  const otrNode = data.nodes.find(n => n.id === 'node-otr');
  const parNode = data.nodes.find(n => n.id === 'node-par');
  const nplNode = data.nodes.find(n => n.id === 'node-npl');
  const fieldNode = data.nodes.find(n => n.id === 'node-outstanding-by-field');
  const savingsNode = data.nodes.find(n => n.id === 'node-savings');

  const kpis = [
    {
      id: 'node-total-outstanding',
      label: 'মোট ঋণস্থিতি',
      value: totalOutstandingNode?.highlight || '৬৮৮.৭ কোটি',
      subtext: 'অগ্রসর ৬১.২১% | ক্ষুদ্র ৩৮.৭৯%',
      icon: Coins,
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'node-otr',
      label: 'OTR (সময়মতো আদায়)',
      value: otrNode?.highlight || '৯৬.৩৩%',
      subtext: '৭০টি শাখায় ৯৫% এর বেশি',
      icon: CheckCircle,
      bgLight: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    },
    {
      id: 'node-par',
      label: 'PAR (ঝুঁকিপূর্ণ ঋণ)',
      value: parNode?.highlight || '১১.০২%',
      subtext: '১০ এর নিচে ৩৫টি শাখা',
      icon: AlertTriangle,
      bgLight: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    },
    {
      id: 'node-npl',
      label: 'NPL (শ্রেণীকৃত ঋণ)',
      value: nplNode?.highlight || '৬.০৪%',
      subtext: 'অগ্রসর ৫.১৪% | ক্ষুদ্র ৭.৪৬%',
      icon: ShieldAlert,
      bgLight: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    },
    {
      id: 'node-outstanding-by-field',
      label: 'মোট ফিল্ড সংখ্যা',
      value: fieldNode?.highlight || '৪৭৩ জন',
      subtext: '২৩০ জন ১.৫ কোটির উর্ধ্বে',
      icon: Users,
      bgLight: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    },
    {
      id: 'node-savings',
      label: 'মোট সঞ্চয় পোর্টফোলিও',
      value: savingsNode?.highlight ? (savingsNode.highlight.includes('টাকা') ? '২১en কোটি+' : savingsNode.highlight) : '২১৯.০৮ কোটি',
      subtext: 'GS, SS, TSS, GSTD তহবিল',
      icon: TrendingUp,
      bgLight: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 print:hidden">
      {kpis.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <div
            key={kpi.id}
            onClick={() => onSelectNodeById(kpi.id)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl p-3.5 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                {kpi.label}
              </span>
              <div className={`p-1.5 rounded-lg border ${kpi.bgLight}`}>
                <IconComponent className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  {kpi.value}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {kpi.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
