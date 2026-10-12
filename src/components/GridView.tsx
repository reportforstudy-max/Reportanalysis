import React from 'react';
import { DiagramReportData, DiagramNode } from '../types/diagram';
import { Edit3, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface GridViewProps {
  data: DiagramReportData;
  onSelectNode: (node: DiagramNode) => void;
  onOpenFullEditor: () => void;
}

export const GridView: React.FC<GridViewProps> = ({
  data,
  onSelectNode,
  onOpenFullEditor,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 print:hidden">
      {/* Top Banner Bar in Grid View */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            <Layers className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-400 text-blue-950 uppercase">
                {data.center.code}
              </span>
              <h2 className="text-xl font-black">
                {data.badge.title} — {data.center.title}
              </h2>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              {data.badge.organization} | মাস: {data.month} {data.year}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenFullEditor}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-950 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-md transition"
        >
          <Edit3 className="w-4 h-4 text-blue-600" />
          সম্পূর্ণ তথ্য এডিটর খুলুন
        </button>
      </div>

      {/* 9 Node Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.nodes.map((node) => (
          <div
            key={node.id}
            onClick={() => onSelectNode(node)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-200 dark:border-blue-800">
                    #{node.number}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      {node.category || node.tag}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {node.title}
                    </h3>
                  </div>
                </div>

                {node.highlight && (
                  <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-sm font-black font-mono">
                    {node.highlight}
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-1.5 py-3 border-t border-slate-100 dark:border-slate-800">
                {node.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              <span>{node.notes || 'ক্লিক করে পরিবর্তন করুন'}</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
