# main.py
import sys
import inspect

from src.ingest import ingest_transactions
from src.analysis import run_analysis
from src.advice import generate_advice


DEFAULT_RAW_PATH = "data/raw_transactions/user_bank_export.csv"


def _call_ingest(raw_path: str) -> str:
    """
    Calls ingest_transactions in a flexible way:
    - If ingest_transactions(raw_path) exists, use it.
    - Otherwise, call ingest_transactions() (your current style).
    Expects ingest_transactions to return the clean CSV path.
    """
    sig = inspect.signature(ingest_transactions)
    if len(sig.parameters) >= 1:
        return ingest_transactions(raw_path)
    return ingest_transactions()


def main() -> int:
    # Optional CLI usage:
    #   python main.py data/raw_transactions/some_export.csv
    raw_path = sys.argv[1] if len(sys.argv) >= 2 else DEFAULT_RAW_PATH

    try:
        clean_path = _call_ingest(raw_path)
        if not clean_path:
            raise ValueError("ingest_transactions did not return a clean CSV path.")

        results = run_analysis(clean_path)
        advice = generate_advice(results)

        print("Spending Summary")
        print("-" * 30)
        if advice:
            for line in advice:
                print("-", line)
        else:
            print("- No notable spending patterns detected.")

        return 0

    except FileNotFoundError as e:
        print("ERROR: Input file not found.")
        print("Tried:", raw_path)
        print("Details:", e)
        return 1

    except Exception as e:
        print("ERROR: The pipeline failed.")
        print("Details:", e)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())