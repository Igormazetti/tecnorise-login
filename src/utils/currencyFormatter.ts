export const formatCurrency = (value: string): string => {
  const numberValue = parseInt(value.replace(/\D/g, ""), 10);
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue / 100);
  return formattedValue;
};
