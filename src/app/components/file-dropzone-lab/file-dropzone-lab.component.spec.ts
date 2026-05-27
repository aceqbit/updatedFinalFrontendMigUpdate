import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FileDropzoneLabComponent } from './file-dropzone-lab.component';

describe('FileDropzoneLabComponent', () => {
  let component: FileDropzoneLabComponent;
  let fixture: ComponentFixture<FileDropzoneLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileDropzoneLabComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FileDropzoneLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});