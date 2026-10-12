import React, { useState } from 'react';
import { DiagramReportData, DiagramNode } from '../types/diagram';
import { BENGALI_MONTHS, BENGALI_YEARS, toBengaliNumber } from '../utils/bengaliUtils';
import { 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Layers, 
  FileText, 
  UserCheck, 
  Code,
  Sparkles,
  Check
} from 'lucide-react';
import { INITIAL_DIAGRAM_DATA } from '../data/initialData';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DiagramReportData;
  onSave: (newData: DiagramReportData) => void;
}

type TabType = 'nodes' | 'general' | 'signatures' | 'json';

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<DiagramReportData>(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<TabType>('nodes');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(data.nodes[0]?.id || 'node-npl');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Sync state if modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setJsonInput(JSON.stringify(data, null, 2));
      setJsonError(null);
      setSaveSuccessMessage(false);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleNodeFieldChange = (nodeId: string, field: keyof DiagramNode, value: any) => {
    setFormData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, [field]: value };
        }
        return node;
      }),
    }));
  };

  const handleNodeItemChange = (nodeId: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        if (node.id === nodeId) {
          const newItems = [...node.items];
          newItems[index] = value;
          return { ...node, items: newItems };
        }
        return node;
      }),
    }));
  };

  const handleAddNodeItem = (nodeId: string) => {
    setFormData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, items: [...node.items, 'নতুন লাইন তথ্য'] };
        }
        return node;
      }),
    }));
  };

  const handleRemoveNodeItem = (nodeId: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        if (node.id === nodeId) {
          const newItems = node.items.filter((_, i) => i !== index);
          return { ...node, items: newItems };
        }
        return node;
      }),
    }));
  };

  // Convert English numbers to Bengali numerals in selected node
  const handleConvertNodeToBengali = (nodeId: string) => {
    setFormData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            title: toBengaliNumber(node.title),
            highlight: node.highlight ? toBengaliNumber(node.highlight) : '',
            items: node.items.map((item) => toBengaliNumber(item)),
          };
        }
        return node;
      }),
    }));
  };

  const handleSaveAndApply = () => {
    if (activeTab === 'json') {
      try {
        const parsed = JSON.parse(jsonInput);
        onSave(parsed);
        setSaveSuccessMessage(true);
        setTimeout(() => {
          onClose();
        }, 600);
      } catch (err: any) {
        setJsonError('ভুল JSON ফরম্যাট: ' + err.message);
      }
    } else {
      onSave(formData);
      setSaveSuccessMessage(true);
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  const handleResetToOriginal = () => {
    if (confirm('আপনি কি নিশ্চিত যে মূল ড্রয়িং ডাটাবেজে রিসেট করতে চান? বর্তমান পরিবর্তন মুছে যাবে।')) {
      setFormData(JSON.parse(JSON.stringify(INITIAL_DIAGRAM_DATA)));
      setJsonInput(JSON.stringify(INITIAL_DIAGRAM_DATA, null, 2));
    }
  };

  const currentNode = formData.nodes.find((n) => n.id === selectedNodeId) || formData.nodes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                ডায়াগ্রাম তথ্য ও ভ্যালু এডিটর (মাসিক আপডেট)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                প্রতি মাসে বস যেভাবে পরিবর্তন চান, এখানে ভ্যালু পরিবর্তন করে এক ক্লিকে সেভ ও প্রিন্ট করুন।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToOriginal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900 transition"
              title="মূল ড্রয়িংয়ে রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              মূল ড্রয়িং রিসেট
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900 gap-2">
          <button
            onClick={() => setActiveTab('nodes')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'nodes'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            ৯টি নোড তথ্য ও ভ্যালু
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'general'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            হেডার, মাস ও প্রতিষ্ঠান
          </button>
          <button
            onClick={() => setActiveTab('signatures')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'signatures'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            স্বাক্ষর ও ফুটনোট
          </button>
          <button
            onClick={() => {
              setActiveTab('json');
              setJsonInput(JSON.stringify(formData, null, 2));
            }}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'json'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Code className="w-4 h-4" />
            বাল্ক JSON কোড
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
          
          {/* TAB 1: NODES EDIT */}
          {activeTab === 'nodes' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Node Selector Pills */}
              <div className="md:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  নোড নির্বাচন করুন (১ - ৯)
                </span>
                {formData.nodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition ${
                      selectedNodeId === node.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        selectedNodeId === node.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {node.number}
                      </span>
                      <div className="truncate max-w-[150px]">
                        <p className="text-xs font-bold truncate leading-tight">
                          {node.title}
                        </p>
                        <p className={`text-[10px] truncate ${
                          selectedNodeId === node.id ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {node.highlight || `${node.items.length} টি তথ্য`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold opacity-80">
                      {node.highlight}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Column: Node Details Form */}
              {currentNode && (
                <div className="md:col-span-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                          নোড নং #{currentNode.number} — {currentNode.tag || currentNode.title}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          {currentNode.title} এর তথ্য সম্পাদনা
                        </h4>
                      </div>

                      <button
                        onClick={() => handleConvertNodeToBengali(currentNode.id)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg transition"
                        title="সব ইংরেজি সংখ্যাকে বাংলা সংখ্যায় কনভার্ট করুন"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        বাংলা সংখ্যা রূপান্তর
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          মূল শিরোনাম (Title)
                        </label>
                        <input
                          type="text"
                          value={currentNode.title}
                          onChange={(e) =>
                            handleNodeFieldChange(currentNode.id, 'title', e.target.value)
                          }
                          className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          হাইলাইট পার্সেন্টেজ / মান (Highlight Value)
                        </label>
                        <input
                          type="text"
                          value={currentNode.highlight || ''}
                          onChange={(e) =>
                            handleNodeFieldChange(currentNode.id, 'highlight', e.target.value)
                          }
                          placeholder="যেমন: ৯৬.৩৩% বা ৬৮৮.৭ কোটি"
                          className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Bullet Items Editor */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          ভিতরের প্রতি লাইনের তথ্য (Line Items - ডায়াগ্রামের ভিতরের লেখা)
                        </label>
                        <button
                          onClick={() => handleAddNodeItem(currentNode.id)}
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" /> নতুন লাইন যোগ করুন
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {currentNode.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-5 text-center text-xs font-bold text-slate-400">
                              {idx + 1}.
                            </span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleNodeItemChange(currentNode.id, idx, e.target.value)
                              }
                              className="flex-1 text-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                            />
                            <button
                              onClick={() => handleRemoveNodeItem(currentNode.id, idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition"
                              title="লাইন মুছুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Node Footnote / Internal Reference */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        অভ্যন্তরীণ নোট / ক্যাটাগরি ট্যাগ
                      </label>
                      <input
                        type="text"
                        value={currentNode.notes || ''}
                        onChange={(e) =>
                          handleNodeFieldChange(currentNode.id, 'notes', e.target.value)
                        }
                        placeholder="মাসিক সারসংক্ষেপ বা রেফারেন্স নোট..."
                        className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GENERAL & HEADER */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Central Hub Information */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  কেন্দ্রীয় হাবের তথ্য (Center Hub - অপারেশন-৫)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      কেন্দ্রীয় শিরোনাম (Center Title)
                    </label>
                    <input
                      type="text"
                      value={formData.center.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          center: { ...formData.center, title: e.target.value },
                        })
                      }
                      className="w-full text-xs font-bold px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      সাব-শিরোনাম (Subtitle)
                    </label>
                    <input
                      type="text"
                      value={formData.center.subtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          center: { ...formData.center, subtitle: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      অপারেশন কোড (Code)
                    </label>
                    <input
                      type="text"
                      value={formData.center.code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          center: { ...formData.center, code: e.target.value },
                        })
                      }
                      className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Banner & Report Meta */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-600" />
                  রিপোর্ট হেডার ও মাসের তথ্য ("অগ্রগতি রিপোর্ট" ব্যানার)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ব্যানার শিরোনাম (Title)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: { ...formData.badge, title: e.target.value },
                        })
                      }
                      className="w-full text-xs font-bold px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      প্রতিষ্ঠান / সংস্থা (Organization)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: { ...formData.badge, organization: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিভাগ (Department)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: { ...formData.badge, department: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      মাস (Month)
                    </label>
                    <select
                      value={formData.month}
                      onChange={(e) => {
                        const newMonth = e.target.value;
                        setFormData({
                          ...formData,
                          month: newMonth,
                          badge: { ...formData.badge, month: newMonth },
                        });
                      }}
                      className="w-full text-xs font-bold px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    >
                      {BENGALI_MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      সাল (Year)
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => {
                        const newYear = e.target.value;
                        setFormData({
                          ...formData,
                          year: newYear,
                          badge: { ...formData.badge, year: newYear },
                        });
                      }}
                      className="w-full text-xs font-bold px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    >
                      {BENGALI_YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      তারিখ (Date)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: { ...formData.badge, date: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      রিপোর্ট নং (Report ID)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.reportNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: { ...formData.badge, reportNo: e.target.value },
                        })
                      }
                      className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SIGNATURES */}
          {activeTab === 'signatures' && (
            <div className="space-y-5">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  অফিসিয়াল স্বাক্ষরকারী কর্মকর্তা (৪টি অনুমোদন ব্লক)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-750">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ১. প্রস্তুতকারক (Prepared By)
                    </label>
                    <input
                      type="text"
                      value={formData.signatures.preparedBy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            preparedBy: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mb-2 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={formData.signatures.preparedByDesignation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            preparedByDesignation: e.target.value,
                          },
                        })
                      }
                      placeholder="পদবী"
                      className="w-full text-[11px] px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-750">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ২. সহকারী পরিচালক (Assistant Director)
                    </label>
                    <input
                      type="text"
                      value={formData.signatures.assistantDirector}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            assistantDirector: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mb-2 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={formData.signatures.assistantDirectorDesignation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            assistantDirectorDesignation: e.target.value,
                          },
                        })
                      }
                      placeholder="পদবী"
                      className="w-full text-[11px] px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-750">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ৩. উপ-পরিচালক (Deputy Director)
                    </label>
                    <input
                      type="text"
                      value={formData.signatures.deputyDirector}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            deputyDirector: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mb-2 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={formData.signatures.deputyDirectorDesignation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            deputyDirectorDesignation: e.target.value,
                          },
                        })
                      }
                      placeholder="পদবী"
                      className="w-full text-[11px] px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-750">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ৪. পরিচালক (Director)
                    </label>
                    <input
                      type="text"
                      value={formData.signatures.director}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            director: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mb-2 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={formData.signatures.directorDesignation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: {
                            ...formData.signatures,
                            directorDesignation: e.target.value,
                          },
                        })
                      }
                      placeholder="পদবী"
                      className="w-full text-[11px] px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Footnotes & Margin Notes */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  মার্জিন নোট ও যাচাইকরণ বার্তা
                </h4>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    হাতে লেখা মার্জিন নোট (চিত্রের অনুরূপ নোট)
                  </label>
                  <input
                    type="text"
                    value={formData.signatures.handwrittenMarginNote}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        signatures: {
                          ...formData.signatures,
                          handwrittenMarginNote: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ফুটার অফিসিয়াল ভ্যালিডেশন নোট
                  </label>
                  <textarea
                    rows={2}
                    value={formData.signatures.footerNote}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        signatures: {
                          ...formData.signatures,
                          footerNote: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: JSON CODE */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  সম্পূর্ণ ডায়াগ্রাম ডাটা JSON কোড আকারে দেখতে বা একবারে পেস্ট করতে পারবেন:
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(jsonInput);
                    alert('JSON ডাটা ক্লিপবোর্ডে কপি হয়েছে!');
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  কপি করুন
                </button>
              </div>

              {jsonError && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 rounded-xl text-xs font-medium">
                  {jsonError}
                </div>
              )}

              <textarea
                rows={18}
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setJsonError(null);
                }}
                className="w-full font-mono text-xs p-4 bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            {saveSuccessMessage && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 animate-bounce">
                <Check className="w-3.5 h-3.5" /> পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition"
            >
              বাতিল
            </button>
            <button
              onClick={handleSaveAndApply}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
            >
              <Save className="w-4 h-4" />
              সংরক্ষণ ও আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
