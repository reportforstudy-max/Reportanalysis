import React from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Edit3, 
  Calendar, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface GuideSectionProps {
  onOpenFullEditor: () => void;
  onPrint: () => void;
  onOpenMonthHistory: () => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
  onOpenFullEditor,
  onPrint,
  onOpenMonthHistory,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 mt-6 print:hidden">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            মাসিক ব্যবহারের নির্দেশিকা ও বসকে রিপোর্ট উপস্থাপনের উপায়
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            প্রতি মাসে কীভাবে নতুন তথ্য দিয়ে ডায়াগ্রাম আপডেট ও সাদা পাতায় প্রিন্ট করবেন:
          </p>
        </div>
      </div>

      {/* 3 Step Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center border border-blue-200 dark:border-blue-800">
                ০১
              </span>
              <span className="text-[11px] font-bold text-slate-400">ধাপ ১</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              ১. নতুন মাস তৈরি বা ডাটা আপডেট
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              টপবারের <strong>"সব মাস"</strong> বাটনে ক্লিক করে নতুন মাসের রিপোর্ট সিলেক্ট করুন অথবা <strong>"সব তথ্য এডিট"</strong> বাটনে চাপ দিয়ে ৯টি নোডের মান, পার্সেন্টেজ এবং ভিতরের লাইনসমূহ আপডেট করুন।
            </p>
          </div>

          <button
            onClick={onOpenFullEditor}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            ডাটা এডিট শুরু করুন
          </button>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-black text-sm flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                ০২
              </span>
              <span className="text-[11px] font-bold text-slate-400">ধাপ ২</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              ২. ইনলাইন বা সরাসরি ক্লিক করে পরিবর্তন
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              <strong>"ইনলাইন এডিট"</strong> মোড অন করে ডায়াগ্রামের যেকোনো টেক্সট বা সংখ্যার ওপর ক্লিক করে সরাসরি পরিবর্তন করতে পারবেন। প্রতিটি পরিবর্তন স্বয়ংক্রিয়ভাবে ব্রাউজারে সংরক্ষিত থাকে।
            </p>
          </div>

          <button
            onClick={onOpenMonthHistory}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            মাসিক স্ন্যাপশট দেখুন
          </button>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-black text-sm flex items-center justify-center border border-purple-200 dark:border-purple-800">
                ০৩
              </span>
              <span className="text-[11px] font-bold text-slate-400">ধাপ ৩</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              ৩. সাদা পাতায় ল্যান্ডস্কেপ প্রিন্ট
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              বসকে দেওয়ার জন্য <strong>"ল্যান্ডস্কেপ প্রিন্ট"</strong> বাটনে ক্লিক করুন। প্রিন্ট ডায়ালগে <em>Layout: Landscape</em> এবং <em>Paper: A4</em> সিলেক্ট করে সরাসরি লেজার প্রিন্টারে সাদা কাগজে ঝকঝকে প্রিন্ট নিন।
            </p>
          </div>

          <button
            onClick={onPrint}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            সাদা পাতায় প্রিন্ট করুন
          </button>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="p-6 bg-slate-100 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          সিস্টেমের বিশেষ সুবিধাসমূহ:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">হুবহু ড্রয়িং অনুকরণ:</strong>
              মূল ড্রয়িংয়ের ৯টি নোড ও ডাবল অ্যারো কানেক্টর নিখুঁতভাবে উপস্থাপিত।
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">অফিসিয়াল স্বাক্ষর ব্লক:</strong>
              প্রস্তুতকারক, সহ-পরিচালক, উপ-পরিচালক ও পরিচালকের ৪টি সিগনেচার স্পেস।
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">অটো বাংলা রূপান্তর:</strong>
              ইংরেজি ডিজিটকে এক ক্লিকে বাংলা সংখ্যায় কনভার্ট করার সুবিধা।
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">ব্যাকআপ ও রিস্টোর:</strong>
              সকল তথ্য JSON ফাইল হিসেবে কম্পিউটারে সংরক্ষণ ও পুনরায় আপলোড করা যায়।
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
