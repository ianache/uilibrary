import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Este es un tooltip de información',
    children: <Button>Pasa el cursor por aquí</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '60px', justifyContent: 'center' }}>
      <Tooltip content="Tooltip Arriba" placement="top">
        <Button variant="secondary">Arriba</Button>
      </Tooltip>
      <Tooltip content="Tooltip Abajo" placement="bottom">
        <Button variant="secondary">Abajo</Button>
      </Tooltip>
      <Tooltip content="Tooltip Izquierda" placement="left">
        <Button variant="secondary">Izquierda</Button>
      </Tooltip>
      <Tooltip content="Tooltip Derecha" placement="right">
        <Button variant="secondary">Derecha</Button>
      </Tooltip>
    </div>
  ),
};

export const TextTrigger: Story = {
  args: {
    content: 'Información adicional sobre el término',
    children: 'Texto con tooltip',
  },
};

export const InstantDelay: Story = {
  args: {
    content: 'Aparece inmediatamente',
    delay: 0,
    children: <Button variant="secondary">Sin retraso (0ms)</Button>,
  },
};
