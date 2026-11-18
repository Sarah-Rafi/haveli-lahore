import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INFO } from '../data/info';
import { MENU } from '../data/menu';

interface Featured { dish: string; category: string; img: string; alt: string }

/** Signature dishes on the home page. `dish` must match a name in MENU (a unit test checks this). */
export const FEATURED: Featured[] = [
  { dish: 'Lahori Mutton Karahi', category: 'karahi', img: 'karahi', alt: 'Karahi with fresh coriander in a steel wok' },
  { dish: 'Dumba Tikka (8 pcs)', category: 'bbq', img: 'bbq', alt: 'Charcoal-grilled tikka and seekh kebabs on a board' },
  { dish: 'BBQ Malai Handi', category: 'handi', img: 'handi', alt: 'Creamy handi garnished with cream and mint' },
  { dish: 'Takka Tak Special', category: 'takatak', img: 'curry', alt: 'Rich curry with rice and naan' },
  { dish: 'Chicken Makhani Handi', category: 'handi', img: 'makhani', alt: 'Butter chicken handi with naan' },
  { dish: 'Garlic Butter Naan', category: 'naan', img: 'tandoori', alt: 'Basket of naan beside tandoori chicken' },
];

const priceOf = (name: string) => MENU.flatMap((c) => c.items).find((i) => i.name === name);

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- HERO: an arch-shaped window that opens to full screen as you scroll. -->
    <section class="hero" aria-label="Welcome">
      <div class="sticky">
        <div class="window">
          <img src="img/hero.webp" alt="The Badshahi Mosque at sunset, seen from across the Walled City" fetchpriority="high" />
          <div class="shade"></div>
        </div>
        <div class="hero-text">
          <p class="urdu big-urdu">{{ info.urdu }}</p>
          <h1 aria-label="Haveli">
            @for (ch of letters; track $index) { <span [style.animation-delay.ms]="300 + $index * 90">{{ ch }}</span> }
          </h1>
          <p class="tag">Rooftop dining opposite the Badshahi Mosque · Food Street, Lahore</p>
          <div class="ctas">
            <a routerLink="/menu" class="btn solid">Explore the menu</a>
            <a routerLink="/reserve" class="btn">Reserve a rooftop table</a>
          </div>
        </div>
        <span class="scroll-hint" aria-hidden="true">Scroll</span>
      </div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="track">
        @for (w of marquee.concat(marquee); track $index) { <span>{{ w }}</span><i>✦</i> }
      </div>
    </div>

    <!-- STORY -->
    <section class="story">
      <div class="container two">
        <div class="frame reveal">
          <img class="arch-css" src="img/mosque.webp" alt="The red sandstone Badshahi Mosque with its white marble domes" loading="lazy" />
          <span class="since">Haveli Khalil Khan · Walled City</span>
        </div>
        <div class="reveal">
          <p class="kicker">Our story</p>
          <h2 class="title">A haveli with a <em>view</em> of history</h2>
          <p class="lead">The restaurant sits inside Haveli Khalil Khan, a restored old townhouse on Fort Road’s Food Street.
            From the terrace you look straight at the Badshahi Mosque, built by Emperor Aurangzeb in 1673 and one of the largest mosques in the world.</p>
          <div class="divider">✦</div>
          <p class="lead">Lahori cooking runs the kitchen: karahi in steel woks, the takka-tak of blades on a hot tawa, and Namak Mandi lamb cooked over coal.
            Come at dusk, when the mosque lights up.</p>
        </div>
      </div>
    </section>

    <!-- SIGNATURES -->
    <section class="signatures">
      <div class="container">
        <div class="head reveal">
          <div><p class="kicker">From the kitchen</p><h2 class="title">Signature <em>dishes</em></h2></div>
          <a routerLink="/menu" class="btn">Full menu →</a>
        </div>
        <div class="dishes">
          @for (f of featured; track f.dish) {
            <a class="dish reveal" routerLink="/menu" [queryParams]="{ category: f.category }">
              <div class="img"><img [src]="'img/' + f.img + '.webp'" [alt]="f.alt" loading="lazy" /></div>
              <div class="meta">
                <h3>{{ f.dish }}</h3>
                @if (f.price) { <p class="price">Rs {{ f.price.price.toLocaleString() }}{{ f.price.price2 ? ' – ' + f.price.price2.toLocaleString() : '' }}</p> }
                @if (f.price?.desc) { <p class="desc">{{ f.price?.desc }}</p> }
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- ROOFTOP: the sky shifts from dusk to night as this section scrolls past. -->
    <section class="rooftop">
      <img class="bg" src="img/night.webp" alt="" loading="lazy" />
      <div class="sky" aria-hidden="true"></div>
      <div class="container inner">
        <p class="kicker reveal">The rooftop</p>
        <h2 class="title reveal">Dinner under the <em>minarets</em></h2>
        <div class="features">
          @for (f of features; track f.t) {
            <div class="feature reveal"><span class="ic">{{ f.i }}</span><h3>{{ f.t }}</h3><p>{{ f.d }}</p></div>
          }
        </div>
      </div>
    </section>

    <!-- BEFORE YOU GO -->
    <section class="tips">
      <div class="container two">
        <div class="reveal">
          <p class="kicker">Before you go</p>
          <h2 class="title">Good to <em>know</em></h2>
          <ol>
            @for (t of tips; track t) { <li>{{ t }}</li> }
          </ol>
        </div>
        <img class="arch-css spread reveal" src="img/spread.webp" alt="A table filled with Pakistani dishes" loading="lazy" />
      </div>
    </section>

    <!-- VISIT -->
    <section id="visit" class="visit">
      <div class="container two">
        <div class="reveal">
          <p class="kicker">Visit us</p>
          <h2 class="title">Find <em>Haveli</em></h2>
          <dl>
            <dt>Address</dt><dd>{{ info.address }}</dd>
            <dt>Hours</dt><dd>{{ info.hours }}</dd>
            <dt>Phone</dt><dd><a [href]="info.phoneHref">{{ info.phone }}</a></dd>
          </dl>
          <div class="ctas">
            <a routerLink="/reserve" class="btn solid">Reserve</a>
            <a [href]="info.mapLink" target="_blank" rel="noopener" class="btn">Directions ↗</a>
          </div>
        </div>
        <iframe class="map reveal" src="https://www.google.com/maps?q=Haveli+Restaurant+Food+Street+Fort+Road+Lahore&output=embed" title="Map showing Haveli on Food Street, Lahore" loading="lazy"></iframe>
      </div>
    </section>
  `,
  styleUrl: './home.scss',
})
export default class Home {
  protected readonly info = INFO;
  protected readonly letters = [...'HAVELI'];
  protected readonly featured = FEATURED.map((f) => ({ ...f, price: priceOf(f.dish) }));
  protected readonly marquee = ['Lahori Karahi', 'Takka Tak', 'Namak Mandi', 'Dumba Tikka', 'Malai Handi', 'Kashmiri Chai', 'Gajar ka Halwa'];
  protected readonly features = [
    { i: '🕌', t: 'Face the Badshahi Mosque', d: 'Terrace and balcony tables look straight at the mosque’s marble domes.' },
    { i: '🌆', t: 'Best at dusk', d: 'Arrive just before sunset and watch the Walled City light up.' },
    { i: '🔥', t: 'Open kitchen classics', d: 'Karahi, tawa and coal-fire cooking, the way Lahore likes it.' },
  ];
  protected readonly tips = [
    'Book ahead for balcony and rooftop tables, especially on weekends.',
    'The mosque is a place of worship: dress modestly if you plan to visit it too.',
    'Most karahis and handis come in half and full sizes. A full karahi feeds 3–4 people.',
    'Food Street is pedestrian. Park on Fort Road and enjoy the short walk in.',
    'Sales tax is added to menu prices.',
  ];
}
