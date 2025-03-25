import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubService } from '../shared/sub.service';

@Component({
  selector: 'app-do-not-do-this',
  imports: [ReactiveFormsModule],
  template: `
    <h1>
      do-not-do-this
    </h1>
    <main>
      <form [formGroup]="form">
        <input formControlName="control" />
        <button type="button" (click)="addSub()">Add Subscription</button>
      </form>

      <p>
        Subcounter: {{ subCounter() }}
      </p>
    </main>
  `,
  styles: ``
})
export default class DoNotDoThisComponent {
  readonly form = new FormGroup({
    control: new FormControl('')
  });
  subCounter = signal(0);
  readonly subService = inject(SubService);

  constructor() {
    this.form.valueChanges.subscribe(() => this.addSub());
    this.subService.getDataStream()
      .subscribe((val) => {
        if (this.subService.shouldLog()) console.log('Received value in do-not-do-this:', val)
      });
  }

  addSub() {
    this.subCounter.set(this.subCounter() + 1);
    this.form.controls.control.valueChanges.subscribe((val) => console.log(val));
  }
}
