import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SubService } from '../shared/sub.service';

@Component({
  selector: 'app-do-this-two',
  imports: [ReactiveFormsModule],
  template: `
    <h1>
      do-this-two
    </h1>
    <main>
      <form [formGroup]="form">
        <input formControlName="control" />
      </form>
    </main>
  `,
  styles: ``
})
export default class DoThisTwoComponent implements OnDestroy {
  readonly form = new FormGroup({
    control: new FormControl('')
  });
  readonly subService = inject(SubService);

  /**
   * In this example, there are no private properties to store the subscriptions, only a single Subject,
   * which emits when the component is destroyed.
   * The observable streams are unsubscribed using the takeUntil operator, which reacts to this Subject emitting.
   */
  readonly #destroy$ = new Subject<void>();

  constructor() {
    this.form.valueChanges
      .pipe(
        takeUntil(this.#destroy$)
      )
      .subscribe((val) => console.log(val));

    this.form.controls.control.valueChanges
      .pipe(
        takeUntil(this.#destroy$)
      )
      .subscribe((val) => console.log(val));

    this.subService.dataStream$
      .pipe(
        takeUntil(this.#destroy$)
      )
      .subscribe((val) => {
        if (this.subService.shouldLog()) console.log('Received value in do-this-two:', val)
      });
  }

  /**
   * In this case, when ngOnDestroy runs, the Subject emits, causing the takeUntil operator to unsubscribe from all streams, then completes.
   */
  ngOnDestroy() {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
