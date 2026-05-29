export type ProductLine = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  inverters: Item[];
  batteries: Item[];
};

export type Item = {
  id: string;
  name: string;
  spec: string;
  power: string;
  features: string[];
  price: number; // Naira
};

export const PRODUCTS: ProductLine[] = [
  {
    slug: "deye",
    name: "Deye",
    tagline: "High-output hybrid inverters & storage",
    description: "Deye hybrid inverters and battery packs for homes and commercial loads.",
    inverters: [
      { id: "deye-i-5k", name: "Deye 5 KVA", spec: "48 Volts", power: "5,000 VA", features: ["Hybrid", "MPPT", "Grid-tied"], price: 500000 },
      { id: "deye-i-6k", name: "Deye 6 KVA", spec: "48 Volts", power: "6,000 VA", features: ["Hybrid", "MPPT"], price: 600000 },
      { id: "deye-i-10k", name: "Deye 10 KVA", spec: "48 Volts", power: "10,000 VA", features: ["Hybrid", "Parallel"], price: 1250000 },
      { id: "deye-i-12k", name: "Deye 12 KVA", spec: "48 Volts", power: "12,000 VA", features: ["Hybrid", "3-phase ready"], price: 1300000 },
    ],
    batteries: [
      { id: "deye-b-16", name: "Deye 16 KWh", spec: "48 Volts · LiFePO4", power: "16,000 Wh", features: ["Wall mount", "BMS"], price: 2700000 },
    ],
  },
  {
    slug: "lv-topson",
    name: "LV Topson",
    tagline: "Inverters and lithium storage",
    description: "LV Topson inverter range with matched LiFePO4 batteries from 100Ah to 32kWh.",
    inverters: [
      { id: "lvt-i-4k", name: "LV Topson 4 KVA", spec: "24 Volts", power: "4,000 VA", features: ["Pure sine"], price: 370000 },
      { id: "lvt-i-6k", name: "LV Topson 6 KVA", spec: "48 Volts", power: "6,000 VA", features: ["Hybrid"], price: 470000 },
      { id: "lvt-i-12k", name: "LV Topson 12 KVA", spec: "48 Volts", power: "12,000 VA", features: ["High output"], price: 1000000 },
    ],
    batteries: [
      { id: "lvt-b-100", name: "LV Topson 100Ah", spec: "12 Volts", power: "1,200 Wh", features: ["LiFePO4"], price: 250000 },
      { id: "lvt-b-200", name: "LV Topson 200Ah", spec: "12 Volts", power: "2,400 Wh", features: ["LiFePO4"], price: 400000 },
      { id: "lvt-b-25", name: "LV Topson 2.5 KWh", spec: "24 Volts", power: "2,500 Wh", features: ["LiFePO4"], price: 600000 },
      { id: "lvt-b-5", name: "LV Topson 5 KWh", spec: "24 / 48 Volts", power: "5,000 Wh", features: ["LiFePO4"], price: 1000000 },
      { id: "lvt-b-7", name: "LV Topson 7.16 KWh", spec: "48 Volts", power: "7,160 Wh", features: ["LiFePO4"], price: 1300000 },
      { id: "lvt-b-10", name: "LV Topson 10 KWh", spec: "48 Volts", power: "10,000 Wh", features: ["Rack"], price: 1750000 },
      { id: "lvt-b-15", name: "LV Topson 15 KWh", spec: "48 Volts", power: "15,000 Wh", features: ["Rack"], price: 2000000 },
      { id: "lvt-b-16-g3", name: "LV Topson 16 KWh (G3)", spec: "48 Volts", power: "16,000 Wh", features: ["G3"], price: 2200000 },
      { id: "lvt-b-16-g4", name: "LV Topson 16 KWh (G4)", spec: "48 Volts", power: "16,000 Wh", features: ["G4"], price: 2700000 },
      { id: "lvt-b-32", name: "LV Topson 32 KWh", spec: "48 Volts", power: "32,000 Wh", features: ["High capacity"], price: 4200000 },
    ],
  },
  {
    slug: "sunmate",
    name: "SunMate",
    tagline: "SMS inverter and battery range",
    description: "SunMate (SMS) inverters and batteries — reliable performance for homes and offices.",
    inverters: [
      { id: "sm-i-1k", name: "SunMate 1 KVA", spec: "12 Volts", power: "1,000 VA", features: ["Pure sine"], price: 200000 },
      { id: "sm-i-2k", name: "SunMate 2 KVA", spec: "12 Volts", power: "2,000 VA", features: ["Pure sine"], price: 260000 },
      { id: "sm-i-36k", name: "SunMate 3.6 KVA", spec: "24 Volts", power: "3,600 VA", features: ["MPPT"], price: 330000 },
      { id: "sm-i-42k", name: "SunMate 4.2 KVA", spec: "24 Volts", power: "4,200 VA", features: ["MPPT"], price: 380000 },
      { id: "sm-i-5k", name: "SunMate 5 KVA", spec: "24 Volts", power: "5,000 VA", features: ["MPPT"], price: 400000 },
      { id: "sm-i-5kp", name: "SunMate 5 KVA Parallel", spec: "48 Volts", power: "5,000 VA", features: ["Parallel function"], price: 440000 },
      { id: "sm-i-65k", name: "SunMate 6.5 KVA", spec: "48 Volts", power: "6,500 VA", features: ["Hybrid"], price: 800000 },
    ],
    batteries: [
      { id: "sm-b-100", name: "SunMate 100Ah", spec: "12 Volts", power: "1,200 Wh", features: ["LiFePO4"], price: 250000 },
      { id: "sm-b-200", name: "SunMate 200Ah", spec: "12 Volts", power: "2,400 Wh", features: ["LiFePO4"], price: 390000 },
      { id: "sm-b-300", name: "SunMate 300Ah", spec: "12 Volts", power: "3,600 Wh", features: ["LiFePO4"], price: 450000 },
      { id: "sm-b-5", name: "SunMate 5 KWh", spec: "24 / 48 Volts", power: "5,000 Wh", features: ["LiFePO4"], price: 950000 },
      { id: "sm-b-75", name: "SunMate 7.5 KWh", spec: "24 Volts", power: "7,500 Wh", features: ["LiFePO4"], price: 1150000 },
      { id: "sm-b-10", name: "SunMate 10 KWh", spec: "48 Volts", power: "10,000 Wh", features: ["Rack"], price: 1600000 },
      { id: "sm-b-15", name: "SunMate 15 KWh", spec: "48 Volts", power: "15,000 Wh", features: ["Rack"], price: 1800000 },
    ],
  },
  {
    slug: "itel",
    name: "Itel",
    tagline: "Itel solar inverters, batteries & power tanks",
    description: "Full Itel solar range — power tanks, inverters from 1.5 KVA to 12 KVA and batteries up to 32 KWh.",
    inverters: [
      { id: "itel-i-15", name: "Itel 1.5 KVA", spec: "12 Volts", power: "1,500 VA", features: ["Pure sine"], price: 230000 },
      { id: "itel-i-3", name: "Itel 3 KVA", spec: "24 Volts", power: "3,000 VA", features: ["MPPT"], price: 320000 },
      { id: "itel-i-4", name: "Itel 4 KVA", spec: "24 Volts", power: "4,000 VA", features: ["MPPT"], price: 400000 },
      { id: "itel-i-6", name: "Itel 6 KVA", spec: "48 Volts", power: "6,000 VA", features: ["MPPT"], price: 540000 },
      { id: "itel-i-8", name: "Itel 8 KVA (Single phase)", spec: "48 Volts", power: "8,000 VA", features: ["Single phase"], price: 700000 },
      { id: "itel-i-8-3", name: "Itel 8 KVA (3 phase)", spec: "48 Volts", power: "8,000 VA", features: ["3-phase"], price: 2320000 },
      { id: "itel-i-12", name: "Itel 12 KVA (Single phase)", spec: "48 Volts", power: "12,000 VA", features: ["Single phase"], price: 2150000 },
      { id: "itel-i-12-3", name: "Itel 12 KVA (3 phase)", spec: "48 Volts", power: "12,000 VA", features: ["3-phase"], price: 2460000 },
      { id: "itel-pt-1", name: "Itel 1 KW Power Tank", spec: "Solar Gen", power: "1,000 W", features: ["All-in-one"], price: 350000 },
      { id: "itel-pt-36", name: "Itel 3.6 KW Power Tank", spec: "Solar Gen", power: "3,600 W", features: ["All-in-one"], price: 1700000 },
    ],
    batteries: [
      { id: "itel-b-100", name: "Itel 100Ah", spec: "12 Volts", power: "1,200 Wh", features: ["LiFePO4"], price: 220000 },
      { id: "itel-b-25", name: "Itel 2.5 KWh", spec: "24 Volts", power: "2,500 Wh", features: ["LiFePO4"], price: 600000 },
      { id: "itel-b-5-24", name: "Itel 5 KWh (24V)", spec: "24 Volts", power: "5,000 Wh", features: ["LiFePO4"], price: 950000 },
      { id: "itel-b-5-48", name: "Itel 5 KWh (48V)", spec: "48 Volts", power: "5,000 Wh", features: ["LiFePO4"], price: 1050000 },
      { id: "itel-b-10", name: "Itel 10 KWh", spec: "48 Volts", power: "10,000 Wh", features: ["Rack"], price: 1750000 },
      { id: "itel-b-16", name: "Itel 16 KWh", spec: "48 Volts", power: "16,000 Wh", features: ["Rack"], price: 2250000 },
      { id: "itel-b-32", name: "Itel 32 KWh", spec: "48 Volts", power: "32,000 Wh", features: ["High capacity"], price: 4300000 },
    ],
  },
  {
    slug: "felicity",
    name: "Felicity",
    tagline: "Felicity inverters and batteries",
    description: "Felicity inverters from 3 KVA to 50 KVA high voltage plus matched batteries.",
    inverters: [
      { id: "fel-i-3", name: "Felicity 3 KVA", spec: "24 Volts", power: "3,000 VA", features: ["Pure sine"], price: 350000 },
      { id: "fel-i-4", name: "Felicity 4 KVA", spec: "24 Volts", power: "4,000 VA", features: ["MPPT"], price: 450000 },
      { id: "fel-i-6", name: "Felicity 6 KVA", spec: "48 Volts", power: "6,000 VA", features: ["MPPT"], price: 650000 },
      { id: "fel-i-8", name: "Felicity 8 KVA", spec: "48 Volts", power: "8,000 VA", features: ["MPPT"], price: 800000 },
      { id: "fel-i-12", name: "Felicity 12 KVA", spec: "48 Volts", power: "12,000 VA", features: ["Hybrid"], price: 950000 },
      { id: "fel-i-20", name: "Felicity 20 KVA (3-phase)", spec: "48 Volts · 3-phase", power: "20,000 VA", features: ["3-phase only"], price: 2600000 },
      { id: "fel-i-30", name: "Felicity 30 KVA (3-phase)", spec: "48 Volts · 3-phase", power: "30,000 VA", features: ["3-phase"], price: 3200000 },
      { id: "fel-i-50", name: "Felicity 50 KVA HV", spec: "High Voltage", power: "50,000 VA", features: ["High voltage"], price: 6500000 },
    ],
    batteries: [
      { id: "fel-b-100", name: "Felicity 100Ah", spec: "12 Volts", power: "1,200 Wh", features: ["LiFePO4"], price: 400000 },
      { id: "fel-b-200", name: "Felicity 200Ah", spec: "12 Volts", power: "2,400 Wh", features: ["LiFePO4"], price: 550000 },
    ],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG");

export const findItem = (id: string): { item: Item; line: ProductLine; type: "inverter" | "battery" } | undefined => {
  for (const line of PRODUCTS) {
    const inv = line.inverters.find((i) => i.id === id);
    if (inv) return { item: inv, line, type: "inverter" };
    const bat = line.batteries.find((b) => b.id === id);
    if (bat) return { item: bat, line, type: "battery" };
  }
  return undefined;
};