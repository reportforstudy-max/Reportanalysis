import React from 'react';
import { DiagramReportData, DiagramNode } from '../types/diagram';
import { Edit2, Eye, FileSpreadsheet } from 'lucide-react';

interface TableViewProps {
  data: DiagramReportData;
  onSelectNode: (node: DiagramNode) => void;
  onOpenFullEditor: () => void;
}

export const TableView: React.FC<TableViewProps> = ({
  data,
  onSelectNode,
  onOpenFullEditor,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 print:hidden">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-600 text-white rounded-lg">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              কার্যকরী সূচক ও মেট্রিক্স তুলনামূলক তালিকা ({data.month} {data.year})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সমস্ত নোডের বিস্তারিত পারফরম্যান্স লাইন ও প্যারামিটার
            </p>
          </div>
        </div>

        <button
          onClick={onOpenFullEditor}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Edit2 className="w-3.5 h-3.5" /> ডাটা পরিবর্তন
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-16 text-center">নং</th>
                <th className="py-3.5 px-4">সূচক / নোডের শিরোনাম</th>
                <th className="py-3.5 px-4">হাইলাইট ভ্যালু</th>
                <th className="py-3.5 px-6">উপ-তথ্য ও লাইন আইটেমসমূহ</th>
                <th className="py-3.5 px-4">ক্যাটাগরি ও নোট</th>
                <th className="py-3.5 px-4 text-center">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {data.nodes.map((node) => (
                <tr
                  key={node.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-3.5 px-4 text-center font-bold text-slate-500">
                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {node.number}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    <div className="flex flex-col">
                      <span>{node.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {node.tag}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {node.highlight ? (
                      <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-md font-black font-mono">
                        {node.highlight}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-6">
                    <ul className="space-y-1">
                      {node.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    <span className="text-[11px] block">{node.notes || 'সাধারণ পর্যালোচনা'}</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                      {node.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onSelectNode(node)}
                      className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition"
                      title="বিস্তারিত ও এডিট"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
