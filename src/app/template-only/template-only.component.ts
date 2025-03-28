import { Component, computed, inject } from '@angular/core';
import { SubService } from '../shared/sub.service';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * This component demonstrates how to use the async pipe and the toSignal function to get the value from an observable stream.
 * If the value of an observable is only needed in the template, then using async pipe, or in a signal based application, toSignal, is the best approach.
 * This way, the subscription is handled automatically by Angular.
 * The value is always up to date, and the subscription is automatically unsubscribed when the component is destroyed.
 * Of course, the toSignal approach can be used to react to it's changes for other purposes as well.
 */
@Component({
  selector: 'app-template-only',
  imports: [AsyncPipe],
  template: `
    <h1>
      template-only
    </h1>
    <main>
      <p>Value from async pipe: {{ subService.dataStream$ | async }}</p>
      <p>Value from signal: {{ signalValue() }}</p>
      <p>Value multiplied: {{ signalValueMultiplied() }}</p>
    </main>
  `,
  styles: ``
})
export default class TemplateOnlyComponent {
  readonly subService = inject(SubService);
  readonly signalValue = toSignal(this.subService.dataStream$);
  readonly signalValueMultiplied = computed(() => (this.signalValue() ?? 0) * 2);
}
