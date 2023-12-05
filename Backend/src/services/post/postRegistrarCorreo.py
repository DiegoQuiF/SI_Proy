from src.database.db import connection

def postRegistrarCorreo(nombre, id, contra):
    try:
        conn = connection()
        inst = "INSERT INTO Correo (nombreCorreo, idTipoCorreo, contraseniaCorreo) VALUES (%(nombre)s, %(id)s, %(contra)s)"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'nombre': nombre, 'id':id, 'contra':contra})
            conn.commit()
        conn.close()
        return True
    except Exception as e:
        print("(SISTEMA)   Error: "+e)
        return False