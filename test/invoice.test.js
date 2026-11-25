const test = require('node:test');
const assert = require('node:assert/strict');
const invoice = require('../lib/invoice');
const pricing = require('../lib/pricing');

test('invoice uses the HSN slab and matches checkout tax', () => {
  const items = [{ id: 1, name: 'Rice', hsn: '1006', price: 100, qty: 1 }];

  const invoiceFigures = invoice.computeInvoiceFigures({ items, coupon: '' });
  const checkoutFigures = pricing.computeTotals(items, '');

  assert.equal(invoiceFigures.rows[0].gstPercent, 5);
  assert.equal(invoiceFigures.tax, 5);
  assert.equal(checkoutFigures.lines[0].gstPercent, 5);
  assert.equal(checkoutFigures.tax, 5);
});

test('invoice applies the capped coupon before calculating GST', () => {
  const items = [{ id: 2, name: 'Bulk goods', price: 2240, qty: 1 }];

  const invoiceFigures = invoice.computeInvoiceFigures({ items, coupon: 'SAVE10' });
  const checkoutFigures = pricing.computeTotals(items, 'SAVE10');

  assert.equal(invoiceFigures.discount, 150);
  assert.equal(checkoutFigures.discount, 150);
  assert.equal(invoiceFigures.total, 2466.2);
  assert.equal(checkoutFigures.total, 2466.2);
});

test('invoice figures match checkout for the reported order #1002 values', () => {
  const items = [
    { id: 1, name: 'Indrayani Basmati Rice 5kg', hsn: '1006', price: 640, qty: 1 },
    { id: 4, name: 'Cold-Pressed Sunflower Oil 1L', hsn: '1512', price: 190, qty: 2 }
  ];
  const invoiceFigures = invoice.computeInvoiceFigures({ items, coupon: 'SAVE10' });
  const checkoutFigures = pricing.computeTotals(items, 'SAVE10');

  assert.equal(invoiceFigures.subtotal, checkoutFigures.subtotal);
  assert.equal(invoiceFigures.discount, checkoutFigures.discount);
  assert.equal(invoiceFigures.tax, checkoutFigures.tax);
  assert.equal(invoiceFigures.total, checkoutFigures.total);
});
