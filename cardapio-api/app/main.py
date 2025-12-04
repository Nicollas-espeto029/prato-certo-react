from fastapi import FastAPI
from app.routers import usuarios, pratos, favoritos

app = FastAPI()

app.include_router(usuarios.router)
app.include_router(pratos.router)
app.include_router(favoritos.router)
