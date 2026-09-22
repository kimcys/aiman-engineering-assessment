import { Component } from '@angular/core';
import { NavComponent } from './sections/nav/nav';
import { HeroComponent } from './sections/hero/hero';
import { ClosingComponent } from './sections/closing/closing';
import { ChapterComponent } from './ui/chapter/chapter';
import { EvidenceCardComponent } from './ui/evidence-card/evidence-card';
import { PipelineGateComponent } from './ui/pipeline-gate/pipeline-gate';
import { ChipComponent } from './ui/chip/chip';
import { CodePanelComponent } from './ui/code-panel/code-panel';
import { ProofBarComponent } from './ui/proof-bar/proof-bar';
import { StatusBadgeComponent } from './ui/status-badge/status-badge';
import { ResourceMeterComponent } from './ui/resource-meter/resource-meter';
import { TimelineEventComponent } from './ui/timeline-event/timeline-event';
import { IconComponent } from './ui/icon/icon';
import { ResilienceLayerComponent } from './ui/resilience-layer/resilience-layer';
import {
  CHAPTER_1,
  CHAPTER_2,
  CHAPTER_3,
  CHAPTER_4,
  CHAPTER_5,
  CHAPTER_6,
  CHAPTER_7,
  CHAPTER_8,
} from './data/answers.data';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HeroComponent,
    ClosingComponent,
    ChapterComponent,
    EvidenceCardComponent,
    PipelineGateComponent,
    ChipComponent,
    CodePanelComponent,
    ProofBarComponent,
    StatusBadgeComponent,
    ResourceMeterComponent,
    TimelineEventComponent,
    IconComponent,
    ResilienceLayerComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  readonly c1 = CHAPTER_1;
  readonly c2 = CHAPTER_2;
  readonly c3 = CHAPTER_3;
  readonly c4 = CHAPTER_4;
  readonly c5 = CHAPTER_5;
  readonly c6 = CHAPTER_6;
  readonly c7 = CHAPTER_7;
  readonly c8 = CHAPTER_8;
}
