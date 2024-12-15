import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PopUpConfig } from './popupconfig.model';

@Component({
  selector: 'app-popup',
  // standalone: true,
  // imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit, OnChanges
{
  @Input() isShowPopup: boolean = false;
  @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() saveButtonName: string = 'Save';
  @Input() closeButtonName: string = 'Cancel';
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
  
  ngOnChanges(changes: any): void {}
  ngOnInit(): void {  }

  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    this.CloseEvent.next(false);
  }
  public open(config: PopUpConfig) {
    this.config = config;
  } 
  getReturnMessage(evt: any) {
    this.ReturnMessage.next(evt);
  }
}
