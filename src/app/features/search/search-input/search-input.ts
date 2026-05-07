import { Component, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';
import { SearchStore } from '../store/search.store';

@Component({
  selector: 'app-search-input',
  imports: [NzInputModule, FormsModule, NzIconModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  searchStore = inject(SearchStore);
  searchValue = this.searchStore.searchValue;

  // searchSubject = input.required<Subject<string>>();

  onSearchChange(query: string) {
    this.searchStore.search(query);
  }
}
