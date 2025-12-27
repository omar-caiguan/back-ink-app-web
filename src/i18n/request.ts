import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Resolve locale, fallback to default if missing or unsupported
  const localeFromRequest = await requestLocale;
  const locale =
  typeof localeFromRequest === 'string' && routing.locales.includes(localeFromRequest as any)
    ? (localeFromRequest as any)
    : routing.defaultLocale;

  // Dynamically import the appropriate messages file
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return { locale, messages } as const;
});
