import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';
import { Artist } from '../../../models/artist.model';
import { ArtistTracklistService } from '../../../shared/services/artist-tracklist-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ArtistTracklistStore } from '../../../stores/artist.store';

@Component({
  selector: 'app-artist-page',
  imports: [NzImageModule,
    NzListModule,
    NzSkeletonModule,
    NzTableModule,
    NzCheckListModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    NzIconModule,
    NzButtonComponent,
    NzPopconfirmModule,
    DurationPipe,],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.scss',
})
export class ArtistPage implements OnInit {
  // artist = input<Artist>();
  private readonly route = inject(ActivatedRoute);
  private readonly artistStore = inject(ArtistTracklistStore);
  trackList = this.artistStore.tracks
  isLoading = this.artistStore.isLoading;

  private readonly artistId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );
  ngOnInit(){
    this.artistStore.fetchArtistTracks(Number(this.artistId()));
  }

  
}
