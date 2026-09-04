import assert from 'node:assert/strict';
import test from 'node:test';
import { KeybindingsManager, matchesKey, setKeybindings, TUI_KEYBINDINGS, visibleWidth } from '@earendil-works/pi-tui';
import impeccableHelp from '../src/index.js';
import { HelpPanel } from '../src/panel.js';
import { cleanQuery, commandIds, locales, parseHelpArgs, prepareCommand, searchCommands } from '../src/catalog.js';

const theme = { fg: (_color, text) => text, bold: (text) => text };
const keybindings = new KeybindingsManager(TUI_KEYBINDINGS);
function panel(options = {}) {
  const results = [];
  const component = new HelpPanel({
    theme, keybindings, requestRender() {}, rows: () => 30,
    done: (value) => results.push(value), language: 'es', query: '', available: true,
    ...options,
  });
  return { component, results };
}

function harness({ mode = 'tui', draft = '', confirm = true, available = true, selection = { id: 'critique', language: 'es' }, changeDraft, removeSkill = false, removeDuringConfirm = false } = {}) {
  let registered;
  let skill = available;
  let editor = draft;
  const writes = [];
  const notices = [];
  let shown = 0;
  let confirmations = 0;
  let renderRequests = 0;
  const pi = new Proxy({
    registerCommand(name, command) { assert.equal(name, 'impeccable-help'); registered = command; },
    getCommands() { return skill ? [{ name: 'skill:impeccable', source: 'skill' }] : []; },
  }, { get(target, key) { assert.ok(key in target, `Unexpected Pi API: ${String(key)}`); return target[key]; } });
  impeccableHelp(pi);
  const ctx = {
    mode, hasUI: mode === 'tui' || mode === 'rpc',
    ui: {
      async custom(factory) {
        shown++;
        const component = factory({ terminal: { rows: 30 }, requestRender() { renderRequests++; } }, theme, keybindings, () => {});
        assert.ok(component instanceof HelpPanel);
        if (removeSkill) skill = false;
        return selection;
      },
      getEditorText: () => editor,
      setEditorText(value) { writes.push(value); editor = value; },
      async confirm() { confirmations++; if (removeDuringConfirm) skill = false; if (changeDraft !== undefined) editor = changeDraft; return confirm; },
      notify(text) { notices.push(text); },
    },
  };
  return { command: registered, ctx, writes, notices, editor: () => editor, shown: () => shown, confirmations: () => confirmations, renderRequests: () => renderRequests };
}

test('catalog has 23 distinct, localized commands and safe examples', () => {
  assert.equal(commandIds.length, 23);
  assert.deepEqual(Object.keys(locales.es).sort(), Object.keys(locales.en).sort());
  assert.deepEqual(Object.keys(locales.es.commands).sort(), Object.keys(locales.en.commands).sort());
  for (const language of ['es', 'en']) {
    for (const id of commandIds) {
      assert.match(id, /^[a-z]+$/);
      assert.deepEqual(Object.keys(locales[language].commands[id]).sort(), ['avoid', 'example', 'label', 'when']);
      assert.ok(Object.values(locales[language].commands[id]).every((value) => value.length > 5));
      assert.ok(prepareCommand(id, language).startsWith(`/skill:impeccable ${id} `));
      assert.doesNotMatch(prepareCommand(id, language), /[\r\n\x1b]/);
    }
  }
  assert.equal(prepareCommand('unknown', 'en'), undefined);
  assert.equal(prepareCommand('__proto__', 'en'), undefined);
});

test('search accepts commands, Spanish intent, accents and language arguments', () => {
  assert.equal(searchCommands('critique', 'es')[0].id, 'critique');
  assert.ok(searchCommands('tipografia', 'es').some((item) => item.id === 'typeset'));
  assert.equal(searchCommands('zzzz', 'en').length, 0);
  assert.deepEqual(parseHelpArgs('--en audit'), { language: 'en', query: 'audit' });
  assert.deepEqual(parseHelpArgs('--es'), { language: 'es', query: '' });
  assert.ok(cleanQuery('a'.repeat(1000)).length <= 180);
  assert.equal(cleanQuery('\x1b[31mcritique\x1b[0m\x00'), 'critique');
});

test('real components search, navigate, show details and only return a selection', () => {
  const { component, results } = panel();
  component.focused = true;
  assert.equal(component.input.focused, true);
  component.handleInput('audit');
  assert.equal(component.list.getSelectedItem().value, 'audit');
  component.handleInput('\r');
  assert.equal(component.detailId, 'audit');
  assert.equal(component.input.focused, false);
  component.render(80);
  assert.ok(component.maxScroll > 0);
  component.handleInput('\x1b[B');
  assert.equal(component.scroll, 1);
  component.handleInput('\x1b[D');
  assert.equal(component.detailId, null);
  assert.equal(component.input.focused, true);
  component.handleInput('\r');
  component.handleInput('\r');
  assert.deepEqual(results, [{ id: 'audit', language: 'es' }]);
  component.handleInput('\r');
  assert.equal(results.length, 1);
});

