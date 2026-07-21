import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconPaths, IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconPaths),
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon name="star" size="xs" />
      <Icon name="star" size="sm" />
      <Icon name="star" size="md" />
      <Icon name="star" size="lg" />
      <Icon name="star" size="xl" />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '16px',
      }}
    >
      {Object.keys(iconPaths).map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
          }}
        >
          <Icon name={name as IconName} size="lg" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};
