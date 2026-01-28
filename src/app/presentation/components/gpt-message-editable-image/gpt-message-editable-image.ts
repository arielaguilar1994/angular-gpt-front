import { AfterViewInit, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  imports: [],
  templateUrl: './gpt-message-editable-image.html'
})
export class GptMessageEditableImage implements AfterViewInit {
  canvasElement = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  text = input.required<string>();
  imageUrl = input<{ url: string; alt?: string } | null>();
  onSelectedImage = output<string>();

  public originalImage = signal<HTMLImageElement|null>(null);
  public isDrawing = signal(false);
  public coords = signal({ x: 0, y:0  })

  ngAfterViewInit(): void {
    if(!this.canvasElement()?.nativeElement) return;

    const canvas = this.canvasElement()!.nativeElement;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.imageUrl()?.url || '';

    this.originalImage.set(image);

    image.onload = () => {
      ctx?.drawImage( image, 0,0, canvas.width, canvas.height );
    }
  }

  onMouseDown(event: MouseEvent) {
    if(!this.canvasElement()?.nativeElement) return;

    this.isDrawing.set(true);

    const startX = event.clientX - this.canvasElement()!.nativeElement.getBoundingClientRect().left;
    const startY = event.clientY - this.canvasElement()!.nativeElement.getBoundingClientRect().top;
    
    //this is my coords
    this.coords.set({ x: startX, y: startY });
  }

  onMouseMove(event: MouseEvent) {
    if(!this.isDrawing()) return;
    if(!this.canvasElement()?.nativeElement) return;

    const canvasRef = this.canvasElement()!.nativeElement;

    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    //calculate dimension of rectangle (height and width)
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;

    //TODO:  clean canvas
    const ctx = canvasRef.getContext('2d');
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight)
    // reset image
    ctx?.drawImage(this.originalImage()!, 0, 0, canvasWidth, canvasHeight);

    // fill rect with rectangle
    // ctx?.fillRect( this.coords().x, this.coords().y, width, height);
    ctx?.clearRect( this.coords().x, this.coords().y, width, height);
  }

  onMouseUp() {
    this.isDrawing.set(false);

    const canvas = this.canvasElement()!.nativeElement;
    const url = canvas.toDataURL('image/png')
    console.log(url);
    this.onSelectedImage.emit(url);
  }

  handleImageClick(): void {
    this.onSelectedImage.emit(this.imageUrl()!.url);
  }

}
