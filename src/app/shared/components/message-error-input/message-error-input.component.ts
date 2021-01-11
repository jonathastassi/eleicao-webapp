import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-message-error-input',
  templateUrl: './message-error-input.component.html',
  styleUrls: ['./message-error-input.component.css'],
})
export class MessageErrorInputComponent implements OnInit {
  @Input() public errors: ValidationErrors;

  constructor() {}

  ngOnInit(): void {}
}
