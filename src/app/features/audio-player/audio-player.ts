import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AudioPlayerService } from '../../shared/services/audio-player-service';
import { PlaylistStore } from '../playlist/store/playlist.store';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { DurationPipe } from '../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-audio-player',
  imports: [NzIconModule, NzButtonModule, NzAvatarModule, DurationPipe],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss',
})
export class AudioPlayer {
  private readonly audioPlayerService = inject(AudioPlayerService);
  private readonly playlistStore = inject(PlaylistStore);
  isPlaying = false;
  selectedTrack = this.playlistStore.selectedTrack;

  onPlay() {
    const track = this.selectedTrack?.();
    console.log(track?.preview);
    this.audioPlayerService.play(track?.preview ?? '');
  }

  onPause() {
    this.audioPlayerService.pause();
  }
}
