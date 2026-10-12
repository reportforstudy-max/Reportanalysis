import React from 'react';
import { ViewMode, ThemeMode, DiagramReportData } from '../types/diagram';
import { 
  Printer, 
  Download, 
  Edit3, 
  Calendar, 
  Grid, 
  Table, 
  CircleDot, 
  FileCheck2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface HeaderProps {
  data: DiagramReportData;
  viewMode: ViewMode;
  theme: ThemeMode;
  isInlineEditMode: boolean;
  savedMonths: DiagramReportData[];
  onSetViewMode: (view: ViewMode) => void;
  onSetTheme: (theme: ThemeMode) => void;
  onToggleInlineEdit: () => void;
  onOpenFullEditor: () => void;
  onOpenMonthHistory: () => void;
  onSelectMonthData: (data: DiagramReportData) => void;
  onPrint: () => void;
  onExportPng: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  viewMode,
  theme,
  isInlineEditMode,
  savedMonths,
  onSetViewMode,
  onSetTheme,
  onToggleInlineEdit,
  onOpenFullEditor,
  onOpenMonthHistory,
  onSelectMonthData,
  onPrint,
  onExportPng,
}) => {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Brand & Month Switcher */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md">
            ৫
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                {data.badge.title}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {data.center.title}
              </span>
            </div>

            {/* Quick Month Dropdown */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-slate-500 dark:text-slate-400">প্রতিবেদন মাস:</span>
              <div className="relative inline-block">
                <select
                  value={data.id}
                  onChange={(e) => {
                    const selected = savedMonths.find((m) => m.id === e.target.value);
                    if (selected) onSelectMonthData(selected);
                  }}
                  className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-2.5 py-0.5 rounded-md border border-slate-300 dark:border-slate-700 cursor-pointer focus:outline-none"
                >
                  {savedMonths.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.month} {m.year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={onOpenMonthHistory}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 ml-1"
                title="নতুন মাস তৈরি বা ইতিহাস দেখুন"
              >
                <Calendar className="w-3 h-3" /> সব মাস
              </button>
            </div>
          </div>
        </div>

        {/* Center: View Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onSetViewMode('diagram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'diagram'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            ডায়গ্রাম ভিউ
          </button>

          <button
            onClick={() => onSetViewMode('print-preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'print-preview'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            সাদা কাগজ প্রিন্ট
          </button>

          <button
            onClick={() => onSetViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            কার্ড গ্রিড
          </button>

          <button
            onClick={() => onSetViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            তালিকা ভিউ
          </button>
        </div>

        {/* Right: Actions, Themes & Print */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Inline Edit Mode Toggle */}
          <button
            onClick={onToggleInlineEdit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isInlineEditMode
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
            title="সরাসরি ডায়াগ্রামের উপর ক্লিক করে লেখার মোড"
          >
            {isInlineEditMode ? (
              <ToggleRight className="w-4 h-4 text-emerald-600" />
            ) : (
              <ToggleLeft className="w-4 h-4 text-slate-400" />
            )}
            <span>ইনলাইন এডিট</span>
          </button>

          {/* Theme Dropdown */}
          <div className="relative inline-block">
            <select
              value={theme}
              onChange={(e) => onSetTheme(e.target.value as ThemeMode)}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="white-paper">📄 সাদা কাগজ (প্রিন্ট মোড)</option>
              <option value="executive-royal">💎 রয়্যাল এক্সিকিউটিভ</option>
              <option value="emerald-finance">🌿 এমারেল্ড ফাইন্যান্স</option>
              <option value="classic-blueprint">📐 ব্লুপ্রিন্ট স্টাইল</option>
              <option value="dark-slate">🌙 ডার্ক মোড</option>
            </select>
          </div>

          {/* Export PNG button */}
          <button
            onClick={onExportPng}
            title="HD ইমেজ হিসেবে ডাউনলোড করুন"
            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Full Editor Modal Button */}
          <button
            onClick={onOpenFullEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl shadow-xs transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            সব তথ্য এডিট
          </button>

          {/* Primary Landscape Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Printer className="w-4 h-4" />
            ল্যান্ডস্কেপ প্রিন্ট
          </button>
        </div>
      </div>
    </header>
  );
};
