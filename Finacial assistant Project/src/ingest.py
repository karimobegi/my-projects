import csv
def ingest_transactions():
    with open('data/raw_transactions/payments.csv', 'r') as payments:
        csv_reader = csv.DictReader(payments)

        fieldnames = [
            'date',
            'merchant',
            'amount',
            'abs_amount',
            'category'
        ]

        with open('data/clean_transactions.csv', 'w') as clean_p:
            csv_writer = csv.DictWriter(clean_p, fieldnames=fieldnames)
            csv_writer.writeheader()

            for line in csv_reader:
                # Skip invalid rows
                if line['merchant'].strip() == '' or line['amount'].strip() == '':
                    continue

                # Clean merchant
                line['merchant'] = line['merchant'].lower().strip()

                # Convert amount
                amount = float(line['amount'])
                line['amount'] = amount
                line['abs_amount'] = abs(amount)

                # Categorise
                if 'uber' in line['merchant']:
                    line['category'] = 'Transport'
                elif 'netflix' in line['merchant'] or 'spotify' in line['merchant']:
                    line['category'] = 'Subscription'
                elif 'salary' in line['merchant']:
                    line['category'] = 'Income'
                else:
                    line['category'] = 'Other'

                csv_writer.writerow(line)
    return "data/clean_transactions.csv"