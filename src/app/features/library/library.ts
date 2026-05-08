import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PlaylistStore } from '../playlist/store/playlist.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';

import { Router } from '@angular/router';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-library',
  imports: [
    NzCardModule,
    NzButtonModule,
    NzListModule,
    NzAvatarModule,
    NzMenuModule,
    NzTooltipModule,
    NzIconModule,
  ],
  templateUrl: './library.html',
  styleUrl: './library.scss',
})
export class Library {
  private readonly store = inject(PlaylistStore);
  private readonly router = inject(Router);
  protected library = this.store.playlists;
  protected isLoading = this.store.isLoading;

  isCollapsed = true;

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onClick(id: number) {
    this.router.navigate(['dashboard', 'playlist', id]);
  }

  newPlaylist() {
    this.router.navigate(['dashboard', 'new-playlist']);
  }
}
