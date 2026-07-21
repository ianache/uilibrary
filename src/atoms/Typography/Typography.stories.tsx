import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-lg',
        'body',
        'body-sm',
        'caption',
        'overline',
        'code',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'muted',
        'disabled',
        'accent',
        'success',
        'warning',
        'danger',
        'inherit',
      ],
    },
    truncate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body',
    color: 'primary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body-lg">Body Large text</Typography>
      <Typography variant="body">Body default text</Typography>
      <Typography variant="body-sm">Body Small text</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline text</Typography>
      <Typography variant="code">const hello = 'world';</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography color="primary">Primary Text</Typography>
      <Typography color="secondary">Secondary Text</Typography>
      <Typography color="muted">Muted Text</Typography>
      <Typography color="disabled">Disabled Text</Typography>
      <Typography color="accent">Accent Text</Typography>
      <Typography color="success">Success Text</Typography>
      <Typography color="warning">Warning Text</Typography>
      <Typography color="danger">Danger Text</Typography>
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div style={{ width: '200px', border: '1px dashed #ccc', padding: '8px' }}>
      <Typography truncate>
        This is a very long text that will truncate with an ellipsis when it exceeds the width of its parent container.
      </Typography>
    </div>
  ),
};

export const ElementOverride: Story = {
  args: {
    variant: 'h2',
    as: 'h1',
    children: 'Visual H2 styled element rendered as <h1> tag',
  },
};
