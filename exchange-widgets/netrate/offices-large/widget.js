/* N13 · offices-large — the folder card (sample 07) as the first five exchange offices, with the distance from the market average. See folder.js. */
(() => {
  'use strict';
  if (!window.NR || !NR.registerOffices) return;
  NR.registerOffices({
    id: 'offices-large', no: 'N13', size: 'large', rows: 5, large: true,
    names: { fa: 'فهرست صرافی‌ها · بزرگ', en: 'Exchange offices · large' },
    desc: 'پنج صرافی اول به ترتیب نرخ، هر کدوم با رتبه، نام و شهر، نرخ و سن، تغییر و فاصله از میانگین بازار؛ زیر نوار هم میانگین بازار و تعداد صرافی‌هایی که نرخ زدن. شکل پوشه‌ای کارت‌های ویجت ۰۷؛ ⋯ جهت رو عوض می‌کنه.',
  });
})();
