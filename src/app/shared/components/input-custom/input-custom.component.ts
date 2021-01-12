import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputCustomComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputCustomComponent,
      multi: true,
    },
  ],
})
export class InputCustomComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() public value = '';
  @Output() public valueChange = new EventEmitter<string>();

  hide = true;

  form: FormControl;
  public errors;
  public onChange = (value: string) => {};
  public onTouched = () => {};

  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(value: FormControl): void {
    this.form = value;
    this.errors = value.errors;
  }
}
