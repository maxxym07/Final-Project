import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  countZhanrs = 0
  menuzhanrs = document.getElementsByClassName('menu-zhanrs') as HTMLCollectionOf<HTMLElement>;
  openStatus: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  openZhanrs(): void{
    this.menuzhanrs[0].style.display = 'table'
    this.countZhanrs++
    this.openStatus=true

    if (this.countZhanrs > 1) {
      this.menuzhanrs[0].style.display = 'none'
      this.countZhanrs = 0
      this.openStatus=false
      
    }
  }

}
