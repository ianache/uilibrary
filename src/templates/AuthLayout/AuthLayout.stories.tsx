import { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from '../../organisms/LoginForm';

const meta: Meta<typeof AuthLayout> = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['centered', 'split'],
    },
    bgPattern: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

const mockLogo = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '22px' }}>
    <span style={{ background: '#4f46e5', color: '#fff', padding: '6px 12px', borderRadius: '8px' }}>UI</span>
    <span>AuthApp</span>
  </div>
);

const mockBrandPanel = (
  <div>
    <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.2 }}>
      Bienvenido a nuestra plataforma
    </h1>
    <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
      Gestiona tus componentes UI de forma eficiente y construidos con estándares de alta calidad y accesibilidad.
    </p>
  </div>
);

const mockFooter = (
  <div>
    <p>© 2026 UIComponentLibrary. <a href="#" style={{ color: '#4f46e5', textDecoration: 'none' }}>Términos</a> & <a href="#" style={{ color: '#4f46e5', textDecoration: 'none' }}>Privacidad</a></p>
  </div>
);

export const Centered: Story = {
  args: {
    variant: 'centered',
    bgPattern: true,
    logo: mockLogo,
    footer: mockFooter,
    children: (
      <LoginForm
        onSubmit={() => alert('Login submitted')}
        onForgotPassword={() => alert('Forgot password clicked')}
      />
    ),
  },
};

export const Split: Story = {
  args: {
    variant: 'split',
    brandPanel: mockBrandPanel,
    logo: mockLogo,
    footer: mockFooter,
    children: (
      <LoginForm
        onSubmit={() => alert('Login submitted')}
        onForgotPassword={() => alert('Forgot password clicked')}
      />
    ),
  },
};
