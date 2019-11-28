import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobdesComponent } from './jobdes.component';

describe('JobdesComponent', () => {
  let component: JobdesComponent;
  let fixture: ComponentFixture<JobdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
