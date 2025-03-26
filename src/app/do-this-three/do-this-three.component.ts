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
  /**
   * This is the best and most up to date way to handle subscriptions in Angular,
   * however, it is only available since Angular 17 as a developer preview feature and Angular 19 as a stable feature.
   * The takeUntilDestroyed operator is used to automatically unsubscribe from the observable streams when the component is destroyed.
   * One caveat is that it only works without passing a DestroyRef, when it's used in an injection context.
   * Examples for injection context are the constructor or field initialization.
   */
  readonly form = new FormGroup({
    control: new FormControl('')
  });
  readonly subService = inject(SubService);

  /**
   * The DestroyRef is only present here to demonstrate the usage of takeUntilDestroyed outside of an injection context.
   */
  readonly #destroyRef = inject(DestroyRef);

  /**
   * This Subscription is also unnecessary, it's just here to make the demo a bit easier to handle.
   * However, this can also serve as an example of how to handle subscriptions that absolutely need to be created when some action is performed.
   */
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
    /**
     * The Subscription is only created if it doesn't exist yet.
     * This is a good practice to avoid creating multiple subscriptions for the same stream.
     * It is also created outside of the injection context, so it needs the DestroyRef to work properly.
     */
    if(!this.#subOutOfInjectionScope) {
      this.#subOutOfInjectionScope = this.subService.getDataStream()
        .pipe(
          takeUntilDestroyed(this.#destroyRef)
        )
        .subscribe((val) => {
          if (this.subService.shouldLog()) console.log('Received value in do-this-three:', val)
        });
    }
  }
}
