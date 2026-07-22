import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterBar, FilterConfig } from './FilterBar';

const sampleFilters: FilterConfig[] = [
  {
    id: 'category',
    label: 'Categoría',
    type: 'select',
    options: [
      { value: 'electronics', label: 'Electrónica' },
      { value: 'clothing', label: 'Ropa & Moda' },
      { value: 'home', label: 'Hogar & Jardín' },
      { value: 'books', label: 'Libros' },
    ],
  },
  {
    id: 'status',
    label: 'Estado de inventario',
    type: 'checkbox',
    options: [
      { value: 'in_stock', label: 'En Stock' },
      { value: 'pre_order', label: 'Preventa' },
      { value: 'discontinued', label: 'Descontinuado' },
    ],
  },
  {
    id: 'sortBy',
    label: 'Ordenar por',
    type: 'radio',
    options: [
      { value: 'newest', label: 'Más recientes' },
      { value: 'price_asc', label: 'Precio: menor a mayor' },
      { value: 'price_desc', label: 'Precio: mayor a menor' },
    ],
  },
];

const meta: Meta<typeof FilterBar> = {
  title: 'Organisms/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  argTypes: {
    collapsible: { control: 'boolean' },
    loading: { control: 'boolean' },
    resultCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    return (
      <FilterBar
        {...args}
        filters={sampleFilters}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        values={filterValues}
        onChange={setFilterValues}
        onReset={() => {
          setSearchQuery('');
          setFilterValues({});
        }}
        onSearch={(q) => alert(`Buscar: ${q}`)}
        resultCount={42}
      />
    );
  },
};

export const CollapsibleWithActiveFilters: Story = {
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState('laptop');
    const [filterValues, setFilterValues] = useState<Record<string, any>>({
      category: 'electronics',
      status: ['in_stock'],
    });

    return (
      <FilterBar
        {...args}
        collapsible
        filters={sampleFilters}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        values={filterValues}
        onChange={setFilterValues}
        onReset={() => {
          setSearchQuery('');
          setFilterValues({});
        }}
        onSearch={(q) => alert(`Buscar: ${q}`)}
        resultCount={12}
      />
    );
  },
};
