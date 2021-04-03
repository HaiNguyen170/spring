import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AricleDetailComponent } from './aricle-detail.component';

describe('AricleDetailComponent', () => {
  let component: AricleDetailComponent;
  let fixture: ComponentFixture<AricleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AricleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AricleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
