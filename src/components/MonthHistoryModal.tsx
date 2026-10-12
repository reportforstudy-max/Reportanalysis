import React, { useState } from 'react';
import { DiagramReportData } from '../types/diagram';
import { BENGALI_MONTHS, BENGALI_YEARS } from '../utils/bengaliUtils';
import { 
  X, 
  Plus, 
  Calendar, 
  Download, 
  Upload, 
  Check, 
  Clock, 
  Trash2
} from 'lucide-react';

interface MonthHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: DiagramReportData;
  savedMonths: DiagramReportData[];
  onSelectMonth: (data: DiagramReportData) => void;
  onSaveNewMonth: (newMonthData: DiagramReportData) => void;
  onDeleteMonth: (id: string) => void;
  onImportJson: (imported: DiagramReportData) => void;
}

export const MonthHistoryModal: React.FC<MonthHistoryModalProps> = ({
  isOpen,
  onClose,
  currentData,
  savedMonths,
  onSelectMonth,
  onSaveNewMonth,
  onDeleteMonth,
  onImportJson,
}) => {
  const [newMonthName, setNewMonthName] = useState('এপ্রিল');
  const [newYearName, setNewYearName] = useState('২০২৫');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  if (!isOpen) return null;

  const handleCreateMonth = () => {
    const newReport: DiagramReportData = {
      ...currentData,
      id: `report-${Date.now()}`,
      title: `অপারেশনাল অগ্রগতি রিপোর্ট (${newMonthName})`,
      month: newMonthName,
      year: newYearName,
      lastUpdated: new Date().toISOString().split('T')[0],
      badge: {
        ...currentData.badge,
        month: newMonthName,
        year: newYearName,
        date: `৩০ ${newMonthName} ${newYearName}`,
        reportNo: `OP-05/REP/${newYearName}-${newMonthName}`,
      },
    };
    onSaveNewMonth(newReport);
    setIsCreatingNew(false);
  };

  const handleExportAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedMonths, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `operational_reports_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          if (json[0]) onImportJson(json[0]);
        } else {
          onImportJson(json);
        }
        alert('সফলভাবে ডাটা লোড করা হয়েছে!');
      } catch (err) {
        alert('ভুল ফাইল ফরম্যাট। সঠিক JSON ফাইল নির্বাচন করুন।');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                মাসিক রিপোর্ট হিস্ট্রি ও নতুন মাস তৈরি
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                প্রতি মাসের আলাদা ডায়াগ্রাম স্ন্যাপশট সংরক্ষণ করুন এবং ইচ্ছেমতো পরিবর্তন করুন।
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

        {/* Create New Month Trigger / Form */}
        {isCreatingNew ? (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300">
              নতুন মাসের রিপোর্ট তৈরি করুন (বর্তমান ডাটার কপি থেকে শুরু হবে)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  মাস নির্বাচন
                </label>
                <select
                  value={newMonthName}
                  onChange={(e) => setNewMonthName(e.target.value)}
                  className="w-full text-xs font-semibold p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  {BENGALI_MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বছর
                </label>
                <select
                  value={newYearName}
                  onChange={(e) => setNewYearName(e.target.value)}
                  className="w-full text-xs font-semibold p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  {BENGALI_YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-1">
              <button
                onClick={() => setIsCreatingNew(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
              >
                বাতিল
              </button>
              <button
                onClick={handleCreateMonth}
                className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
              >
                তৈরি ও লোড করুন
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreatingNew(true)}
            className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-dashed border-blue-300 dark:border-blue-800 rounded-xl font-bold text-xs transition"
          >
            <Plus className="w-4 h-4" />
            + নতুন মাসের রিপোর্ট তৈরি করুন
          </button>
        )}

        {/* List of Saved Months */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            সংরক্ষিত মাসের তালিকা ({savedMonths.length}টি)
          </span>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {savedMonths.map((report) => {
              const isCurrent = report.id === currentData.id;
              return (
                <div
                  key={report.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition ${
                    isCurrent
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <div
                    onClick={() => {
                      onSelectMonth(report);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <div className={`p-2 rounded-lg ${isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {report.month} {report.year}
                        </h4>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> সক্রিয়
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {report.badge.organization} • {report.badge.reportNo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!isCurrent && savedMonths.length > 1 && (
                      <button
                        onClick={() => onDeleteMonth(report.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                        title="এই মাস মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Backup Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAllJson}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg transition"
              title="সমস্ত ডাটা ব্যাকআপ ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              ব্যাকআপ ডাউনলোড (JSON)
            </button>

            <label className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg transition cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              ব্যাকআপ রিস্টোর
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
