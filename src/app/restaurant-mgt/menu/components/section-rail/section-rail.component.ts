import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { MenuService } from '../../services/menu.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MenuSectionListItem } from 'src/app/_models/app.models';
import { SwitchComponent } from 'src/app/_shared/ui/switch/switch.component';
import { ButtonComponent } from 'src/app/_shared/ui/button/button.component';

@Component({
  selector: 'app-section-rail',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    SwitchComponent,
    ButtonComponent,
  ],
  templateUrl: './section-rail.component.html',
})
export class SectionRailComponent {

  @Output() newSection = new EventEmitter<void>();
  @Output() editSection = new EventEmitter<string>();
  @Output() deleteSection = new EventEmitter<string>();
  @Output() newItem = new EventEmitter<void>();

  sections$: Observable<MenuSectionListItem[]>;
  selectedSectionId$: Observable<string | null>;

  reorderMode = false;

  constructor(
    private menuService: MenuService,
    private auth: AuthenticationService
  ) {
    this.sections$ = this.menuService.sections$;
    this.selectedSectionId$ = this.menuService.selectedSectionId$;
  }

  onSelect(id: string): void {
    this.menuService.selectSection(id);
  }

  onToggleAvailability(id: string, available: boolean): void {
    this.menuService.toggleSectionAvailability(id, available).subscribe(() => {
      const restaurantId = this.auth.currentRestaurantRole?.restaurant_id;
      if (restaurantId) {
        this.menuService.loadSections(restaurantId);
      }
    });
  }

  onDrop(event: CdkDragDrop<MenuSectionListItem[]>): void {
    const sections = [...this.menuService.getSectionsSnapshot()];
    moveItemInArray(sections, event.previousIndex, event.currentIndex);
    this.menuService.updateSectionsLocally(sections);

    const ordering = sections.map((s, i) => ({ id: s.id, listing_position: i + 1 }));
    this.menuService.reorderItems(ordering).subscribe();
  }

  toggleReorderMode(): void {
    this.reorderMode = !this.reorderMode;
  }

  trackById(_index: number, section: MenuSectionListItem): string {
    return section.id;
  }
}
