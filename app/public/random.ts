export interface Random {
  string: () => string;
  number: () => number;
}

export function randomName() {
  return Math.random().toString(36).slice(-8);
}

export function randomPrice() {
  return Math.round(Math.random() * 100) / 10;
}

export const random: Random = {
  string: () => randomName(),
  number: () => randomPrice(),
};
