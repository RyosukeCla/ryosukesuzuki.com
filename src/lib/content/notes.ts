import type { Component } from 'svelte';
import { LANGS, type Lang } from '$lib/i18n';

// Notes are not a feed. A note lives at src/content/<lang>/<section>/<file>.md (folder =
// section) or src/content/<lang>/<file>.md (top level), is updated in place, and carries the
// date of its last meaningful edit. The same path in two languages is the same note. Files
// carry a leading `NNN-` number to keep them ordered on disk: `001-genre.md` -> slug `genre`,
// order 1. A file whose slug is `index` is the section's own page and lives at /<section>.
// Lists sort by that number (or `order` in the frontmatter), then by title; never by date.

export interface NoteMeta {
	title: string;
	description: string;
	/** ISO date of the last meaningful edit, shown as "Updated". */
	updated: string;
	/** Position within its section. Defaults to the file's `NN-` prefix; without either, sorts after, by title. */
	order?: number;
	/** Drafts are visible in dev but excluded from production builds. */
	draft?: boolean;
	tags?: string[];
}

export interface Note extends NoteMeta {
	lang: Lang;
	/** URL path without the leading slash or language: `pay-attention-please/promise`; a section's index is just `pay-attention-please`. */
	path: string;
	/** True for the `index` note of a section: its landing page. */
	isIndex: boolean;
	/** Folder name, or '' for a top-level page. */
	section: string;
	slug: string;
}

/** Sections in the order the index shows them; titles come from i18n messages. */
export const SECTION_ORDER = ['pay-attention-please'];

interface NoteModule {
	metadata: NoteMeta;
	default: Component;
}

const modules = import.meta.glob<NoteModule>('/src/content/*/**/*.md', { eager: true });

function parsePath(modulePath: string): {
	lang: Lang;
	section: string;
	slug: string;
	path: string;
	isIndex: boolean;
	fileOrder?: number;
} {
	const rel = modulePath.replace(/^\/src\/content\//, '').replace(/\.md$/, '');
	const parts = rel.split('/');
	const lang = parts.shift() as Lang;
	const file = parts.pop()!;
	const m = /^(\d+)-(.+)$/.exec(file);
	const slug = m ? m[2] : file;
	const fileOrder = m ? Number(m[1]) : undefined;
	const section = parts.join('/');
	const isIndex = slug === 'index' && section !== '';
	return { lang, section, slug, path: isIndex ? section : [...parts, slug].join('/'), isIndex, fileOrder };
}

function toNote(modulePath: string, mod: NoteModule): Note {
	const { fileOrder, ...parsed } = parsePath(modulePath);
	return { ...mod.metadata, order: mod.metadata.order ?? fileOrder, ...parsed };
}

function isPublished(meta: NoteMeta): boolean {
	return !meta.draft || import.meta.env.DEV;
}

function byOrderThenTitle(a: Note, b: Note): number {
	const ao = a.order ?? Number.POSITIVE_INFINITY;
	const bo = b.order ?? Number.POSITIVE_INFINITY;
	return ao !== bo ? ao - bo : a.title.localeCompare(b.title);
}

/** Every published note in a language, unsorted. */
export function allNotes(lang: Lang): Note[] {
	return Object.entries(modules)
		.filter(([modulePath, mod]) => parsePath(modulePath).lang === lang && isPublished(mod.metadata))
		.map(([modulePath, mod]) => toNote(modulePath, mod));
}

/** Top-level pages in a language, sorted. */
export function topLevelNotes(lang: Lang): Note[] {
	return allNotes(lang)
		.filter((n) => n.section === '')
		.sort(byOrderThenTitle);
}

/** Sections with their landing note (if any) and their notes, in SECTION_ORDER, then unlisted folders alphabetically. */
export function sections(lang: Lang): { id: string; index?: Note; notes: Note[] }[] {
	const notes = allNotes(lang).filter((n) => n.section !== '');
	const ids = [...new Set(notes.map((n) => n.section))];
	const ordered = [
		...SECTION_ORDER.filter((id) => ids.includes(id)),
		...ids.filter((id) => !SECTION_ORDER.includes(id)).sort()
	];
	return ordered.map((id) => ({
		id,
		index: notes.find((n) => n.section === id && n.isIndex),
		notes: notes.filter((n) => n.section === id && !n.isIndex).sort(byOrderThenTitle)
	}));
}

/** A single published note with its rendered content component. */
export function getNote(
	lang: Lang,
	path: string
): { meta: NoteMeta; note: Note; content: Component } | undefined {
	const entry = Object.entries(modules).find(([modulePath]) => {
		const parsed = parsePath(modulePath);
		return parsed.lang === lang && parsed.path === path;
	});
	if (!entry) return undefined;
	const [modulePath, mod] = entry;
	if (!isPublished(mod.metadata)) return undefined;
	return { meta: mod.metadata, note: toNote(modulePath, mod), content: mod.default };
}

/** Languages a note exists in, for hreflang and the language switch. */
export function noteLangs(path: string): Lang[] {
	return LANGS.filter((lang) => getNote(lang, path) !== undefined);
}

/** The most recent `updated` across a language's notes, for the sitemap. */
export function lastUpdated(lang: Lang): string | undefined {
	return allNotes(lang)
		.map((n) => n.updated)
		.sort()
		.pop();
}
