import { langFromParam } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => ({ lang: langFromParam(params.lang) });
