import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPicklistComponent } from './skeleton-picklist.component';

describe('SkeletonPicklistComponent', () => {
  let component: SkeletonPicklistComponent;
  let fixture: ComponentFixture<SkeletonPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonPicklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
