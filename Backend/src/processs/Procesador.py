import nltk
import numpy as np
from nltk.tokenize import RegexpTokenizer

class Procesador:
    estados = ["CANT", "DESC", "TIPO", "MONT"]
    observaciones = ["un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
                "pollo", "apio", "camote", "broaster", "libro", "manual", "netflix", "disney", "vacuna", "tocino",
                "alimentacion", "comunicacion", "deudas", "educacion", "entretenimiento", "ingresos", "salud", "transporte", "vestimenta", "vivienda", "otros"]
    matriz_transicion = np.array([[0.05, 0.85, 0.05, 0.05],
                                [0.1, 0.1, 0.4, 0.4],
                                [0.3, 0.05, 0.05, 0.6],
                                [0.6, 0.05, 0.3, 0.5]])
    matriz_emision = np.array([[0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.1],
                                [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
    prob_iniciales = np.array([0.4, 0.05, 0.4, 0.15])
    mensaje = ""
    valores = ["", "", ""]

    def __init__(self, mensaje):
        self.mensaje = mensaje
        self.valores = ["", "", ""]

    def procesar(self):
        # TOKENIZACIÓN POR MEDIO DE NLTK
        tokenizer = RegexpTokenizer(r'\w+')
        palabras = tokenizer.tokenize(self.mensaje)

        obs = []
        obs_plus = []

        print("PALABRAS RECONOCIDAS: ")
        for palabra in palabras:
            if palabra in self.observaciones:
                index = self.observaciones.index(palabra)
                obs.append(index)
                obs_plus.append(palabra)
                print("  + "+palabra)
        

        if obs:
            n_estados = len(self.estados)
            n_obs = len(obs)
            prob_matrix = np.zeros((n_estados, n_obs))
            pointer_matrix = np.zeros((n_estados, n_obs), dtype=int)

            for i in range(n_estados):
                prob_matrix[i, 0] = self.prob_iniciales[i] * self.matriz_emision[i, obs[0]]
                pointer_matrix[i, 0] = 0

            for t in range(1, n_obs):
                for i in range(n_estados):
                    max_prob = max(prob_matrix[:, t - 1] * self.matriz_transicion[:, i] * self.matriz_emision[i, obs[t]])
                    prob_matrix[i, t] = max_prob
                    pointer_matrix[i, t] = np.argmax(prob_matrix[:, t - 1] * self.matriz_transicion[:, i])

            mejor_path = []
            ultimo_estado = np.argmax(prob_matrix[:, -1])
            mejor_path.append(ultimo_estado)

            for t in range(n_obs - 1, 0, -1):
                prev_state = pointer_matrix[ultimo_estado, t]
                mejor_path.append(prev_state)
                ultimo_estado = prev_state

            mejor_path.reverse()
            mejor_path = [self.estados[i] for i in mejor_path]
            print("La secuencia de estados más probable es:", mejor_path)

            resultado = {
                "id_tipo_gasto": "",
                "monto_gasto": "",
                "cantidad": "",
                "descripcion": ""
            }
            # [0] → id_tipo_gasto
            # [1] → monto_gasto
            # [2] → cantidad
            # [3] → descripcion

            if(len(mejor_path) == 4):
                for i in range(4):
                    if (mejor_path[i] == "CANT") & (resultado["cantidad"] == ""):
                        resultado["cantidad"] = self.obtener("CANT", obs_plus[i])
                    elif ((mejor_path[i] == "TIPO") | (mejor_path[i] == "DESC")) & ((resultado["id_tipo_gasto"] == "") & (resultado["descripcion"] == "")):
                        resultado["id_tipo_gasto"] = self.obtener("TIPO", obs_plus[i])
                        resultado["descripcion"] = self.obtener("DESC", obs_plus[i])
                    elif (mejor_path[i] == "MONT") & (resultado["monto_gasto"] == ""):
                        resultado["monto_gasto"] = self.obtener("MONT", obs_plus[i])
                return resultado
        return ""
    
    def obtener(self, estado, valor):
        if estado == "MONT":
            if valor == "un": return "1.0"
            elif valor == "dos": return "2.0"
            elif valor == "tres": return "3.0"
            elif valor == "cuatro": return "4.0"
            elif valor == "cinco": return "5.0"
            elif valor == "seis": return "6.0"
            elif valor == "siete": return "7.0"
            elif valor == "ocho": return "8.0"
            elif valor == "nueve": return "9.0"
            elif valor == "diez": return "10.0"
        elif estado == "TIPO":
            if valor == "pollo": return "1001"
            elif valor == "apio": return "1001"
            elif valor == "camote": return "1001"
            elif valor == "broaster": return "1000"
            elif valor == "libro": return "1012"
            elif valor == "manual": return "1012"
            elif valor == "netflix": return "1014"
            elif valor == "disney": return "1014"
            elif valor == "vacuna": return "1018"
            elif valor == "tocino": return "1000"
        elif estado == "DESC":
            if valor == "pollo": return "pollo"
            elif valor == "apio": return "apio"
            elif valor == "camote": return "camote"
            elif valor == "broaster": return "pollo broaster"
            elif valor == "libro": return "libro"
            elif valor == "manual": return "manual"
            elif valor == "netflix": return "servicio de netflix"
            elif valor == "disney": return "servicio de disney"
            elif valor == "vacuna": return "vacuna"
            elif valor == "tocino": return "bocadillo de tocino"
        elif estado == "CANT":
            if valor == "un": return "1"
            elif valor == "dos": return "2"
            elif valor == "tres": return "3"
            elif valor == "cuatro": return "4"
            elif valor == "cinco": return "5"
            elif valor == "seis": return "6"
            elif valor == "siete": return "7"
            elif valor == "ocho": return "8"
            elif valor == "nueve": return "9"
            elif valor == "diez": return "10"
        return ""
        