import React from 'react';

export type WireframeTileProps = {
  id: string;
  title?: string;
  type?: string;
  size?: { width: number; height: number };
  position?: { x: number; y: number };
  data?: Record<string, any>;
  wireframe_metadata?: {
    theme?: string;
    interactive?: boolean;
    droppable?: boolean;
    resizable?: boolean;
    minSize?: { width: number; height: number };
    maxSize?: { width: number; height: number };
  };
  onClick?: (evt: { tileId: string; action: 'click'; data?: any }) => void;
  onDragStart?: (evt: { tileId: string; position?: { x: number; y: number }; size?: { width: number; height: number } }) => void;
  onDragEnd?: (evt: { tileId: string; newPosition?: { x: number; y: number } }) => void;
  onResize?: (evt: { tileId: string; newSize?: { width: number; height: number } }) => void;
};

export function WireframeTile(props: WireframeTileProps) {
  const { id, title, type, size, position, data, wireframe_metadata } = props;

  const handleClick = () => {
    props.onClick?.({ tileId: id, action: 'click', data });
  };

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    props.onDragStart?.({ tileId: id, position, size });
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = (e) => {
    props.onDragEnd?.({ tileId: id, newPosition: { x: 0, y: 0 } });
  };

  // Minimal resize handles API; not functional yet but exposes testids
  const handleResizeEnd = () => {
    props.onResize?.({ tileId: id, newSize: { width: size?.width ?? 0, height: size?.height ?? 0 } });
  };

  return (
    <div
      className="wireframe-tile"
      data-testid="wireframe-tile"
      data-tile-id={id}
      data-tile-type={type}
      draggable
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {title ? <div>{title}</div> : null}
      <div data-testid="tile-content" />
      {wireframe_metadata?.resizable ? (
        <>
          <div data-testid="resize-handle-se" onMouseDown={() => {}} onMouseUp={handleResizeEnd} />
          <div data-testid="resize-handle-e" />
          <div data-testid="resize-handle-s" />
        </>
      ) : null}
    </div>
  );
}

export default WireframeTile;
