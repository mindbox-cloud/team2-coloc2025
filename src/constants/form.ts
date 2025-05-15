export const DEFAULT_ARMY_FIELDS = [
  { id: "size", label: "Размер армии:", min: 1, max: 100, default: 10 },
  {
    id: "hp",
    label: " Здоровье солдата:",
    min: 1,
    max: 100,
    default: 10,
  },
  { id: "strength", label: "Сила удара:", min: 1, max: 10, default: 1 },
  {
    id: "visionLength",
    label: "Дальность обзора:",
    min: 1,
    max: 10,
    default: 3,
  },
  {
    id: "criticalPercent",
    label: "Шанс критического удара:",
    min: 0,
    max: 100,
    default: 10,
  },
];

export const DEFAULT_COLORS = ["#0d6efd", "#dc3545", "#20c997", "#0dcaf0"];
