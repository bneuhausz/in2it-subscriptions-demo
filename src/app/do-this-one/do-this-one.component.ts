import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubService } from '../shared/sub.service';

@Component({
  selector: 'app-do-this-one',
  imports: [ReactiveFormsModule],
  template: `
    <h1>
      do-this-one
    </h1>
    <main>
      <form [formGroup]="form">
        <input formControlName="control" />
      </form>
    </main>
  `,
  styles: ``
})
export default class DoThisOneComponent implements OnDestroy {
  readonly form = new FormGroup({
    control: new FormControl('')
  });
  readonly subService = inject(SubService);

  /**
   * In this example, the subscriptions are created in the constructor and stored in private properties.
   * Meaning, there is always a single subscription for each stream, and they can be unsubscribed when the component is destroyed.
   */
  readonly #formSub!: Subscription;
  readonly #controlSub!: Subscription;
  readonly #serviceSub!: Subscription;

  constructor() {
    this.#formSub = this.form.valueChanges.subscribe((val) => console.log(val));
    this.#controlSub = this.form.controls.control.valueChanges.subscribe((val) => console.log(val));

    this.#serviceSub = this.subService.getDataStream()
      .subscribe((val) => {
        if (this.subService.shouldLog()) console.log('Received value in do-this-one:', val)
      });
  }

  /**
   * Unsubscribe from all subscriptions when the component is destroyed.
   * There are better ways to handle this, some of them are shown in the next examples, but this is at least a working solution.
   */
  ngOnDestroy() {
    this.#formSub.unsubscribe();
    this.#controlSub.unsubscribe();
    this.#serviceSub.unsubscribe();
  }
}
