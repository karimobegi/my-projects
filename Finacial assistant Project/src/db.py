import sqlite3
CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    merchant TEXT NOT NULL,
    amount REAL NOT NULL,
    abs_amount REAL NOT NULL,
    category TEXT NOT NULL,
    UNIQUE (date, merchant, amount)
);
"""
INSERT = """
INSERT OR IGNORE INTO transactions
(date, merchant, amount, abs_amount, category)
VALUES (?, ?, ?, ?, ?);
"""
GET_ALL_TRANSACTIONS = "SELECT * FROM transactions;"
GET_BY_CATEGORY = "SELECT * FROM transactions WHERE category = ?;"
def connect():
    conn = sqlite3.connect("data/finance.db")
    conn.row_factory = sqlite3.Row
    return conn
def init_db():
    with connect() as connection:
        connection.execute(CREATE_TABLE)
def insert_transactions(rows: list[dict]) -> int:
    values = [
        (
            row["date"],
            row["merchant"],
            row["amount"],
            row["abs_amount"],
            row["category"],
        )
        for row in rows
    ]
    with connect() as connection:
        cursor = connection.executemany(INSERT, values)
    return len(values)
def fetch_all_transactions():
    with connect() as connection:
        return connection.execute(GET_ALL_TRANSACTIONS).fetchall()
def fetch_by_category(category):
    with connect() as connection:
        return connection.execute(GET_BY_CATEGORY, (category,)).fetchall()


