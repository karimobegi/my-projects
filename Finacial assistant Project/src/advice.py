def category_advice(results):
    advice = []

    cat = results["category"]
    percent_by_category = cat["percent_by_category"]          # Series: category -> %
    high_share = cat["high_share_categories"]                 # Series filtered (>20%)
    total_by_category = cat["total_by_category"]              # Series: category -> total
    #top_spending = 
    # C1: Dominant categories (>20%)
    if not high_share.empty:
        # Sort so biggest categories appear first
        high_share_sorted = high_share.sort_values(ascending=False)

        parts = [f"{name} ({pct:.1f}%)" for name, pct in high_share_sorted.items()]
        advice.append("High-spend categories: " + ", ".join(parts) + ".")

    # C2 (optional): very concentrated spending (>40% in one category)
    top_cat = percent_by_category.idxmax()
    top_pct = float(percent_by_category.loc[top_cat])
    if top_pct > 40:
        advice.append(f"Spending is highly concentrated in {top_cat} ({top_pct:.1f}%).")

    # (Optional extra) mention biggest category in total terms
    top_total_cat = total_by_category.idxmax()
    top_total_val = float(total_by_category.loc[top_total_cat])
    advice.append(f"Top spending category by total: {top_total_cat} ({top_total_val:.2f}).")

    return advice

def outlier_advice(results):
    advice = []

    out = results["outliers"]
    num_large = out["num_large_transactions"]
    large_df = out["large_transactions"]
    mean_amount = float(out["mean_amount"])

    # O1: any large transactions exist
    if num_large > 0:
        advice.append(f"You had {num_large} unusually large transaction(s).")

        # O2 (optional): highlight the largest outlier
        largest = float(large_df["abs_amount"].max())

        if largest > 3 * mean_amount:
            largest_row = large_df.loc[
                large_df["abs_amount"] == largest
            ].iloc[0]

            merchant = largest_row["merchant"]
            date = largest_row["date"]
            category = largest_row["category"]
            advice.append(
                f"The largest transaction was {largest:.2f} "
                f"at {merchant} ({category}) on {date}."
            )

    else:
        # O3: no outliers
        advice.append("No unusually large transactions were detected.")

    return advice
def trend_advice(results):
    advice = []

    t = results["time"]
    has_trend = t["has_trend"]

    # T1: only one month (or not enough data)
    if not has_trend:
        advice.append("Not enough monthly history to assess spending trends.")
        return advice

    # T2/T3/T4: look at last month-over-month change
    mom = t["month_over_month_change"]   # Series indexed by month
    last_change = float(mom.iloc[-1])

    if last_change > 0:
        advice.append(f"Spending increased compared to the previous month (+{last_change:.2f}).")
    elif last_change < 0:
        advice.append(f"Spending decreased compared to the previous month ({last_change:.2f}).")
    else:
        advice.append("Spending was stable compared to the previous month.")

    return advice
def generate_advice(results):
    advice = []
    advice.extend(category_advice(results))
    advice.extend(outlier_advice(results))
    advice.extend(trend_advice(results))
    return advice
