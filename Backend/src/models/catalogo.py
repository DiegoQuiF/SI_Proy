from src.database.db import db

class Catalogo(db.Model):
    idTipoGasto         = db.Column(db.Integer, primary_key=True)
    nombreTipoGasto     = db.Column(db.String(50))
    idCategoria         = db.Column(db.Integer)
    nombreCategoria     = db.Column(db.String(50))

    def __init__(self, nomtgas, idcat, nomcat) -> None:
        self.nombreTipoGasto    = nomtgas
        self.idCategoria        = idcat
        self.nombreCategoria    = nomcat
    
    def to_json(self):
        return {
            'id_tipo_gasto'     : self.idTipoGasto,
            'nombre_tipo_gasto' : self.nombreTipoGasto,
            'id_categoria'      : self.idCategoria,
            'nombre_categoria'  : self.nombreCategoria
        }