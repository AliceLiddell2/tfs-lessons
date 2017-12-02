import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css']
})
export class PurchasePreviewComponent implements OnInit, OnChanges {
  @Input() purchase: Purchase;
  @Input() isOpen: boolean;
  @Output() previewClick = new EventEmitter();
  @Output() previewDelete = new EventEmitter();
  @Output() edit = new EventEmitter<Purchase>();

  isEdit = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges({isOpen}: SimpleChanges) {
    if (isOpen) {
      this.isEdit = false;
    }
  }

  onClick() {
    this.previewClick.emit();
  }

  onEditClick() {
    this.isEdit = true;
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();

    this.previewDelete.emit();
  }

  onEditPurchase(purchase: Purchase) {
    if (this.purchase.id) {
      purchase = Object.assign({...purchase} , {id: this.purchase.id});
    }

    this.edit.emit(purchase);
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }
}
