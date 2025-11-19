from pydantic import BaseModel
from typing import List

class Usuario(BaseModel):
    id_Usuario: int
    nome: str
    email: str

class Prato(BaseModel):
    id_pratos: int
    nome: str
    descricao: str
    imagemprato: str
    avaliacao: str
    ingredientes: List[str] = []
