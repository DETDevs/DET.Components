export const iso = (d: Date) => d.toISOString().split('T')[0];

export const addMonths = (d: Date, n: number) => {
  const copy = new Date(d);
  copy.setMonth(copy.getMonth() + n);
  return copy;
};

export const getMonthMatrix = (year: number, month: number, weekStartsOn = 0) => {
  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const cursor = new Date(year, month, 1 - offset);

  const matrix: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    matrix.push(row);
  }
  return matrix;
};
