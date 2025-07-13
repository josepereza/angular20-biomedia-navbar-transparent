import { NgForOf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular20-bioma';
   services = signal([
    {
      title: 'Fotografía Profesional',
      description: 'Capturamos la esencia de tu marca con fotografías profesionales de alta calidad.',
      icon: 'fas fa-camera'
    },
    {
      title: 'Producción de Video',
      description: 'Creamos contenido audiovisual impactante que conecta con tu audiencia.',
      icon: 'fas fa-video'
    },
    {
      title: 'Branding Digital',
      description: 'Desarrollamos tu identidad visual para destacar en el mundo digital.',
      icon: 'fas fa-paint-brush'
    },
    {
      title: 'Diseño Gráfico',
      description: 'Transformamos ideas en diseños visuales creativos e innovadores.',
      icon: 'fas fa-palette'
    },
    {
      title: 'Marketing Digital',
      description: 'Estrategias digitales para potenciar tu presencia online.',
      icon: 'fas fa-bullhorn'
    },
    {
      title: 'Edición Creativa',
      description: 'Post-producción profesional para darle vida a tus proyectos.',
      icon: 'fas fa-edit'
    }
  ]);

  contactData = signal({
    name: '',
    email: '',
    location: '',
    message: ''
  });

  onSubmit() {
    console.log('Formulario enviado:', this.contactData());
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    
    // Limpiar el formulario
    this.contactData.set({
      name: '',
      email: '',
      location: '',
      message: ''
    });
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
