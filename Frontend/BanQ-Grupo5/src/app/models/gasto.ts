export class Gasto {
    id_tipo_gasto: string;
    id_usuario: string;
    nombre_categoria: string;
    nombre_gasto: string;
    descripcion_gasto: string;
    cantidad: string;
    monto_gasto: string;
    total: string;
    fecha_gasto: string;

    constructor(idgas:string, iduser:string, cat:string, gas:string,
        des:string, can:string, mon:string, tot:string, fgas:string){
        this.id_tipo_gasto = idgas;
        this.fecha_gasto = fgas;
        this.id_usuario = iduser;
        this.nombre_categoria = cat;
        this.nombre_gasto = gas;
        this.descripcion_gasto = des;
        this.cantidad = can;
        this.monto_gasto = mon;
        this.total = tot;
    }
}