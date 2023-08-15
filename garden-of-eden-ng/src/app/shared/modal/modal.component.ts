import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {

  @Input() imageUrl: string = "";
  @Input() modalStyle: string = "none";
  @Output() changeModalStyleEvent = new EventEmitter<string>();


  onModalClick() {
    this.modalStyle = "none";
    this.changeModalStyleEvent.emit(this.modalStyle);
  }

  onCloseClick() {
    this.modalStyle = "none";
    this.changeModalStyleEvent.emit(this.modalStyle);
  }
}
