from fastapi import APIRouter, HTTPException
from app.models.comentario_model import ComentarioCreate
from app.database.conn import db_conn
from app.services.perspective_api import analisar_texto

router = APIRouter(
    prefix="/comentarios",
    tags=["Comentários"]
)

# ------------------------------
# POST - criar comentário
# ------------------------------
@router.post("/")
def criar_comentario(comentario: ComentarioCreate):
    score = analisar_texto(comentario.texto)

    # Bloquear se estiver tóxico
    if score >= 0.70:
        raise HTTPException(
            status_code=400,
            detail=f"Comentário tóxico detectado (score={score:.2f})."
        )

    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO comentarios (id_usuario, texto, toxicidade)
        VALUES (%s, %s, %s)
    """, (comentario.id_usuario, comentario.texto, score))

    conn.commit()

    return {"message": "Comentário criado com sucesso!", "toxicidade": score}


# ------------------------------
# GET - listar comentários
# ------------------------------
@router.get("/")
def listar_comentarios():
    conn = db_conn()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM comentarios ORDER BY id DESC")
    comentarios = cursor.fetchall()

    return comentarios


# ------------------------------
# GET - listar comentários de 1 usuário
# ------------------------------
@router.get("/usuario/{id_usuario}")
def listar_por_usuario(id_usuario: int):
    conn = db_conn()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT * FROM comentarios WHERE id_usuario = %s ORDER BY id DESC
    """, (id_usuario,))

    return cursor.fetchall()


# ------------------------------
# DELETE - remover comentário
# ------------------------------
@router.delete("/{id}")
def deletar_comentario(id: int):
    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM comentarios WHERE id = %s", (id,))
    existe = cursor.fetchone()

    if not existe:
        raise HTTPException(status_code=404, detail="Comentário não encontrado.")

    cursor.execute("DELETE FROM comentarios WHERE id = %s", (id,))
    conn.commit()

    return {"message": "Comentário deletado."}
