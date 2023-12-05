import nltk
from nltk.tokenize import RegexpTokenizer

class Procesador:
    mensaje = ""
    valores = ["", "", ""]

    def __init__(self, mensaje):
        self.mensaje = mensaje
        self.valores = ["", "", ""]

    def procesar(self):
        # TOKENIZACIÓN POR MEDIO DE NLTK
        tokenizer = RegexpTokenizer(r'\w+')
        tokens = tokenizer.tokenize(self.mensaje)
        return tokens