test('Escape closes from either view without preparing; missing skill disables prepare', () => {
  for (const detail of [false, true]) {
    const { component, results } = panel();
    if (detail) component.handleInput('\r');
    component.handleInput('\x1b');
    assert.deepEqual(results, [null]);
  }
  const { component, results } = panel({ available: false });
  component.handleInput('\r');
  component.handleInput('\r');
  assert.deepEqual(results, []);
  assert.ok(component.render(100).join('\n').includes(locales.es.unavailable));
});

test('language switch, empty search and renderer stay bounded across sizes', () => {
  for (const width of [20, 40, 80, 120]) {
    for (const height of [10, 16, 24, 50]) {
      const { component } = panel({ rows: () => height });
      for (const key of ['', '\t', '\r', '\x1b[B', '\x1b[D', 'zzzzz']) {
        if (key) component.handleInput(key);
        const lines = component.render(width);
        assert.ok(lines.length <= Math.max(4, Math.min(28, height - 3)));
        assert.ok(lines.every((line) => visibleWidth(line) <= width), `${width}x${height}`);
        component.invalidate();
      }
    }
  }
  assert.ok(matchesKey('\x1b[6~', 'pageDown'));
});

test('command prepares editor without message, tools, model or session APIs', async () => {
  const h = harness();
  await h.command.handler('', h.ctx);
  assert.equal(h.shown(), 1);
  assert.equal(h.writes.length, 1);
  assert.equal(h.confirmations(), 0);
  assert.equal(h.editor(), prepareCommand('critique', 'es'));
  assert.equal(h.renderRequests(), 1);
});

test('cancellation and refused overwrite preserve the draft exactly', async () => {
  for (const options of [{ selection: null }, { confirm: false }]) {
    const h = harness({ draft: 'Existing\nunfinished draft', ...options });
    await h.command.handler('', h.ctx);
    assert.equal(h.editor(), 'Existing\nunfinished draft');
    assert.deepEqual(h.writes, []);
  }
});

test('confirmed overwrite prepares command, concurrent draft change cancels', async () => {
  const accepted = harness({ draft: 'Old draft' });
  await accepted.command.handler('', accepted.ctx);
  assert.equal(accepted.confirmations(), 1);
  assert.equal(accepted.editor(), prepareCommand('critique', 'es'));
  const changed = harness({ draft: 'Old draft', changeDraft: 'New draft' });
  await changed.command.handler('', changed.ctx);
  assert.equal(changed.editor(), 'New draft');
  assert.deepEqual(changed.writes, []);
  assert.equal(changed.notices.length, 1);
});

test('non-TUI modes, unloaded skill and invalid selection never prepare', async () => {
  for (const mode of ['rpc', 'json', 'print']) {
    const h = harness({ mode });
    await h.command.handler('', h.ctx);
    assert.equal(h.shown(), 0);
    assert.deepEqual(h.writes, []);
  }
  for (const options of [{ available: false }, { removeSkill: true }, { selection: { id: 'constructor', language: 'es' } }]) {
    const h = harness(options);
    await h.command.handler('', h.ctx);
    assert.deepEqual(h.writes, []);
  }
});


test('skill disappearance during confirmation preserves the old draft', async () => {
  const h = harness({ draft: 'Keep me', removeDuringConfirm: true });
  await h.command.handler('', h.ctx);
  assert.equal(h.editor(), 'Keep me');
  assert.deepEqual(h.writes, []);
});

test('configured navigation works without translating events to default keys', () => {
  const custom = new KeybindingsManager(TUI_KEYBINDINGS, {
    'tui.select.down': 'ctrl+n',
    'tui.input.tab': 'ctrl+t',
    'tui.select.pageDown': 'ctrl+p',
  });
  setKeybindings(custom);
  try {
    const { component } = panel({ keybindings: custom });
    component.handleInput('\x0e');
    assert.equal(component.list.getSelectedItem().value, 'audit');
    component.handleInput('\x14');
    assert.equal(component.language, 'en');
    component.handleInput('\r');
    component.render(60);
    component.handleInput('\x10');
    assert.ok(component.scroll > 0);
  } finally {
    setKeybindings(keybindings);
  }
});

test('extremely small terminal dimensions never overflow', () => {
  for (let rows = 0; rows < 8; rows++) {
    const { component } = panel({ rows: () => rows });
    for (const width of [0, 1, 20]) {
      const lines = component.render(width);
      assert.ok(lines.length <= rows);
      assert.ok(lines.every((line) => visibleWidth(line) <= width));
    }
  }
});
