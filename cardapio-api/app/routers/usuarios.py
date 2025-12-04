from fastapi import APIRouter, Form, Depends
from app.database import conectar

router = APIRouter(tags=["Usuarios"])

#! Rota post/CRIAR 👇

@router.post("/criar_usuario")
def criar_usuario(nome: str = Form(), email: str = Form(), senha: str = Form()):
    db = conectar()
    cursor = db.cursor()
    
    cursor.execute("""
        INSERT INTO Usuarios (nome, email, senha)
        VALUES (%s, %s, %s)
    """, (nome, email, senha))
    
    db.commit()

    novo_id = cursor.lastrowid  # <— pega o ID gerado no MySQL

    cursor.close()
    db.close()

    return {
        "msg": "Usuário criado",
        "id": novo_id
    }

#! Rota get/LISTAR 👇

@router.get("/usuarios")
def listar_usuarios():
    db = conectar()
    cursor = db.cursor()
    cursor.execute("SELECT id_usuario, nome, email, senha FROM Usuarios")
    usuarios = cursor.fetchall()
    return {"msg": usuarios}

#! Rota DELETE 👇

@router.delete("/usuario/{id_usuario}")
def deletar_usuario(id_usuario: int):
    db = conectar()
    cursor = db.cursor()

    cursor.execute("DELETE FROM Usuarios WHERE id_Usuario = %s", (id_usuario,))
    db.commit()

    # Se nenhuma linha foi deletada, o usuário não existia
    if cursor.rowcount == 0:
        cursor.close()
        db.close()
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    cursor.close()
    db.close()

    return {"msg": "Usuário deletado com sucesso"}

#! Rota put/ATUALIZAR 👇

@router.put("/atualizar_usuario/{id_usuario}")
def atualizar_usuario(
    id_usuario: int,
    nome: str = Form(None),
    email: str = Form(None),
    senha: str = Form(None)
):
    db = conectar()
    cursor = db.cursor()

    # Verificar se existe
    cursor.execute("SELECT * FROM Usuarios WHERE id_Usuario = %s", (id_usuario,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # Criar lista dinâmica de campos
    campos = []
    valores = []

    if nome:
        campos.append("nome = %s")
        valores.append(nome)
    if email:
        campos.append("email = %s")
        valores.append(email)
    if senha:
        campos.append("senha = %s")
        valores.append(senha)

    if not campos:
        raise HTTPException(status_code=400, detail="Nenhum campo enviado")

    valores.append(id_usuario)

    sql = f"UPDATE Usuarios SET {', '.join(campos)} WHERE id_Usuario = %s"
    cursor.execute(sql, valores)
    db.commit()

    return {"msg": "Usuário atualizado com sucesso"}
