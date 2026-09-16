import { isLang, DEFAULT_LANG } from '$lib/i18n';
import type { ParamMatcher } from '@sveltejs/kit';

// Only the non-default language is a URL segment; the default lives at the root.
export const match: ParamMatcher = (param) => isLang(param) && param !== DEFAULT_LANG;
