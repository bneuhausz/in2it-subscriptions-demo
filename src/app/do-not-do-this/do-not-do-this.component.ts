import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor() {
    this.form.valueChanges.subscribe(() => this.addSub());
  }

  addSub() {
    this.subCounter.set(this.subCounter() + 1);
    this.form.controls.control.valueChanges.subscribe((val) => console.log(val));
  }
}
