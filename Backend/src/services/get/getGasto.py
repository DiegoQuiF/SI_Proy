from src.database.db import connection
from src.models.gasto import Gasto

def getGastos(id):
    try:
        conn = connection()
        gastos = []
        inst = "select TG.idtipogasto, DG.idusuario, CT.nombrecategoria, TG.nombregasto, DG.descripciongasto, DG.cantidad, DG.montogasto, (DG.cantidad*DG.montogasto) as total, TO_CHAR(DG.fechagasto, 'DD/MM/YYYY') as fechagasto from tipogasto TG, categoria CT, detallegasto DG where TG.idcategoria = CT.idcategoria and DG.idtipogasto = TG.idtipogasto and DG.idusuario = %(id)s;"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'id': id})
            for row in cursor.fetchall():
                gasto = Gasto(row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8])
                gasto.idTipoGasto = row[0]
                gastos.append(gasto.to_json())
            conn.commit()
        conn.close()
        return gastos
    except Exception as e:
        print("(SISTEMA)   Error: "+e)