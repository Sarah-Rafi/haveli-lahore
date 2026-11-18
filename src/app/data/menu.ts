/**
 * Menu taken from public listings (MenuMoment and Zouq-e-Saeed, 2026). Prices are in PKR, excluding sales tax.
 * See RESEARCH.md for sources. Prices may be out of date, so confirm with the restaurant.
 */
export interface MenuItem {
  name: string;
  /** Price for the first size (or the only price). */
  price: number;
  /** Price for the second size, if the category has two sizes. */
  price2?: number;
  desc?: string;
  veg?: boolean;
  spicy?: boolean;
  signature?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  urdu: string;
  icon: string;
  /** Size names for price / price2, e.g. ['Half', 'Full']. */
  sizes?: [string, string];
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    id: 'soups', title: 'Soups', urdu: 'شوربہ', icon: '🍲', sizes: ['Single', 'Family'],
    items: [
      { name: 'Thai Consommé', price: 395, price2: 1395 },
      { name: 'Vegetable Soup', price: 395, price2: 1375, veg: true },
      { name: 'Hot & Sour Soup', price: 445, price2: 1625, spicy: true },
      { name: 'Chicken Corn Soup', price: 445, price2: 1625 },
      { name: 'Garlic Mushroom', price: 495, price2: 1795 },
      { name: '19-B', price: 495, price2: 1795, desc: 'House soup with a cult following.' },
      { name: 'Haveli Special Soup', price: 595, price2: 1995, signature: true },
    ],
  },
  {
    id: 'appetizers', title: 'Appetizers', urdu: 'ابتدائیہ', icon: '🍤',
    items: [
      { name: 'Jumbo Drum Stick (4 pcs)', price: 1095 },
      { name: 'Zinger Drum Stick (4 pcs)', price: 1095 },
      { name: 'Finger Fish – Pangasius (8 pcs)', price: 2195 },
      { name: 'Finger Fish – Sole (8 pcs)', price: 2995 },
      { name: 'Dynamite Prawn (5 pcs)', price: 1895, spicy: true },
      { name: 'Chilli Garlic Shrimp', price: 1845, spicy: true },
      { name: 'Tempura Prawn (5 pcs)', price: 2195 },
    ],
  },
  {
    id: 'fries', title: 'Fries, Nuggets & Wings', urdu: 'فرائز', icon: '🍟',
    items: [
      { name: 'Fries', price: 595, veg: true },
      { name: 'Masala Fries', price: 645, veg: true, spicy: true },
      { name: 'Loaded Fries', price: 1095 },
      { name: 'Breaded Onion Rings', price: 795, veg: true },
      { name: 'Nuggets – Tandoori / Masala / Garlic Butter (10 pcs)', price: 895 },
      { name: 'Haveli Wings – Hot / Afghani / Tandoori (8 pcs)', price: 995, spicy: true },
    ],
  },
  {
    id: 'karahi', title: 'Karahi Korner', urdu: 'کڑاہی', icon: '🥘', sizes: ['Half', 'Full'],
    items: [
      { name: 'Lahori Chicken Karahi', price: 1145, price2: 1995, desc: 'Tomato, green chilli, ginger, cooked hard in the wok.', signature: true },
      { name: 'Chicken Gravy Karahi', price: 1195, price2: 2095 },
      { name: 'Chicken Wings Karahi', price: 1495 },
      { name: 'Batair Karahi (6 pcs)', price: 2095, desc: 'Quail, a Lahori winter favourite.' },
      { name: 'Chicken Sulemani Karahi', price: 2195 },
      { name: 'Chicken Makhani Karahi', price: 2195 },
      { name: 'Chicken Charsi Karahi', price: 2195, desc: 'Peshawari style: just salt, tomato and fat.' },
      { name: 'Black Pepper Chicken Karahi', price: 2195, spicy: true },
      { name: 'Junglee Karahi', price: 2495, spicy: true },
      { name: 'Desi Murgh Karahi', price: 4495, desc: 'Free-range desi chicken, slow and rich.', signature: true },
      { name: 'Lahori Mutton Karahi', price: 2595, price2: 4995, signature: true },
      { name: 'Mutton Gravy Karahi', price: 2645, price2: 4995 },
      { name: 'Special Mutton Karahi', price: 4995 },
      { name: 'Mutton Charsi Karahi', price: 4995 },
      { name: 'Mutton Sulemani Karahi', price: 5195 },
      { name: 'Black Pepper Mutton Karahi', price: 5195, spicy: true },
    ],
  },
  {
    id: 'bbq', title: 'Namak Mandi & BBQ', urdu: 'نمک منڈی', icon: '🔥',
    items: [
      { name: 'Chapli Beef Kabab (2 pcs)', price: 1295 },
      { name: 'Chapli Chicken Kabab (2 pcs)', price: 1295 },
      { name: 'Kabuli Pulao (Beef)', price: 1495 },
      { name: 'Dumba Tikka (8 pcs)', price: 2995, desc: 'Lamb on skewers, just salt and coal, Namak Mandi style.', signature: true },
      { name: 'Dumba Chops (5 pcs)', price: 2995 },
      { name: 'Dumba Charsi Karahi', price: 4995 },
      { name: 'Dumba Sulemani Karahi', price: 4995 },
    ],
  },
  {
    id: 'takatak', title: 'Takka Tak', urdu: 'ٹکا ٹک', icon: '🍳',
    items: [
      { name: 'Tawa Chicken Piece', price: 995 },
      { name: 'Pehalwani Gurda Kapoora', price: 1295 },
      { name: 'Gurday Qeema', price: 1295 },
      { name: 'Tawa Chicken Qeema', price: 1595 },
      { name: 'Takka Tak Chicken', price: 1695 },
      { name: 'Tawa Beef Qeema', price: 1695 },
      { name: 'Tawa Karahi', price: 1895 },
      { name: 'Brain Masala', price: 1995 },
      { name: 'Tawa Kabab Masala', price: 1995 },
      { name: 'Tawa Mutton Chops', price: 2495 },
      { name: 'Tawa Mutton Qeema', price: 2495 },
      { name: 'Takka Tak Special', price: 2795, desc: 'The rhythmic clatter of two blades on a hot tawa: kidneys, brain and kaleji.', signature: true },
    ],
  },
  {
    id: 'handi', title: 'Handi', urdu: 'ہانڈی', icon: '🏺', sizes: ['Half', 'Full'],
    items: [
      { name: 'Chicken Boneless Handi', price: 1495, price2: 2595 },
      { name: 'Chicken Makhani Handi', price: 1495, price2: 2595 },
      { name: 'Chicken Rajasthani Handi', price: 1495, price2: 2595 },
      { name: 'Chicken Madrasi Handi', price: 1495, price2: 2595, spicy: true },
      { name: 'Chicken Achari Handi', price: 1495, price2: 2595, spicy: true },
      { name: 'Chicken Cheese Handi', price: 1595, price2: 2795 },
      { name: 'Chicken Mughlai Handi', price: 1595, price2: 2795 },
      { name: 'BBQ Malai Handi', price: 1595, price2: 2795, desc: 'Smoky tikka folded into a creamy malai gravy.', signature: true },
      { name: 'Chicken Patiala Handi', price: 1595, price2: 2795 },
      { name: 'Mutton Boneless Handi', price: 2295, price2: 4095 },
      { name: 'Mutton Makhani Handi', price: 2295, price2: 4095 },
      { name: 'Mutton Rajasthani Handi', price: 2295, price2: 4095 },
      { name: 'Mutton Madrasi Handi', price: 2295, price2: 4095, spicy: true },
      { name: 'Mutton Achari Handi', price: 2295, price2: 4095, spicy: true },
      { name: 'Mutton Cheese Handi', price: 2295, price2: 4095 },
      { name: 'Mutton Mughlai Handi', price: 2395, price2: 4195 },
      { name: 'Mutton Patiala Handi', price: 2395, price2: 4195 },
    ],
  },
  {
    id: 'naan', title: 'Naan', urdu: 'نان', icon: '🫓',
    items: [
      { name: 'Garlic Butter Naan', price: 295, veg: true },
      { name: 'Cheese Naan', price: 895, veg: true },
      { name: 'Lahori Chicken Naan', price: 895 },
      { name: 'Qeema Wala Naan', price: 895 },
      { name: 'Chicken Cheese Naan', price: 995 },
    ],
  },
  {
    id: 'desserts', title: 'Cakes, Pastries & Sundaes', urdu: 'میٹھا', icon: '🍰',
    items: [
      { name: 'Chocolate / Red Velvet Pastry', price: 395, veg: true },
      { name: 'Pistachio Pastry', price: 445, veg: true },
      { name: 'Cheesecake Pastry', price: 895, veg: true },
      { name: 'Haveli Dream Cake / Red Velvet Dream Cake / Mughali Milk Cake', price: 795, veg: true, signature: true },
      { name: 'Sundae – Chocolate, Caramel, Honey Vanilla or Oreo', price: 395, veg: true },
      { name: 'Sundae – Biscoff Lotus or Red Velvet', price: 495, veg: true },
      { name: 'Brownies (assorted)', price: 495, veg: true },
    ],
  },
  {
    id: 'halwai', title: 'Haveli Halwai & Coffee Bar', urdu: 'حلوائی', icon: '☕',
    items: [
      { name: 'Kulfi / Firni', price: 245, veg: true },
      { name: 'Gurh Naan', price: 295, veg: true },
      { name: 'Gulab Jamun', price: 395, veg: true },
      { name: 'Rass Malai / Nutella Naan', price: 445, veg: true },
      { name: 'Pathe ka Halwa / Gajar ka Halwa', price: 495, veg: true },
      { name: 'Kashmiri Chai / Tandoori Chai', price: 295, veg: true, desc: 'Pink, salted and cardamom-sweet; or smoked in a clay cup.', signature: true },
      { name: 'Black Tea / Green Tea / Iced Tea', price: 295, veg: true },
      { name: 'Cappuccino / Mochaccino', price: 295, veg: true },
      { name: 'Latte / Cold Coffee / Frappuccino / Cold Mochaccino', price: 395, veg: true },
    ],
  },
];

export type MenuFilter = { query: string; category: string; vegOnly: boolean };

/** Pure filter used by the menu page (and its unit tests). Drops categories that end up with no items. */
export function filterMenu(menu: MenuCategory[], { query, category, vegOnly }: MenuFilter): MenuCategory[] {
  const q = query.trim().toLowerCase();
  return menu
    .filter((c) => category === 'all' || c.id === category)
    .map((c) => ({
      ...c,
      items: c.items.filter(
        (i) => (!vegOnly || i.veg) && (!q || `${i.name} ${i.desc ?? ''} ${c.title}`.toLowerCase().includes(q)),
      ),
    }))
    .filter((c) => c.items.length > 0);
}

export const SIGNATURES = MENU.flatMap((c) => c.items.filter((i) => i.signature).map((i) => ({ ...i, category: c.title })));
