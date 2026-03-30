import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

export type DialogMaxWidth = 'sm' | 'md' | 'lg';

const maxWidthClasses: Record<DialogMaxWidth, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-xl',
};

@Component({
  selector: 'app-dn-dialog',
  standalone: true,
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="fixed inset-0 bg-black/50" (click)="close()"></div>
        <div [class]="'relative z-50 bg-card rounded-lg shadow-lg p-6 w-full mx-4 ' + maxWidthClass">
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
})
export class DialogComponent {
  @Input() open = false;
  @Input() maxWidth: DialogMaxWidth = 'md';
  @Output() closed = new EventEmitter<void>();

  get maxWidthClass(): string {
    return maxWidthClasses[this.maxWidth] ?? 'max-w-lg';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }

  close(): void {
    this.open = false;
    this.closed.emit();
  }
}
