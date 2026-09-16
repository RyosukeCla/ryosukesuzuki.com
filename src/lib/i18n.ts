// Two languages. The default one lives at the root; the other under /<lang>/. Flip DEFAULT_LANG
// to move a language to the root; nothing else changes.
export const LANGS = ['ja', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'ja';

export function isLang(value: string | undefined): value is Lang {
	return (LANGS as readonly string[]).includes(value ?? '');
}

export function langFromParam(param: string | undefined): Lang {
	return isLang(param) ? param : DEFAULT_LANG;
}

/** `/pay-attention-please/x` for the default language, `/en/pay-attention-please/x` for the other. */
export function localizePath(path: string, lang: Lang): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (lang === DEFAULT_LANG) return clean;
	return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

/** Strip a leading language segment so the same page can be addressed in every language. */
export function delocalizePath(pathname: string): string {
	for (const lang of LANGS) {
		if (lang === DEFAULT_LANG) continue;
		if (pathname === `/${lang}`) return '/';
		if (pathname.startsWith(`/${lang}/`)) return pathname.slice(lang.length + 1);
	}
	return pathname;
}

export const messages = {
	ja: {
		siteName: 'Ryosuke Suzuki',
		description: 'Ryosuke Suzuki, a tech entrepreneur in Tokyo.',
		greeting: 'こんにちは',
		bio: '鈴木凌介です',
		belongings: [
			{ text: 'Unbounded Pioneering を創業', href: 'https://u17g.com' },
			{ text: 'Snip0 を作っています。スマホの動画編集アプリ', href: 'https://snip0.com' },
			{ text: '元 Plaid, Inc. のソフトウェアエンジニア', href: 'https://plaid.co.jp' }
		],
		notes: 'ノート',
		pages: 'ページ',
		updated: '更新',
		otherLang: 'English',
		sections: {
			'pay-attention-please': {
				title: 'Pay Attention Please',
				intro: '人はなぜ見続けるのか'
			}
		} as Record<string, { title: string; intro: string }>
	},
	en: {
		siteName: 'Ryosuke Suzuki',
		description: 'Ryosuke Suzuki, a tech entrepreneur in Tokyo.',
		greeting: 'Hi',
		bio: 'I am Ryosuke Suzuki, a tech entrepreneur in Tokyo.',
		belongings: [
			{ text: 'Founder of Unbounded Pioneering', href: 'https://u17g.com' },
			{ text: 'Building Snip0, a video editor for the phone', href: 'https://snip0.com' },
			{ text: 'Ex-Software Engineer at Plaid, Inc.', href: 'https://plaid.co.jp' }
		],
		notes: 'Notes',
		pages: 'Pages',
		updated: 'Updated',
		otherLang: '日本語',
		sections: {
			'pay-attention-please': {
				title: 'Pay Attention Please',
				intro: 'An anatomy of attention, and why people stay.'
			}
		} as Record<string, { title: string; intro: string }>
	}
} satisfies Record<Lang, unknown>;

export function dateFormatter(lang: Lang, dateStyle: 'medium' | 'long' = 'medium'): Intl.DateTimeFormat {
	return new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'en-US', { dateStyle });
}
