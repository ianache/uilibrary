import type { Meta, StoryObj } from '@storybook/react';

import { Planner } from './Planner';
import type { PlannerColumn, PlannerEvent } from './Planner';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';

type SalaMeta = { nombre: string; piso: string; capacidad: number };
type EventMeta = { titulo: string; responsable: string; tipo: 'reunión' | 'taller' | 'capacitación' };

const meta: Meta<typeof Planner> = {
  title: 'Organisms/Planner',
  component: Planner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Planner<SalaMeta, EventMeta>>;

const mockColumns: PlannerColumn<SalaMeta>[] = [
  { id: 'sala-a', meta: { nombre: 'Sala A', piso: 'Piso 3', capacidad: 20 } },
  { id: 'sala-b', meta: { nombre: 'Sala B', piso: 'Piso 1', capacidad: 8 } },
  { id: 'sala-c', meta: { nombre: 'Sala C', piso: 'Piso 2', capacidad: 30 } },
  { id: 'sala-d', meta: { nombre: 'Sala D', piso: 'Piso 4', capacidad: 12 } },
];

const mockEvents: PlannerEvent<EventMeta>[] = [
  {
    id: 'e1',
    columnId: 'sala-a',
    startMin: 60,
    durationMin: 90,
    color: '#B5D4F4',
    meta: { titulo: 'Kick-off Q3', responsable: 'Ana Torres', tipo: 'reunión' },
  },
  {
    id: 'e2',
    columnId: 'sala-a',
    startMin: 180,
    durationMin: 60,
    color: '#B5D4F4',
    meta: { titulo: 'Demo cliente', responsable: 'Carlos Ruiz', tipo: 'reunión' },
  },
  {
    id: 'e3',
    columnId: 'sala-b',
    startMin: 30,
    durationMin: 120,
    color: '#CECBF6',
    meta: { titulo: 'Sprint planning', responsable: 'Equipo Dev', tipo: 'reunión' },
  },
  {
    id: 'e4',
    columnId: 'sala-b',
    startMin: 210,
    durationMin: 60,
    color: '#CECBF6',
    meta: { titulo: '1:1 CTO', responsable: 'Luis Mendoza', tipo: 'reunión' },
  },
  {
    id: 'e5',
    columnId: 'sala-c',
    startMin: 0,
    durationMin: 150,
    color: '#9FE1CB',
    meta: { titulo: 'Onboarding nuevos', responsable: 'RRHH', tipo: 'capacitación' },
  },
  {
    id: 'e6',
    columnId: 'sala-c',
    startMin: 210,
    durationMin: 45,
    color: '#9FE1CB',
    meta: { titulo: 'Retrospectiva', responsable: 'Scrum Master', tipo: 'reunión' },
  },
  {
    id: 'e7',
    columnId: 'sala-a',
    startMin: 90,
    durationMin: 60,
    color: '#F5C4B3',
    meta: { titulo: 'Overlap test', responsable: 'QA Team', tipo: 'reunión' },
  },
  {
    id: 'e8',
    columnId: 'sala-d',
    startMin: 60,
    durationMin: 180,
    color: '#FAC775',
    meta: { titulo: 'Workshop diseño', responsable: 'UX Team', tipo: 'taller' },
  },
];

const renderHeader = (col: PlannerColumn<SalaMeta>) => (
  <div style={{ padding: '6px 10px' }}>
    <Badge variant="primary" size="sm">{col.meta.nombre}</Badge>
    <Typography variant="body-sm" style={{ marginTop: 2 }}>{col.meta.piso}</Typography>
    <Typography variant="caption" color="secondary">Cap. {col.meta.capacidad}</Typography>
  </div>
);

const renderEvent = (ev: PlannerEvent<EventMeta>) => (
  <div style={{ padding: '5px 8px', height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Typography variant="body-sm" truncate style={{ fontWeight: 500 }}>
      {ev.meta.titulo}
    </Typography>
    <Typography variant="caption" color="secondary">{ev.meta.responsable}</Typography>
    <Badge variant={ev.meta.tipo === 'taller' ? 'warning' : ev.meta.tipo === 'capacitación' ? 'success' : 'primary'} size="sm">
      {ev.meta.tipo}
    </Badge>
  </div>
);

export const Default: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const AllParams: Story = {
  args: {
    config: { startHour: 8, endHour: 17, granularity: 15 },
    columns: mockColumns,
    events: mockEvents,
    maxColumns: 4,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const HiddenParams: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    visibleParams: [],
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const PartialParams: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    visibleParams: ['granularity', 'columns'],
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const Granularity15min: Story = {
  args: {
    config: { startHour: 9, endHour: 12, granularity: 15 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const Granularity60min: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 60 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const OverlappingEvents: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: [mockColumns[0]],
    events: [mockEvents[0], mockEvents[6]],
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const Loading: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    loading: true,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const SingleColumn: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: [mockColumns[0]],
    events: mockEvents.filter((e) => e.columnId === 'sala-a'),
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};
