import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { 
  DiagramReportData, 
  DiagramNode, 
  ViewMode, 
  ThemeMode 
} from './types/diagram';
import { INITIAL_DIAGRAM_DATA, SAMPLE_MONTHS_PRESETS } from './data/initialData';
import { Header } from './components/Header';
import { KpiSummary } from './components/KpiSummary';
import { DiagramCanvas } from './components/DiagramCanvas';
import { PrintDiagramView } from './components/PrintDiagramView';
import { GridView } from './components/GridView';
import { TableView } from './components/TableView';
import { EditModal } from './components/EditModal';
import { NodeDetailModal } from './components/NodeDetailModal';
import { MonthHistoryModal } from './components/MonthHistoryModal';
import { GuideSection } from './components/GuideSection';
import { 
  Printer, 
  Edit3, 
  Sparkles, 
  Copy,
  RotateCcw,
  Loader2
} from 'lucide-react';

const STORAGE_KEY_CURRENT = 'op_progress_diagram_current_v2';
const STORAGE_KEY_SAVED_MONTHS = 'op_progress_diagram_months_v2';
const STORAGE_KEY_THEME = 'op_progress_diagram_theme_v2';

export function App() {
  // Load data from localStorage or fallback
  const [currentData, setCurrentData] = useState<DiagramReportData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load from storage', e);
    }
    return INITIAL_DIAGRAM_DATA;
  });

  const [savedMonths, setSavedMonths] = useState<DiagramReportData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED_MONTHS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved months', e);
    }
    return SAMPLE_MONTHS_PRESETS;
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved as ThemeMode;
    } catch (e) {
      console.error(e);
    }
    return 'white-paper';
  });

  const [viewMode, setViewMode] = useState<ViewMode>('diagram');
  const [isInlineEditMode, setIsInlineEditMode] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isMonthHistoryOpen, setIsMonthHistoryOpen] = useState<boolean>(false);
  const [selectedNodeForModal, setSelectedNodeForModal] = useState<DiagramNode | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(currentData));
    } catch (e) {
      console.error(e);
    }
  }, [currentData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_MONTHS, JSON.stringify(savedMonths));
    } catch (e) {
      console.error(e);
    }
  }, [savedMonths]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Show temporary toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Update data & sync active month in saved list
  const handleUpdateData = (newData: DiagramReportData) => {
    setCurrentData(newData);
    setSavedMonths((prev) =>
      prev.map((item) => (item.id === newData.id ? newData : item))
    );
  };

  // Select node by ID from KPI cards
  const handleSelectNodeById = (nodeId: string) => {
    const node = currentData.nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNodeForModal(node);
    }
  };

  // Update single node
  const handleUpdateSingleNode = (updatedNode: DiagramNode) => {
    const updatedNodes = currentData.nodes.map((n) =>
      n.id === updatedNode.id ? updatedNode : n
    );
    const updatedData = { ...currentData, nodes: updatedNodes };
    handleUpdateData(updatedData);
    showToast(`নোড #${updatedNode.number} সফলভাবে আপডেট হয়েছে!`);
  };

  // Switch month data
  const handleSelectMonthData = (data: DiagramReportData) => {
    setCurrentData(data);
    showToast(`${data.month} ${data.year} এর ডাটা লোড করা হয়েছে`);
  };

  // Save new month snapshot
  const handleSaveNewMonth = (newMonthData: DiagramReportData) => {
    const exists = savedMonths.some((m) => m.id === newMonthData.id);
    if (exists) {
      setSavedMonths((prev) =>
        prev.map((m) => (m.id === newMonthData.id ? newMonthData : m))
      );
    } else {
      setSavedMonths((prev) => [newMonthData, ...prev]);
    }
    setCurrentData(newMonthData);
    confetti({ particleCount: 60, spread: 55, origin: { y: 0.8 } });
    showToast(`নতুন মাস (${newMonthData.month} ${newMonthData.year}) সফলভাবে তৈরি ও সক্রিয় হয়েছে!`);
  };

  // Delete saved month
  const handleDeleteMonth = (id: string) => {
    if (confirm('আপনি কি এই মাসের ডাটা ডিলিট করতে চান?')) {
      const remaining = savedMonths.filter((m) => m.id !== id);
      setSavedMonths(remaining);
      if (currentData.id === id && remaining.length > 0) {
        setCurrentData(remaining[0]);
      }
      showToast('মাসের রেকর্ড মুছে ফেলা হয়েছে');
    }
  };

  // Print trigger
  const handlePrint = () => {
    window.print();
  };

  // Export high resolution PNG image
  const handleExportPng = async () => {
    try {
      setIsExporting(true);
      showToast('হাই-রেজ্যুলেশন ছবি তৈরি হচ্ছে, অপেক্ষা করুন...');

      // Find the print area container
      const targetElement =
        document.getElementById('printable-diagram-sheet') ||
        document.getElementById('diagram-print-container');

      if (!targetElement) {
        alert('ডায়াগ্রাম এলিমেন্ট পাওয়া যায়নি।');
        setIsExporting(false);
        return;
      }

      const canvas = await html2canvas(targetElement, {
        scale: 2.2, // 2.2x High DPI
        useCORS: true,
        backgroundColor: theme === 'white-paper' ? '#ffffff' : null,
        logging: false,
      });

      const imgUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      const fileName = `Operational_Progress_Report_${currentData.center.code}_${currentData.month}_${currentData.year}.png`;
      downloadLink.href = imgUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.7 } });
      showToast('ছবি সফলভাবে ডাউনলোড হয়েছে!');
    } catch (error) {
      console.error('PNG export failed', error);
      alert('ছবি এক্সপোর্ট করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Quick reset to initial drawing data
  const handleResetToDrawing = () => {
    if (confirm('আপনি কি মূল হাতে আঁকা ড্রয়িংয়ের তথ্যে রিসেট করতে চান?')) {
      handleUpdateData(INITIAL_DIAGRAM_DATA);
      showToast('মূল ড্রয়িংয়ের মান রিস্টোর করা হয়েছে!');
    }
  };

  // Copy all text summary to clipboard
  const handleCopySummary = () => {
    let summaryText = `📊 ${currentData.badge.organization}\n`;
    summaryText += `🔹 ${currentData.badge.title} — ${currentData.center.title} (${currentData.month} ${currentData.year})\n`;
    summaryText += `-------------------------------------------\n`;

    currentData.nodes.forEach((n) => {
      summaryText += `\n#${n.number}. ${n.title} ${n.highlight ? `(${n.highlight})` : ''}\n`;
      n.items.forEach((item) => {
        summaryText += `   • ${item}\n`;
      });
    });

    summaryText += `\n📌 ${currentData.signatures.handwrittenMarginNote}\n`;
    summaryText += `📅 তারিখ: ${currentData.badge.date} | রিপোর্ট নং: ${currentData.badge.reportNo}\n`;

    navigator.clipboard.writeText(summaryText);
    showToast('সম্পূর্ণ ডাটা টেক্সট হিসেবে ক্লিপবোর্ডে কপি হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-bounce print:hidden">
          {isExporting ? (
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-400" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Header */}
      <Header
        data={currentData}
        viewMode={viewMode}
        theme={theme}
        isInlineEditMode={isInlineEditMode}
        savedMonths={savedMonths}
        onSetViewMode={setViewMode}
        onSetTheme={setTheme}
        onToggleInlineEdit={() => setIsInlineEditMode((prev) => !prev)}
        onOpenFullEditor={() => setIsEditModalOpen(true)}
        onOpenMonthHistory={() => setIsMonthHistoryOpen(true)}
        onSelectMonthData={handleSelectMonthData}
        onPrint={handlePrint}
        onExportPng={handleExportPng}
      />

      {/* Main App Content Container */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 py-6 flex flex-col items-center">
        
        {/* KPI Executive Summary Strip */}
        <KpiSummary
          data={currentData}
          onSelectNodeById={handleSelectNodeById}
        />

        {/* View Mode Switching */}
        {viewMode === 'diagram' && (
          <DiagramCanvas
            data={currentData}
            theme={theme}
            isInlineEditMode={isInlineEditMode}
            onUpdateData={handleUpdateData}
            onSelectNode={(node) => setSelectedNodeForModal(node)}
            onOpenFullEditor={() => setIsEditModalOpen(true)}
            onPrint={handlePrint}
            onExportPng={handleExportPng}
          />
        )}

        {viewMode === 'print-preview' && (
          <PrintDiagramView
            data={currentData}
            onPrint={handlePrint}
            onExportPng={handleExportPng}
          />
        )}

        {viewMode === 'grid' && (
          <GridView
            data={currentData}
            onSelectNode={(node) => setSelectedNodeForModal(node)}
            onOpenFullEditor={() => setIsEditModalOpen(true)}
          />
        )}

        {viewMode === 'table' && (
          <TableView
            data={currentData}
            onSelectNode={(node) => setSelectedNodeForModal(node)}
            onOpenFullEditor={() => setIsEditModalOpen(true)}
          />
        )}

        {/* Instructions & Monthly Workflow Guide */}
        <GuideSection
          onOpenFullEditor={() => setIsEditModalOpen(true)}
          onPrint={handlePrint}
          onOpenMonthHistory={() => setIsMonthHistoryOpen(true)}
        />
      </main>

      {/* Full Comprehensive Data Editor Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={currentData}
        onSave={handleUpdateData}
      />

      {/* Individual Node Detail / Quick Edit Modal */}
      <NodeDetailModal
        node={selectedNodeForModal}
        isOpen={Boolean(selectedNodeForModal)}
        onClose={() => setSelectedNodeForModal(null)}
        onUpdateNode={handleUpdateSingleNode}
      />

      {/* Month History & Backup Modal */}
      <MonthHistoryModal
        isOpen={isMonthHistoryOpen}
        onClose={() => setIsMonthHistoryOpen(false)}
        currentData={currentData}
        savedMonths={savedMonths}
        onSelectMonth={handleSelectMonthData}
        onSaveNewMonth={handleSaveNewMonth}
        onDeleteMonth={handleDeleteMonth}
        onImportJson={(imported) => {
          handleUpdateData(imported);
          setSavedMonths((prev) => [imported, ...prev]);
        }}
      />

      {/* Floating Bottom Quick Action Toolbar */}
      <div className="fixed bottom-5 right-6 z-40 flex items-center gap-2 print:hidden">
        <button
          onClick={handleCopySummary}
          title="সকল ডাটা সামারি কপি করুন"
          className="p-3 bg-white dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg transition"
        >
          <Copy className="w-4 h-4" />
        </button>

        <button
          onClick={handleResetToDrawing}
          title="হাতে আঁকা মূল তথ্যে রিসেট"
          className="p-3 bg-white dark:bg-slate-900 hover:bg-slate-100 text-rose-600 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-full font-bold text-xs shadow-xl transition transform hover:scale-105"
        >
          <Edit3 className="w-4 h-4 text-blue-400" />
          <span>ডাটা এডিট</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-xs shadow-xl transition transform hover:scale-105 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>প্রিন্ট করুন (Landscape)</span>
        </button>
      </div>

      {/* Official Footer */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {currentData.badge.organization}
            </span>
            <span>•</span>
            <span>{currentData.badge.department}</span>
            <span>•</span>
            <span>{currentData.badge.title} ({currentData.month} {currentData.year})</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span>সাদা পাতা প্রিন্ট ফরম্যাট: A4 Landscape</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-blue-400">
              অপারেশনাল ম্যানেজমেন্ট সিস্টেম
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
