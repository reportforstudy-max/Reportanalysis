// Bengali Numeral and Formatting Utilities

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function toBengaliNumber(num: number | string): string {
  if (num === undefined || num === null) return '';
  const str = String(num);
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function toEnglishNumber(str: string): string {
  if (!str) return '';
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.split(BENGALI_DIGITS[i]).join(ENGLISH_DIGITS[i]);
  }
  return result;
}

export function formatBengaliCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(toEnglishNumber(amount).replace(/[^0-9.]/g, '')) : amount;
  if (isNaN(num)) return String(amount);
  
  // Format as Bangladeshi Crore / Lakh if large
  if (num >= 10000000) {
    const crore = (num / 10000000).toFixed(2);
    return `${toBengaliNumber(crore)} কোটি টাকা`;
  } else if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2);
    return `${toBengaliNumber(lakh)} লক্ষ টাকা`;
  }
  return `${toBengaliNumber(num.toLocaleString('en-IN'))} টাকা`;
}

export const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

export const BENGALI_YEARS = [
  '২০২৩',
  '২০২৪',
  '২০২৫',
  '২০২৬',
  '২০২৭',
  '২০২৮',
  '২০২৯',
  '২০৩০',
];
