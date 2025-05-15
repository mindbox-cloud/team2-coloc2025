import { ISoldier } from "../game";

export function attackTarget(
  target: [number, number],
  attacker: ISoldier,
  newState: (ISoldier | null)[][]
): void {
  const [tx, ty] = target;
  const targetSoldier = newState[ty][tx];
  if (targetSoldier) {
    const isCritical = Math.random() < attacker.army.criticalPercent / 100;
    const damage = isCritical
      ? attacker.army.strength * 2
      : attacker.army.strength;
    targetSoldier.currentHp -= damage;

    targetSoldier.attacked = {
      by: attacker,
      damage,
      isCritical,
    };

    if (targetSoldier.currentHp <= 0) {
      newState[ty][tx] = null;
    }
  }
}
