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

  ngOnDestroy() {
    this.#formSub.unsubscribe();
    this.#controlSub.unsubscribe();
    this.#serviceSub.unsubscribe();
  }
}
