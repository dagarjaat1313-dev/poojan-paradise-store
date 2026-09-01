import React, { useMemo, useState } from 'react';

const ITEMS = [
  ['Peela Kapda', 75],
  ['Lal Kapda', 53],
  ['Pooja Ghee', 76],
  ['Gobar Cups & Diya', 95],
  ['Bheem Seni Kapoor', 261],
  ['Honey', 66],
  ['Dhoop', 44],
  ['Perfume / Itra', 44],
  ['Mauli Kalava', 15],
  ['Cow Ghee Batti', 95],
  ['Chameli Pooja Oil', 55],
  ['Tika Chandan', 29],
  ['Hawan Samagri', 45],
  ['Orange Sindoor', 35],
  ['Lal Sindoor', 35],
  ['Nav Grah Poojan', 94],
  ['Haldi Sabut', 24],
  ['Peeli Kaudi', 95],
  ['Gomti Chakra', 75],
  ['Janaeu', 45],
  ['Guggal', 54],
  ['Loban', 44],
  ['Rudraksh Mala', 225],
  ['Kamal Gatta Mala / Loose', 45],
  ['Chandan Stick & Rubbing Stone', 39]
];

const PRICE = 1299;

export default function CustomizeKit() {
  const [selected, setSelected] = useState(() => {
    const initial = {};
    ITEMS.forEach(([name]) => {
      initial[name] = 0;
    });
    return initial;
  });

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
          Choose the items you want. Add or remove items according to your preference.
          Your final customized kit must be exactly <b>₹1,299</b>.
        </p>

        <div className="kit-price-card">
          <span>FIXED KIT VALUE</span>
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
