export default interface Medico {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    contacto: Contacto;
    horario: Horario;
    disponible: boolean;
  }
  
  interface Horario {
    dia: string[];
    horario: string;
  }
  
  interface Contacto {
    email: string;
    telefono: number;
  }