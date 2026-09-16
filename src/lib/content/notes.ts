import type { Component } from 'svelte';

// Notes are not a feed. A note lives at src/content/<section>/<slug>.md (folder = section) or
// src/content/<slug>.md (top level), is updated in place, and carries the date of its last
// meaningful edit. Lists sort by `order` when set, then by title; never by date.

export interface NoteMeta {
	title: string;
	description: string;
	/** ISO date of the last meaningful edit, shown as "Updated". */
	updated: string;
	/** Position within its section. Notes without one sort after those with, by title. */
	order?: number;
	/** Drafts are visible in dev but excluded from production builds. */
	draft?: boolean;
	tags?: string[];
}

export interface Note extends NoteMeta {
	/** URL path without the leading slash: `genres/short-form-creators` or `log`. */
	path: string;
	/** Folder name, or '' for a top-level page. */
	section: string;
	slug: string;
}

/** Sections in the order the index shows them. A folder not listed here still renders, after these. */
export const SECTIONS: { id: string; title: string; intro: string }[] = [
	{
		id: 'genres',
		title: 'Genres',
		intro: 'One page per genre: its topic, needs, formats, conventions, figures and trends. Each page keeps growing.'
	}
];

interface NoteModule {
	metadata: NoteMeta;
	default: Component;
}

const modules = import.meta.glob<NoteModule>('/src/content/**/*.md', { eager: true });

function parsePath(modulePath: string): { section: string; slug: string; path: string } {
	const rel = modulePath.replace(/^\/src\/content\//, '').replace(/\.md$/, '');
	const parts = rel.split('/');
	const slug = parts.pop()!;
	const section = parts.join('/');
	return { section, slug, path: rel };
}

function isPublished(meta: NoteMeta): boolean {
	return !meta.draft || import.meta.env.DEV;
}

function byOrderThenTitle(a: Note, b: Note): number {
	const ao = a.order ?? Number.POSITIVE_INFINITY;
	const bo = b.order ?? Number.POSITIVE_INFINITY;
	return ao !== bo ? ao - bo : a.title.localeCompare(b.title);
}

/** Every published note, unsorted. */
export function allNotes(): Note[] {
	return Object.entries(modules)
		.filter(([, mod]) => isPublished(mod.metadata))
		.map(([modulePath, mod]) => ({ ...mod.metadata, ...parsePath(modulePath) }));
}

/** Top-level pages, sorted. */
export function topLevelNotes(): Note[] {
	return allNotes()
		.filter((n) => n.section === '')
		.sort(byOrderThenTitle);
}

/** Sections with their notes, in SECTIONS order, then any unlisted folders alphabetically. */
export function sections(): { id: string; title: string; intro: string; notes: Note[] }[] {
	const notes = allNotes().filter((n) => n.section !== '');
	const ids = [...new Set(notes.map((n) => n.section))];
	const listed = SECTIONS.filter((s) => ids.includes(s.id));
	const unlisted = ids
		.filter((id) => !SECTIONS.some((s) => s.id === id))
		.sort()
		.map((id) => ({ id, title: id, intro: '' }));
	return [...listed, ...unlisted].map((s) => ({
		...s,
		notes: notes.filter((n) => n.section === s.id).sort(byOrderThenTitle)
	}));
}

/** A single published note with its rendered content component. */
export function getNote(path: string): { meta: NoteMeta; note: Note; content: Component } | undefined {
	const entry = Object.entries(modules).find(([modulePath]) => parsePath(modulePath).path === path);
	if (!entry) return undefined;
	const [modulePath, mod] = entry;
	if (!isPublished(mod.metadata)) return undefined;
	return { meta: mod.metadata, note: { ...mod.metadata, ...parsePath(modulePath) }, content: mod.default };
}

/** The most recent `updated` across all notes, for the sitemap. */
export function lastUpdated(): string | undefined {
	return allNotes()
		.map((n) => n.updated)
		.sort()
		.pop();
}
