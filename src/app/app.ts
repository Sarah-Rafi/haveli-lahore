import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { INFO } from './data/info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <header [class.solid]="scrolled() || open()">
      <div class="container bar">
        <a routerLink="/" class="brand" (click)="open.set(false)" aria-label="Haveli home">
          <span class="urdu">{{ info.urdu }}</span><span class="word">HAVELI</span>
        </a>
        <nav [class.open]="open()" aria-label="Main">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="open.set(false)">Home</a>
          <a routerLink="/menu" routerLinkActive="active" (click)="open.set(false)">Menu</a>
          <a routerLink="/" fragment="visit" (click)="open.set(false)">Visit</a>
          <a routerLink="/reserve" class="btn solid" (click)="open.set(false)">Reserve</a>
        </nav>
        <button class="burger" (click)="open.update(o => !o)" [attr.aria-expanded]="open()" aria-label="Menu"><span></span><span></span></button>
      </div>
    </header>

    <main><router-outlet /></main>

    <footer>
      <div class="container cols">
        <div>
          <p class="brand big"><span class="urdu">{{ info.urdu }}</span> HAVELI</p>
          <p class="muted">{{ info.address }}</p>
        </div>
        <div>
          <p class="kicker">Hours</p><p class="muted">{{ info.hours }}</p>
          <p class="kicker" style="margin-top:16px">Call</p><a [href]="info.phoneHref">{{ info.phone }}</a>
        </div>
      </div>
      <div class="container disclaimer">
        <p>Unofficial concept redesign by <a href="https://sarah-rafi-portfolio.vercel.app" target="_blank" rel="noopener">Sarah Rafi</a>,
          built with Angular. Not affiliated with Haveli Restaurant. Menu prices come from public listings (2026) and may be out of date.
          For the official site, visit <a [href]="info.site" target="_blank" rel="noopener">haveli.com.pk</a>. Photos are from Unsplash.</p>
      </div>
    </footer>
  `,
  styles: `
    header { position: fixed; inset: 0 0 auto; z-index: 50; padding: 22px 0; transition: all .5s var(--ease); }
    header.solid { padding: 12px 0; background: rgba(18, 10, 9, .85); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
    .bar { display: flex; align-items: center; justify-content: space-between; }
    .brand { display: flex; align-items: baseline; gap: 12px; text-decoration: none; }
    .brand .urdu { font-size: 22px; } .word { font: 600 22px var(--serif); letter-spacing: .4em; }
    nav { display: flex; align-items: center; gap: 30px; }
    nav a:not(.btn) { text-decoration: none; font-size: 14px; letter-spacing: .2em; text-transform: uppercase; position: relative; padding: 6px 0; }
    nav a:not(.btn)::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--gold);
      transform: scaleX(0); transition: transform .4s var(--ease); }
    nav a:not(.btn):hover::after, nav a.active::after { transform: scaleX(1); }
    nav .btn { padding: 11px 22px; }
    .burger { display: none; background: none; border: 1px solid var(--line); width: 44px; height: 44px; cursor: pointer; color: var(--gold);
      flex-direction: column; justify-content: center; align-items: center; gap: 6px; }
    .burger span { width: 20px; height: 1.5px; background: currentColor; transition: transform .3s; }
    .burger[aria-expanded='true'] span:first-child { transform: translateY(3.75px) rotate(45deg); }
    .burger[aria-expanded='true'] span:last-child { transform: translateY(-3.75px) rotate(-45deg); }
    @media (max-width: 760px) {
      .burger { display: flex; }
      nav { position: fixed; inset: 69px 0 auto; flex-direction: column; gap: 22px; padding: 32px; background: var(--night);
        border-bottom: 1px solid var(--line); clip-path: inset(0 0 100% 0); transition: clip-path .5s var(--ease); }
      nav.open { clip-path: inset(0); }
    }
    footer { border-top: 1px solid var(--line); padding: 60px 0 30px; background: var(--night-2); }
    .cols { display: flex; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
    .big { font: 600 28px var(--serif); letter-spacing: .3em; margin-bottom: 8px; }
    .muted { color: var(--muted); max-width: 420px; }
    footer a { color: var(--gold); }
    .disclaimer { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); font-size: 13px; color: var(--muted); }
  `,
})
export class App {
  protected readonly info = INFO;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);
  onScroll() { this.scrolled.set(scrollY > 60); }
}
