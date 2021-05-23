import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})
export class DropdownSelectComponent implements OnInit {

  private _selectedItem: any;
  get selectedItem() { return this._selectedItem }
  @Input() set selectedItem(selectedItem: any) { this._selectedItem = selectedItem }
  @Output() selectedItemChange = new EventEmitter<any>();

  @Input() items: any[] = [];
  @Input() itemText: any;
  @Input() itemValue: any;
  @Input() placeholder: string = "Selecciona una opción";

  constructor() { }

  ngOnInit(): void {
  }

  hasItemText() {
    return this.itemText != undefined && this.itemText != null;
  }

  hasItemValue() {
    return this.itemValue != undefined && this.itemValue != null;
  }

  isItemSelected() {
    return this.selectedItem != undefined && this.selectedItem != null;
  }

  onItemSelected(item: any) {
    if (this.hasItemValue()) {
      const key = this.itemValue;
      const value = item[key];
      this.selectedItem = value;
      this.selectedItemChange.emit(value);
    }
    else {
      this.selectedItem = item;
      this.selectedItemChange.emit(item);
    }
  }

  getItemAsString(item: any) {
    if (this.hasItemText()) {
      const key = this.itemText;
      return item[key];
    }
    else {
      return item;
    }
  }

  getSelectedItemAsString() {
    if (!this.isItemSelected()) {
      return this.placeholder;
    }

    if (this.hasItemText()) {
      const item = this.items.find(i => i[this.itemValue] == this.selectedItem);
      return this.isNullOrUndefined(item)
        ? this.placeholder
        : item[this.itemText];
    }
    else {
      return this.selectedItem;
    }
  }

  private isNullOrUndefined<T>(object: T | undefined | null): object is T {  
    return <T>object !== undefined && <T>object !== null;  
  }  

}
