from flask import Blueprint, jsonify, request
from src.services.get.getUsuario import getUsuario
from src.services.get.getUsuarioAll import getUsuarioAll
from src.services.get.getCorreo import getCorreo
from src.services.get.getTipoCorreo import getTipoCorreo
from src.services.get.getGasto import getGastos
from src.services.post.postRegistrarCorreo import postRegistrarCorreo
from src.services.post.postRegistrarUsuario import postRegistrarUsuario


main = Blueprint('index_blueprint', __name__)

@main.route("/<string:correo>/<string:contra>")
def login(correo, contra):
    try:
        usuarios = getUsuario(correo, contra)
        if(len(usuarios)>0):
            return jsonify({'usuarios':usuarios, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})

@main.route("/<string:correo>")
def register(correo):
    try:
        correos = getCorreo(correo)
        if(len(correos)>0):
            return jsonify({'correos':correos, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})

@main.route("/tipo/<string:correo>")
def tipos(correo):
    try:
        correos = getTipoCorreo(correo)
        if(len(correos)>0):
            return jsonify({'tipos':correos, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})

@main.route("/gastos/<string:id>")
def gastos(id):
    try:
        gastos = getGastos(id)
        if(len(gastos)>0):
            return jsonify({'gastos':gastos, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})

    
@main.route("/registrarCorreo", methods = ['POST'])
def registrarCorreo():
    try:
        data = request.get_json()
        nombre = data['nombre_correo']
        id = data['id_correo']
        contra = data['contra_correo']
        if(postRegistrarCorreo(nombre, id, contra)):
            return jsonify({'message': data, 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})
    
@main.route("/registrarUsuario", methods = ['POST'])
def registrarUsuario():
    try:
        data = request.get_json()
        nombre = data['nombre_usuario']
        paterno = data['paterno_usuario']
        materno = data['materno_usuario']
        id = data['id_correo_usuario']
        celular = data['celular_usuario']
        if(postRegistrarUsuario(nombre, paterno, materno, id, celular)):
            return jsonify({'message': data, 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})
    
@main.route("/getUsuarios")
def todoUsuario():
    try:
        usuarios = getUsuarioAll()
        if(len(usuarios)>0):
            return jsonify({'usuarios':usuarios, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as e:
        return jsonify({'message':'ERROR', 'success':False})