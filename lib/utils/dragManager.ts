// Modern ES module for drag functionality
import { DragEvent } from 'react';

interface DragState {
  isDragging: boolean;
  draggedElement: HTMLElement | null;
}

class DragManager {
  private state: DragState = {
    isDragging: false,
    draggedElement: null
  };

  handleDragStart = (e: DragEvent<HTMLElement>) => {
    this.state.isDragging = true;
    this.state.draggedElement = e.currentTarget as HTMLElement;
    e.dataTransfer.effectAllowed = 'move';
  };

  handleDragEnd = () => {
    this.state.isDragging = false;
    this.state.draggedElement = null;
  };

  handleDrop = (e: DragEvent<HTMLElement>, onDrop: (el: HTMLElement) => void) => {
    e.preventDefault();
    if (this.state.draggedElement) {
      onDrop(this.state.draggedElement);
    }
    this.handleDragEnd();
  };
}

export const dragManager = new DragManager();