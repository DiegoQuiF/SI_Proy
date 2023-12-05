from src.database.db import connection
from src.models.correo import Correo

def getCorreo(correo):
    try:
        conn = connection()
        correos = []
        inst = "select CO.idCorreo, concat(CO.nombrecorreo , '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as dir_correo from tipocorreo TC, correo CO where TC.idtipocorreo = CO.idtipocorreo and concat(CO.nombrecorreo , '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) = %(correo)s"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'correo': correo})
            for row in cursor.fetchall():
                correito = Correo(row[1])
                correito.idCorreo = row[0]
                correos.append(correito.to_json())
            conn.commit()
            cursor.close()
        conn.close()
        return correos
    except Exception as e:
        print("(SISTEMA)   Error: "+e)