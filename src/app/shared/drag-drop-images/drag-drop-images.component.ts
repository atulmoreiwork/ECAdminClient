import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drag-drop-images',
  //standalone: true,
  //imports: [],
  templateUrl: './drag-drop-images.component.html',
  styleUrl: './drag-drop-images.component.css'
})
export class DragDropImagesComponent {
  isDragOver = false;
  images: { file: File; url: string; name: string }[] = [];
  errorMessage: string | null = null;
  // Allowed file extensions
  allowedExtensions = ['jpg', 'jpeg', 'png', 'svg'];
  // Output to emit the list of image URLs
  @Output() imageListChange = new EventEmitter<string[]>();

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.validateAndAddFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.validateAndAddFiles(input.files);
    }
  }

  validateAndAddFiles(files: FileList): void {
    Array.from(files).forEach((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (this.allowedExtensions.includes(extension || '')) {
        this.errorMessage = null;
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          this.images.push({ file, url, name: file.name });
          this.emitImageList(); // Emit the updated list
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = `Only files with extensions ${this.allowedExtensions.join(
          ', '
        )} are allowed.`;
      }
    });
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
    this.emitImageList(); // Emit the updated list
  }

  emitImageList(): void {
    const imageUrls = this.images.map((image) => image.url);
    this.imageListChange.emit(imageUrls); // Emit the list of image URLs
  }
}
