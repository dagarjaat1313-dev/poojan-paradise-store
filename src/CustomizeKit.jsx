import React, { useMemo, useState } from 'react';

// Premium 15-item Poojan Paradise kit.
// Default quantities are arranged to total exactly ₹1,299.
const ITEMS = [
  ['Bheem Seni Kapoor', 261],
  ['Dhoop Batti', 44],
  ['Hawan Samagri', 45],
  ['Pooja Ghee', 76],
  ['Cow Ghee Batti', 95],
  ['Chameli Pooja Oil', 55],
  ['Perfume / Itra', 44],
  ['Lal Kapda', 53],
  ['Peela Kapda', 75],
  ['Mauli Kalava', 15],
  ['Guggal', 54],
  ['Loban', 44],
  ['Orange Sindoor', 35],
  ['Haldi Sabut', 24],
  ['Rudraksh Mala', 225]
];

const PRICE = 1299;

const DEFAULT_QTY = {
  'Bheem Seni Kapoor': 1,
  'Dhoop Batti': 1,
  'Hawan Samagri': 1,
  'Pooja Ghee': 1,
  'Cow Ghee Batti': 1,
  'Chameli Pooja Oil': 1,
  'Perfume / Itra': 1,
  'Lal Kapda': 1,
  'Peela Kapda': 1,
  'Mauli Kalava': 2,
  'Guggal': 1,
  'Loban': 1,
  'Orange Sindoor': 1,
  'Haldi Sabut': 1,
  'Rudraksh Mala': 1
};

export default function CustomizeKit() {
  const [selected, setSelected] = useState(() => ({ ...DEFAULT_QTY }));

  const total = useMemo(() => {
    return ITEMS.reduce((sum, [name, price]) => {
      return sum + price * (selected[name] || 0);
    }, 0);
  }, [selected]);

  const remaining = PRICE - total;
  const canOrder = total === PRICE;

  const add = (name) => {
    setSelected((current) => ({
      ...current,
      [name]: (current[name] || 0) + 1
    }));
  };

  const remove = (name) => {
    setSelected((current) => ({
      ...current,
      [name]: Math.max(0, (current[name] || 0) - 1)
    }));
  };

  return (
    <div className="custom-kit-page">
      <header>
        <a className="brand" href="/#home">
          <div className="logo-mark">
            <span>ॐ</span>
            <b>PP</b>
          </div>
          <div>
            <b>POOJAN</b>
            <em>PARADISE</em>
            <small>Shuddh Samagri • Shreshth Seva</small>
          </div>
        </a>
      </header>

      <main className="custom-kit">
        <a className="back-link" href="/#kit">← Back to Poojan Kit</a>

        <div className="orn-title">
          <span>⌁</span>
          <h1>Customize Your Poojan Kit</h1>
          <span>⌁</span>
        </div>

        <p className="custom-kit-sub">
          Your premium kit includes these 15 selected pooja essentials. You can add or remove items according to your preference, but the final customized kit must be exactly <b>₹1,299</b>.
        </p>

        <div className="kit-price-card">
          <span>PREMIUM 15-ITEM KIT</span>
          <strong>₹1,299</strong>
          <div className="kit-progress">
            <i style={{ width: `${Math.min(100, (total / PRICE) * 100)}%` }} />
          </div>
          <b>
            {total < PRICE
              ? `₹${remaining} more to complete your kit`
              : total > PRICE
                ? `₹${total - PRICE} over limit — remove some items`
                : '✓ Your ₹1,299 kit is ready'}
          </b>
        </div>

        <section className="custom-items">
          {ITEMS.map(([name, price]) => (
            <article key={name} className={selected[name] ? 'chosen' : ''}>
              <div>
                <h3>{name}</h3>
                <span>₹{price} each</span>
              </div>

              <div className="item-controls">
                <button
                  type="button"
                  onClick={() => remove(name)}
                  disabled={!selected[name]}
                >
                  −
                </button>
                <b>{selected[name] || 0}</b>
                <button type="button" onClick={() => add(name)}>
                  +
                </button>
              </div>
            </article>
          ))}
        </section>

        <div className="custom-kit-bottom">
          <div>
            <span>Customized Kit Total</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>
          <button
            type="button"
            disabled={!canOrder}
            onClick={() => {
              if (canOrder) {
                alert('Your customized Poojan Kit is ready at ₹1,299.');
              }
            }}
          >
            {canOrder ? 'Add Customized Kit to Cart' : 'Complete ₹1,299 Kit'}
          </button>
        </div>
      </main>
    </div>
  );
}
