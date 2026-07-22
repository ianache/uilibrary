import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showButton: { control: 'boolean' },
    placeholder: { control: 'text' },
    buttonLabel: { control: 'text' },
    onSearch: { action: 'onSearch' },
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar productos...',
  },
};

export const WithoutButton: Story = {
  args: {
    placeholder: 'Buscar en la lista...',
    showButton: false,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Buscar...',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Buscar...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Buscar...',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: 'Buscando...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Búsqueda deshabilitada',
  },
};

export const CustomButtonLabel: Story = {
  args: {
    buttonLabel: 'Filtrar',
    placeholder: 'Filtrar por categoría...',
  },
};
