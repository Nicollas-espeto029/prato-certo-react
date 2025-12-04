import requests
import os
from fastapi import HTTPException

API_KEY = os.getenv("AIzaSyDhnxlaRmy9-EsHCX1eses9LN2RIQ3ulOo")

def analisar_texto(texto: str) -> float:
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Perspective API KEY não configurada.")

    url = f"https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key={API_KEY}"

    payload = {
        "comment": {"text": texto},
        "languages": ["pt"],
        "requestedAttributes": {"TOXICITY": {}}
    }

    response = requests.post(url, json=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Erro ao analisar texto.")

    data = response.json()
    score = data["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
    return score
