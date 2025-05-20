function sum(m, n) {
  if (typeof m !== 'number' || typeof n !== 'number') {
    throw new TypeError('Оба аргумента должны быть числами');
  }

  return m + n;
}
