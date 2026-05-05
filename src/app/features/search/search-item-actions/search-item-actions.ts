import { Component, input, signal } from '@angular/core';
import { NzListItemActionComponent } from 'ng-zorro-antd/list';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchItem } from '../../../models/search-item.model';

@Component({
  selector: 'app-search-item-actions',
  imports: [NzListItemActionComponent, NzPopoverModule, NzIconModule],
  templateUrl: './search-item-actions.html',
  styleUrl: './search-item-actions.scss',
})
export class SearchItemActions {
  searchItem = input.required<SearchItem>();
  activePopoverId = signal<number | null>(null);

  togglePopover(id: number) {
    this.activePopoverId.set(this.activePopoverId() === id ? null : id);
  }

  change(value: boolean) {}

  closePopover(id: number) {
    if (this.activePopoverId() === id) {
      this.activePopoverId.set(null);
    }
  }
}
