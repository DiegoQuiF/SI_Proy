from src.database.db import connection
from src.models.catalogo import Catalogo

def getCatalogo():
    try:
        conn = connection()
        catalogos = []
        inst = "select CT.idcategoria, CT.nombrecategoria, TG.idtipogasto, TG.nombregasto as nombretipogasto from tipogasto TG, categoria CT where TG.idcategoria = CT.idcategoria;"
        with conn.cursor() as cursor:
            cursor.execute(inst, )
            for row in cursor.fetchall():
                catalogo = Catalogo(row[3], row[0], row[1])
                catalogo.idTipoGasto = row[2]
                catalogos.append(catalogo.to_json())
            conn.commit()
        conn.close()
        return catalogos
    except Exception as e:
        print("(SISTEMA)   Error: "+e)
