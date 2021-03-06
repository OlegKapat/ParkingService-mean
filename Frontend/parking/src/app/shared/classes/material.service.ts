
import { MaterialInstance } from './material.service';
import { ElementRef } from '@angular/core';

declare var M;
export interface MaterialInstance {
  open?():void
  close?():void
  destroy?():void
}
export interface MaterialDatepicker extends MaterialInstance {
    date?:Date;
}

export class MaterialService
{
static toast(message:string){
  M.toast({html:message,classes: 'rounded'})
}
static initializeFloatinButton(ref:ElementRef){
  M.FloatingActionButton.init(ref.nativeElement)
}
static updateTextInput(){
  M.updateTextFields();
}
static initModal(ref:ElementRef):MaterialInstance{
    return M.Modal.init(ref.nativeElement);
}
static initTooltip(ref:ElementRef):MaterialInstance{
  return M.Tooltip.init(ref.nativeElement);
}
  static initDatepicker(ref:ElementRef,onClose:()=>void):MaterialDatepicker{
    return M.Datepicker.init(ref.nativeElement,{
      format:'dd.mm.yyyy',
      showClearBtn:true,
      onClose:onClose,
      i18n:{
        clear:"скинути",
        cancel:"відміна"
      },
      autoClose:true

    });
  }
  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement)
  }
  static initSelect(ref:ElementRef):MaterialInstance{
      return M.FormSelect.init(ref.nativeElement,{
        dropdownOptions:{
          input:'li',
          dropdown:'Dropdown'
        }
      })
  }
  static initDropDown(ref: ElementRef): MaterialInstance {
    return M.Dropdown.init(ref.nativeElement)
  }
  static initTable (ref:ElementRef):MaterialInstance{
     return M.Tabs.init(ref.nativeElement,{swipeable:true})
  }
  static initParalax(ref:ElementRef):MaterialInstance{
    return M.Parallax.init(ref.nativeElement,{responsiveThreshold:520})
  }
  static initCollapsible(ref:ElementRef):MaterialInstance{
    return M.Collapsible.init(ref.nativeElement)
  }
}
