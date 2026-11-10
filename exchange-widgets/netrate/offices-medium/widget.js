/* N12 · offices-medium — the folder card (sample 07) as the first three exchange offices. See folder.js. */
(() => {
  'use strict';
  if (!window.NR || !NR.registerOffices) return;
  NR.registerOffices({
    id: 'offices-medium', no: 'N12', size: 'medium', rows: 3, large: false,
    names: { fa: 'فهرست صرافی‌ها · متوسط', en: 'Exchange offices · medium' },
    desc: 'سه صرافی اول به ترتیب نرخ: رتبه، نام و شهر، نرخ و سن، تغییر. کارت پوشه‌ای سیاه با زبانه‌ی بلند و نوار روشن از ویجت ۰۷ مونده؛ ⋯ جهت رو عوض می‌کنه (ارسال: بیشترین تومان اول، دریافت: کمترین تومان اول). همه‌ی ردیف‌ها یک‌شکل‌ان و فقط شماره‌ی رتبه فرق می‌کنه.',
  });
})();
