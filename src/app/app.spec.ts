import { FormControl } from '@angular/forms';
import { MENU, filterMenu } from './data/menu';
import { FEATURED } from './pages/home';
import { notInPast, openingHours } from './pages/reserve';

const all = { query: '', category: 'all', vegOnly: false };
const count = (cats: ReturnType<typeof filterMenu>) => cats.reduce((n, c) => n + c.items.length, 0);

describe('filterMenu', () => {
  it('returns the full menu with no filters', () => {
    expect(count(filterMenu(MENU, all))).toBe(MENU.reduce((n, c) => n + c.items.length, 0));
  });

  it('filters by category', () => {
    const out = filterMenu(MENU, { ...all, category: 'karahi' });
    expect(out.map((c) => c.id)).toEqual(['karahi']);
  });

  it('search is case-insensitive and drops empty categories', () => {
    const out = filterMenu(MENU, { ...all, query: '  NAAN ' });
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((c) => c.items.length > 0)).toBe(true);
  });

  it('vegOnly keeps only vegetarian items', () => {
    const out = filterMenu(MENU, { ...all, vegOnly: true });
    expect(out.flatMap((c) => c.items).every((i) => i.veg)).toBe(true);
  });

  it('a search with no matches returns nothing', () => {
    expect(filterMenu(MENU, { ...all, query: 'sushi' })).toEqual([]);
  });
});

describe('menu data', () => {
  it('two-size categories never have price2 without sizes', () => {
    for (const c of MENU) if (!c.sizes) expect(c.items.some((i) => i.price2)).toBe(false);
  });
  it('every home-page featured dish exists in the menu', () => {
    const names = new Set(MENU.flatMap((c) => c.items.map((i) => i.name)));
    for (const f of FEATURED) expect(names.has(f.dish)).toBe(true);
  });
});

describe('reservation validators', () => {
  it('rejects past dates', () => {
    expect(notInPast(new FormControl('2000-01-01', { nonNullable: true }))).toEqual({ past: true });
    expect(notInPast(new FormControl('2999-01-01', { nonNullable: true }))).toBeNull();
  });
  it('accepts only opening hours', () => {
    expect(openingHours(new FormControl('09:00', { nonNullable: true }))).toEqual({ hours: true });
    expect(openingHours(new FormControl('19:30', { nonNullable: true }))).toBeNull();
  });
});
