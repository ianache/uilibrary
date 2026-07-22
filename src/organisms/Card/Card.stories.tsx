import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: { control: 'boolean' },
    selected: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Tarjeta de Producto',
    subtitle: 'Categoría de Electrónica',
    children: 'Esta es una tarjeta estándar utilizada para presentar información estructurada de manera limpia y clara.',
    footer: <Button size="sm">Ver Detalles</Button>,
  },
};

export const WithMedia: Story = {
  args: {
    title: 'Paisaje de Montaña',
    subtitle: 'Fotografía de Naturaleza',
    media: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop',
      alt: 'Montaña al atardecer',
      aspect: '16/9',
    },
    children: 'Hermosa vista de montañas durante el atardecer en los Alpes.',
    footer: <Button size="sm" variant="ghost">Compartir</Button>,
    hoverable: true,
  },
};

export const SelectedAndInteractive: Story = {
  args: {
    title: 'Plan Pro',
    subtitle: '$29 / mes',
    selected: true,
    hoverable: true,
    onClick: () => alert('Tarjeta de plan seleccionada'),
    children: 'Incluye acceso a todas las funcionalidades avanzadas y soporte prioritario 24/7.',
    headerAction: <Icon name="check-circle" size="md" color="var(--color-primary-600)" />,
  },
};

export const LoadingSkeleton: Story = {
  args: {
    loading: true,
    media: {
      src: '',
      alt: 'Placeholder',
      aspect: '16/9',
    },
  },
};
