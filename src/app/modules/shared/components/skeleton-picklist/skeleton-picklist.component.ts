import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-picklist',
  templateUrl: './skeleton-picklist.component.html',
  styleUrls: ['./skeleton-picklist.component.scss']
})
export class SkeletonPicklistComponent {

    @Input() soruceLabel:string;
    @Input() targetLabel:string



}
