import React, { useState } from 'react';
import clsx from 'clsx';
import { SearchBar } from '../../molecules/SearchBar';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import { Tag } from '../../atoms/Tag';
import { Select } from '../../atoms/Select';
import { Checkbox } from '../../atoms/Checkbox';
import { RadioGroup } from '../../molecules/RadioGroup';
import styles from './FilterBar.module.css';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'radio';
  options?: FilterOption[];
  multiple?: boolean;
}

export interface FilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onReset: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onSearchQueryChange?: (query: string) => void;
  loading?: boolean;
  resultCount?: number;
  collapsible?: boolean;
}

interface ActiveTagItem {
  filterId: string;
  filterLabel: string;
  value: string;
  label: string;
}

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters = [],
      values = {},
      onChange,
      onReset,
      onSearch,
      searchQuery,
      onSearchQueryChange,
      loading = false,
      resultCount,
      collapsible = false,
      className,
      style,
      ...restProps
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(!collapsible);

    // Compute active tag items and total active count
    const activeTags: ActiveTagItem[] = [];
    let totalActiveCount = 0;

    filters.forEach((filter) => {
      const val = values[filter.id];
      if (val === undefined || val === null || val === '') return;

      if (filter.type === 'checkbox' && filter.multiple !== false) {
        if (Array.isArray(val) && val.length > 0) {
          val.forEach((itemVal: string) => {
            const opt = filter.options?.find((o) => o.value === itemVal);
            activeTags.push({
              filterId: filter.id,
              filterLabel: filter.label,
              value: itemVal,
              label: opt ? opt.label : itemVal,
            });
            totalActiveCount++;
          });
        }
      } else if (filter.type === 'select' || filter.type === 'radio') {
        if (typeof val === 'string' && val !== '') {
          const opt = filter.options?.find((o) => o.value === val);
          activeTags.push({
            filterId: filter.id,
            filterLabel: filter.label,
            value: val,
            label: opt ? opt.label : val,
          });
          totalActiveCount++;
        }
      } else if (typeof val === 'boolean' && val) {
        activeTags.push({
          filterId: filter.id,
          filterLabel: filter.label,
          value: 'true',
          label: filter.label,
        });
        totalActiveCount++;
      }
    });

    const handleSelectChange = (filterId: string, value: string) => {
      const nextValues = { ...values };
      if (value === '') {
        delete nextValues[filterId];
      } else {
        nextValues[filterId] = value;
      }
      onChange(nextValues);
    };

    const handleCheckboxToggle = (filterId: string, optionValue: string, checked: boolean) => {
      const nextValues = { ...values };
      const currentList: string[] = Array.isArray(nextValues[filterId]) ? [...nextValues[filterId]] : [];

      if (checked) {
        if (!currentList.includes(optionValue)) {
          currentList.push(optionValue);
        }
      } else {
        const idx = currentList.indexOf(optionValue);
        if (idx !== -1) {
          currentList.splice(idx, 1);
        }
      }

      if (currentList.length > 0) {
        nextValues[filterId] = currentList;
      } else {
        delete nextValues[filterId];
      }
      onChange(nextValues);
    };

    const handleRadioChange = (filterId: string, value: string) => {
      const nextValues = { ...values, [filterId]: value };
      onChange(nextValues);
    };

    const handleRemoveTag = (tag: ActiveTagItem) => {
      const nextValues = { ...values };
      const filter = filters.find((f) => f.id === tag.filterId);

      if (filter?.type === 'checkbox' && Array.isArray(nextValues[tag.filterId])) {
        const updatedList = (nextValues[tag.filterId] as string[]).filter((v) => v !== tag.value);
        if (updatedList.length > 0) {
          nextValues[tag.filterId] = updatedList;
        } else {
          delete nextValues[tag.filterId];
        }
      } else {
        delete nextValues[tag.filterId];
      }

      onChange(nextValues);
    };

    const hasActiveFiltersOrSearch = totalActiveCount > 0 || Boolean(searchQuery);

    return (
      <div
        ref={ref}
        className={clsx(styles.filterBar, className)}
        style={{ margin: 0, ...style }}
        {...restProps}
      >
        <div className={styles.topRow}>
          <div className={styles.searchWrapper}>
            <SearchBar
              value={searchQuery}
              onChange={(val) => onSearchQueryChange?.(val)}
              onSearch={onSearch}
              loading={loading}
              placeholder="Buscar..."
              showButton
            />
          </div>

          <div className={styles.actionsGroup}>
            {resultCount !== undefined && (
              <span className={styles.resultCount}>
                {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
              </span>
            )}

            {collapsible && (
              <Button
                variant="secondary"
                onClick={() => setIsExpanded((prev) => !prev)}
                className={styles.filterToggleButton}
              >
                <Icon name="filter" size="sm" />
                <span>Filtros</span>
                {totalActiveCount > 0 && (
                  <Badge variant="primary" size="sm">
                    {totalActiveCount}
                  </Badge>
                )}
              </Button>
            )}

            {hasActiveFiltersOrSearch && (
              <Button variant="ghost" onClick={onReset}>
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {isExpanded && filters.length > 0 && (
          <div className={styles.panel}>
            <div className={styles.grid}>
              {filters.map((filter) => {
                if (filter.type === 'select') {
                  return (
                    <div key={filter.id} className={styles.filterControl}>
                      <Select
                        label={filter.label}
                        placeholder="Todos"
                        options={filter.options || []}
                        value={values[filter.id] || ''}
                        onChange={(e) => handleSelectChange(filter.id, e.target.value)}
                      />
                    </div>
                  );
                }

                if (filter.type === 'checkbox') {
                  const selectedList: string[] = Array.isArray(values[filter.id]) ? values[filter.id] : [];
                  return (
                    <div key={filter.id} className={styles.filterControl}>
                      <span className={styles.groupLabel}>{filter.label}</span>
                      <div className={styles.checkboxGroup}>
                        {filter.options?.map((opt) => (
                          <Checkbox
                            key={opt.value}
                            label={opt.label}
                            checked={selectedList.includes(opt.value)}
                            onChange={(e) =>
                              handleCheckboxToggle(filter.id, opt.value, e.target.checked)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  );
                }

                if (filter.type === 'radio') {
                  return (
                    <div key={filter.id} className={styles.filterControl}>
                      <RadioGroup
                        name={filter.id}
                        label={filter.label}
                        options={filter.options || []}
                        value={values[filter.id] || ''}
                        onChange={(val) => handleRadioChange(filter.id, val)}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        )}

        {activeTags.length > 0 && (
          <div className={styles.activeTagsRow}>
            <span className={styles.activeTagsLabel}>Filtros activos:</span>
            <div className={styles.tagsList}>
              {activeTags.map((tag) => (
                <Tag
                  key={`${tag.filterId}-${tag.value}`}
                  variant="primary"
                  removable
                  onRemove={() => handleRemoveTag(tag)}
                >
                  {tag.filterLabel}: {tag.label}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';
