from src.database.db import connection

def postRegistrarUsuario(nombre, paterno, materno, id, celular):
    try:
        conn = connection()
        inst = "INSERT INTO Usuario (nombreUsuario, apellidoPatUsuario, apellidoMatUsuario, idCorreo, nroCelular) VALUES (%(nombre)s, %(paterno)s, %(materno)s, %(id)s, %(celular)s)"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'nombre': nombre, 'paterno':paterno, 'materno':materno, 'id':id, 'celular':celular})
            conn.commit()
        conn.close()
        return True
    except Exception as e:
        print("(SISTEMA)   Error: "+e)
        return False