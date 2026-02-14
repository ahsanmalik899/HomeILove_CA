export const formatPrice = (price?: number | string) => {
  const value = Number(price);
  if (isNaN(value)) return "0";
  return value.toLocaleString();
};
