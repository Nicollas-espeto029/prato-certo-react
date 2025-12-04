from fastapi import APIRouter, Depends, Form
from app.database import conectar

router = APIRouter(tags=["Favoritos"])

def pegar_usuario():
    return 1  # Simples teste; depois usar OAuth2 ou JWT

#! Rota post/CRIAR 👇

@router.post("/favoritar/{id_prato}/{id_usuario}")
def favoritar(id_prato: int, id_usuario: int):
    conn = conectar()
    cursor = conn.cursor()

    # verifica se usuario existe
    cursor.execute("SELECT id_Usuario FROM Usuarios WHERE id_Usuario=%s", (id_usuario,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # verifica se prato existe
    cursor.execute("SELECT id_pratos FROM Pratos WHERE id_pratos=%s", (id_prato,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Prato não encontrado")

    cursor.execute(
        "INSERT INTO Favoritos (id_pratos, id_usuario) VALUES (%s, %s)",
        (id_prato, id_usuario)
    )
    conn.commit()
    return {"message": "Favorito adicionado"}

#! Rota get/LISTAR 👇

@router.get("/favoritos/{id_usuario}")
def listar_favoritos(id_usuario: int):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            f.id_favorito, 
            p.nome, 
            p.descricao, 
            p.imagemprato AS imagem, 
            p.avaliacao
        FROM Favoritos f
        INNER JOIN Pratos p ON f.id_pratos = p.id_pratos
        WHERE f.id_usuario = %s
    """, (id_usuario,))

    resultados = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"favoritos": resultados}

#! Rota DELETE 👇

@router.delete("/favoritos/{id_prato}")
def remover_favorito(id_prato: int, usuario: int = Depends(pegar_usuario)):
    db = conectar()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM Favoritos WHERE id_pratos = %s AND id_usuario = %s",
        (id_prato, usuario)
    )
    db.commit()

    return {"msg": "Favorito removido com sucesso"}

#! Rota put/ATUALIZAR 👇

@router.put("/atualizar_favorito/{id_favorito}")
def atualizar_favorito(id_favorito: int, novo_prato: int = Form(...)):
    db = conectar()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM Favoritos WHERE id_favorito = %s", (id_favorito,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Favorito não encontrado")

    cursor.execute(
        "UPDATE Favoritos SET id_pratos = %s WHERE id_favorito = %s",
        (novo_prato, id_favorito)
    )
    db.commit()

    return {"msg": "Favorito atualizado com sucesso"}
