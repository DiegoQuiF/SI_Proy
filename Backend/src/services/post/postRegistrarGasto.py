from src.database.db import connection

def postRegistrarGasto(id_tipo_gasto, id_usuario, monto_gasto, cantidad, fecha_gasto, descripcion_gasto):
    try:
        conn = connection()
        inst = "INSERT INTO DetalleGasto (idTipoGasto, idUsuario, montoGasto, cantidad, descripcionGasto, fechaGasto) VALUES (%(id_tipo_gasto)s, %(id_usuario)s, %(monto_gasto)s, %(cantidad)s, %(descripcion_gasto)s, %(fecha_gasto)s);"
        with conn.cursor() as cursor:
            cursor.execute(inst, {'id_tipo_gasto': id_tipo_gasto, 'id_usuario':id_usuario, 'monto_gasto':monto_gasto, 'cantidad':cantidad, 'descripcion_gasto': descripcion_gasto, 'fecha_gasto':fecha_gasto})
            conn.commit()
        conn.close()
        return True
    except Exception as e:
        print("(SISTEMA)   Error: "+e)
        return False