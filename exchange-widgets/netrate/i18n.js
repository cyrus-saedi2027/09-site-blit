/* NetRate widgets · text table (fa / en), shared by every widget.
   Words come from the app's own bank (brief section 10) so they never fight the glossary:
   "Send to Iran" / "Receive from Iran" (never buy / sell), "toman" (never rial),
   "Most toman" / "Least toman" (never "best exchange"). Widget-specific strings live in
   each widget's own TEXT table. {n}, {name}… are filled by the formatter, never by hand. */
window.NR_TEXT = {
  fa: {
    dir: { send: 'ارسال به ایران', recv: 'دریافت از ایران', sendShort: 'ارسال', recvShort: 'دریافت' },
    title: { send: 'بیشترین تومان', recv: 'کمترین تومان' },
    unit: 'تومان برای هر پوند',
    avg: 'میانگین بازار',
    range: { '1w': '۱ هفته', '1m': '۱ ماه', '3m': '۳ ماه', '1y': '۱ سال' },
    rangeSay: { '1w': 'یک هفته', '1m': 'یک ماه', '3m': 'سه ماه', '1y': 'یک سال' },
    today: 'امروز',
    lastDay: 'آخرین روز کاری',
    vsPrev: 'نسبت به روز کاری قبل',
    word: { up: 'بالا رفته', down: 'پایین آمده', flat: 'بدون تغییر' },
    age: { now: 'همین الان', min: '{n} دقیقه پیش', hour: '{n} ساعت پیش', yday: 'دیروز', days: '{n} روز پیش' },
    state: { notPosted: 'هنوز نرخی نیامده', closed: 'امروز یکشنبه است', expired: 'منقضی', offline: 'آفلاین', unset: 'ویجت را تنظیم کن' },
    stateLong: {
      notPosted: 'هنوز نرخی نیامده؛ صرافی‌ها از حدود ۹:۴۵ نرخ امروز را می‌زنند',
      closed: 'امروز یکشنبه است؛ بیشتر صرافی‌ها تعطیل‌اند و این نرخ آخرین روز کاری است',
      expired: 'منقضی؛ این نرخ بیش از یک روز پیش ثبت شده',
      offline: 'آفلاین؛ آخرین نرخی که روی گوشی ماند',
    },
    posted: '{n} صرافی نرخ زده‌اند',
    high: 'سقف', low: 'کف', mean: 'میانگین',
    rank: 'رتبه {n}',
    open: 'باز کردن در نت‌ریت',
    /* VoiceOver / TalkBack: one complete sentence per widget */
    say: {
      rate: 'نرخ امروز، {rate} تومان برای هر پوند، {office}، {pct} {word}، {age}',
      rateRecv: 'کمترین تومان امروز برای دریافت، {rate} تومان برای هر پوند، {office}، {pct} {word}، {age}',
      avg: 'میانگین بازار، {rate} تومان برای هر پوند، {pct} {word} نسبت به روز کاری قبل، {posted}، {age}',
      chart: 'نمودار {range} اخیر: {pct} {word}، کف {low}، سقف {high}',
    },
  },
  en: {
    dir: { send: 'Send to Iran', recv: 'Receive from Iran', sendShort: 'Send', recvShort: 'Receive' },
    title: { send: 'Most toman', recv: 'Least toman' },
    unit: 'toman per pound',
    avg: 'Market average',
    range: { '1w': '1W', '1m': '1M', '3m': '3M', '1y': '1Y' },
    rangeSay: { '1w': 'one week', '1m': 'one month', '3m': 'three months', '1y': 'one year' },
    today: 'Today',
    lastDay: 'Last working day',
    vsPrev: 'vs the previous working day',
    word: { up: 'up', down: 'down', flat: 'unchanged' },
    age: { now: 'just now', min: '{n} min ago', hour: '{n} h ago', yday: 'yesterday', days: '{n} d ago' },
    state: { notPosted: 'No rates yet', closed: "It's Sunday", expired: 'Expired', offline: 'Offline', unset: 'Set up the widget' },
    stateLong: {
      notPosted: "No rates yet; offices post today's rate from about 9:45",
      closed: "It's Sunday; most offices are closed, so this is the last working day's rate",
      expired: 'Expired; this rate was recorded more than a day ago',
      offline: 'Offline; the last rate kept on the phone',
    },
    posted: '{n} offices posted',
    high: 'High', low: 'Low', mean: 'Mean',
    rank: 'Rank {n}',
    open: 'Open in NetRate',
    say: {
      rate: "Today's rate, {rate} toman per pound, {office}, {word} {pct}, {age}",
      rateRecv: "Today's least toman for receiving, {rate} toman per pound, {office}, {word} {pct}, {age}",
      avg: 'Market average, {rate} toman per pound, {word} {pct} against the previous working day, {posted}, {age}',
      chart: '{range} chart: {word} {pct}, low {low}, high {high}',
    },
  },
};
