# Personal Finance Assistant

A Python-based pipeline that ingests bank transaction CSV exports, cleans and categorizes transactions, analyzes spending patterns using Pandas, and generates human-readable financial insights.

## Overview
This project implements an end-to-end personal finance analysis pipeline. It takes raw bank transaction data (CSV format), standardizes and cleans it, performs exploratory and aggregate analysis, and outputs concise, rule-based advice to help users understand their spending behavior.

The goal of the project is to demonstrate data engineering fundamentals, analytical reasoning, and clean software architecture rather than to build a fully deployed product.

## Features
- Ingests raw bank CSV exports
- Cleans and normalizes transaction data
- Categorizes transactions using rule-based logic
- Analyzes spending by category and by month
- Detects unusually large transactions
- Generates human-readable financial advice
- Clean separation between ingestion, analysis, and advice layers

## Project Structure
personal-finance-assistant/
├── main.py                  # Entry point (runs full pipeline)
├── src/
│   ├── ingest.py            # Phase 1: ingestion & cleaning
│   ├── analysis.py          # Phase 2: Pandas-based analysis
│   └── advice.py            # Phase 3: rule-based advice
├── data/
│   ├── raw_transactions/    # User-provided bank CSVs (ignored by git)
│   └── clean_transactions.csv
├── requirements.txt
└── README.md

## Pipeline Phases

### Phase 1 — Ingestion & Cleaning
- Reads raw bank transaction CSVs
- Normalizes merchant names
- Converts amounts to numeric values
- Computes absolute transaction values
- Assigns spending categories
- Outputs a clean, standardized CSV

### Phase 2 — Analysis
- Loads clean data into Pandas
- Computes totals and averages by category
- Calculates spending percentages
- Analyzes spending over time (if multiple months exist)
- Identifies unusually large transactions

### Phase 3 — Advice
- Interprets analysis results using rule-based logic
- Produces concise, human-readable insights
- Handles cases where insufficient data is available (e.g. single-month exports)

## Input
The project expects a **CSV export from a bank** placed in:
