from src.database.db import connection
from src.models.tipo_correo import TipoCorreo

def getTipoCorreo(correo):
    try:
        conn = connection()
        tipos = []
        inst = "select TC.idtipocorreo, concat('@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as completoextension from tipocorreo TC where concat('@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) = %(correo)s"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'correo': correo})
            for row in cursor.fetchall():
                tipo = TipoCorreo(row[1])
                tipo.idTipoCorreo = row[0]
                tipos.append(tipo.to_json())
            conn.commit()
            cursor.close()
        conn.close()
        return tipos
    except Exception as e:
        print("(SISTEMA)   Error: "+e)