import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PlaylistStore } from '../playlist/store/playlist.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PlaylistService } from '../../services/playlist-service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  imports: [NzCardModule, NzButtonModule, NzListModule, NzSkeletonComponent],
  templateUrl: './library.html',
  styleUrl: './library.scss',
})
export class Library {
  private readonly store = inject(PlaylistStore);
  private readonly router = inject(Router);
  protected library = this.store.playlists;

  constructor() {
    this.store.loadBooks();
  }

  onClick(id: number) {
    this.router.navigate([id, 'playlist']);
  }
}
