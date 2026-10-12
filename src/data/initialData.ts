import { DiagramReportData } from '../types/diagram';

export const INITIAL_DIAGRAM_DATA: DiagramReportData = {
  id: 'report-march-2025',
  title: 'অপারেশনাল অগ্রগতি রিপোর্ট',
  month: 'মার্চ',
  year: '২০২৫',
  lastUpdated: '২০২৫-০৩-৩১',
  center: {
    title: 'অপারেশন-৫',
    subtitle: 'কেন্দ্রীয় সমন্বয় হাব',
    code: 'OP-05',
    managerName: 'অপারেশন বিভাগ',
  },
  badge: {
    title: 'অগ্রগতি রিপোর্ট',
    subtitle: 'কার্য বিবরণী ও পারফরম্যান্স ম্যাট্রিক্স',
    badgeText: 'মাসিক পর্যালোচনা',
    organization: 'মাইক্রোফাইন্যান্স অ্যান্ড ক্রেডিট অপারেশনস',
    department: 'অপারেশন বিভাগ-৫',
    month: 'মার্চ',
    year: '২০২৫',
    date: '৩১ মার্চ ২০২৫',
    reportNo: 'OP-05/REP/2025-03',
  },
  nodes: [
    {
      id: 'node-npl',
      number: 1,
      title: 'NPL',
      highlight: '৬.০৪%',
      tag: 'শ্রেণীকৃত ঋণ (NPL)',
      items: [
        'অগ্রসর-৫.১৪%',
        'ক্ষুদ্র ৭.৪৬%',
      ],
      accentColor: 'rose',
      positionAngle: 22,
      category: 'ঋণ ঝুঁকি',
      notes: 'পোর্টফোলিও কোয়ালিটি এনপিএল হার ৬.০৪%',
    },
    {
      id: 'node-par',
      number: 2,
      title: 'PAR',
      highlight: '১১.০২%',
      tag: 'ঝুঁকিপূর্ণ পোর্টফোলিও (PAR)',
      items: [
        'অগ্রসর- ৯.৬৯%, ক্ষুদ্র ১৩.১০%',
        '১০ নিচে PAR শাখা ৩৫টি',
        '১০ থেকে ১৫ PAR শাখা ৩০টি',
        '১৫ তদুর্ধ্ব PAR শাখা ১৮টি',
      ],
      accentColor: 'amber',
      positionAngle: 68,
      category: 'পোর্টফোলিও ঝুঁকি',
      notes: 'মোট শাখা ৮৩টি - ৩৫টি ১০ এর নিচে',
    },
    {
      id: 'node-otr',
      number: 3,
      title: 'OTR',
      highlight: '৯৬.৩৩%',
      tag: 'সময়মতো আদায় হার (OTR)',
      items: [
        'অগ্রসর- ৯৬.৭০%, ক্ষুদ্র ৯৫.৮২%',
        '৯০ নিচে OTR শাখা ২ টি',
        '৯০ থেকে ৯৫ OTR শাখা ১৫টি',
        '৯৫ তদুর্ধ্ব OTR শাখা ৭০টি',
      ],
      accentColor: 'emerald',
      positionAngle: 114,
      category: 'আদায় দক্ষতা',
      notes: '৭০টি শাখায় ৯৫% এর উর্ধ্বে আদায়',
    },
    {
      id: 'node-disbursed-overdue',
      number: 4,
      title: 'বিতরণকৃত ঋণের বকেয়া-',
      highlight: 'বকেয়া বিশ্লেষণ',
      tag: 'মেয়াদভিত্তিক ঋণ বকেয়া',
      items: [
        '১ বছর মেয়াদী জন ৪.৮৬% টাকা ১.০১%',
        '১৮ মাস মেয়াদী জন ২.৭৯% টাকা ০.৩৬%',
        '২ বছর মেয়াদী জন ১.৭৫% টাকা ০.২৬%',
      ],
      accentColor: 'blue',
      positionAngle: 160,
      category: 'বকেয়া বিশ্লেষণ',
      notes: 'মেয়াদ বৃদ্ধির সাথে সাথে বকেয়া হার হ্রাস পাচ্ছে',
    },
    {
      id: 'node-approval-authority',
      number: 5,
      title: 'অনুমোদন ক্ষমতা অনুযায়ী',
      highlight: 'বকেয়া হার',
      tag: 'কর্তৃপক্ষভিত্তিক বকেয়া',
      items: [
        'বকেয়া হার- BM- জন ৪.৮৫%, টাকা ১.৩৫%',
        'RH-জন ৪.৪৬% টাকা ০.৭৮%',
        'ZH-জন ৩.২৩%, টাকা ০.৫৭%',
        'DH-জন ২.৭৩% টাকা ০.৫৩%',
        'গড় জন ৪.৫৭% টাকা ০.৬৬%',
      ],
      accentColor: 'indigo',
      positionAngle: 204,
      category: 'দায়িত্ব ও বকেয়া',
      notes: 'BM, RH, ZH, DH অনুমোদন বকেয়া অনুপাত',
    },
    {
      id: 'node-savings',
      number: 6,
      title: 'সঞ্চয়',
      highlight: '২১৯০৭৭০৬৪৯ টাকা',
      tag: 'মোট সঞ্চয় পোর্টফোলিও',
      items: [
        'GS-43.33%, SS-20.02%',
        'TSS-19.10%, GSTD-17.55%',
      ],
      accentColor: 'teal',
      positionAngle: 248,
      category: 'সঞ্চয় ও তহবিল',
      notes: 'মোট সঞ্চয় ২১en কোটি+ (GS, SS, TSS, GSTD অনুপাত)',
    },
    {
      id: 'node-outstanding-by-field',
      number: 7,
      title: 'ঋণস্থিতি অনুযায়ী ফিল্ড-',
      highlight: 'মোট ফিল্ড-৪৭৩ জন',
      tag: 'ফিল্ড অফিসার ঋণস্থিতি',
      items: [
        '১ কোটির নীচে ১৮ জন,',
        '১ কোটি হতে ১.২৫ কোটি ৭১ জন,',
        '১.২৫ কোটি হতে ১.৫ কোটি ১৫৪ জন,',
        '১.৫ কোটির উর্ধ্বে-২৩০ জন,',
        'মোট ফিল্ড-৪৭৩ জন',
      ],
      accentColor: 'cyan',
      positionAngle: 290,
      category: 'মানবসম্পদ ও ঋণ',
      notes: '২৩০ জন ফিল্ড ১.৫ কোটির উর্ধ্বে ঋণস্থিতি পরিচালনা করছেন',
    },
    {
      id: 'node-outstanding-averages',
      number: 8,
      title: 'ঋণস্থিতি-',
      highlight: 'গড় বিতরণ ও স্থিতি',
      tag: 'শাখা ও ফিল্ড অনুপাত',
      items: [
        'শাখা প্রতি ৮.১৩ কোটি',
        'ফিল্ড প্রতি ১.৫ কোটি',
      ],
      accentColor: 'violet',
      positionAngle: 326,
      category: 'গড় কার্যকারিতা',
      notes: 'শাখা প্রতি ৮.১৩ কোটি এবং ফিল্ড প্রতি ১.৫ কোটি টাকা',
    },
    {
      id: 'node-total-outstanding',
      number: 9,
      title: 'ঋণস্থিতি',
      highlight: '৬৮৮.৭ কোটি',
      tag: 'মোট ঋণস্থিতি পোর্টফোলিও',
      items: [
        'অগ্রসর ৬১.২১%,',
        'ক্ষুদ্র ৩৮.৭৯%',
      ],
      accentColor: 'purple',
      positionAngle: 356,
      category: 'পোর্টফোলিও আকার',
      notes: 'অগ্রসর ৬১.২১% ও ক্ষুদ্র ৩৮.৭৯%',
    },
  ],
  signatures: {
    preparedBy: 'মো. রফিকুল ইসলাম',
    preparedByDesignation: 'ডাটা এনালিস্ট / এমআইএস কর্মকর্তা',
    assistantDirector: 'মো. মাহাবুবুর রহমান',
    assistantDirectorDesignation: 'সহকারী পরিচালক (সহ-পরিচালক)',
    deputyDirector: 'মো. এনামুল হক',
    deputyDirectorDesignation: 'উপ-পরিচালক',
    director: 'মোঃ খোরশেদ আলম',
    directorDesignation: 'পরিচালক (অপারেশনস)',
    footerNote: 'উক্ত অগ্রগতি রিপোর্টটি স্ব স্ব শাখা, জোন ও বিভাগের রেজিস্টার এবং অনলাইন কোর-ব্যাংকিং ডাটাবেজ অনুসারে সংকলিত।',
    handwrittenMarginNote: 'বকেয়া হার - ২৭৩ - ১.০৮ / ৬২১ - ১.০৭ | শতভাগ শাখা পরিদর্শন ও নিরীক্ষা সম্পন্ন।',
  },
};

