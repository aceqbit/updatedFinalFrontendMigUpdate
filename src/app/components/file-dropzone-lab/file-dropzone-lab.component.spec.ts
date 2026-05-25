import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDropzoneLabComponent } from './file-dropzone-lab.component';

describe('FileDropzoneLabComponent', () => {
  let component: FileDropzoneLabComponent;
  let fixture: ComponentFixture<FileDropzoneLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDropzoneLabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FileDropzoneLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});