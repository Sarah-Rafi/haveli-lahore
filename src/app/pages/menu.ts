import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MENU, filterMenu } from '../data/menu';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="banner">
      <img src="img/spread.webp" alt="" />
      <div class="container">
        <p class="kicker">Lahori · Mughlai · Namak Mandi</p>
        <h1 class="title">The <em>Menu</em></h1>
        <p class="lead">{{ totalItems }} dishes from the karahi, the tawa, the tandoor and the halwai. Prices are in PKR, plus sales tax.</p>
      </div>
    </section>

    <div class="controls">
      <div class="container">
        <div class="row">
          <label class="search">
            <span class="sr-only">Search the menu</span>
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="Search karahi, naan, chai…" [value]="query()" (input)="query.set($any($event.target).value)" />
          </label>
          <label class="veg"><input type="checkbox" [checked]="vegOnly()" (change)="vegOnly.set($any($event.target).checked)" /> <span>Vegetarian only</span></label>
        </div>
        <!-- The category lives in the URL (?category=), so filtered views can be shared and the back button works. -->
        <nav class="tabs" aria-label="Menu categories">
          <a routerLink="/menu" [queryParams]="{ category: null }" replaceUrl [class.active]="active() === 'all'">All</a>
          @for (c of menu; track c.id) {
            <a routerLink="/menu" [queryParams]="{ category: c.id }" replaceUrl [class.active]="active() === c.id">{{ c.icon }} {{ c.title }}</a>
          }
        </nav>
      </div>
    </div>

    <section class="list">
      <div class="container">
        <p class="count" aria-live="polite">{{ resultCount() }} {{ resultCount() === 1 ? 'dish' : 'dishes' }}</p>
        @for (c of filtered(); track c.id) {
          <div class="category" animate.enter="enter-up">
            <header>
              <span class="urdu">{{ c.urdu }}</span>
              <h2>{{ c.title }}</h2>
              @if (c.sizes) { <span class="sizes"><span>{{ c.sizes[0] }}</span><span>{{ c.sizes[1] }}</span></span> }
            </header>
            <ul>
              @for (item of c.items; track item.name) {
                <li animate.enter="enter-up">
                  <div class="name">
                    <span>{{ item.name }}</span>
                    @if (item.signature) { <em class="tag sig" title="House signature">Signature</em> }
                    @if (item.spicy) { <em class="tag" title="Spicy">🌶</em> }
                    @if (item.veg) { <em class="tag veg-dot" title="Vegetarian">●</em> }
                  </div>
                  <span class="leader" aria-hidden="true"></span>
                  <span class="prices">
                    @if (c.sizes && item.price2) {
                      <span>{{ item.price.toLocaleString() }}</span><span>{{ item.price2.toLocaleString() }}</span>
                    } @else if (c.sizes) {
                      <span>—</span><span>{{ item.price.toLocaleString() }}</span>
                    } @else {
                      <span>{{ item.price.toLocaleString() }}</span>
                    }
                  </span>
                  @if (item.desc) { <p class="desc">{{ item.desc }}</p> }
                </li>
              }
            </ul>
          </div>
        } @empty {
          <div class="empty">
            <p>No dishes match “{{ query() }}”.</p>
            <button class="btn" (click)="query.set(''); vegOnly.set(false)">Clear filters</button>
          </div>
        }
        <p class="note">Prices come from public listings (2026) and may have changed. <a routerLink="/reserve">Reserve a table →</a></p>
      </div>
    </section>
  `,
  styleUrl: './menu.scss',
})
export default class Menu {
  /** Bound from the ?category= query param via withComponentInputBinding(). */
  readonly category = input<string>();

  protected readonly menu = MENU;
  protected readonly totalItems = MENU.reduce((n, c) => n + c.items.length, 0);
  protected readonly query = signal('');
  protected readonly vegOnly = signal(false);
  protected readonly active = computed(() => this.category() ?? 'all');
  protected readonly filtered = computed(() =>
    filterMenu(MENU, { query: this.query(), category: this.active(), vegOnly: this.vegOnly() }),
  );
  protected readonly resultCount = computed(() => this.filtered().reduce((n, c) => n + c.items.length, 0));
}
