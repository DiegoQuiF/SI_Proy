from src.database.db import db

class TipoCorreo(db.Model):
    idTipoCorreo            = db.Column(db.Integer, primary_key=True)
    compExtension           = db.Column(db.String(50))

    def __init__(self, completo) -> None:
        self.compExtension = completo
    
    def to_json(self):
        return {
            'id_tipo_correo': self.idTipoCorreo,
            'comp_extension' : self.compExtension
        }