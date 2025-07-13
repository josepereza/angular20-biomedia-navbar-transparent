import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  likes: number;
  views: number;
  author: string;
}
@Component({
  selector: 'app-portafolio',
  imports: [NgClass,NgFor, NgIf],
  templateUrl: './portafolio.html',
  styleUrl: './portafolio.css'
})
export class Portafolio {
 images: ImageItem[] = [
    {
      id: 1,
      src: 'https://picsum.photos/seed/1/800/600',
      alt: 'Paisaje 1',
      title: 'Montañas al atardecer',
      likes: 24,
      views: 156,
      author: 'Ana García'
    },
    {
      id: 2,
      src: 'https://picsum.photos/seed/2/800/1200',
      alt: 'Paisaje 2',
      title: 'Bosque misterioso',
      likes: 42,
      views: 289,
      author: 'Carlos Ruiz'
    },
    {
      id: 3,
      src: 'https://picsum.photos/seed/3/800/800',
      alt: 'Paisaje 3',
      title: 'Lago cristalino',
      likes: 31,
      views: 203,
      author: 'María López'
    },
    {
      id: 4,
      src: 'https://picsum.photos/seed/4/800/900',
      alt: 'Paisaje 4',
      title: 'Desierto infinito',
      likes: 18,
      views: 97,
      author: 'Pedro Martín'
    },
    {
      id: 5,
      src: 'https://picsum.photos/seed/5/800/700',
      alt: 'Paisaje 5',
      title: 'Costa salvaje',
      likes: 67,
      views: 412,
      author: 'Laura Sánchez'
    },
    {
      id: 6,
      src: 'https://picsum.photos/seed/6/800/950',
      alt: 'Paisaje 6',
      title: 'Cielo estrellado',
      likes: 89,
      views: 567,
      author: 'Diego Torres'
    },
    {
      id: 7,
      src: 'https://picsum.photos/seed/7/800/650',
      alt: 'Paisaje 7',
      title: 'Cascada tropical',
      likes: 52,
      views: 324,
      author: 'Sofia Vega'
    },
    {
      id: 8,
      src: 'https://picsum.photos/seed/8/800/750',
      alt: 'Paisaje 8',
      title: 'Campos de lavanda',
      likes: 73,
      views: 445,
      author: 'Miguel Herrera'
    },
    {
      id: 9,
      src: 'https://picsum.photos/seed/9/800/550',
      alt: 'Paisaje 9',
      title: 'Atardecer urbano',
      likes: 35,
      views: 198,
      author: 'Elena Morales'
    },
    {
      id: 10,
      src: 'https://picsum.photos/seed/10/800/850',
      alt: 'Paisaje 10',
      title: 'Río sereno',
      likes: 28,
      views: 167,
      author: 'Roberto Silva'
    }
  ];

  likedImages: Set<number> = new Set();
  imageHeights: { [key: number]: number } = {};
selectedImage: ImageItem | null = null;
  isLightboxOpen = false;
  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    console.log('Imágenes cargadas:', this.images.length);
  }

  toggleLike(imageId: number): void {
    if (this.likedImages.has(imageId)) {
      this.likedImages.delete(imageId);
    } else {
      this.likedImages.add(imageId);
    }
  }

  isLiked(imageId: number): boolean {
    return this.likedImages.has(imageId);
  }

  getLikeCount(image: ImageItem): number {
    return this.isLiked(image.id) ? image.likes + 1 : image.likes;
  }

  openLightbox(image: ImageItem): void {
    this.selectedImage = image;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Restaurar scroll
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.isLightboxOpen) {
      switch (event.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    }
  }

  previousImage(): void {
    if (!this.selectedImage) return;
    
    const currentIndex = this.images.findIndex(img => img.id === this.selectedImage!.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : this.images.length - 1;
    this.selectedImage = this.images[previousIndex];
  }

  nextImage(): void {
    if (!this.selectedImage) return;
    
    const currentIndex = this.images.findIndex(img => img.id === this.selectedImage!.id);
    const nextIndex = currentIndex < this.images.length - 1 ? currentIndex + 1 : 0;
    this.selectedImage = this.images[nextIndex];
  }

  onImageLoad(imageId: number, event: Event): void {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const containerWidth = 300; // Aproximado del ancho del contenedor
    const calculatedHeight = Math.min(Math.max(containerWidth * aspectRatio, 200), 400);
    
    this.imageHeights[imageId] = calculatedHeight;
  }

  getImageHeight(imageId: number): string {
    return this.imageHeights[imageId] ? `${this.imageHeights[imageId]}px` : '250px';
  }

  onImageView(imageId: number): void {
    const image = this.images.find(img => img.id === imageId);
    if (image) {
      image.views++;
      console.log(`Viendo imagen: ${image.title}`);
    }
  }

  onImageDownload(imageId: number): void {
    const image = this.images.find(img => img.id === imageId);
    if (image) {
      console.log(`Descargando imagen: ${image.title}`);
    }
  }

  trackByImageId(index: number, image: ImageItem): number {
    return image.id;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.onKeyDown(event);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any): void {
    if (this.isLightboxOpen) {
      document.body.style.overflow = 'auto';
    }
  }
  onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/images/placeholder.jpg'; // Imagen de fallback
  console.log('Error cargando imagen, usando placeholder');
}
}
