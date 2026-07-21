import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    label: {
      control: 'text',
    },
    labelAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
  },
};

export const Dashed: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'dotted',
  },
};

export const WithLabelCenter: Story = {
  args: {
    label: 'OR',
    labelAlign: 'center',
  },
};

export const WithLabelStart: Story = {
  args: {
    label: 'Section Header',
    labelAlign: 'start',
  },
};

export const WithLabelEnd: Story = {
  args: {
    label: 'Continued',
    labelAlign: 'end',
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '24px', alignItems: 'center', gap: '12px' }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
