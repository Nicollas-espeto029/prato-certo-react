from fastapi import APIRouter, Form, UploadFile, File, HTTPException
from app.database import conectar
import shutil
import os

router = APIRouter(tags=["Pratos"])

os.makedirs("imagens", exist_ok=True)

#! Rota post/CRIAR 👇

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

#! Rota get/LISTAR 👇

@router.get("/pratos")
def listar_pratos():
    db = conectar()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Pratos")
    dados = cursor.fetchall()
    cursor.close()
    db.close()
    return {"pratos": dados}

#! Rota DELETE 👇

@router.delete("/pratos/{id_prato}")
def deletar_prato(id_prato: int):
    conn = None
    cursor = None

    try:
        conn = conectar()
        cursor = conn.cursor()

        # Apaga vínculos primeiro (FOREIGN KEY)
        cursor.execute(
            "DELETE FROM pratoalimento WHERE id_pratos = %s",
            (id_prato,)
        )

        # Agora pode apagar o prato
        cursor.execute(
            "DELETE FROM Pratos WHERE id_pratos = %s",
            (id_prato,)
        )

        conn.commit()

        return {"msg": "Prato deletado com sucesso"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

#! Rota put/ATUALIZAR PRATO 👇

@router.put("/atualizar_prato/{id_prato}")
def atualizar_prato(
    id_prato: int,
    nome: str = Form(None),
    descricao: str = Form(None),
    avaliacao: str = Form(None)
):
    db = conectar()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM Pratos WHERE id_pratos = %s", (id_prato,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Prato não encontrado")

    campos = []
    valores = []

    if nome:
        campos.append("nome = %s")
        valores.append(nome)
    if descricao:
        campos.append("descricao = %s")
        valores.append(descricao)
    if avaliacao:
        campos.append("avaliacao = %s")
        valores.append(avaliacao)

    if not campos:
        raise HTTPException(status_code=400, detail="Nenhum campo enviado")

    valores.append(id_prato)

    sql = f"UPDATE Pratos SET {', '.join(campos)} WHERE id_pratos = %s"
    cursor.execute(sql, valores)
    db.commit()

    return {"msg": "Prato atualizado com sucesso"}

#! Rota put/ATUALIZAR IMAGEM DO PRATO 👇

@router.put("/atualizar_prato_imagem/{id_prato}")
def atualizar_prato_imagem(
    id_prato: int,
    imagem: UploadFile = File(...)
):
    db = conectar()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM Pratos WHERE id_pratos = %s", (id_prato,))
    prato = cursor.fetchone()

    if prato is None:
        raise HTTPException(status_code=404, detail="Prato não encontrado")

    # Salvar nova imagem
    caminho = f"imagens/{imagem.filename}"
    with open(caminho, "wb") as f:
        shutil.copyfileobj(imagem.file, f)

    cursor.execute(
        "UPDATE Pratos SET imagemprato = %s WHERE id_pratos = %s",
        (caminho, id_prato)
    )
    db.commit()

    return {"msg": "Imagem atualizada com sucesso"}


