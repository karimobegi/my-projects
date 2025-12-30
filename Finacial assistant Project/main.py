from src.ingest import ingest_transactions
from src.analysis import run_analysis
from src.advice import generate_advice


def main():
    input_path = "data/raw_transactions.csv"
    output_path = "data/clean_transactions.csv"

    # 1) Ingest + clean
    ingest_summary = ingest_transactions(
        input_path=input_path,
        output_path=output_path,
    )

    clean_path = ingest_summary["output_path"]

    # 2) Ingest report
    print("Ingest Report")
    print("-" * 30)
    print(f"- Input:        {input_path}")
    print(f"- Output:       {clean_path}")
    print(f"- Rows read:    {ingest_summary['rows_read']}")
    print(f"- Rows written: {ingest_summary['rows_written']}")
    print(f"- Rows skipped: {ingest_summary['rows_skipped']}")
    print(f"- Skip reasons: {ingest_summary['skip_reasons']}")
    print("-" * 30)

    # 3) Early exit if no valid data
    if ingest_summary["rows_written"] == 0:
        print("No valid transactions found. Analysis aborted.")
        return

    # Optional warning for suspicious files
    if ingest_summary["rows_read"] > 0 and ingest_summary["rows_written"] < 0.5 * ingest_summary["rows_read"]:
        print("⚠️ Warning: More than half of the rows were skipped.")
        print("-" * 30)

    # 4) Analyze
    results = run_analysis(clean_path)

    # 5) Generate advice
    advice = generate_advice(results)

    # 6) Output advice
    print("Spending Summary")
    print("-" * 30)
    for line in advice:
        print("-", line)


if __name__ == "__main__":
    main()