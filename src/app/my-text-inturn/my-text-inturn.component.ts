import { Component, OnInit ,OnDestroy,animate,trigger,state,style,transition} from '@angular/core';

@Component({
  selector: 'app-my-text-inturn',
  templateUrl: './my-text-inturn.component.html',
  styleUrls: ['./my-text-inturn.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)

      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class MyTextInturnComponent implements OnInit,OnDestroy {

  timer:number;

  constructor() {}



  ngOnInit() {
    let doms = document.querySelectorAll('.text-inturn>.content>h1');
    let idx = 0;
    this.timer = window.setInterval(()=>{
      let dom = document.querySelector('.current');
      if(dom){
        dom.classList.remove('current');
        doms[idx].classList.add('current');
        if(idx==4){
          idx = 0;
        }else{
          ++idx;
        }
      }
    },5000);
  }

  ngOnDestroy(){
    window.clearInterval(this.timer)
  }
}
