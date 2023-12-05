export class Usuario {
    id_usuario: string;
    completo_usuario: string;
    nro_celular: string;
    dir_correo: string;
    contrasenia_correo: string;

    constructor(id_user:string, com_user:string, cel:string,
        correo:string, contra:string){
            this.id_usuario = id_user;
            this.completo_usuario = com_user;
            this.nro_celular = cel;
            this.dir_correo = correo;
            this.contrasenia_correo = contra;
        }
}