"""import numpy as np

states = ["CANT", "DESC", "TIPO", "MONT"]
observations = ["un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
                "pollo", "apio", "camote", "broaster", "libro", "manual", "netflix", "disney", "vacuna", "tocino",
                "alimentacion", "comunicacion", "deudas", "educacion", "entretenimiento", "ingresos", "salud", "transporte", "vestimenta", "vivienda", "otros"]
transition_matrix = np.array([[0.05, 0.85, 0.05, 0.05],
                              [0.1, 0.1, 0.4, 0.4],
                              [0.3, 0.05, 0.05, 0.6],
                              [0.6, 0.05, 0.3, 0.5]])
emission_matrix = np.array([[0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.1],
                            [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
initial_state = np.array([0.4, 0.05, 0.4, 0.15])

text = input("Ingrese el texto: ")
import nltk
from nltk.tokenize import RegexpTokenizer
tokenizer = RegexpTokenizer(r'\w+')
words = tokenizer.tokenize(text)

obs = []


for word in words:
    if word in observations:
        index = observations.index(word)
        obs.append(index)
        print("+ "+word)
    else:
        print("- "+word)

if obs:
    n_states = len(states)
    n_obs = len(obs)
    prob_matrix = np.zeros((n_states, n_obs))
    pointer_matrix = np.zeros((n_states, n_obs), dtype=int)

    for i in range(n_states):
        prob_matrix[i, 0] = initial_state[i] * emission_matrix[i, obs[0]]
        pointer_matrix[i, 0] = 0

    for t in range(1, n_obs):
        for i in range(n_states):
            max_prob = max(prob_matrix[:, t - 1] * transition_matrix[:, i] * emission_matrix[i, obs[t]])
            prob_matrix[i, t] = max_prob
            pointer_matrix[i, t] = np.argmax(prob_matrix[:, t - 1] * transition_matrix[:, i])

    best_path = []
    last_state = np.argmax(prob_matrix[:, -1])
    best_path.append(last_state)

    for t in range(n_obs - 1, 0, -1):
        prev_state = pointer_matrix[last_state, t]
        best_path.append(prev_state)
        last_state = prev_state

    best_path.reverse()
    best_path = [states[i] for i in best_path]
    print("La secuencia de estados más probable es:", best_path)
"""

from src.processs.Procesador import Procesador

obs = Procesador("agregar a alimentacion tres pollo por cinco soles").procesar()