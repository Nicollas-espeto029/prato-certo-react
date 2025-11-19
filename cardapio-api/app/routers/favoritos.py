from fastapi import APIRouter, Depends
from app.database import conectar

router = APIRouter(tags=["Favoritos"])

def pegar_usuario():
    return 1  # Simples teste; depois usar OAuth2 ou JWT

@router.post("/favoritar/{id_prato}")
def favoritar(id_prato: int, usuario: int = Depends(pegar_usuario)):
    db = conectar()
    cursor = db.cursor()
    cursor.execute("INSERT INTO Favoritos (id_pratos, id_usuario) VALUES (%s,%s)", (id_prato, usuario))
    db.commit()
    return {"msg": "Favorito adicionado"}
