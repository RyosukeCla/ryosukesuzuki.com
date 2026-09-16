import type { Lang } from '$lib/i18n';

declare global {
	namespace App {
		interface PageData {
			lang: Lang;
			/** Languages the current page exists in; drives hreflang. */
			availableLangs?: Lang[];
		}
	}
}

export {};
