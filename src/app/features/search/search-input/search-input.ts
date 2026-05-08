import { Component, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';
import { SearchStore } from '../store/search.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  imports: [NzInputModule, FormsModule, NzIconModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  private readonly searchStore = inject(SearchStore);
  private readonly router = inject(Router);
  searchValue = this.searchStore.searchValue;

  onSearchChange(query: string) {
    this.searchStore.search(query);
    this.router.navigate(['dashboard', 'search']);
  }
}
