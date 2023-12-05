from src.database.db import db

class Correo(db.Model):
    idCorreo            = db.Column(db.Integer, primary_key=True)
    dirCorreo           = db.Column(db.String(50))

    def __init__(self, direccion) -> None:
        self.dirCorreo = direccion
    
    def to_json(self):
        return {
            'id_correo': self.idCorreo,
            'dir_correo' : self.dirCorreo
        }