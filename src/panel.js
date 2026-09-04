import { Input, SelectList, truncateToWidth, wrapTextWithAnsi } from '@earendil-works/pi-tui';
import { cleanQuery, commandInfo, locales, searchCommands } from './catalog.js';

export class HelpPanel {
  constructor({ theme, keybindings, requestRender, rows, done, language, query, available }) {
    this.theme = theme;
    this.keybindings = keybindings;
    this.requestRender = requestRender;
    this.rows = rows;
    this.done = done;
    this.language = language;
    this.available = available;
    this.detailId = null;
    this.scroll = 0;
    this.maxScroll = 0;
    this.visibleCount = 6;
    this.closed = false;
    this._focused = false;
    this.createSearch(query);
    this.refreshList();
  }

  get locale() { return locales[this.language]; }
  get focused() { return this._focused; }
  set focused(value) {
    this._focused = value;
    this.input.focused = value && !this.detailId;
  }

  createSearch(query) {
    this.input = new Input({ prompt: this.locale.search, placeholder: this.locale.placeholder });
    this.input.setValue(cleanQuery(query));
    this.input.focused = this._focused && !this.detailId;
  }

  refreshList() {
    const selectedId = this.list?.getSelectedItem()?.value;
    const matches = searchCommands(this.input.getValue(), this.language);
    const items = matches.map(({ id, label }) => ({ value: id, label: id, description: label }));
    this.items = items;
    this.list = new SelectList(items, this.visibleCount, {
      selectedPrefix: (text) => this.theme.fg('accent', text),
      selectedText: (text) => this.theme.fg('accent', text),
      description: (text) => this.theme.fg('muted', text),
      scrollInfo: (text) => this.theme.fg('dim', text),
      noMatch: () => this.locale.noResults,
    });
    const index = items.findIndex((item) => item.value === selectedId);
    if (index >= 0) this.list.setSelectedIndex(index);
    this.list.onSelect = (item) => {
      this.detailId = item.value;
      this.scroll = 0;
      this.input.focused = false;
    };
  }

  close(result = null) {
    if (this.closed) return;
    this.closed = true;
    this.done(result);
  }

  matches(data, action) {
    return this.keybindings.matches(data, action);
  }

  moveSelection(delta) {
    if (!this.items.length) return;
    const index = this.items.findIndex((item) => item.value === this.list.getSelectedItem()?.value);
    this.list.setSelectedIndex((index + delta + this.items.length) % this.items.length);
  }

  keyHints() {
    const actions = {
      up: 'tui.select.up', down: 'tui.select.down', enter: 'tui.select.confirm',
      tab: 'tui.input.tab', escape: 'tui.select.cancel', left: 'tui.editor.cursorLeft',
    };
    const text = this.detailId ? this.locale.detailKeys : this.locale.listKeys;
    return text.replace(/\{(\w+)\}/g, (_match, name) => this.keybindings.getKeys(actions[name]).join('/') || '—');
  }

  handleInput(data) {
    if (this.closed) return;
    if (this.matches(data, 'tui.select.cancel')) {
      this.close();
      return;
    }
    if (this.matches(data, 'tui.input.tab')) {
      this.language = this.language === 'es' ? 'en' : 'es';
      this.createSearch(this.input.getValue());
      this.refreshList();
      this.scroll = 0;
    } else if (this.detailId) {
      if (this.matches(data, 'tui.editor.cursorLeft') || this.matches(data, 'tui.editor.deleteCharBackward')) {
        this.detailId = null;
        this.input.focused = this._focused;
      } else if (this.matches(data, 'tui.select.confirm')) {
        if (this.available) this.close({ id: this.detailId, language: this.language });
      } else if (this.matches(data, 'tui.select.up')) {
        this.scroll = Math.max(0, this.scroll - 1);
      } else if (this.matches(data, 'tui.select.down')) {
        this.scroll = Math.min(this.maxScroll, this.scroll + 1);
      } else if (this.matches(data, 'tui.select.pageDown')) {
        this.scroll = Math.min(this.maxScroll, this.scroll + 8);
      } else if (this.matches(data, 'tui.select.pageUp')) {
        this.scroll = Math.max(0, this.scroll - 8);
      }
    } else if (this.matches(data, 'tui.select.up')) {
      this.moveSelection(-1);
    } else if (this.matches(data, 'tui.select.down')) {
      this.moveSelection(1);
    } else if (this.matches(data, 'tui.select.confirm')) {
      const item = this.list.getSelectedItem();
      if (item) this.list.onSelect(item);
    } else {
      this.input.handleInput(data);
      const clean = cleanQuery(this.input.getValue());
      if (clean !== this.input.getValue()) this.input.setValue(clean);
      this.refreshList();
    }
    this.requestRender();
  }

  render(width) {
    const rows = Math.max(0, this.rows());
    if (width < 1 || rows < 1) return [];
    if (rows < 8) return [truncateToWidth(this.locale.resize, width)];
    const limit = Math.min(28, rows - 3);
    const inner = Math.max(1, width - 2);
    const frame = this.theme.fg('border', '─'.repeat(Math.max(0, width)));
    const header = this.theme.fg('accent', this.theme.bold(this.locale.title));
    const status = this.theme.fg(this.available ? 'muted' : 'warning', this.available ? this.locale.available : this.locale.unavailable);
    const footer = wrapTextWithAnsi(this.keyHints(), inner).map((line) => this.theme.fg('dim', line));
    const extraFooterRows = footer.length - 1;
    let content;
    if (this.detailId) {
      const item = commandInfo(this.detailId, this.language);
      const sections = [
        `${item.id} — ${item.label}`,
        '', this.locale.when, item.when,
        '', this.locale.avoid, item.avoid,
        '', this.locale.effect, item.effect,
        '', this.locale.example, `/skill:impeccable ${item.id} ${item.example}`,
        '', this.locale.natural, `${this.locale.naturalPrefix}${item.label.toLowerCase()}.`,
        '', this.locale.scope, this.locale.safety,
      ];
      const body = sections.flatMap((line) => wrapTextWithAnsi(line, inner));
      const bodyHeight = Math.max(1, limit - 6 - extraFooterRows);
      this.maxScroll = Math.max(0, body.length - bodyHeight);
      this.scroll = Math.min(this.scroll, this.maxScroll);
      content = body.slice(this.scroll, this.scroll + bodyHeight);
      const position = `${this.scroll + 1}–${Math.min(body.length, this.scroll + bodyHeight)}/${body.length}`;
      content.push(this.theme.fg('dim', position));
    } else {
      const count = Math.max(1, Math.min(8, limit - 9 - extraFooterRows));
      if (count !== this.visibleCount) {
        this.visibleCount = count;
        this.refreshList();
      }
      content = [
        ...this.input.render(inner),
        '',
        ...this.list.render(inner),
        '',
        this.theme.fg('dim', this.locale.baseline),
      ];
    }
    const body = content.slice(0, Math.max(0, limit - 4 - footer.length));
    const lines = [frame, header, status, ...body, ...footer, frame].slice(0, limit);
    return lines.map((line) => truncateToWidth(line, Math.max(1, width)));
  }

  invalidate() {
    this.input.invalidate();
    this.list.invalidate();
  }
}
