# db.py
import os
import mysql.connector
from mysql.connector.connection import MySQLConnection
from dotenv import load_dotenv
from typing import Optional

# Load environment variables from .env file
load_dotenv()

# Function to establish the database connection
def get_db_connection() -> Optional[MySQLConnection]:
    connection: Optional[MySQLConnection] = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )
    return connection
