/* NetRate widgets · the one data object (the sample answer file, unchanged in shape)
   Every number a widget shows comes from here; widgets only format and scale.
   Source: netrate-widget-sample-data.json (demo values; the offices are made up). */
window.NR_DATA = {
 "_about": [
  "SAMPLE DATA for NetRate's home-screen widgets: the exact shape of what a widget reads, with demo values.",
  "The offices, rates and history are made up by the prototype's engine; they are not real offices or real rates.",
  "A widget reads ONE answer and computes nothing: every number, change, rank and gap arrives ready (money is a string, times are UTC instants, changes are signed).",
  "Demo clock: Saturday 09:41 in London (UTC+1). 'age' is not stored: the widget works it out from recorded_at with its own clock ('8 min ago', then '1 h ago', then 'yesterday')."
 ],
 "query": {
  "cur": "gbp",
  "type": "cash",
  "dir": "send"
 },
 "offices": [
  {
   "id": "aria",
   "name_fa": "آریا",
   "name_en": "Aria",
   "city_fa": "لندن",
   "city_en": "London"
  },
  {
   "id": "pars",
   "name_fa": "پارس",
   "name_en": "Pars",
   "city_fa": "لندن",
   "city_en": "London"
  },
  {
   "id": "nilo",
   "name_fa": "نیلو",
   "name_en": "Nilo",
   "city_fa": "لندن",
   "city_en": "London"
  },
  {
   "id": "kian",
   "name_fa": "کیان",
   "name_en": "Kian",
   "city_fa": "منچستر",
   "city_en": "Manchester"
  },
  {
   "id": "sepehr",
   "name_fa": "سپهر",
   "name_en": "Sepehr",
   "city_fa": "گلاسکو",
   "city_en": "Glasgow"
  },
  {
   "id": "ava",
   "name_fa": "آوا",
   "name_en": "Ava",
   "city_fa": "منچستر",
   "city_en": "Manchester"
  },
  {
   "id": "royal",
   "name_fa": "رویال",
   "name_en": "Royal",
   "city_fa": "بیرمنگام",
   "city_en": "Birmingham"
  },
  {
   "id": "milad",
   "name_fa": "میلاد",
   "name_en": "Milad",
   "city_fa": "لندن",
   "city_en": "London"
  },
  {
   "id": "dena",
   "name_fa": "دنا",
   "name_en": "Dena",
   "city_fa": "لندن",
   "city_en": "London"
  },
  {
   "id": "mehr",
   "name_fa": "مهر",
   "name_en": "Mehr",
   "city_fa": "گلاسکو",
   "city_en": "Glasgow"
  },
  {
   "id": "caspian",
   "name_fa": "کاسپین",
   "name_en": "Caspian",
   "city_fa": "لندن",
   "city_en": "London"
  },
  {
   "id": "alborz",
   "name_fa": "البرز",
   "name_en": "Alborz",
   "city_fa": "منچستر",
   "city_en": "Manchester"
  },
  {
   "id": "taban",
   "name_fa": "تابان",
   "name_en": "Taban",
   "city_fa": "لندن",
   "city_en": "London"
  }
 ],
 "snapshot": {
  "v": 1,
  "generated_at": "2026-09-12T08:41:00Z",
  "query": {
   "asset": "gbp",
   "rate_type": "cash",
   "direction": "send"
  },
  "better": "higher",
  "market": {
   "status": "open",
   "posted": 9,
   "average": "91733.33",
   "average_change_pct": "0.23",
   "average_change": "210.00",
   "highest": "92900.00",
   "highest_change_pct": "0.06",
   "lowest": "90600.00",
   "lowest_change_pct": "0.89",
   "lowest_exchange": {
    "id": "dena",
    "name": "Dena"
   },
   "spread_on_1000": "2300000.00",
   "spread_change_pct": "-24.41",
   "recorded_at": "2026-09-12T08:38:00Z",
   "oldest_at": "2026-09-12T05:11:00Z"
  },
  "best": [
   {
    "rank": 1,
    "exchange": {
     "id": "aria",
     "name": "Aria",
     "city": "London"
    },
    "rate": "92900.00",
    "change_pct": "0.06",
    "spark": [
     "92640.69",
     "92718.41",
     "92778.63",
     "92815.55",
     "92842.91",
     "92900.00"
    ],
    "better_than_average_pct": "1.27",
    "recorded_at": "2026-09-12T08:33:00Z",
    "age": "fresh"
   },
   {
    "rank": 2,
    "exchange": {
     "id": "pars",
     "name": "Pars",
     "city": "London"
    },
    "rate": "92850.00",
    "change_pct": "0.16",
    "spark": [
     "92509.17",
     "92589.03",
     "92642.68",
     "92681.76",
     "92702.58",
     "92850.00"
    ],
    "better_than_average_pct": "1.22",
    "recorded_at": "2026-09-12T08:38:00Z",
    "age": "fresh"
   },
   {
    "rank": 3,
    "exchange": {
     "id": "nilo",
     "name": "Nilo",
     "city": "London"
    },
    "rate": "92300.00",
    "change_pct": "0.04",
    "spark": [
     "92073.77",
     "92153.16",
     "92206.49",
     "92245.34",
     "92266.04",
     "92300.00"
    ],
    "better_than_average_pct": "0.62",
    "recorded_at": "2026-09-12T08:14:00Z",
    "age": "fresh"
   },
   {
    "rank": 4,
    "exchange": {
     "id": "kian",
     "name": "Kian",
     "city": "Manchester"
    },
    "rate": "91900.00",
    "change_pct": "0.08",
    "spark": [
     "91633.55",
     "91710.44",
     "91765.69",
     "91802.22",
     "91824.98",
     "91900.00"
    ],
    "better_than_average_pct": "0.18",
    "recorded_at": "2026-09-12T08:29:00Z",
    "age": "fresh"
   },
   {
    "rank": 5,
    "exchange": {
     "id": "sepehr",
     "name": "Sepehr",
     "city": "Glasgow"
    },
    "rate": "91600.00",
    "change_pct": "-0.12",
    "spark": [
     "91507.59",
     "91584.22",
     "91643.59",
     "91680.00",
     "91706.98",
     "91600.00"
    ],
    "better_than_average_pct": "-0.15",
    "recorded_at": "2026-09-12T06:21:00Z",
    "age": "aging"
   }
  ],
  "series": {
   "1w": {
    "days": 7,
    "points": [
     {
      "date": "2026-09-07",
      "average": "91180.34",
      "best": "92640.69",
      "low": "89520.55",
      "high": "92640.69",
      "change_pct": null
     },
     {
      "date": "2026-09-08",
      "average": "91257.79",
      "best": "92718.41",
      "low": "89597.78",
      "high": "92718.41",
      "change_pct": "0.08"
     },
     {
      "date": "2026-09-09",
      "average": "91315.27",
      "best": "92778.63",
      "low": "89658.09",
      "high": "92778.63",
      "change_pct": "0.06"
     },
     {
      "date": "2026-09-10",
      "average": "91364.72",
      "best": "92815.55",
      "low": "89695.89",
      "high": "92815.55",
      "change_pct": "0.05"
     },
     {
      "date": "2026-09-11",
      "average": "91523.34",
      "best": "92842.91",
      "low": "89800.00",
      "high": "92842.91",
      "change_pct": "0.17"
     },
     {
      "date": "2026-09-12",
      "average": "91733.33",
      "best": "92900.00",
      "low": "90600.00",
      "high": "92900.00",
      "change_pct": "0.23"
     }
    ],
    "average_change_pct": "0.61",
    "best_change_pct": "0.28",
    "stats": {
     "high": "91733.33",
     "low": "91180.34",
     "mean": "91395.80"
    }
   },
   "1m": {
    "days": 30,
    "points": [
     {
      "date": "2026-08-14",
      "average": "88960.57",
      "best": "90436.40",
      "low": "87432.39",
      "high": "90436.40",
      "change_pct": null
     },
     {
      "date": "2026-08-15",
      "average": "89109.20",
      "best": "90588.63",
      "low": "87579.62",
      "high": "90588.63",
      "change_pct": "0.17"
     },
     {
      "date": "2026-08-17",
      "average": "89390.52",
      "best": "90892.79",
      "low": "87848.53",
      "high": "90892.79",
      "change_pct": "0.32"
     },
     {
      "date": "2026-08-18",
      "average": "89512.10",
      "best": "91013.89",
      "low": "87965.65",
      "high": "91013.89",
      "change_pct": "0.14"
     },
     {
      "date": "2026-08-19",
      "average": "89614.78",
      "best": "91119.39",
      "low": "88067.69",
      "high": "91119.39",
      "change_pct": "0.11"
     },
     {
      "date": "2026-08-20",
      "average": "89698.43",
      "best": "91198.29",
      "low": "88152.42",
      "high": "91198.29",
      "change_pct": "0.09"
     },
     {
      "date": "2026-08-21",
      "average": "89757.50",
      "best": "91259.45",
      "low": "88211.57",
      "high": "91259.45",
      "change_pct": "0.07"
     },
     {
      "date": "2026-08-22",
      "average": "89796.67",
      "best": "91296.75",
      "low": "88247.64",
      "high": "91296.75",
      "change_pct": "0.04"
     },
     {
      "date": "2026-08-24",
      "average": "89861.63",
      "best": "91413.51",
      "low": "88163.08",
      "high": "91413.51",
      "change_pct": "0.07"
     },
     {
      "date": "2026-08-25",
      "average": "89877.62",
      "best": "91430.85",
      "low": "88177.74",
      "high": "91430.85",
      "change_pct": "0.02"
     },
     {
      "date": "2026-08-26",
      "average": "89882.72",
      "best": "91441.42",
      "low": "88206.90",
      "high": "91441.42",
      "change_pct": "0.01"
     },
     {
      "date": "2026-08-27",
      "average": "89917.67",
      "best": "91478.06",
      "low": "88240.22",
      "high": "91478.06",
      "change_pct": "0.04"
     },
     {
      "date": "2026-08-28",
      "average": "89969.88",
      "best": "91528.65",
      "low": "88291.22",
      "high": "91528.65",
      "change_pct": "0.06"
     },
     {
      "date": "2026-08-29",
      "average": "90044.01",
      "best": "91605.17",
      "low": "88363.08",
      "high": "91605.17",
      "change_pct": "0.08"
     },
     {
      "date": "2026-08-31",
      "average": "90253.60",
      "best": "91828.41",
      "low": "88578.87",
      "high": "91828.41",
      "change_pct": "0.23"
     },
     {
      "date": "2026-09-01",
      "average": "90391.05",
      "best": "91960.98",
      "low": "88709.12",
      "high": "91960.98",
      "change_pct": "0.15"
     },
     {
      "date": "2026-09-02",
      "average": "90535.90",
      "best": "92109.18",
      "low": "88850.27",
      "high": "92109.18",
      "change_pct": "0.16"
     },
     {
      "date": "2026-09-03",
      "average": "90702.88",
      "best": "92144.71",
      "low": "89041.12",
      "high": "92144.71",
      "change_pct": "0.18"
     },
     {
      "date": "2026-09-04",
      "average": "90848.63",
      "best": "92291.85",
      "low": "89185.46",
      "high": "92291.85",
      "change_pct": "0.16"
     },
     {
      "date": "2026-09-05",
      "average": "90961.23",
      "best": "92415.63",
      "low": "89307.21",
      "high": "92415.63",
      "change_pct": "0.12"
     },
     {
      "date": "2026-09-07",
      "average": "91180.34",
      "best": "92640.69",
      "low": "89520.55",
      "high": "92640.69",
      "change_pct": "0.24"
     },
     {
      "date": "2026-09-08",
      "average": "91257.79",
      "best": "92718.41",
      "low": "89597.78",
      "high": "92718.41",
      "change_pct": "0.08"
     },
     {
      "date": "2026-09-09",
      "average": "91315.27",
      "best": "92778.63",
      "low": "89658.09",
      "high": "92778.63",
      "change_pct": "0.06"
     },
     {
      "date": "2026-09-10",
      "average": "91364.72",
      "best": "92815.55",
      "low": "89695.89",
      "high": "92815.55",
      "change_pct": "0.05"
     },
     {
      "date": "2026-09-11",
      "average": "91523.34",
      "best": "92842.91",
      "low": "89800.00",
      "high": "92842.91",
      "change_pct": "0.17"
     },
     {
      "date": "2026-09-12",
      "average": "91733.33",
      "best": "92900.00",
      "low": "90600.00",
      "high": "92900.00",
      "change_pct": "0.23"
     }
    ],
    "average_change_pct": "3.12",
    "best_change_pct": "2.72",
    "stats": {
     "high": "91733.33",
     "low": "88960.57",
     "mean": "90286.98"
    }
   },
   "3m": {
    "days": 90,
    "points": [
     {
      "date": "2026-06-15",
      "average": "83911.42",
      "best": "85345.15",
      "low": "82440.36",
      "high": "85345.15",
      "change_pct": null
     },
     {
      "date": "2026-06-17",
      "average": "84076.74",
      "best": "85519.68",
      "low": "82544.41",
      "high": "85588.75",
      "change_pct": "0.20"
     },
     {
      "date": "2026-06-19",
      "average": "84349.95",
      "best": "85805.25",
      "low": "82788.02",
      "high": "85881.73",
      "change_pct": "0.32"
     },
     {
      "date": "2026-06-22",
      "average": "84707.02",
      "best": "86166.92",
      "low": "83080.82",
      "high": "86302.16",
      "change_pct": "0.42"
     },
     {
      "date": "2026-06-24",
      "average": "84999.79",
      "best": "86464.98",
      "low": "83461.86",
      "high": "86510.63",
      "change_pct": "0.35"
     },
     {
      "date": "2026-06-26",
      "average": "85154.93",
      "best": "86597.78",
      "low": "83627.04",
      "high": "86622.79",
      "change_pct": "0.18"
     },
     {
      "date": "2026-06-29",
      "average": "85229.77",
      "best": "86666.11",
      "low": "83690.31",
      "high": "86685.28",
      "change_pct": "0.09"
     },
     {
      "date": "2026-07-01",
      "average": "85279.88",
      "best": "86715.83",
      "low": "83744.50",
      "high": "86726.49",
      "change_pct": "0.06"
     },
     {
      "date": "2026-07-03",
      "average": "85370.16",
      "best": "86805.89",
      "low": "83818.12",
      "high": "86839.15",
      "change_pct": "0.11"
     },
     {
      "date": "2026-07-06",
      "average": "85598.29",
      "best": "87048.37",
      "low": "83968.35",
      "high": "87168.70",
      "change_pct": "0.27"
     },
     {
      "date": "2026-07-08",
      "average": "85883.80",
      "best": "87385.09",
      "low": "84213.83",
      "high": "87459.73",
      "change_pct": "0.33"
     },
     {
      "date": "2026-07-10",
      "average": "86175.46",
      "best": "87680.38",
      "low": "84502.64",
      "high": "87751.54",
      "change_pct": "0.34"
     },
     {
      "date": "2026-07-13",
      "average": "86492.52",
      "best": "87978.93",
      "low": "84764.48",
      "high": "88077.76",
      "change_pct": "0.37"
     },
     {
      "date": "2026-07-15",
      "average": "86694.18",
      "best": "88139.65",
      "low": "85020.96",
      "high": "88143.26",
      "change_pct": "0.23"
     },
     {
      "date": "2026-07-17",
      "average": "86770.41",
      "best": "88177.97",
      "low": "85218.28",
      "high": "88191.36",
      "change_pct": "0.09"
     },
     {
      "date": "2026-07-20",
      "average": "86819.32",
      "best": "88230.43",
      "low": "85249.99",
      "high": "88254.78",
      "change_pct": "0.06"
     },
     {
      "date": "2026-07-22",
      "average": "86924.85",
      "best": "88344.07",
      "low": "85342.34",
      "high": "88377.87",
      "change_pct": "0.12"
     },
     {
      "date": "2026-07-24",
      "average": "87102.99",
      "best": "88523.77",
      "low": "85494.83",
      "high": "88579.61",
      "change_pct": "0.20"
     },
     {
      "date": "2026-07-27",
      "average": "87426.38",
      "best": "88919.65",
      "low": "85743.39",
      "high": "89059.68",
      "change_pct": "0.37"
     },
     {
      "date": "2026-07-29",
      "average": "87798.07",
      "best": "89281.05",
      "low": "86168.53",
      "high": "89353.54",
      "change_pct": "0.43"
     },
     {
      "date": "2026-07-31",
      "average": "88046.63",
      "best": "89535.02",
      "low": "86430.49",
      "high": "89590.49",
      "change_pct": "0.28"
     },
     {
      "date": "2026-08-03",
      "average": "88248.48",
      "best": "89729.40",
      "low": "86611.01",
      "high": "89783.78",
      "change_pct": "0.23"
     },
     {
      "date": "2026-08-05",
      "average": "88257.54",
      "best": "89757.10",
      "low": "86750.30",
      "high": "89765.65",
      "change_pct": "0.01"
     },
     {
      "date": "2026-08-07",
      "average": "88309.55",
      "best": "89777.47",
      "low": "86776.99",
      "high": "89787.49",
      "change_pct": "0.06"
     },
     {
      "date": "2026-08-10",
      "average": "88425.04",
      "best": "89886.46",
      "low": "86831.64",
      "high": "89948.97",
      "change_pct": "0.13"
     },
     {
      "date": "2026-08-12",
      "average": "88624.36",
      "best": "90101.92",
      "low": "87034.48",
      "high": "90161.45",
      "change_pct": "0.23"
     },
     {
      "date": "2026-08-14",
      "average": "88886.77",
      "best": "90365.14",
      "low": "87277.72",
      "high": "90436.40",
      "change_pct": "0.30"
     },
     {
      "date": "2026-08-17",
      "average": "89249.86",
      "best": "90740.71",
      "low": "87579.62",
      "high": "90892.79",
      "change_pct": "0.41"
     },
     {
      "date": "2026-08-19",
      "average": "89563.44",
      "best": "91066.64",
      "low": "87965.65",
      "high": "91119.39",
      "change_pct": "0.35"
     },
     {
      "date": "2026-08-21",
      "average": "89727.97",
      "best": "91228.87",
      "low": "88152.42",
      "high": "91259.45",
      "change_pct": "0.18"
     },
     {
      "date": "2026-08-24",
      "average": "89829.15",
      "best": "91355.13",
      "low": "88163.08",
      "high": "91413.51",
      "change_pct": "0.11"
     },
     {
      "date": "2026-08-26",
      "average": "89880.17",
      "best": "91436.14",
      "low": "88177.74",
      "high": "91441.42",
      "change_pct": "0.06"
     },
     {
      "date": "2026-08-28",
      "average": "89943.77",
      "best": "91503.36",
      "low": "88240.22",
      "high": "91528.65",
      "change_pct": "0.07"
     },
     {
      "date": "2026-08-31",
      "average": "90148.81",
      "best": "91716.79",
      "low": "88363.08",
      "high": "91828.41",
      "change_pct": "0.23"
     },
     {
      "date": "2026-09-02",
      "average": "90463.47",
      "best": "92035.08",
      "low": "88709.12",
      "high": "92109.18",
      "change_pct": "0.35"
     },
     {
      "date": "2026-09-04",
      "average": "90775.75",
      "best": "92218.28",
      "low": "89041.12",
      "high": "92291.85",
      "change_pct": "0.35"
     },
     {
      "date": "2026-09-07",
      "average": "91070.78",
      "best": "92528.16",
      "low": "89307.21",
      "high": "92640.69",
      "change_pct": "0.33"
     },
     {
      "date": "2026-09-09",
      "average": "91286.53",
      "best": "92748.52",
      "low": "89597.78",
      "high": "92778.63",
      "change_pct": "0.24"
     },
     {
      "date": "2026-09-11",
      "average": "91444.03",
      "best": "92829.23",
      "low": "89695.89",
      "high": "92842.91",
      "change_pct": "0.17"
     },
     {
      "date": "2026-09-12",
      "average": "91733.33",
      "best": "92900.00",
      "low": "90600.00",
      "high": "92900.00",
      "change_pct": "0.32"
     }
    ],
    "average_change_pct": "9.32",
    "best_change_pct": "8.85",
    "stats": {
     "high": "91733.33",
     "low": "83911.42",
     "mean": "87765.62"
    }
   },
   "1y": {
    "days": 365,
    "points": [
     {
      "date": "2025-09-19",
      "average": "61891.96",
      "best": "62995.77",
      "low": "60650.67",
      "high": "63087.43",
      "change_pct": null
     },
     {
      "date": "2025-09-26",
      "average": "62211.01",
      "best": "63302.47",
      "low": "60811.37",
      "high": "63551.18",
      "change_pct": "0.52"
     },
     {
      "date": "2025-10-03",
      "average": "63013.58",
      "best": "64028.25",
      "low": "61371.69",
      "high": "64321.73",
      "change_pct": "1.29"
     },
     {
      "date": "2025-10-10",
      "average": "63500.48",
      "best": "64506.77",
      "low": "62198.60",
      "high": "64577.45",
      "change_pct": "0.77"
     },
     {
      "date": "2025-10-17",
      "average": "63935.75",
      "best": "64956.17",
      "low": "62407.13",
      "high": "65302.30",
      "change_pct": "0.69"
     },
     {
      "date": "2025-10-24",
      "average": "64799.95",
      "best": "65826.24",
      "low": "63206.05",
      "high": "66046.82",
      "change_pct": "1.35"
     },
     {
      "date": "2025-10-31",
      "average": "65100.02",
      "best": "66153.21",
      "low": "63806.13",
      "high": "66268.01",
      "change_pct": "0.46"
     },
     {
      "date": "2025-11-07",
      "average": "65726.66",
      "best": "66822.76",
      "low": "64236.84",
      "high": "67318.08",
      "change_pct": "0.96"
     },
     {
      "date": "2025-11-14",
      "average": "66487.64",
      "best": "67698.00",
      "low": "65025.42",
      "high": "67815.65",
      "change_pct": "1.16"
     },
     {
      "date": "2025-11-21",
      "average": "66781.22",
      "best": "67954.61",
      "low": "65378.13",
      "high": "68161.54",
      "change_pct": "0.44"
     },
     {
      "date": "2025-11-28",
      "average": "67593.98",
      "best": "68724.35",
      "low": "65839.57",
      "high": "68983.38",
      "change_pct": "1.22"
     },
     {
      "date": "2025-12-05",
      "average": "68134.37",
      "best": "69182.87",
      "low": "66717.03",
      "high": "69245.49",
      "change_pct": "0.80"
     },
     {
      "date": "2025-12-12",
      "average": "68541.50",
      "best": "69721.77",
      "low": "66938.34",
      "high": "70080.22",
      "change_pct": "0.60"
     },
     {
      "date": "2025-12-19",
      "average": "69403.49",
      "best": "70556.51",
      "low": "67812.97",
      "high": "70722.96",
      "change_pct": "1.26"
     },
     {
      "date": "2025-12-26",
      "average": "69750.37",
      "best": "70844.27",
      "low": "68499.04",
      "high": "70938.78",
      "change_pct": "0.50"
     },
     {
      "date": "2026-01-02",
      "average": "70305.39",
      "best": "71517.01",
      "low": "68589.48",
      "high": "71939.44",
      "change_pct": "0.80"
     },
     {
      "date": "2026-01-09",
      "average": "71091.31",
      "best": "72322.49",
      "low": "69489.90",
      "high": "72489.05",
      "change_pct": "1.12"
     },
     {
      "date": "2026-01-16",
      "average": "71379.44",
      "best": "72627.84",
      "low": "69915.26",
      "high": "72740.69",
      "change_pct": "0.41"
     },
     {
      "date": "2026-01-23",
      "average": "72158.19",
      "best": "73348.30",
      "low": "70346.29",
      "high": "73713.47",
      "change_pct": "1.09"
     },
     {
      "date": "2026-01-30",
      "average": "72743.87",
      "best": "74018.61",
      "low": "71242.96",
      "high": "74097.44",
      "change_pct": "0.81"
     },
     {
      "date": "2026-02-06",
      "average": "73101.78",
      "best": "74355.78",
      "low": "71480.32",
      "high": "74605.02",
      "change_pct": "0.49"
     },
     {
      "date": "2026-02-13",
      "average": "73999.78",
      "best": "75178.03",
      "low": "72315.46",
      "high": "75453.78",
      "change_pct": "1.23"
     },
     {
      "date": "2026-02-20",
      "average": "74413.28",
      "best": "75580.03",
      "low": "73050.28",
      "high": "75653.91",
      "change_pct": "0.56"
     },
     {
      "date": "2026-02-27",
      "average": "74921.93",
      "best": "76089.24",
      "low": "73270.21",
      "high": "76425.38",
      "change_pct": "0.68"
     },
     {
      "date": "2026-03-06",
      "average": "75732.93",
      "best": "76887.23",
      "low": "74207.10",
      "high": "77048.27",
      "change_pct": "1.08"
     },
     {
      "date": "2026-03-13",
      "average": "76030.19",
      "best": "77181.66",
      "low": "74680.53",
      "high": "77341.11",
      "change_pct": "0.39"
     },
     {
      "date": "2026-03-20",
      "average": "76752.94",
      "best": "78021.12",
      "low": "75059.00",
      "high": "78432.16",
      "change_pct": "0.95"
     },
     {
      "date": "2026-03-27",
      "average": "77392.80",
      "best": "78724.59",
      "low": "75959.45",
      "high": "78802.50",
      "change_pct": "0.83"
     },
     {
      "date": "2026-04-03",
      "average": "77709.11",
      "best": "79057.29",
      "low": "76244.87",
      "high": "79329.21",
      "change_pct": "0.41"
     },
     {
      "date": "2026-04-10",
      "average": "78578.31",
      "best": "79879.91",
      "low": "76872.40",
      "high": "80172.06",
      "change_pct": "1.12"
     },
     {
      "date": "2026-04-17",
      "average": "79015.69",
      "best": "80322.08",
      "low": "77625.83",
      "high": "80381.87",
      "change_pct": "0.56"
     },
     {
      "date": "2026-04-24",
      "average": "79488.03",
      "best": "80805.40",
      "low": "77725.14",
      "high": "81165.87",
      "change_pct": "0.60"
     },
     {
      "date": "2026-05-01",
      "average": "80313.77",
      "best": "81588.31",
      "low": "78559.15",
      "high": "81761.32",
      "change_pct": "1.04"
     },
     {
      "date": "2026-05-08",
      "average": "80618.17",
      "best": "81880.82",
      "low": "79117.25",
      "high": "82012.55",
      "change_pct": "0.38"
     },
     {
      "date": "2026-05-15",
      "average": "81309.70",
      "best": "82576.25",
      "low": "79428.72",
      "high": "82957.13",
      "change_pct": "0.86"
     },
     {
      "date": "2026-05-22",
      "average": "82015.86",
      "best": "83440.64",
      "low": "80356.68",
      "high": "83541.31",
      "change_pct": "0.87"
     },
     {
      "date": "2026-05-29",
      "average": "82304.04",
      "best": "83743.35",
      "low": "80660.07",
      "high": "83986.82",
      "change_pct": "0.35"
     },
     {
      "date": "2026-06-05",
      "average": "83135.98",
      "best": "84599.19",
      "low": "81204.51",
      "high": "84918.91",
      "change_pct": "1.01"
     },
     {
      "date": "2026-06-12",
      "average": "83648.29",
      "best": "85103.54",
      "low": "81954.95",
      "high": "85172.59",
      "change_pct": "0.62"
     },
     {
      "date": "2026-06-19",
      "average": "84089.86",
      "best": "85534.44",
      "low": "82420.72",
      "high": "85881.73",
      "change_pct": "0.53"
     },
     {
      "date": "2026-06-26",
      "average": "84953.91",
      "best": "86409.90",
      "low": "83080.82",
      "high": "86622.79",
      "change_pct": "1.03"
     },
     {
      "date": "2026-07-03",
      "average": "85293.27",
      "best": "86729.28",
      "low": "83690.31",
      "high": "86839.15",
      "change_pct": "0.40"
     },
     {
      "date": "2026-07-10",
      "average": "85885.85",
      "best": "87371.28",
      "low": "83968.35",
      "high": "87751.54",
      "change_pct": "0.69"
     },
     {
      "date": "2026-07-17",
      "average": "86652.37",
      "best": "88098.85",
      "low": "84764.48",
      "high": "88191.36",
      "change_pct": "0.89"
     },
     {
      "date": "2026-07-24",
      "average": "86949.05",
      "best": "88366.09",
      "low": "85249.99",
      "high": "88579.61",
      "change_pct": "0.34"
     },
     {
      "date": "2026-07-31",
      "average": "87757.03",
      "best": "89245.24",
      "low": "85743.39",
      "high": "89590.49",
      "change_pct": "0.93"
     },
     {
      "date": "2026-08-07",
      "average": "88271.86",
      "best": "89754.66",
      "low": "86611.01",
      "high": "89787.49",
      "change_pct": "0.59"
     },
     {
      "date": "2026-08-14",
      "average": "88645.39",
      "best": "90117.84",
      "low": "86831.64",
      "high": "90436.40",
      "change_pct": "0.42"
     },
     {
      "date": "2026-08-21",
      "average": "89513.76",
      "best": "91012.08",
      "low": "87579.62",
      "high": "91259.45",
      "change_pct": "0.98"
     },
     {
      "date": "2026-08-28",
      "average": "89884.37",
      "best": "91431.54",
      "low": "88163.08",
      "high": "91528.65",
      "change_pct": "0.41"
     },
     {
      "date": "2026-09-04",
      "average": "90462.68",
      "best": "91990.05",
      "low": "88363.08",
      "high": "92291.85",
      "change_pct": "0.64"
     },
     {
      "date": "2026-09-11",
      "average": "91267.11",
      "best": "92701.97",
      "low": "89307.21",
      "high": "92842.91",
      "change_pct": "0.89"
     },
     {
      "date": "2026-09-12",
      "average": "91733.33",
      "best": "92900.00",
      "low": "90600.00",
      "high": "92900.00",
      "change_pct": "0.51"
     }
    ],
    "average_change_pct": "48.22",
    "best_change_pct": "47.47",
    "stats": {
     "high": "91733.33",
     "low": "61674.30",
     "mean": "76484.63"
    }
   }
  },
  "week": {
   "days": [
    {
     "date": "2026-09-07",
     "weekday": 1,
     "this": "91180.34",
     "last": "90253.60"
    },
    {
     "date": "2026-09-08",
     "weekday": 2,
     "this": "91257.79",
     "last": "90391.05"
    },
    {
     "date": "2026-09-09",
     "weekday": 3,
     "this": "91315.27",
     "last": "90535.90"
    },
    {
     "date": "2026-09-10",
     "weekday": 4,
     "this": "91364.72",
     "last": "90702.88"
    },
    {
     "date": "2026-09-11",
     "weekday": 5,
     "this": "91523.34",
     "last": "90848.63"
    },
    {
     "date": "2026-09-12",
     "weekday": 6,
     "this": "91733.33",
     "last": "90961.23"
    }
   ],
   "this_average": "91395.80",
   "last_average": "90615.55",
   "change_pct": "0.86",
   "best_day": {
    "date": "2026-09-12",
    "weekday": 6,
    "value": "91733.33"
   }
  },
  "next_refresh_at": "2026-09-12T08:45:00Z"
 },
 "convert": {
  "v": 1,
  "generated_at": "2026-09-12T08:41:00Z",
  "query": {
   "asset": "gbp",
   "rate_type": "cash",
   "direction": "send"
  },
  "better": "higher",
  "status": "open",
  "amounts": [
   {
    "amount": 500,
    "offices": [
     {
      "rank": 1,
      "exchange": {
       "id": "pars",
       "name": "Pars"
      },
      "rate": "92850.00",
      "fee": "0.00",
      "result": "46425000.00",
      "recorded_at": "2026-09-12T08:38:00Z",
      "gap_to_best": "0.00"
     },
     {
      "rank": 2,
      "exchange": {
       "id": "nilo",
       "name": "Nilo"
      },
      "rate": "92300.00",
      "fee": "3.00",
      "result": "45873100.00",
      "recorded_at": "2026-09-12T08:14:00Z",
      "gap_to_best": "-551900.00"
     },
     {
      "rank": 3,
      "exchange": {
       "id": "ava",
       "name": "Ava"
      },
      "rate": "91400.00",
      "fee": "0.00",
      "result": "45700000.00",
      "recorded_at": "2026-09-12T07:56:00Z",
      "gap_to_best": "-725000.00"
     },
     {
      "rank": 4,
      "exchange": {
       "id": "royal",
       "name": "Royal"
      },
      "rate": "91150.00",
      "fee": "0.00",
      "result": "45575000.00",
      "recorded_at": "2026-09-12T08:20:00Z",
      "gap_to_best": "-850000.00"
     },
     {
      "rank": 5,
      "exchange": {
       "id": "milad",
       "name": "Milad"
      },
      "rate": "90900.00",
      "fee": "0.00",
      "result": "45450000.00",
      "recorded_at": "2026-09-12T07:27:00Z",
      "gap_to_best": "-975000.00"
     }
    ],
    "average_result": "45866666.67",
    "best_vs_average": "558333.33",
    "best_vs_last": "975000.00"
   },
   {
    "amount": 1000,
    "offices": [
     {
      "rank": 1,
      "exchange": {
       "id": "pars",
       "name": "Pars"
      },
      "rate": "92850.00",
      "fee": "0.00",
      "result": "92850000.00",
      "recorded_at": "2026-09-12T08:38:00Z",
      "gap_to_best": "0.00"
     },
     {
      "rank": 2,
      "exchange": {
       "id": "kian",
       "name": "Kian"
      },
      "rate": "91900.00",
      "fee": "0.00",
      "result": "91900000.00",
      "recorded_at": "2026-09-12T08:29:00Z",
      "gap_to_best": "-950000.00"
     },
     {
      "rank": 3,
      "exchange": {
       "id": "nilo",
       "name": "Nilo"
      },
      "rate": "92300.00",
      "fee": "6.00",
      "result": "91746200.00",
      "recorded_at": "2026-09-12T08:14:00Z",
      "gap_to_best": "-1103800.00"
     },
     {
      "rank": 4,
      "exchange": {
       "id": "aria",
       "name": "Aria"
      },
      "rate": "92900.00",
      "fee": "15.00",
      "result": "91506500.00",
      "recorded_at": "2026-09-12T08:33:00Z",
      "gap_to_best": "-1343500.00"
     },
     {
      "rank": 5,
      "exchange": {
       "id": "ava",
       "name": "Ava"
      },
      "rate": "91400.00",
      "fee": "0.00",
      "result": "91400000.00",
      "recorded_at": "2026-09-12T07:56:00Z",
      "gap_to_best": "-1450000.00"
     }
    ],
    "average_result": "91733333.33",
    "best_vs_average": "1116666.67",
    "best_vs_last": "1450000.00"
   },
   {
    "amount": 2000,
    "offices": [
     {
      "rank": 1,
      "exchange": {
       "id": "pars",
       "name": "Pars"
      },
      "rate": "92850.00",
      "fee": "0.00",
      "result": "185700000.00",
      "recorded_at": "2026-09-12T08:38:00Z",
      "gap_to_best": "0.00"
     },
     {
      "rank": 2,
      "exchange": {
       "id": "aria",
       "name": "Aria"
      },
      "rate": "92900.00",
      "fee": "15.00",
      "result": "184406500.00",
      "recorded_at": "2026-09-12T08:33:00Z",
      "gap_to_best": "-1293500.00"
     },
     {
      "rank": 3,
      "exchange": {
       "id": "kian",
       "name": "Kian"
      },
      "rate": "91900.00",
      "fee": "0.00",
      "result": "183800000.00",
      "recorded_at": "2026-09-12T08:29:00Z",
      "gap_to_best": "-1900000.00"
     },
     {
      "rank": 4,
      "exchange": {
       "id": "nilo",
       "name": "Nilo"
      },
      "rate": "92300.00",
      "fee": "12.00",
      "result": "183492400.00",
      "recorded_at": "2026-09-12T08:14:00Z",
      "gap_to_best": "-2207600.00"
     },
     {
      "rank": 5,
      "exchange": {
       "id": "ava",
       "name": "Ava"
      },
      "rate": "91400.00",
      "fee": "0.00",
      "result": "182800000.00",
      "recorded_at": "2026-09-12T07:56:00Z",
      "gap_to_best": "-2900000.00"
     }
    ],
    "average_result": "183466666.67",
    "best_vs_average": "2233333.33",
    "best_vs_last": "2900000.00"
   },
   {
    "amount": 5000,
    "offices": [
     {
      "rank": 1,
      "exchange": {
       "id": "pars",
       "name": "Pars"
      },
      "rate": "92850.00",
      "fee": "0.00",
      "result": "464250000.00",
      "recorded_at": "2026-09-12T08:38:00Z",
      "gap_to_best": "0.00"
     },
     {
      "rank": 2,
      "exchange": {
       "id": "aria",
       "name": "Aria"
      },
      "rate": "92900.00",
      "fee": "15.00",
      "result": "463106500.00",
      "recorded_at": "2026-09-12T08:33:00Z",
      "gap_to_best": "-1143500.00"
     },
     {
      "rank": 3,
      "exchange": {
       "id": "kian",
       "name": "Kian"
      },
      "rate": "91900.00",
      "fee": "0.00",
      "result": "459500000.00",
      "recorded_at": "2026-09-12T08:29:00Z",
      "gap_to_best": "-4750000.00"
     },
     {
      "rank": 4,
      "exchange": {
       "id": "nilo",
       "name": "Nilo"
      },
      "rate": "92300.00",
      "fee": "30.00",
      "result": "458731000.00",
      "recorded_at": "2026-09-12T08:14:00Z",
      "gap_to_best": "-5519000.00"
     },
     {
      "rank": 5,
      "exchange": {
       "id": "sepehr",
       "name": "Sepehr"
      },
      "rate": "91600.00",
      "fee": "5.00",
      "result": "457542000.00",
      "recorded_at": "2026-09-12T06:21:00Z",
      "gap_to_best": "-6708000.00"
     }
    ],
    "average_result": "458666666.67",
    "best_vs_average": "5583333.33",
    "best_vs_last": "6708000.00"
   }
  ],
  "next_refresh_at": "2026-09-12T08:45:00Z"
 },
 "board": {
  "v": 1,
  "generated_at": "2026-09-12T08:41:00Z",
  "query": {
   "rate_type": "cash",
   "direction": "send"
  },
  "status": "open",
  "currencies": [
   {
    "asset": "gbp",
    "average": "91733.33",
    "average_change_pct": "0.23",
    "average_change": "210.00",
    "best": {
     "exchange": {
      "id": "aria",
      "name": "Aria"
     },
     "rate": "92900.00"
    },
    "posted": 9,
    "spark": [
     "91180.34",
     "91257.79",
     "91315.27",
     "91364.72",
     "91523.34",
     "91733.33"
    ],
    "recorded_at": "2026-09-12T08:38:00Z"
   },
   {
    "asset": "usdt",
    "average": "72515.20",
    "average_change_pct": "0.23",
    "average_change": "166.00",
    "best": {
     "exchange": {
      "id": "aria",
      "name": "Aria"
     },
     "rate": "73437.45"
    },
    "posted": 9,
    "spark": [
     "72078.06",
     "72139.28",
     "72184.72",
     "72223.81",
     "72349.20",
     "72515.20"
    ],
    "recorded_at": "2026-09-12T08:38:00Z"
   },
   {
    "asset": "eur",
    "average": "77954.99",
    "average_change_pct": "0.23",
    "average_change": "178.46",
    "best": {
     "exchange": {
      "id": "aria",
      "name": "Aria"
     },
     "rate": "78946.42"
    },
    "posted": 9,
    "spark": [
     "77485.05",
     "77550.87",
     "77599.71",
     "77641.74",
     "77776.53",
     "77954.99"
    ],
    "recorded_at": "2026-09-12T08:38:00Z"
   },
   {
    "asset": "usd",
    "average": "72460.16",
    "average_change_pct": "0.23",
    "average_change": "165.88",
    "best": {
     "exchange": {
      "id": "aria",
      "name": "Aria"
     },
     "rate": "73381.71"
    },
    "posted": 9,
    "spark": [
     "72023.35",
     "72084.53",
     "72129.93",
     "72168.99",
     "72294.28",
     "72460.16"
    ],
    "recorded_at": "2026-09-12T08:38:00Z"
   },
   {
    "asset": "try",
    "average": "2116.29",
    "average_change_pct": "0.23",
    "average_change": "4.84",
    "best": {
     "exchange": {
      "id": "aria",
      "name": "Aria"
     },
     "rate": "2143.20"
    },
    "posted": 9,
    "spark": [
     "2103.53",
     "2105.32",
     "2106.64",
     "2107.78",
     "2111.44",
     "2116.29"
    ],
    "recorded_at": "2026-09-12T08:38:00Z"
   },
   {
    "asset": "aed",
    "average": "19731.84",
    "average_change_pct": "0.23",
    "average_change": "45.17",
    "best": {
     "exchange": {
      "id": "aria",
      "name": "Aria"
     },
     "rate": "19982.79"
    },
    "posted": 9,
    "spark": [
     "19612.89",
     "19629.55",
     "19641.91",
     "19652.55",
     "19686.67",
     "19731.84"
    ],
    "recorded_at": "2026-09-12T08:38:00Z"
   }
  ],
  "next_refresh_at": "2026-09-12T08:45:00Z"
 },
 "snapshot_sunday": {
  "v": 1,
  "generated_at": "2026-09-13T10:00:00Z",
  "query": {
   "asset": "gbp",
   "rate_type": "cash",
   "direction": "send"
  },
  "better": "higher",
  "market": {
   "status": "closed",
   "posted": 9,
   "average": "91733.33",
   "average_change_pct": "0.23",
   "average_change": "210.00",
   "highest": "92900.00",
   "highest_change_pct": "0.06",
   "lowest": "90600.00",
   "lowest_change_pct": "0.89",
   "lowest_exchange": {
    "id": "dena",
    "name": "Dena"
   },
   "spread_on_1000": "2300000.00",
   "spread_change_pct": "-24.41",
   "recorded_at": "2026-09-12T09:57:00Z",
   "oldest_at": "2026-09-12T06:30:00Z"
  },
  "best": [
   {
    "rank": 1,
    "exchange": {
     "id": "aria",
     "name": "Aria",
     "city": "London"
    },
    "rate": "92900.00",
    "change_pct": "0.06",
    "spark": [
     "92640.69",
     "92718.41",
     "92778.63",
     "92815.55",
     "92842.91",
     "92900.00"
    ],
    "better_than_average_pct": "1.27",
    "recorded_at": "2026-09-12T09:52:00Z",
    "age": "expired"
   },
   {
    "rank": 2,
    "exchange": {
     "id": "pars",
     "name": "Pars",
     "city": "London"
    },
    "rate": "92850.00",
    "change_pct": "0.16",
    "spark": [
     "92509.17",
     "92589.03",
     "92642.68",
     "92681.76",
     "92702.58",
     "92850.00"
    ],
    "better_than_average_pct": "1.22",
    "recorded_at": "2026-09-12T09:57:00Z",
    "age": "expired"
   },
   {
    "rank": 3,
    "exchange": {
     "id": "nilo",
     "name": "Nilo",
     "city": "London"
    },
    "rate": "92300.00",
    "change_pct": "0.04",
    "spark": [
     "92073.77",
     "92153.16",
     "92206.49",
     "92245.34",
     "92266.04",
     "92300.00"
    ],
    "better_than_average_pct": "0.62",
    "recorded_at": "2026-09-12T09:33:00Z",
    "age": "expired"
   },
   {
    "rank": 4,
    "exchange": {
     "id": "kian",
     "name": "Kian",
     "city": "Manchester"
    },
    "rate": "91900.00",
    "change_pct": "0.08",
    "spark": [
     "91633.55",
     "91710.44",
     "91765.69",
     "91802.22",
     "91824.98",
     "91900.00"
    ],
    "better_than_average_pct": "0.18",
    "recorded_at": "2026-09-12T09:48:00Z",
    "age": "expired"
   },
   {
    "rank": 5,
    "exchange": {
     "id": "sepehr",
     "name": "Sepehr",
     "city": "Glasgow"
    },
    "rate": "91600.00",
    "change_pct": "-0.12",
    "spark": [
     "91507.59",
     "91584.22",
     "91643.59",
     "91680.00",
     "91706.98",
     "91600.00"
    ],
    "better_than_average_pct": "-0.15",
    "recorded_at": "2026-09-12T07:40:00Z",
    "age": "expired"
   }
  ],
  "next_refresh_at": "2026-09-13T11:00:00Z"
 },
 "snapshot_morning_not_posted": {
  "v": 1,
  "generated_at": "2026-09-12T08:41:00Z",
  "query": {
   "asset": "gbp",
   "rate_type": "cash",
   "direction": "send"
  },
  "better": "higher",
  "market": {
   "status": "not_posted",
   "posted": 9,
   "average": "91733.33",
   "average_change_pct": "0.23",
   "average_change": "210.00",
   "highest": "92900.00",
   "highest_change_pct": "0.06",
   "lowest": "90600.00",
   "lowest_change_pct": "0.89",
   "lowest_exchange": {
    "id": "dena",
    "name": "Dena"
   },
   "spread_on_1000": "2300000.00",
   "spread_change_pct": "-24.41",
   "recorded_at": "2026-09-11T12:38:00Z",
   "oldest_at": "2026-09-11T09:11:00Z"
  },
  "best": [
   {
    "rank": 1,
    "exchange": {
     "id": "aria",
     "name": "Aria",
     "city": "London"
    },
    "rate": "92900.00",
    "change_pct": "0.06",
    "spark": [
     "92640.69",
     "92718.41",
     "92778.63",
     "92815.55",
     "92842.91",
     "92900.00"
    ],
    "better_than_average_pct": "1.27",
    "recorded_at": "2026-09-11T12:33:00Z",
    "age": "stale"
   },
   {
    "rank": 2,
    "exchange": {
     "id": "pars",
     "name": "Pars",
     "city": "London"
    },
    "rate": "92850.00",
    "change_pct": "0.16",
    "spark": [
     "92509.17",
     "92589.03",
     "92642.68",
     "92681.76",
     "92702.58",
     "92850.00"
    ],
    "better_than_average_pct": "1.22",
    "recorded_at": "2026-09-11T12:38:00Z",
    "age": "stale"
   },
   {
    "rank": 3,
    "exchange": {
     "id": "nilo",
     "name": "Nilo",
     "city": "London"
    },
    "rate": "92300.00",
    "change_pct": "0.04",
    "spark": [
     "92073.77",
     "92153.16",
     "92206.49",
     "92245.34",
     "92266.04",
     "92300.00"
    ],
    "better_than_average_pct": "0.62",
    "recorded_at": "2026-09-11T12:14:00Z",
    "age": "stale"
   },
   {
    "rank": 4,
    "exchange": {
     "id": "kian",
     "name": "Kian",
     "city": "Manchester"
    },
    "rate": "91900.00",
    "change_pct": "0.08",
    "spark": [
     "91633.55",
     "91710.44",
     "91765.69",
     "91802.22",
     "91824.98",
     "91900.00"
    ],
    "better_than_average_pct": "0.18",
    "recorded_at": "2026-09-11T12:29:00Z",
    "age": "stale"
   },
   {
    "rank": 5,
    "exchange": {
     "id": "sepehr",
     "name": "Sepehr",
     "city": "Glasgow"
    },
    "rate": "91600.00",
    "change_pct": "-0.12",
    "spark": [
     "91507.59",
     "91584.22",
     "91643.59",
     "91680.00",
     "91706.98",
     "91600.00"
    ],
    "better_than_average_pct": "-0.15",
    "recorded_at": "2026-09-11T10:21:00Z",
    "age": "stale"
   }
  ],
  "next_refresh_at": "2026-09-12T08:45:00Z"
 },
 "snapshot_receive": {
  "v": 1,
  "generated_at": "2026-09-12T08:41:00Z",
  "query": {
   "asset": "gbp",
   "rate_type": "cash",
   "direction": "recv"
  },
  "better": "lower",
  "market": {
   "status": "open",
   "posted": 9,
   "average": "93135.42",
   "average_change_pct": "0.22",
   "average_change": "204.98",
   "highest": "94219.18",
   "highest_change_pct": "0.06",
   "lowest": "92094.90",
   "lowest_change_pct": "0.92",
   "lowest_exchange": {
    "id": "dena",
    "name": "Dena"
   },
   "spread_on_1000": "2124280.00",
   "spread_change_pct": "-26.91",
   "recorded_at": "2026-09-12T08:38:00Z",
   "oldest_at": "2026-09-12T05:11:00Z"
  },
  "best": [
   {
    "rank": 1,
    "exchange": {
     "id": "dena",
     "name": "Dena",
     "city": "London"
    },
    "rate": "92094.90",
    "change_pct": "0.08",
    "spark": [
     "91824.59",
     "91903.80",
     "91961.33",
     "92000.09",
     "92025.06",
     "92094.90"
    ],
    "better_than_average_pct": "1.12",
    "recorded_at": "2026-09-12T05:11:00Z",
    "age": "aging"
   },
   {
    "rank": 2,
    "exchange": {
     "id": "milad",
     "name": "Milad",
     "city": "London"
    },
    "rate": "92354.40",
    "change_pct": "0.03",
    "spark": [
     "92123.99",
     "92201.26",
     "92261.11",
     "92297.82",
     "92325.03",
     "92354.40"
    ],
    "better_than_average_pct": "0.84",
    "recorded_at": "2026-09-12T07:27:00Z",
    "age": "fresh"
   },
   {
    "rank": 3,
    "exchange": {
     "id": "royal",
     "name": "Royal",
     "city": "Birmingham"
    },
    "rate": "92499.02",
    "change_pct": "-0.05",
    "spark": [
     "92343.79",
     "92421.18",
     "92481.13",
     "92517.89",
     "92545.14",
     "92499.02"
    ],
    "better_than_average_pct": "0.68",
    "recorded_at": "2026-09-12T08:20:00Z",
    "age": "fresh"
   },
   {
    "rank": 4,
    "exchange": {
     "id": "ava",
     "name": "Ava",
     "city": "Manchester"
    },
    "rate": "92834.98",
    "change_pct": "-0.10",
    "spark": [
     "92726.36",
     "92806.21",
     "92868.55",
     "92907.63",
     "92928.45",
     "92834.98"
    ],
    "better_than_average_pct": "0.32",
    "recorded_at": "2026-09-12T07:56:00Z",
    "age": "fresh"
   },
   {
    "rank": 5,
    "exchange": {
     "id": "sepehr",
     "name": "Sepehr",
     "city": "Glasgow"
    },
    "rate": "92992.32",
    "change_pct": "-0.12",
    "spark": [
     "92898.50",
     "92976.30",
     "93036.57",
     "93073.53",
     "93100.93",
     "92992.32"
    ],
    "better_than_average_pct": "0.15",
    "recorded_at": "2026-09-12T06:21:00Z",
    "age": "aging"
   }
  ],
  "next_refresh_at": "2026-09-12T08:45:00Z"
 }
};
