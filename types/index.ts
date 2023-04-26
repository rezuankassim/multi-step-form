export type Plan = {
  title: string;
  value: string;
  icon: string;
  price: string;
  priceValue: number;
  yearPrice: string;
  yearPriceValue: number;
};

export type AddOn = {
  id: string;
  value: string;
  title: string;
  subtitle: string;
  price: string;
  priceValue: number;
  yearPrice: string;
  yearPriceValue: number;
};

export type Step = {
  label: string;
};
