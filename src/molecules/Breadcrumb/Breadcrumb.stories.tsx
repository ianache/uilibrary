import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'select',
      options: ['chevron', 'slash'],
    },
    maxItems: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const defaultItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/products' },
  { label: 'Electrónica', href: '/products/electronics' },
  { label: 'Laptops', href: '/products/electronics/laptops' },
  { label: 'MacBook Pro 16"' },
];

export const Default: Story = {
  args: {
    items: defaultItems.slice(0, 3),
  },
};

export const SlashSeparator: Story = {
  args: {
    items: defaultItems.slice(0, 3),
    separator: 'slash',
  },
};

export const Collapsed: Story = {
  args: {
    items: defaultItems,
    maxItems: 3,
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Inicio', onClick: () => alert('Clicked Inicio') },
      { label: 'Categorías', onClick: () => alert('Clicked Categorías') },
      { label: 'Detalle' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Inicio' }],
  },
};
