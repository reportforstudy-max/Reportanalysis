import React, { useState } from 'react';
import { DiagramNode } from '../types/diagram';
import { X, Edit2, Save, Plus, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliUtils';

interface NodeDetailModalProps {
  node: DiagramNode | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNode: (updatedNode: DiagramNode) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  isOpen,
  onClose,
  onUpdateNode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNode, setCurrentNode] = useState<DiagramNode | null>(node);

  React.useEffect(() => {
    setCurrentNode(node ? JSON.parse(JSON.stringify(node)) : null);
    setIsEditing(false);
  }, [node, isOpen]);

  if (!isOpen || !currentNode) return null;

  const handleSave = () => {
    if (currentNode) {
      onUpdateNode(currentNode);
      setIsEditing(false);
      onClose();
    }
  };

  const handleAddItem = () => {
    if (currentNode) {
      setCurrentNode({
        ...currentNode,
        items: [...currentNode.items, 'নতুন লাইন যোগ করা হয়েছে'],
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    if (currentNode) {
      setCurrentNode({
        ...currentNode,
        items: currentNode.items.filter((_, i) => i !== index),
      });
    }
  };

  const handleItemChange = (index: number, val: string) => {
    if (currentNode) {
      const items = [...currentNode.items];
      items[index] = val;
      setCurrentNode({ ...currentNode, items });
    }
  };

  const handleConvertToBengali = () => {
    if (currentNode) {
      setCurrentNode({
        ...currentNode,
        title: toBengaliNumber(currentNode.title),
        highlight: currentNode.highlight ? toBengaliNumber(currentNode.highlight) : '',
        items: currentNode.items.map((i) => toBengaliNumber(i)),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
              #{currentNode.number}
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentNode.title} {currentNode.highlight ? `(${currentNode.highlight})` : ''}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentNode.tag || 'নোড বিস্তারিত বিশ্লেষণ'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content View or Edit Mode */}
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                তথ্য পরিবর্তন করুন
              </span>
              <button
                onClick={handleConvertToBengali}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3 h-3" /> বাংলা সংখ্যা
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  শিরোনাম
                </label>
                <input
                  type="text"
                  value={currentNode.title}
                  onChange={(e) =>
                    setCurrentNode({ ...currentNode, title: e.target.value })
                  }
                  className="w-full text-xs font-semibold p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  হাইলাইট ভ্যালু
                </label>
                <input
                  type="text"
                  value={currentNode.highlight || ''}
                  onChange={(e) =>
                    setCurrentNode({ ...currentNode, highlight: e.target.value })
                  }
                  className="w-full text-xs font-bold font-mono p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  ভিতরের প্রতি লাইনের লেখা
                </label>
                <button
                  onClick={handleAddItem}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
                >
                  <Plus className="w-3 h-3" /> লাইন যোগ
                </button>
              </div>

              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                {currentNode.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(idx, e.target.value)}
                      className="flex-1 text-xs p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visual Node Preview */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {currentNode.title}
                </span>
                {currentNode.highlight && (
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                    {currentNode.highlight}
                  </span>
                )}
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700">
                {currentNode.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {currentNode.notes && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-blue-50/50 dark:bg-blue-950/20 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900">
                💡 {currentNode.notes}
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg transition"
              >
                বাতিল
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                <Save className="w-3.5 h-3.5" />
                সংরক্ষণ করুন
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                তথ্য পরিবর্তন করুন
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