export const SAMPLE_MONTHS_PRESETS: DiagramReportData[] = [
  INITIAL_DIAGRAM_DATA,
  {
    ...INITIAL_DIAGRAM_DATA,
    id: 'report-february-2025',
    title: 'অপারেশনাল অগ্রগতি রিপোর্ট (ফেব্রুয়ারি)',
    month: 'ফেব্রুয়ারি',
    year: '২০২৫',
    lastUpdated: '২০২৫-০২-২৮',
    badge: {
      ...INITIAL_DIAGRAM_DATA.badge,
      month: 'ফেব্রুয়ারি',
      date: '২৮ ফেব্রুয়ারি ২০২৫',
      reportNo: 'OP-05/REP/2025-02',
    },
    nodes: INITIAL_DIAGRAM_DATA.nodes.map(node => {
      if (node.id === 'node-otr') {
        return {
          ...node,
          highlight: '৯৫.৮৮%',
          items: [
            'অগ্রসর- ৯৬.১০%, ক্ষুদ্র ৯৫.২০%',
            '৯০ নিচে OTR শাখা ৩ টি',
            '৯০ থেকে ৯৫ OTR শাখা ১৮টি',
            '৯৫ তদুর্ধ্ব OTR শাখা ৬২টি',
          ],
        };
      }
      if (node.id === 'node-total-outstanding') {
        return {
          ...node,
          highlight: '৬৭২.৫ কোটি',
          items: ['অগ্রসর ৬০.৮০%,', 'ক্ষুদ্র ৩৯.২০%'],
        };
      }
      if (node.id === 'node-par') {
        return {
          ...node,
          highlight: '১১.৮৫%',
        };
      }
      return node;
    }),
  },
  {
    ...INITIAL_DIAGRAM_DATA,
    id: 'report-january-2025',
    title: 'অপারেশনাল অগ্রগতি রিপোর্ট (জানুয়ারি)',
    month: 'জানুয়ারি',
    year: '২০২৫',
    lastUpdated: '২০২৫-০১-৩১',
    badge: {
      ...INITIAL_DIAGRAM_DATA.badge,
      month: 'জানুয়ারি',
      date: '৩১ জানুয়ারি ২০২৫',
      reportNo: 'OP-05/REP/2025-01',
    },
    nodes: INITIAL_DIAGRAM_DATA.nodes.map(node => {
      if (node.id === 'node-total-outstanding') {
        return {
          ...node,
          highlight: '৬৫৯.২ কোটি',
          items: ['অগ্রসর ৬০.১৫%,', 'ক্ষুদ্র ৩৯.৮৫%'],
        };
      }
      return node;
    }),
  },
];
