import { Meta, StoryObj } from '@storybook/react';
import { BlankLayout } from './BlankLayout';
import { Card } from '../../organisms/Card';

const meta: Meta<typeof BlankLayout> = {
  title: 'Templates/BlankLayout',
  component: BlankLayout,
  tags: ['autodocs'],
  argTypes: {
    centered: { control: 'boolean' },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    bgColor: { control: 'color' },
    maxWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BlankLayout>;

export const DefaultCentered: Story = {
  args: {
    centered: true,
    padding: 'md',
    maxWidth: 600,
    children: (
      <Card title="Página En Blanco Centrada">
        <p style={{ margin: 0, color: '#475569' }}>
          Este layout en blanco permite máxima flexibilidad para landing pages, vistas de error (404/500) o lienzos libres.
        </p>
      </Card>
    ),
  },
};

export const CustomBackground: Story = {
  args: {
    centered: true,
    padding: 'lg',
    bgColor: '#0f172a',
    maxWidth: 500,
    children: (
      <Card title="Modo Oscuro Personalizado">
        <p style={{ margin: 0, color: '#475569' }}>
          Fondo personalizado configurado mediante la prop bgColor.
        </p>
      </Card>
    ),
  },
};
