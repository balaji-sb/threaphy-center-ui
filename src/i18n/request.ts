import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/services/locale";

// Can be imported from a shared config

export default getRequestConfig(async () => {
  // Read the locale from the cookie (or default)
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
