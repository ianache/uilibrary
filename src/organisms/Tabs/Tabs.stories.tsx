import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabItem } from './Tabs';

const sampleTabs: TabItem[] = [
  {
    id: 'tab-1',
    label: 'General',
    icon: 'settings',
    content: <div style={{ padding: '16px' }}>Contenido de la pestaña General</div>,
  },
  {
    id: 'tab-2',
    label: 'Notificaciones',
    icon: 'bell',
    badge: 3,
    content: <div style={{ padding: '16px' }}>Contenido de la pestaña Notificaciones</div>,
  },
  {
    id: 'tab-3',
    label: 'Seguridad',
    icon: 'lock',
    content: <div style={{ padding: '16px' }}>Contenido de la pestaña Seguridad</div>,
  },
  {
    id: 'tab-4',
    label: 'Deshabilitado',
    disabled: true,
    content: <div style={{ padding: '16px' }}>Contenido deshabilitado</div>,
  },
];

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pill', 'card'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const LineVariant: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('tab-1');

    return (
      <Tabs
        {...args}
        tabs={sampleTabs}
        activeId={activeId}
        onChange={setActiveId}
        variant="line"
      />
    );
  },
};

export const PillVariant: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('tab-1');

    return (
      <Tabs
        {...args}
        tabs={sampleTabs}
        activeId={activeId}
        onChange={setActiveId}
        variant="pill"
      />
    );
  },
};

export const CardVariant: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('tab-1');

    return (
      <Tabs
        {...args}
        tabs={sampleTabs}
        activeId={activeId}
        onChange={setActiveId}
        variant="card"
      />
    );
  },
};

export const VerticalOrientation: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('tab-1');

    return (
      <Tabs
        {...args}
        tabs={sampleTabs}
        activeId={activeId}
        onChange={setActiveId}
        orientation="vertical"
      />
    );
  },
};
