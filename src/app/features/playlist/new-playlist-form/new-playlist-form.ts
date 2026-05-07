import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { PlaylistStore } from '../store/playlist.store';
import { LocalPlaylist } from '../../../models/local-playlist-model';
import { Router } from '@angular/router';

const DEFAULT_PLAYLIST_PICTURE = 'music_note_regular_icon_203440.png';

@Component({
  selector: 'app-new-playlist-form',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonComponent],
  templateUrl: './new-playlist-form.html',
  styleUrl: './new-playlist-form.scss',
})
export class NewPlaylistForm {
  private readonly store = inject(PlaylistStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly playlistForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    isPublic: [true],
  });

  createPlaylist() {
    if (this.playlistForm.invalid) return;

    const formValue = this.playlistForm.getRawValue();

    const playlist: LocalPlaylist = {
      id: Date.now(),
      title: formValue.title ?? '',
      description: formValue.description ?? '',
      isPublic: formValue.isPublic ?? true,
      picture: DEFAULT_PLAYLIST_PICTURE,
      tracks: [],
      createdAt: new Date(),
    };

    this.store.addLocalPlaylist(playlist);

    console.log(playlist);

    this.playlistForm.reset({
      title: '',
      description: '',
      isPublic: true,
    });

    this.router.navigate(['dashboard', 'edit-playlist', playlist.id]);
  }
}
