from fastapi import APIRouter, Form, UploadFile, File
from app.database import conectar
import shutil
import os

router = APIRouter(tags=["Pratos"])

os.makedirs("imagens", exist_ok=True)

@router.post("/criar_prato")
def criar_prato(nome: str = Form(), descricao: str = Form(), avaliacao: str = Form(), imagem: UploadFile = File(...)):
    caminho = f"imagens/{imagem.filename}"
    with open(caminho, "wb") as f:
        shutil.copyfileobj(imagem.file, f)
    db = conectar()
    cursor = db.cursor()
    cursor.execute("INSERT INTO Pratos (nome, descricao, imagemprato, avaliacao) VALUES (%s,%s,%s,%s)",
                   (nome, descricao, caminho, avaliacao))
    db.commit()
    return {"msg": "Prato criado"}
