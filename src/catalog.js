import { stripTerminalSequences } from '@earendil-works/pi-tui';
import { en } from './locales/en.js';
import { es } from './locales/es.js';

export const locales = { es, en };
export const commandIds = Object.freeze(Object.keys(en.commands));
const effects = {
  critique: 'review', audit: 'review', shape: 'plan', init: 'docs',
  document: 'docs', extract: 'refactor', live: 'live', craft: 'alias',
};

export function commandInfo(id, language) {
  const locale = locales[language];
  if (!Object.hasOwn(locale.commands, id)) return undefined;
  return { id, ...locale.commands[id], effect: locale.effects[effects[id] ?? 'edit'] };
}

export function cleanQuery(value) {
  return [...stripTerminalSequences(value)].filter((character) => {
    const code = character.codePointAt(0);
    return code >= 32 && (code < 127 || code > 159);
  }).slice(0, 180).join('');
}

function normalized(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

export function searchCommands(query, language) {
  const terms = normalized(cleanQuery(query)).split(/\s+/).filter(Boolean);
  return commandIds.map((id) => commandInfo(id, language)).filter((item) => {
    const text = normalized(`${item.id} ${item.label} ${item.when}`);
    return terms.every((term) => text.includes(term));
  });
}

export function prepareCommand(id, language) {
  const item = commandInfo(id, language);
  return item ? `/skill:impeccable ${id} ${item.example}` : undefined;
}

export function parseHelpArgs(args) {
  const language = /^--en(?:\s|$)/.test(args.trim()) ? 'en' : 'es';
  return { language, query: cleanQuery(args.trim().replace(/^--(?:en|es)(?:\s+|$)/, '')) };
}
