import React, { useRef, useState } from 'react';
import { DiagramReportData, DiagramNode, ThemeMode } from '../types/diagram';
import { DoubleArrow } from './DoubleArrow';
import { 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Edit3, 
  Printer, 
  Download, 
  Building2,
  ChevronRight
} from 'lucide-react';

interface DiagramCanvasProps {
  data: DiagramReportData;
  theme: ThemeMode;
  isInlineEditMode: boolean;
  onUpdateData: (newData: DiagramReportData) => void;
  onSelectNode: (node: DiagramNode) => void;
  onOpenFullEditor: () => void;
  onPrint: () => void;
  onExportPng: () => void;
}

// Bounding box / coordinates map for the 9 nodes in 1280x880 viewBox
export const NODE_LAYOUTS = [
  { id: 'node-npl', x: 940, y: 190, rx: 92, ry: 62, titleAlign: 'center', angle: '18deg' },
  { id: 'node-par', x: 775, y: 125, rx: 105, ry: 75, titleAlign: 'center', angle: '0deg' },
  { id: 'node-otr', x: 460, y: 125, rx: 105, ry: 75, titleAlign: 'center', angle: '0deg' },
  { id: 'node-disbursed-overdue', x: 215, y: 255, rx: 125, ry: 65, titleAlign: 'center', angle: '-12deg' },
  { id: 'node-approval-authority', x: 210, y: 485, rx: 130, ry: 78, titleAlign: 'center', angle: '0deg' },
  { id: 'node-savings', x: 285, y: 710, rx: 110, ry: 65, titleAlign: 'center', angle: '12deg' },
  { id: 'node-outstanding-by-field', x: 525, y: 745, rx: 105, ry: 78, titleAlign: 'center', angle: '0deg' },
  { id: 'node-outstanding-averages', x: 795, y: 725, rx: 95, ry: 65, titleAlign: 'center', angle: '-8deg' },
  { id: 'node-total-outstanding', x: 980, y: 565, rx: 95, ry: 68, titleAlign: 'center', angle: '-15deg' },
];

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  data,
  theme,
  isInlineEditMode,
  onUpdateData,
  onSelectNode,
  onOpenFullEditor,
  onPrint,
  onExportPng,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const centerX = 620;
  const centerY = 440;
  const centerRadius = 72;

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.65));
  const handleResetZoom = () => setZoomLevel(1);

  // Toggle fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Inline editing handler
  const handleInlineNodeChange = (nodeId: string, itemIndex: number, newValue: string) => {
    const updatedNodes = data.nodes.map((node) => {
      if (node.id === nodeId) {
        const newItems = [...node.items];
        newItems[itemIndex] = newValue;
        return { ...node, items: newItems };
      }
      return node;
    });
    onUpdateData({ ...data, nodes: updatedNodes });
  };

  const handleInlineNodeTitleChange = (nodeId: string, newTitle: string) => {
    const updatedNodes = data.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, title: newTitle };
      }
      return node;
    });
    onUpdateData({ ...data, nodes: updatedNodes });
  };

  const handleInlineNodeHighlightChange = (nodeId: string, newHighlight: string) => {
    const updatedNodes = data.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, highlight: newHighlight };
      }
      return node;
    });
    onUpdateData({ ...data, nodes: updatedNodes });
  };

  const handleInlineCenterChange = (newCenterTitle: string) => {
    onUpdateData({
      ...data,
      center: { ...data.center, title: newCenterTitle },
    });
  };

  // Theme styling dictionaries
  const getThemeClasses = () => {
    switch (theme) {
      case 'white-paper':
        return {
          wrapper: 'bg-white border-2 border-slate-300 text-slate-900 shadow-xl',
          canvasBg: '#ffffff',
          centerCircleFill: '#ffffff',
          centerCircleStroke: '#0f172a',
          centerText: 'text-slate-900 font-bold',
          nodeBg: 'bg-white/95 border-2 border-slate-800 text-slate-900 shadow-sm hover:border-blue-600 hover:shadow-md',
          nodeTitle: 'text-slate-900 font-bold',
          nodeHighlight: 'text-slate-950 font-black',
          nodeItem: 'text-slate-800 font-medium',
          bannerBg: 'bg-white border-2 border-slate-800 text-slate-900 shadow-sm',
          badgeText: 'text-slate-900 font-bold',
        };
      case 'executive-royal':
        return {
          wrapper: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/30 text-white shadow-2xl',
          canvasBg: '#0b0f19',
          centerCircleFill: '#1e1b4b',
          centerCircleStroke: '#6366f1',
          centerText: 'text-white font-bold',
          nodeBg: 'bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-slate-100 shadow-lg hover:border-indigo-400 hover:shadow-indigo-500/20',
          nodeTitle: 'text-indigo-200 font-bold',
          nodeHighlight: 'text-amber-400 font-black',
          nodeItem: 'text-slate-200 font-normal',
          bannerBg: 'bg-indigo-950/90 border border-indigo-500/50 text-indigo-100 shadow-lg',
          badgeText: 'text-indigo-300 font-bold',
        };
      case 'emerald-finance':
        return {
          wrapper: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 border-2 border-emerald-500/30 text-white shadow-2xl',
          canvasBg: '#041d1a',
          centerCircleFill: '#064e3b',
          centerCircleStroke: '#10b981',
          centerText: 'text-emerald-100 font-bold',
          nodeBg: 'bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-50 shadow-lg hover:border-emerald-400 hover:shadow-emerald-500/20',
          nodeTitle: 'text-emerald-200 font-bold',
          nodeHighlight: 'text-amber-300 font-black',
          nodeItem: 'text-emerald-100/90 font-normal',
          bannerBg: 'bg-emerald-900/80 border border-emerald-400/50 text-emerald-100 shadow-lg',
          badgeText: 'text-emerald-300 font-bold',
        };
      case 'classic-blueprint':
        return {
          wrapper: 'bg-[#0f243a] border-2 border-cyan-400/40 text-cyan-50 shadow-2xl',
          canvasBg: '#0c1b2c',
          centerCircleFill: '#132e4d',
          centerCircleStroke: '#38bdf8',
          centerText: 'text-cyan-100 font-bold',
          nodeBg: 'bg-[#12283f]/90 backdrop-blur-md border border-cyan-400/50 text-cyan-50 shadow-md hover:border-cyan-300',
          nodeTitle: 'text-cyan-200 font-bold',
          nodeHighlight: 'text-amber-300 font-black',
          nodeItem: 'text-cyan-100 font-normal',
          bannerBg: 'bg-[#163250] border border-cyan-400/60 text-cyan-100 shadow-md',
          badgeText: 'text-cyan-300 font-bold',
        };
      case 'dark-slate':
      default:
        return {
          wrapper: 'bg-slate-950 border-2 border-slate-800 text-slate-100 shadow-2xl',
          canvasBg: '#090d16',
          centerCircleFill: '#1e293b',
          centerCircleStroke: '#3b82f6',
          centerText: 'text-white font-bold',
          nodeBg: 'bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 shadow-lg hover:border-blue-500',
          nodeTitle: 'text-blue-300 font-bold',
          nodeHighlight: 'text-amber-400 font-black',
          nodeItem: 'text-slate-300 font-normal',
          bannerBg: 'bg-slate-900/90 border border-slate-700 text-slate-200 shadow-lg',
          badgeText: 'text-blue-400 font-bold',
        };
    }
  };

  const themeStyles = getThemeClasses();

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Top Floating Toolbar Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 mb-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            ডায়গ্রাম মোড: {theme === 'white-paper' ? 'হোয়াইট পেপার (প্রিন্ট ফ্রেন্ডলি)' : 'প্রিমিয়াম প্রেজেন্টেশন'}
          </span>

          {isInlineEditMode && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 animate-pulse">
              <Edit3 className="w-3 h-3" /> সরাসরি এডিট সক্রিয় (বক্সে ক্লিক করুন)
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={handleZoomOut}
              title="জুম আউট (-)"
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-semibold text-slate-600 dark:text-slate-300 min-w-[45px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              title="জুম ইন (+)"
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="রিসেট জুম (১০০%)"
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded hover:bg-white dark:hover:bg-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            title="ফুলস্ক্রিন ভিউ"
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Full Editor Modal Button */}
          <button
            onClick={onOpenFullEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow-sm transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            সব তথ্য এডিট
          </button>

          {/* Landscape Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            ল্যান্ডস্কেপ প্রিন্ট
          </button>

          {/* Export PNG */}
          <button
            onClick={onExportPng}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            ছবি ডাউনলোড
          </button>
        </div>
      </div>

      {/* Main Diagram Area with Scaling Container */}
      <div
        ref={containerRef}
        id="diagram-print-container"
        className="w-full overflow-x-auto overflow-y-hidden pb-4 flex justify-center items-center"
      >
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
          }}
          className={`relative w-[1280px] h-[880px] min-w-[1280px] min-h-[880px] rounded-2xl p-6 transition-all duration-300 ${themeStyles.wrapper} print-area select-none`}
        >
          {/* Subtle Background Paper Pattern */}
          {theme === 'white-paper' ? (
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none rounded-2xl" />
          ) : (
            <div className="absolute inset-0 dark-grid-pattern opacity-30 pointer-events-none rounded-2xl" />
          )}

          {/* Top Left Report Header */}
          <div className="absolute top-5 left-7 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight">
                  {data.badge.organization}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  {data.badge.department}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {data.badge.subtitle} • মাস: <strong className="text-slate-700 dark:text-slate-200">{data.month} {data.year}</strong>
              </p>
            </div>
          </div>

          {/* SVG Layer for Double-Line Radial Arrows */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1280 880"
          >
            {/* Draw Double-Line Arrows to each of the 9 nodes */}
            {NODE_LAYOUTS.map((layout) => {
              const isHovered = hoveredNodeId === layout.id;

              return (
                <DoubleArrow
                  key={layout.id}
                  x1={centerX}
                  y1={centerY}
                  x2={layout.x}
                  y2={layout.y}
                  offsetStart={centerRadius + 6}
                  offsetEnd={Math.max(layout.rx, layout.ry) - 10}
                  theme={theme}
                  strokeColor={isHovered ? '#2563eb' : undefined}
                  isAnimated={isHovered}
                  gap={5}
                  strokeWidth={theme === 'white-paper' ? 1.6 : 1.8}
                />
              );
            })}

            {/* Central hub background circle & rings in SVG for crisp rendering */}
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius + 8}
              fill="none"
              stroke={themeStyles.centerCircleStroke}
              strokeWidth={1}
              strokeDasharray={theme === 'white-paper' ? '4 3' : '6 4'}
              opacity={0.4}
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius}
              fill={themeStyles.centerCircleFill}
              stroke={themeStyles.centerCircleStroke}
              strokeWidth={2.5}
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius - 8}
              fill="none"
              stroke={themeStyles.centerCircleStroke}
              strokeWidth={1.2}
              opacity={0.7}
            />
          </svg>

          {/* Center Hub HTML Overlay (অপারেশন-৫) */}
          <div
            style={{
              position: 'absolute',
              left: `${centerX - centerRadius}px`,
              top: `${centerY - centerRadius}px`,
              width: `${centerRadius * 2}px`,
              height: `${centerRadius * 2}px`,
            }}
            className="flex flex-col items-center justify-center rounded-full text-center cursor-pointer group z-20 transition transform hover:scale-105 active:scale-95"
            onClick={onOpenFullEditor}
            title="কেন্দ্রীয় অপারেশন হাব - এডিট করতে ক্লিক করুন"
          >
            <div className="relative flex flex-col items-center justify-center px-2">
              <span className="text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-0.5">
                {data.center.code}
              </span>

              {isInlineEditMode ? (
                <input
                  type="text"
                  value={data.center.title}
                  onChange={(e) => handleInlineCenterChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="text-lg font-black text-center bg-blue-50/80 dark:bg-slate-800 text-slate-900 dark:text-white border border-blue-400 rounded px-1 max-w-[120px]"
                />
              ) : (
                <h2 className="text-xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
                  {data.center.title}
                </h2>
              )}

              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-tight">
                {data.center.subtitle}
              </span>

              <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 shadow-sm">
                  <Edit3 className="w-2.5 h-2.5" /> পরিবর্তন
                </span>
              </div>
            </div>
          </div>

          {/* Render the 9 Surrounding Nodes (Petals / Oval Cards) */}
          {NODE_LAYOUTS.map((layout) => {
            const node: DiagramNode = data.nodes.find((n) => n.id === layout.id) || {
              id: layout.id,
              number: 0,
              title: '',
              highlight: '',
              items: [],
              accentColor: 'blue',
              positionAngle: 0,
            };
            const isHovered = hoveredNodeId === layout.id;

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
                onMouseEnter={() => setHoveredNodeId(layout.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => {
                  if (!isInlineEditMode) {
                    onSelectNode(node);
                  }
                }}
                className={`flex flex-col justify-center items-center text-center p-3 rounded-[38px] transition-all duration-200 cursor-pointer z-10 group ${
                  themeStyles.nodeBg
                } ${isHovered ? 'ring-2 ring-blue-500 ring-offset-2 scale-102' : ''}`}
              >
                {/* Node Number Badge */}
                <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shadow-xs print:hidden">
                  #{node.number}
                </div>

                {/* Node Content */}
                <div className="w-full flex flex-col justify-center items-center px-1">
                  {/* Title & Highlight in Oval Header */}
                  <div className="flex flex-col items-center justify-center leading-tight mb-1">
                    {isInlineEditMode ? (
                      <div
                        className="flex flex-col gap-0.5 items-center w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={node.title}
                          onChange={(e) =>
                            handleInlineNodeTitleChange(node.id, e.target.value)
                          }
                          className="text-xs font-bold text-center bg-blue-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-blue-400 rounded px-1 w-full"
                          placeholder="শিরোনাম"
                        />
                        {node.highlight && (
                          <input
                            type="text"
                            value={node.highlight}
                            onChange={(e) =>
                              handleInlineNodeHighlightChange(
                                node.id,
                                e.target.value
                              )
                            }
                            className="text-xs font-black text-center bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-400 border border-amber-400 rounded px-1 w-full"
                            placeholder="হাইলাইট"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <span className={`text-[13px] font-extrabold ${themeStyles.nodeTitle}`}>
                          {node.title}
                        </span>
                        {node.highlight && (
                          <span className={`text-[14px] font-black ${themeStyles.nodeHighlight}`}>
                            {node.highlight}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* List / Sub-items */}
                  <div className="w-full space-y-0.5 flex flex-col items-center">
                    {node.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-full flex justify-center items-center"
                        onClick={(e) => isInlineEditMode && e.stopPropagation()}
                      >
                        {isInlineEditMode ? (
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInlineNodeChange(
                                node.id,
                                idx,
                                e.target.value
                              )
                            }
                            className="text-[11px] text-center bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1 py-0.5 w-full text-slate-800 dark:text-slate-200"
                          />
                        ) : (
                          <p
                            className={`text-[11.5px] leading-snug tracking-tight ${themeStyles.nodeItem}`}
                          >
                            {item}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle Hover Action Indicator */}
                {!isInlineEditMode && (
                  <div className="absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                    <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                      বিস্তারিত <ChevronRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Right Banner / "অগ্রগতি রিপোর্ট" Ornate Badge (Exact Match to Handwritten Sketch Box) */}
          <div
            style={{
              position: 'absolute',
              left: '960px',
              top: '320px',
              width: '260px',
            }}
            onClick={onOpenFullEditor}
            className={`p-3.5 rounded-2xl cursor-pointer group transition transform hover:scale-102 ${themeStyles.bannerBg}`}
            title="অগ্রগতি রিপোর্ট ব্যানার - পরিবর্তন করতে ক্লিক করুন"
          >
            <div className="relative border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-xl p-2.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-0.5">
                {data.badge.badgeText}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                {data.badge.title}
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-1">
                {data.badge.subtitle}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                <span>রিপোর্ট নং: {data.badge.reportNo}</span>
                <span>তারিখ: {data.badge.date}</span>
              </div>
            </div>
          </div>

          {/* Bottom Margin Note (Handwritten Margin Reproduction) */}
          <div className="absolute bottom-20 left-7 right-7 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-2">
            <span className="font-mono text-[11px]">
              📌 {data.signatures.handwrittenMarginNote}
            </span>
            <span className="text-[11px]">
              সিস্টেম ভ্যালিডেশন: স্বয়ংক্রিয় আপডেট ও মাসিক নিরীক্ষা অনুমোদিত
            </span>
          </div>

          {/* Official Signatures Row for White Paper Print */}
          <div className="absolute bottom-4 left-7 right-7 grid grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-32 border-b border-slate-400 dark:border-slate-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {data.signatures.preparedBy}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {data.signatures.preparedByDesignation}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 border-b border-slate-400 dark:border-slate-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {data.signatures.assistantDirector}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {data.signatures.assistantDirectorDesignation}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 border-b border-slate-400 dark:border-slate-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {data.signatures.deputyDirector}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {data.signatures.deputyDirectorDesignation}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 border-b border-slate-400 dark:border-slate-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {data.signatures.director}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {data.signatures.directorDesignation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
