import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { ContextPack } from '../context-pack';
import { CpCardComponent } from './cp-card.component';
import { CpInfoComponent } from './cp-info.component';
import { ContextPackService } from '../context-pack.service';

describe('CpInfoComponent', () => {
  let cpInfoComponent: CpInfoComponent;
  let fixture: ComponentFixture<CpInfoComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [CpInfoComponent, CpCardComponent],
      providers: [
        { provide: ContextPackService, useValue: new MockCPService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpInfoComponent);
    cpInfoComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(cpInfoComponent).toBeTruthy();
  });

  it('should return the proper ID when given a context pack', () => {
    const expectedPack: ContextPack = MockCPService.testCPs[2];

    activatedRoute.setParamMap({ id: expectedPack._id });

    expect(cpInfoComponent.id).toEqual(expectedPack._id);
    expect(cpInfoComponent.contextPack).toEqual(expectedPack);
  });

});
