from src.database.db import db

class Gasto(db.Model):
    idTipoGasto         = db.Column(db.Integer, primary_key=True)
    idUsuario           = db.Column(db.Integer)
    nombreCategoria     = db.Column(db.String(50))
    nombreGasto         = db.Column(db.String(50))
    descripcionGasto    = db.Column(db.String(50))
    cantidad            = db.Column(db.Integer)
    montoGasto          = db.Column(db.Float)
    total               = db.Column(db.Float)
    fecha               = db.Column(db.String(50))

    def __init__(self, idUser, nomCat, nomGas, des, cant, mont, tot, fe) -> None:
        self.idUsuario          = idUser
        self.nombreCategoria    = nomCat
        self.nombreGasto        = nomGas
        self.descripcionGasto   = des
        self.cantidad           = cant
        self.montoGasto         = mont
        self.total              = tot
        self.fecha              = fe
    
    def to_json(self):
        return {
            'id_tipo_gasto'     : self.idTipoGasto,
            'id_usuario'        : self.idUsuario,
            'nombre_categoria'  : self.nombreCategoria,
            'nombre_gasto'      : self.nombreGasto,
            'descripcion_gasto' : self.descripcionGasto,
            'cantidad'          : self.cantidad,
            'monto_gasto'       : self.montoGasto,
            'total'             : self.total,
            'fecha_gasto'       : self.fecha
        }