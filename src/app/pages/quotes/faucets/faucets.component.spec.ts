import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaucetsComponent } from './faucets.component';

describe('FaucetsComponent', () => {
  let component: FaucetsComponent;
  let fixture: ComponentFixture<FaucetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaucetsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaucetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
