import { commandIds, locales, parseHelpArgs, prepareCommand } from './catalog.js';
import { HelpPanel } from './panel.js';

export function skillAvailable(pi) {
  return pi.getCommands().some((command) => command.source === 'skill' && command.name === 'skill:impeccable');
}

export default function impeccableHelp(pi) {
  pi.registerCommand('impeccable-help', {
    description: locales.es.description,
    getArgumentCompletions(prefix) {
      const { language, query } = parseHelpArgs(prefix);
      const lead = language === 'en' ? '--en ' : '';
      const matches = commandIds.filter((id) => id.startsWith(query.trim().toLowerCase()));
      return matches.length ? matches.map((id) => ({ value: lead + id, label: id, description: locales[language].commands[id].label })) : null;
    },
    async handler(args, ctx) {
      const { language, query } = parseHelpArgs(args);
      if (ctx.mode !== 'tui') {
        if (ctx.hasUI) ctx.ui.notify(locales[language].tuiOnly, 'warning');
        return;
      }
      let requestRender;
      const result = await ctx.ui.custom((tui, theme, keybindings, done) => {
        requestRender = () => tui.requestRender();
        return new HelpPanel({
          theme, keybindings, done, language, query,
          available: skillAvailable(pi),
          rows: () => tui.terminal.rows,
          requestRender,
        });
      });
      if (!result) return;
      const locale = locales[result.language];
      const command = prepareCommand(result.id, result.language);
      if (!command) return;
      if (!skillAvailable(pi)) {
        ctx.ui.notify(locale.missing, 'warning');
        return;
      }
      const draft = ctx.ui.getEditorText();
      if (draft.length && !await ctx.ui.confirm(locale.confirmTitle, locale.confirmBody)) return;
      // Confirmation may yield to another extension; never overwrite its newer draft.
      if (ctx.ui.getEditorText() !== draft) {
        ctx.ui.notify(locale.changed, 'warning');
        return;
      }
      if (!skillAvailable(pi)) {
        ctx.ui.notify(locale.missing, 'warning');
        return;
      }
      ctx.ui.setEditorText(command);
      // Pi restores the editor before this continuation; setEditorText does not repaint it.
      requestRender();
    },
  });
}
