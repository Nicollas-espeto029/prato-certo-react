import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()  # Lê variáveis do .env

def conectar():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASS", "Norb@2025"),
        database=os.getenv("DB_NAME", "cardapio")
    )
