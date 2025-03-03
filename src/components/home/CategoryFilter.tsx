import React from 'react';
import { Button } from '../ui/Button';
import { MonthSelect } from './MonthSelect';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  events: any[];
  selectedMonth: string | null;
  onMonthSelect: (month: string | null) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  events,
  selectedMonth,
  onMonthSelect
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant={selectedCategory === null ? 'primary' : 'secondary'}
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'primary' : 'secondary'}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
      <div className="ml-auto w-48 -mt-1">
        <MonthSelect
          events={events}
          selectedMonth={selectedMonth}
          onMonthSelect={onMonthSelect}
        />
      </div>
    </div>
  );
}