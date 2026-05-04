import { Component, inject } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';

@Component({
  selector: 'app-dashboard',
  imports: [NzButtonModule, NzInputModule, NzIconModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  searchValue = '';
  searchService = inject(SearchService);

  search(){
    console.log(this.searchValue);
    this.searchService.search(this.searchValue)
  }
}
