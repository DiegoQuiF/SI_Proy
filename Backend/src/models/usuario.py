from src.database.db import db

class Usuario(db.Model):
    idUsuario           = db.Column(db.Integer, primary_key=True)
    completoUsuario     = db.Column(db.String(50))
    nroCelular          = db.Column(db.Integer)
    dirCorreo           = db.Column(db.String(50))
    contraseniaCorreo   = db.Column(db.String(50))

    def __init__(self, completo, celular, correo, contra) -> None:
        self.completoUsuario    = completo
        self.nroCelular         = celular
        self.dirCorreo          = correo
        self.contraseniaCorreo  = contra
    
    def to_json(self):
        return {
            'id_usuario'            : self.idUsuario,
            'completo_usuario'      : self.completoUsuario,
            'nro_celular'           : self.nroCelular,
            'dir_correo'            : self.dirCorreo,
            'contrasenia_correo'    : self.contraseniaCorreo
        }