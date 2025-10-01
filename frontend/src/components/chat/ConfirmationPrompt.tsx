import React from 'react';

export type ConfirmationPromptProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationPrompt: React.FC<ConfirmationPromptProps> = ({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" data-testid="confirmation-prompt" style={{ position: 'fixed', inset: 0 }}>
      <div role="document" style={{ margin: '10% auto', padding: 16, maxWidth: 420, background: '#fff', borderRadius: 8 }}>
        <h3 data-testid="confirm-title">{title}</h3>
        {description && <p data-testid="confirm-description">{description}</p>}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button data-testid="confirm-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button data-testid="confirm-accept" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPrompt;
