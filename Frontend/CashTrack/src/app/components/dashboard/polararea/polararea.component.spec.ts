import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarareaComponent } from './polararea.component';
import { provideHttpClient } from '@angular/common/http';
import { KiadasManagerService } from '../../../services/kiadas-manager.service';
describe('PolarareaComponent', () => {
  let component: PolarareaComponent;
  let fixture: ComponentFixture<PolarareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolarareaComponent],
      providers: [KiadasManagerService,provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolarareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
