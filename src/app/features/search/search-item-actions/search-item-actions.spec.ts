import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemActions } from './search-item-actions';

describe('SearchItemActions', () => {
  let component: SearchItemActions;
  let fixture: ComponentFixture<SearchItemActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchItemActions],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
