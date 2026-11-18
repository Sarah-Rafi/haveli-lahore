import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { INFO } from '../data/info';

const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in the visitor's local time

/** Rejects dates before today. Exported for unit tests. */
export function notInPast(c: AbstractControl<string>): ValidationErrors | null {
  return c.value && c.value < today() ? { past: true } : null;
}

/** Accepts only opening hours (12:00 to 23:30). */
export function openingHours(c: AbstractControl<string>): ValidationErrors | null {
  return c.value && (c.value < '12:00' || c.value > '23:30') ? { hours: true } : null;
}

@Component({
  selector: 'app-reserve',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="wrap">
      <div class="container two">
        <div class="intro">
          <p class="kicker">Reservations</p>
          <h1 class="title">Reserve a <em>table</em></h1>
          <p class="lead">Rooftop tables facing the Badshahi Mosque go fast at sunset. Tell us when you’re coming and we’ll get your request ready to confirm.</p>
          <div class="divider">✦</div>
          <p class="muted">Prefer to call? <a [href]="info.phoneHref">{{ info.phone }}</a></p>
        </div>

        @if (!submitted()) {
          <form [formGroup]="form" (ngSubmit)="submit()" novalidate animate.leave="leave-fade">
            <label>Full name
              <input formControlName="name" autocomplete="name" />
              @if (show('name')) { <small>Please enter your name (2+ characters).</small> }
            </label>
            <label>Phone
              <input formControlName="phone" type="tel" autocomplete="tel" placeholder="03xx xxxxxxx" />
              @if (show('phone')) { <small>Enter a valid Pakistani mobile number, such as 0300 1234567.</small> }
            </label>
            <div class="pair">
              <label>Date
                <input formControlName="date" type="date" [min]="minDate" />
                @if (show('date')) { <small>{{ form.controls.date.hasError('past') ? 'That date has already passed.' : 'Pick a date.' }}</small> }
              </label>
              <label>Time
                <input formControlName="time" type="time" min="12:00" max="23:30" step="1800" />
                @if (show('time')) { <small>We seat guests from 12:00 to 23:30.</small> }
              </label>
            </div>
            <div class="pair">
              <label>Guests
                <input formControlName="guests" type="number" min="1" max="30" />
                @if (show('guests')) { <small>1–30 guests. For bigger groups, please call.</small> }
              </label>
              <label>Seating
                <select formControlName="seating">
                  @for (s of seatingOptions; track s) { <option [value]="s">{{ s }}</option> }
                </select>
              </label>
            </div>
            <label>Special requests <span class="opt">(optional)</span>
              <textarea formControlName="notes" rows="3" maxlength="300" placeholder="Birthday, high chair, near the balcony…"></textarea>
            </label>
            <button class="btn solid" type="submit">Request reservation</button>
          </form>
        } @else {
          <div class="confirm" animate.enter="enter-up" role="status">
            <p class="urdu">شکریہ</p>
            <h2>Thank you, {{ form.value.name }}!</h2>
            <p class="muted">Here is your request. Please call to confirm your table. This concept site does not take real bookings.</p>
            <dl>
              <dt>When</dt><dd>{{ form.value.date }} at {{ form.value.time }}</dd>
              <dt>Guests</dt><dd>{{ form.value.guests }}</dd>
              <dt>Seating</dt><dd>{{ form.value.seating }}</dd>
              @if (form.value.notes) { <dt>Notes</dt><dd>{{ form.value.notes }}</dd> }
            </dl>
            <div class="row">
              <a class="btn solid" [href]="info.phoneHref">Call to confirm</a>
              <button class="btn" (click)="reset()">New request</button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './reserve.scss',
})
export default class Reserve {
  protected readonly info = INFO;
  protected readonly minDate = today();
  protected readonly seatingOptions = ['Rooftop (mosque view)', 'Terrace', 'Indoor', 'No preference'];
  protected readonly submitted = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+92|0)3\d{2}[\s-]?\d{7}$/)]],
    date: [today(), [Validators.required, notInPast]],
    time: ['19:00', [Validators.required, openingHours]],
    guests: [2, [Validators.required, Validators.min(1), Validators.max(30)]],
    seating: ['Rooftop (mosque view)'],
    notes: [''],
  });

  /** Shows an error only after the user has interacted with the field, or tried to submit. */
  show(name: keyof typeof this.form.controls) {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.submitted.set(true);
  }

  reset() {
    this.form.reset();
    this.submitted.set(false);
  }
}
