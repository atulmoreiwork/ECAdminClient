import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
 // standalone: true,
 // imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      //console.log(v);  
      this.loading = v;
      var loaderOBJ: any = document.getElementById("loaderBox");
      if (loaderOBJ) {
        if (this.loading) {
          loaderOBJ.style.display = "block";
        }
        else {
          loaderOBJ.style.display = "none";          
        }
      }
    });
  }
  ngOnInit(): void {
    var loaderOBJ: any = document.getElementById("loaderBox");
    if (loaderOBJ) {
      if (this.loading) {
        loaderOBJ.style.display = "block";
      }
      else {
        loaderOBJ.style.display = "none";
      }
    }    
  }
}
