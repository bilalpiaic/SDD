import React from 'react';

export type ModuleGroupProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const ModuleGroup: React.FC<ModuleGroupProps> = ({ title, description, children }) => {
  return (
    <section data-testid="module-group">
      {title && <h2 data-testid="module-group-title">{title}</h2>}
      {description && <p data-testid="module-group-description">{description}</p>}
      <div data-testid="module-group-content">{children}</div>
    </section>
  );
};

export default ModuleGroup;
