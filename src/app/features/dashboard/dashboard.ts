import { Component, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    NzListModule,
    NzSkeletonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  searchValue = '';
  private readonly searchService = inject(SearchService);
  searchItems = signal<SearchItem[]>([]);

  async search() {
    console.log(this.searchValue);
    this.searchItems.set(await this.searchService.search(this.searchValue));
    console.log(this.searchItems);
  }
}
