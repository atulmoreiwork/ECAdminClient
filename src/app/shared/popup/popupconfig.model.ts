export class PopUpConfig {
    isShowPopup: boolean = false;
    header: string = '';
    isSave: boolean = true;
    saveButtonName: string ='Save';
    isClose: boolean = true;
    isShowCrossBtn: boolean = true;
    closeButtonName: string = 'Cancel';
    isCrossIcon: boolean = true;
    isShowLeft: boolean = false;
    isShowHeaderText:boolean = false;
    message:string=''; 
    isConfirmBox:boolean=false;     
    popupFor:string='all';
    popupHeaderColor: string = 'bg-blue';
    closeFromPopup: string = 'close';
  }  
  
  export class PopUpConfigFactory {
    public static getPopUpConfig(config: any) {      
      let pconf = new PopUpConfig();
      Object.assign(pconf, config);    
      return pconf;
    }
  }