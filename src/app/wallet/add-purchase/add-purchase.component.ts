import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  form: FormGroup;
  @Output() addPurchase = new EventEmitter<Purchase>();

  errorMessages = {
    title: {
      required: 'поле обязательно для заполнения',
      minlength: 'минимальная длина — 3',
      maxlength: 'максимальная длина — 80'
    },
    price: {
      required: 'поле обязательно для заполнения',
      min: 'минимальное значение 10',
      max: 'максимальное значение 1000000',
      pattern: 'разрешены лишь цифры'
    },
    date: {
      pattern: 'неверный формат даты'
    }
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      price: ['', [Validators.required, Validators.pattern('[0-9]*.?[0-9]+'), Validators.min(10), Validators.max(1000000)]],
      comment: [''],
      date: ['', [Validators.pattern('([0-2]?[0-9]|[3][0-1]).?([0][0-9]|[1][0-2]).[0-2]?[0-9][0-9][0-9]')]]
    });
  }

  errorMess(type) {
    const fieldType = this.form.get(type);
    let message = '';
    const error = this.errorMessages[type];

    for (const key in fieldType.errors) {
      if (fieldType.errors.hasOwnProperty(key)) {
        message += error[key] + '';
      }
    }
    return message;
  }

  onSubmit() {
    const price = parseFloat(this.form.value.price);

    if (this.form.invalid) {
      return;
    }

    const purchase: Purchase = {
      title: this.form.value.title,
      price: Math.floor(price * 100) / 100,
      date: this.form.value.date === '' ? new Date() : new Date(this.form.value.date)
    };

    if (this.form.value.comment) {
      purchase.comment = this.form.value.comment;
    }
    this.addPurchase.emit(purchase);
  }
}
