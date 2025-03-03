import React from 'react';
import { EventTemplate } from '../../../types';
import { Select } from '../../ui/Select';

interface TemplateSelectProps {
  templates: EventTemplate[];
  onSelect: (template: EventTemplate | null) => void;
}

export function TemplateSelect({ templates, onSelect }: TemplateSelectProps) {
  return (
    <div className="mb-6">
      <Select
        label="Load from Template"
        onChange={(e) => {
          const template = templates.find(t => t.id === e.target.value);
          onSelect(template || null);
        }}
      >
        <option value="">Select a template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </Select>
    </div>
  );
}