export interface TajweedRule {
  name: string;
  arabicName: string;
  color: string;
  description: string;
  example?: string;
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    name: 'Ghunnah',
    arabicName: 'غُنَّة',
    color: '#FF7C39',
    description: 'Nasalization of noon or meem when they have shaddah',
    example: 'ثُمَّ'
  },
  {
    name: 'Idgham',
    arabicName: 'إدغام',
    color: '#169777',
    description: 'Merging of noon sakinah or tanween into following letter',
    example: 'مِن رَّبِّهِمْ'
  },
  {
    name: 'Ikhfa',
    arabicName: 'إخفاء',
    color: '#A77B4D',
    description: 'Hidden pronunciation of noon sakinah or tanween',
    example: 'مِن قَبْلِ'
  },
  {
    name: 'Iqlab',
    arabicName: 'إقلاب',
    color: '#26BFAE',
    description: 'Converting noon sakinah or tanween to meem',
    example: 'مِنۢ بَعْدِ'
  },
  {
    name: 'Qalqalah',
    arabicName: 'قلقلة',
    color: '#DD0D0D',
    description: 'Echo-like sound in certain letters',
    example: 'قُلْ'
  },
  {
    name: 'Madd',
    arabicName: 'مَدّ',
    color: '#000EAD',
    description: 'Elongation of certain letters',
    example: 'فِيهِ'
  },
];

export function applyTajweedHighlighting(text: string): string {
  // This is a simplified example. In a real implementation,
  // you would use a more sophisticated algorithm to detect tajweed rules
  let highlightedText = text;
  
  TAJWEED_RULES.forEach(rule => {
    // Add highlighting spans around matching patterns
    if (rule.example) {
      const pattern = new RegExp(rule.example, 'g');
      highlightedText = highlightedText.replace(
        pattern,
        `<span class="tajweed-${rule.name.toLowerCase()}" style="color: ${rule.color}">${rule.example}</span>`
      );
    }
  });

  return highlightedText;
}