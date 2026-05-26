import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuOverlaysLabComponent } from './context-menu-overlays-lab.component';

describe('ContextMenuOverlaysLabComponent', () => {
  let component: ContextMenuOverlaysLabComponent;
  let fixture: ComponentFixture<ContextMenuOverlaysLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextMenuOverlaysLabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMenuOverlaysLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});