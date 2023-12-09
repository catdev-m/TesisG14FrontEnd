import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss']
})
export class SkeletonTableComponent {
    @Input() columnCount:number;
    skArray:string[]=[];

    ngOnInit(){
        this.fakeArray();
    }

    fakeArray(){
        for (let index = 0; index < this.columnCount; index++) {
            this.skArray[index]='a';
        }
        console.log(this.skArray);
    }
}
