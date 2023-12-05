export class TipoCorreo {
    id_tipo_correo: string;
    comp_extension: string;

    constructor(id:string, extension:string) {
        this.id_tipo_correo = id;
        this.comp_extension = extension;
    }
}