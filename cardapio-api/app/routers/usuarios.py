from fastapi import APIRouter, Form, Depends
from app.database import conectar

router = APIRouter(tags=["Usuarios"])

@router.post("/criar_usuario")
def criar_usuario(nome: str = Form(), email: str = Form(), senha: str = Form()):
    db = conectar()
    cursor = db.cursor()
    cursor.execute("INSERT INTO Usuarios (nome, email, senha) VALUES (%s,%s,%s)",
                   (nome, email, senha))
    db.commit()
    return {"msg": "Usuário criado"}
