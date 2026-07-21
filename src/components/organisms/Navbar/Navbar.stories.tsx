import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    logoTitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    logoTitle: 'AtomicUI',
  },
};
