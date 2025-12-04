from pydantic import BaseModel

class ComentarioCreate(BaseModel):
    id_usuario: int
    texto: str

class Comentario(BaseModel):
    id: int
    id_usuario: int
    texto: str
    toxicidade: float
