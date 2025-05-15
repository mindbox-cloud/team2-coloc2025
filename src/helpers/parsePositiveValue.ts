export const parsePositiveValue = (value: string) => {
  const parsedValue = Number(value);
  if (parsedValue < 1) {
    return 1;
  }
  return parsedValue;
};

export function clampValue(value: number, min: number, max?: number): number {
  if (value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

export function createMinValueValidator(min: number) {
  return (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (Number(target.value) < min) {
      target.value = min.toString();
    }
  };
}

export function createRangeValidator(min: number, max: number) {
  return (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);

    if (value < min) {
      target.value = min.toString();
    } else if (value > max) {
      target.value = max.toString();
    }
  };
}
