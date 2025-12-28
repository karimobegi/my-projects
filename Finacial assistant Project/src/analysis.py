import pandas as pd
def load_data(path = 'data/clean_transactions.csv'):
    df = pd.read_csv(path)
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.to_period('M')
    return df
def category_analysis(df):
    cat_group = df.groupby('category')
    total_by_cat = cat_group['abs_amount'].sum()
    avg_by_cat = cat_group['abs_amount'].mean()
    count_by_cat = cat_group.size()
    percent_by_cat = total_by_cat*100/(df['abs_amount'].sum())
    high_share_cat = percent_by_cat[percent_by_cat > 20]
    return {
        "total_by_category": total_by_cat,
        "avg_by_category": avg_by_cat,
        "count_by_category": count_by_cat,
        "percent_by_category": percent_by_cat,
        "high_share_categories": high_share_cat
    }
def time_analysis(df):
    months = df.groupby('month')
    total_by_month = months['abs_amount'].sum()
    highest_month = total_by_month.idxmax()
    highest_value = total_by_month.loc[highest_month]
    has_trend = total_by_month.size >= 2
    month_over_month_change = total_by_month.diff() if has_trend else None
    return {
        "total_by_month": total_by_month,
        "highest_month": highest_month,
        "highest_month_value": highest_value,
        "has_trend": has_trend,
        "month_over_month_change": month_over_month_change,
    }
def outlier_analysis(df):
    mean_amount = df['abs_amount'].mean()
    large_transactions = df[df['abs_amount'] > 2 * mean_amount]
    return {
        "mean_amount": mean_amount,
        "large_transactions": large_transactions,
        "num_large_transactions": len(large_transactions),
    }
def run_analysis(path="data/clean_transactions.csv"):
    df = load_data(path)
    results = {
    "category": category_analysis(df),
    "time": time_analysis(df),
    "outliers": outlier_analysis(df),
    "top_merchants":df.groupby('merchant')['abs_amount']
              .sum()
              .sort_values(ascending=False)
              .head(3)
    }
    return results
if __name__ == "__main__":
    analysis_results = run_analysis()



