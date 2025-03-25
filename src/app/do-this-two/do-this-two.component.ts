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
  readonly #destroy$ = new Subject<void>();
  readonly subService = inject(SubService);

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

    this.subService.getDataStream()
      .pipe(
        takeUntil(this.#destroy$)
      )
      .subscribe((val) => console.log('Received value in do-this-two:', val));
  }

  ngOnDestroy() {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
