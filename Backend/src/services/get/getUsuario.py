from src.database.db import connection
from src.models.usuario import Usuario

def getUsuario(correo, contra):
    try:
        conn = connection()
        usuarios = []
        inst = "SELECT U.idusuario, concat(U.nombreusuario, ' ', U.apellidopatusuario, ' ', U.apellidomatusuario) as completousuario, U.nrocelular, concat(CO.nombrecorreo, '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as dircorreo, CO.contraseniacorreo FROM Usuario U, Correo CO, TipoCorreo TC WHERE U.idcorreo = CO.idcorreo AND TC.idtipocorreo = CO.idtipocorreo AND concat(CO.nombrecorreo, '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) = %(correo)s AND CO.contraseniacorreo = %(contra)s;"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'correo': correo, 'contra': contra})
            for row in cursor.fetchall():
                usuario = Usuario(row[1], row[2], row[3], row[4])
                usuario.idUsuario = row[0]
                usuarios.append(usuario.to_json())
            conn.commit()
            cursor.close()
        conn.close()
        return usuarios
    except Exception as e:
        print("(SISTEMA)   Error: "+e)