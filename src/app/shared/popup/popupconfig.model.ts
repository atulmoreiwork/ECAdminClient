export class PopUpConfig {
    isShowPopup: boolean = false;
    header: string = '';
    isSave: boolean = true;
    saveButtonName: string ='Save';
    isClose: boolean = true;
    closeButtonName: string = 'Cancel';
    isCrossIcon: boolean = true;
    isShowLeft: boolean = false;
      
  }  
  
  export class PopUpConfigFactory {
    public static getPopUpConfig(config: any) {      
      let pconf = new PopUpConfig();
      Object.assign(pconf, config);    
      return pconf;
    }
  }