import { useMemo } from 'react';
import i18n from '@/i18n';

interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // rate vs USD
  locale: string;
}

const currencyByLang: Record<string, CurrencyConfig> = {
  es: { code: 'USD', symbol: '$', rate: 1,      locale: 'en-US' },
  en: { code: 'USD', symbol: '$', rate: 1,      locale: 'en-US' },
  de: { code: 'EUR', symbol: '€', rate: 0.92,   locale: 'de-DE' },
  cs: { code: 'CZK', symbol: 'Kč', rate: 23.5,  locale: 'cs-CZ' },
};

export function useCurrency() {
  const lang = i18n.language?.slice(0, 2) || 'en';
  const config = currencyByLang[lang] || currencyByLang['en'];

  const format = useMemo(() => (usdPrice: number): string => {
    const converted = usdPrice * config.rate;
    if (config.code === 'CZK') {
      return `${Math.round(converted).toLocaleString(config.locale)} ${config.symbol}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  }, [config]);

  return { format, config };
}
