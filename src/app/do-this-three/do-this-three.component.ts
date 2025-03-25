import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubService } from '../shared/sub.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-do-this-three',
  imports: [ReactiveFormsModule],
  template: `
    <h1>
      do-this-three
    </h1>
    <main>
      <form [formGroup]="form">
        <input formControlName="control" />
        <button type="button" (click)="createSubOutOfInjectionScope()">Create Subscription</button>
      </form>
    </main>
  `,
  styles: ``
})
export default class DoThisThreeComponent {
  readonly form = new FormGroup({
    control: new FormControl('')
  });
  readonly subService = inject(SubService);
  readonly #destroyRef = inject(DestroyRef);
  #subOutOfInjectionScope!: Subscription;

  constructor() {
    this.form.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((val) => console.log(val));

    this.form.controls.control.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((val) => console.log(val));
  }

  createSubOutOfInjectionScope() {
    if(!this.#subOutOfInjectionScope) {
      this.#subOutOfInjectionScope = this.subService.getDataStream()
        .pipe(
          takeUntilDestroyed(this.#destroyRef)
        )
        .subscribe((val) => console.log('Received value in do-this-three:', val));
    }
  }
}
