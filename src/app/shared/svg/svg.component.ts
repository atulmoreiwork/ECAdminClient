import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
 // standalone: true,
 // imports: [],
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.css'
})
export class SvgComponent {
  @Input() iconName = 'delete';
  @Input() width = '24px';
  @Input() height = '24px';
  @Input() viewBox = '0 0 24 24';
  @Input() fill = 'none';
  @Input() classAttr = '';
  @Input() xmlns = 'http://www.w3.org/2000/svg';
}
