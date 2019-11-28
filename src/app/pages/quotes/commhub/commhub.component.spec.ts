import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommhubComponent } from './commhub.component';

describe('CommhubComponent', () => {
  let component: CommhubComponent;
  let fixture: ComponentFixture<CommhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommhubComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
