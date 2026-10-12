import React from 'react';
import { DiagramReportData } from '../types/diagram';
import { NODE_LAYOUTS } from './DiagramCanvas';
import { DoubleArrow } from './DoubleArrow';
import { Printer, Download } from 'lucide-react';

interface PrintDiagramViewProps {
  data: DiagramReportData;
  onPrint: () => void;
  onExportPng: () => void;
}

export const PrintDiagramView: React.FC<PrintDiagramViewProps> = ({
  data,
  onPrint,
  onExportPng,
}) => {
  const centerX = 620;
  const centerY = 440;
  const centerRadius = 72;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top action helper in preview mode */}
      <div className="w-full max-w-5xl flex items-center justify-between p-4 mb-4 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl print:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              হোয়াইট পেপার ল্যান্ডস্কেপ প্রিন্ট প্রিভিউ (A4 Landscape Ready)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              এটি সরাসরি সাদা পাতায় প্রিন্ট করার জন্য কালার অপ্টিমাইজড ও রেডি।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            এখনই প্রিন্ট করুন (Landscape)
          </button>
          <button
            onClick={onExportPng}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-semibold rounded-lg shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            HD ছবি হিসেবে সংরক্ষণ
          </button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 Landscape Aspect Ratio ~ 1.414) */}
      <div
        id="printable-diagram-sheet"
        className="w-[1280px] h-[880px] min-w-[1280px] min-h-[880px] bg-white text-black p-8 relative border-2 border-slate-900 shadow-2xl rounded-none print:border-none print:shadow-none print:p-0 print:m-0 print-area"
      >
        {/* Printable Header */}
        <div className="flex justify-between items-start pb-3 border-b-2 border-slate-900 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                অফিসিয়াল প্রতিবেদন
              </span>
              <h1 className="text-xl font-black text-slate-900">
                {data.badge.organization}
              </h1>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-0.5">
              {data.badge.department} • {data.badge.subtitle}
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm font-black text-slate-900">
              মাস: {data.month} {data.year}
            </div>
            <div className="text-[11px] font-bold text-slate-600">
              রিপোর্ট আইডি: {data.badge.reportNo} | তারিখ: {data.badge.date}
            </div>
          </div>
        </div>

        {/* Printable Canvas */}
        <div className="relative w-full h-[710px]">
          {/* Double Arrow SVG Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1280 880"
          >
            {NODE_LAYOUTS.map((layout) => (
              <DoubleArrow
                key={layout.id}
                x1={centerX}
                y1={centerY}
                x2={layout.x}
                y2={layout.y}
                offsetStart={centerRadius + 6}
                offsetEnd={Math.max(layout.rx, layout.ry) - 10}
                theme="white-paper"
                strokeColor="#0f172a"
                strokeWidth={1.8}
                gap={5}
              />
            ))}

            {/* Central hub circles */}
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius + 8}
              fill="none"
              stroke="#0f172a"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius}
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth={2.5}
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius - 8}
              fill="none"
              stroke="#0f172a"
              strokeWidth={1.2}
            />
          </svg>

          {/* Center Hub */}
          <div
            style={{
              position: 'absolute',
              left: `${centerX - centerRadius}px`,
              top: `${centerY - centerRadius}px`,
              width: `${centerRadius * 2}px`,
              height: `${centerRadius * 2}px`,
            }}
            className="flex flex-col items-center justify-center rounded-full text-center z-20"
          >
            <span className="text-[11px] font-black uppercase text-slate-800">
              {data.center.code}
            </span>
            <h2 className="text-xl font-black text-slate-950 leading-tight">
              {data.center.title}
            </h2>
            <span className="text-[10px] text-slate-700 font-bold">
              {data.center.subtitle}
            </span>
          </div>

          {/* 9 Radial Nodes */}
          {NODE_LAYOUTS.map((layout) => {
            const node = data.nodes.find((n) => n.id === layout.id);
            if (!node) return null;

            return (
              <div
                key={layout.id}
                style={{
                  position: 'absolute',
                  left: `${layout.x - layout.rx}px`,
                  top: `${layout.y - layout.ry}px`,
                  width: `${layout.rx * 2}px`,
                  height: `${layout.ry * 2}px`,
                }}
                className="flex flex-col justify-center items-center text-center p-3 rounded-[38px] bg-white border-2 border-slate-900 z-10"
              >
                {/* Node Title & Highlight */}
                <div className="flex items-center justify-center gap-1.5 flex-wrap mb-1">
                  <span className="text-[13px] font-black text-slate-950">
                    {node.title}
                  </span>
                  {node.highlight && (
                    <span className="text-[14px] font-black text-slate-900 underline decoration-slate-400">
                      {node.highlight}
                    </span>
                  )}
                </div>

                {/* Node Item Lines */}
                <div className="w-full space-y-0.5 flex flex-col items-center">
                  {node.items.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-[11.5px] font-semibold text-slate-900 leading-snug tracking-tight"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Right Banner / "অগ্রগতি রিপোর্ট" */}
          <div
            style={{
              position: 'absolute',
              left: '960px',
              top: '320px',
              width: '260px',
            }}
            className="p-3 rounded-2xl bg-white border-2 border-slate-900 text-center"
          >
            <div className="border border-dashed border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] font-black uppercase text-slate-800 block mb-0.5">
                {data.badge.badgeText}
              </span>
              <h3 className="text-xl font-black text-slate-950 leading-tight">
                {data.badge.title}
              </h3>
              <p className="text-[11px] font-bold text-slate-800 mt-1">
                {data.badge.subtitle}
              </p>
              <div className="mt-2 pt-1 border-t border-slate-400 flex items-center justify-between text-[10px] font-bold text-slate-700">
                <span>শাখা নং: {data.badge.reportNo}</span>
                <span>{data.badge.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote Margin Reproduction */}
        <div className="flex justify-between items-center text-[10px] font-semibold text-slate-800 border-t border-slate-400 pt-1.5 pb-2">
          <span>📌 {data.signatures.handwrittenMarginNote}</span>
          <span>{data.signatures.footerNote}</span>
        </div>

        {/* Official 4 Signature Blocks */}
        <div className="grid grid-cols-4 gap-6 text-center pt-2 border-t-2 border-slate-900">
          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-slate-800 mb-1 h-6" />
            <span className="text-xs font-black text-slate-900">
              {data.signatures.preparedBy}
            </span>
            <span className="text-[10px] font-bold text-slate-700">
              {data.signatures.preparedByDesignation}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-slate-800 mb-1 h-6" />
            <span className="text-xs font-black text-slate-900">
              {data.signatures.assistantDirector}
            </span>
            <span className="text-[10px] font-bold text-slate-700">
              {data.signatures.assistantDirectorDesignation}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-slate-800 mb-1 h-6" />
            <span className="text-xs font-black text-slate-900">
              {data.signatures.deputyDirector}
            </span>
            <span className="text-[10px] font-bold text-slate-700">
              {data.signatures.deputyDirectorDesignation}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 border-b border-slate-800 mb-1 h-6" />
            <span className="text-xs font-black text-slate-900">
              {data.signatures.director}
            </span>
            <span className="text-[10px] font-bold text-slate-700">
              {data.signatures.directorDesignation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
