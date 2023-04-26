import {AddOn, Plan, Step} from '@/types';

export const steps: Step[] = [
  {
    label: 'Your Info',
  },
  {
    label: 'Select Plan',
  },
  {
    label: 'Add-Ons',
  },
  {
    label: 'Summary',
  },
];

export const plans: Plan[] = [
  {
    title: 'Arcade',
    value: 'arcade',
    icon: '/icon-arcade.svg',
    price: '$9/mo',
    priceValue: 9,
    yearPrice: '$90/yr',
    yearPriceValue: 90,
  },
  {
    title: 'Advanced',
    value: 'advanced',
    icon: '/icon-advanced.svg',
    price: '$12/mo',
    priceValue: 12,
    yearPrice: '$120/yr',
    yearPriceValue: 120,
  },
  {
    title: 'Pro',
    value: 'pro',
    icon: '/icon-pro.svg',
    price: '$15/mo',
    priceValue: 15,
    yearPrice: '$150/yr',
    yearPriceValue: 150,
  },
];

export const addons: AddOn[] = [
  {
    id: 'addons-online-service',
    value: 'online-service',
    title: 'Online service',
    subtitle: 'Access to multiplayer games',
    price: '+$1/mo',
    priceValue: 1,
    yearPrice: '+$10/yr',
    yearPriceValue: 10,
  },
  {
    id: 'addons-larger-storage',
    value: 'larger-storage',
    title: 'Larger storage',
    subtitle: 'Extra 1TB of cloud save',
    price: '+$2/mo',
    priceValue: 2,
    yearPrice: '+$20/yr',
    yearPriceValue: 20,
  },
  {
    id: 'addons-customizable-profile',
    value: 'customizable-profile',
    title: 'Customizable Profile',
    subtitle: 'Custom theme on your profile',
    price: '+$2/mo',
    priceValue: 2,
    yearPrice: '+$20/yr',
    yearPriceValue: 20,
  },
];
