import { Check } from 'lucide-react';
import { TEMPLATES } from '../data/campaignContent';
import type { PosterTemplate } from '../types/campaign';

interface TemplatePickerProps {
  value: PosterTemplate;
  onChange: (template: PosterTemplate) => void;
}

export function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <fieldset className="template-picker">
      <legend className="template-picker__legend">
        <span>Poster style</span>
        <small>Switch anytime</small>
      </legend>
      <div className="template-picker__options">
        {TEMPLATES.map((template) => {
          const selected = template.id === value;
          return (
            <button
              key={template.id}
              type="button"
              className={`template-option${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onChange(template.id)}
              title={template.description}
            >
              <span className="template-option__top">
                <span className="template-option__code">{template.code}</span>
                <span className="template-option__swatches" aria-hidden="true">
                  {template.swatches.map((swatch) => (
                    <i
                      key={swatch}
                      style={{ backgroundColor: swatch }}
                      className={swatch === '#FFFFFF' ? 'is-light' : ''}
                    />
                  ))}
                </span>
                {selected ? (
                  <span className="template-option__check" aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                ) : null}
              </span>
              <span className="template-option__name">{template.name}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
