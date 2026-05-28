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
};

export const PRODUCTS: ProductLine[] = [
  {
    slug: "grace-apex",
    name: "Grace Apex",
    tagline: "Flagship hybrid power systems",
    description:
      "Our top-tier hybrid line built for commercial deployments and high-output residential stacks.",
    inverters: [
      { id: "apex-i-12k", name: "Apex H12K", spec: "12kW · 3-phase", power: "12,000 W", features: ["MPPT x3", "Off-grid ready", "IP65"] },
      { id: "apex-i-20k", name: "Apex H20K", spec: "20kW · 3-phase", power: "20,000 W", features: ["MPPT x4", "Parallel up to 10", "WiFi/4G"] },
      { id: "apex-i-30k", name: "Apex H30K", spec: "30kW · 3-phase", power: "30,000 W", features: ["MPPT x6", "Hot standby", "Smart EMS"] },
    ],
    batteries: [
      { id: "apex-b-15", name: "Apex Stack 15", spec: "LiFePO4 · 15kWh", power: "15,000 Wh", features: ["6000 cycles", "Wall mount", "IP65"] },
      { id: "apex-b-30", name: "Apex Stack 30", spec: "LiFePO4 · 30kWh", power: "30,000 Wh", features: ["Modular", "Rack mount", "BMS+"] },
    ],
  },
  {
    slug: "grace-hybrid",
    name: "Grace Hybrid",
    tagline: "All-in-one residential solutions",
    description:
      "A complete home energy ecosystem — inverter, battery and EMS pre-paired for a clean install.",
    inverters: [
      { id: "hyb-i-5k", name: "Hybrid 5K", spec: "5kW · 1-phase", power: "5,000 W", features: ["Dual MPPT", "Battery ready", "Silent"] },
      { id: "hyb-i-8k", name: "Hybrid 8K", spec: "8kW · 1-phase", power: "8,000 W", features: ["Dual MPPT", "Backup", "App control"] },
    ],
    batteries: [
      { id: "hyb-b-5", name: "Hybrid Wall 5", spec: "LiFePO4 · 5kWh", power: "5,000 Wh", features: ["Slim wall", "Plug-and-play"] },
      { id: "hyb-b-10", name: "Hybrid Wall 10", spec: "LiFePO4 · 10kWh", power: "10,000 Wh", features: ["Stackable", "10yr warranty"] },
    ],
  },
  {
    slug: "grace-edge",
    name: "Grace Edge",
    tagline: "Off-grid and remote deployments",
    description: "Rugged systems engineered for telecom sites, rural homes and off-grid microgrids.",
    inverters: [
      { id: "edge-i-3k", name: "Edge 3K", spec: "3kW off-grid", power: "3,000 W", features: ["Pure sine", "MPPT 60A", "Compact"] },
      { id: "edge-i-5k", name: "Edge 5K", spec: "5kW off-grid", power: "5,000 W", features: ["MPPT 100A", "Parallel", "Generator-ready"] },
    ],
    batteries: [
      { id: "edge-b-24", name: "Edge 24V Pack", spec: "LiFePO4 · 24V/200Ah", power: "4,800 Wh", features: ["Cold-rated", "Steel case"] },
      { id: "edge-b-48", name: "Edge 48V Pack", spec: "LiFePO4 · 48V/200Ah", power: "9,600 Wh", features: ["CAN bus", "Field serviceable"] },
    ],
  },
  {
    slug: "grace-titan",
    name: "Grace Titan",
    tagline: "Industrial-grade storage",
    description: "Container-scale storage for factories, farms and EV charging hubs.",
    inverters: [
      { id: "tit-i-50k", name: "Titan 50K", spec: "50kW industrial", power: "50,000 W", features: ["3-phase", "Grid-tied", "SCADA"] },
      { id: "tit-i-100k", name: "Titan 100K", spec: "100kW industrial", power: "100,000 W", features: ["Modular", "N+1", "Hot-swap"] },
    ],
    batteries: [
      { id: "tit-b-100", name: "Titan Rack 100", spec: "LiFePO4 · 100kWh", power: "100,000 Wh", features: ["19\" rack", "Liquid cooled"] },
      { id: "tit-b-250", name: "Titan Container", spec: "LiFePO4 · 250kWh", power: "250,000 Wh", features: ["Containerized", "Fire-suppressed"] },
    ],
  },
  {
    slug: "grace-pulse",
    name: "Grace Pulse",
    tagline: "Portable & emergency power",
    description: "Compact units for backup, events and mobile work — silent power on demand.",
    inverters: [
      { id: "pul-i-1k", name: "Pulse 1K", spec: "1kW portable", power: "1,000 W", features: ["USB-C PD", "AC + DC out"] },
      { id: "pul-i-2k", name: "Pulse 2K", spec: "2kW portable", power: "2,000 W", features: ["Solar input", "App"] },
    ],
    batteries: [
      { id: "pul-b-1", name: "Pulse Cell 1", spec: "LiFePO4 · 1kWh", power: "1,000 Wh", features: ["3500 cycles", "5kg"] },
      { id: "pul-b-2", name: "Pulse Cell 2", spec: "LiFePO4 · 2kWh", power: "2,000 Wh", features: ["Expandable", "IP54"] },
    ],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);