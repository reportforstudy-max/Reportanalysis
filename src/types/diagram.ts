export interface DiagramNode {
  id: string;
  number: number;
  title: string;
  highlight?: string;
  tag?: string;
  items: string[];
  accentColor: 'rose' | 'amber' | 'emerald' | 'blue' | 'indigo' | 'teal' | 'cyan' | 'violet' | 'purple';
  positionAngle: number; // Angle in degrees for radial placement (0-360)
  radialDistance?: number; // Distance multiplier from center
  category?: string;
  notes?: string;
}

export interface CenterHub {
  title: string;
  subtitle: string;
  code: string;
  managerName?: string;
}

export interface HeaderBadge {
  title: string;
  subtitle: string;
  badgeText: string;
  organization: string;
  department: string;
  month: string;
  year: string;
  date: string;
  reportNo: string;
}

export interface SignaturesData {
  preparedBy: string;
  preparedByDesignation: string;
  assistantDirector: string;
  assistantDirectorDesignation: string;
  deputyDirector: string;
  deputyDirectorDesignation: string;
  director: string;
  directorDesignation: string;
  footerNote: string;
  handwrittenMarginNote: string;
}

export interface DiagramReportData {
  id: string;
  title: string;
  month: string;
  year: string;
  lastUpdated: string;
  center: CenterHub;
  badge: HeaderBadge;
  nodes: DiagramNode[];
  signatures: SignaturesData;
}

export type ThemeMode = 'white-paper' | 'executive-royal' | 'emerald-finance' | 'classic-blueprint' | 'dark-slate';

export type ViewMode = 'diagram' | 'grid' | 'table' | 'print-preview';
