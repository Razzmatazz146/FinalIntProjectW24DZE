import sys
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def generate_top5_bar_graph(criteria):
    # Load the dataset
    data = pd.read_csv('owid-energy-data_A_S.csv')
    
    # Load the list of valid countries
    valid_countries = pd.read_csv('countries.csv')['country'].tolist()
    
    # Filter data to include only valid countries
    data = data[data['country'].isin(valid_countries)]

    # Filter data for the year 2020
    data_2020 = data[data['year'] == 2020]

    # Criteria column mapping
    criteria_column_map = {
        'greenhouse_gas_emissions': 'greenhouse_gas_emissions',
        'population': 'population',
        'gdp': 'gdp'
    }

    # Ensure the criteria is valid
    if criteria not in criteria_column_map:
        print(f"Invalid criteria '{criteria}'. Valid options are: 'greenhouse_gas_emissions', 'population', 'gdp'.")
        return

    # Get the column name for the selected criteria
    criteria_column = criteria_column_map[criteria]

    # Select relevant columns and drop rows with missing values
    data_2020 = data_2020[['country', criteria_column]].dropna()

    # Convert GDP values in scientific notation to regular numbers
    if criteria == 'gdp':
        data [criteria_column] = pd.to_numeric(data [criteria_column], errors='coerce')

    # Get the top 5 countries excluding Canada
    top_5_countries = data_2020[data_2020['country'] != 'Canada'].nlargest(5, criteria_column)['country'].tolist()

    # Include Canada in the list of countries to compare
    countries_to_compare = top_5_countries + ['Canada']

    # Filter data for the past 10 years for the selected countries, stopping at 2020
    data_past_10_years = data[(data['year'] >= 2011) & (data['year'] <= 2020) & (data['country'].isin(countries_to_compare))]

    # Pivot data to have countries as columns and years as rows
    pivot_data = data_past_10_years.pivot(index='year', columns='country', values=criteria_column)

    # Sort columns by 2020 values in descending order
    sorted_columns = pivot_data.loc[2020].sort_values(ascending=False).index.tolist()
    pivot_data = pivot_data[sorted_columns]

    # Plotting
    fig, ax = plt.subplots(figsize=(14, 8))

    bar_width = 1  # Width of each bar
    group_width = bar_width * len(sorted_columns) + 0.6  # Group width including gap
    years = pivot_data.index
    positions = np.arange(len(years)) * group_width  # Positions with gaps

     # Custom colors for the bars
    colors = ['purple', 'blue', 'lightblue', 'cyan', 'green', 'yellow']

    for i, country in enumerate(sorted_columns):
        ax.bar(positions + i * bar_width, pivot_data[country], width=bar_width, label=country, color=colors[i])

    # Highlight the year at which the maximum is identified
    max_year = 2020
    max_values = pivot_data.loc[max_year]
    for i, country in enumerate(sorted_columns):
        max_value = max_values[country]
        ax.annotate(f'{max_value:.2f}', xy=(positions[-1] + i * bar_width, max_value),
                    xytext=(0, 5), textcoords='offset points', ha='center', va='bottom')

    # Set the y-axis label based on the selected criteria
    if criteria == 'greenhouse_gas_emissions':
        y_label = 'Greenhouse Gas Emissions (million tons of CO2 equivalent)'
    elif criteria == 'population':
        y_label = 'Population (In millions)'
    elif criteria == 'gdp':
        y_label = 'GDP (USD)'
    else:
        y_label = 'Criteria'

    ax.set_title(f'{criteria.replace("_", " ").title()} Over last 10 Years (Top 5 Countries in 2020 + Canada)', fontsize=16)
    ax.set_xlabel('Year', fontsize=14)
    ax.set_ylabel(y_label, fontsize=14)
    ax.set_xticks(positions + bar_width * (len(sorted_columns) - 1) / 2)
    ax.set_xticklabels(years, rotation=45)
    ax.legend(title='Country', bbox_to_anchor=(1.05, 1), loc='upper left', title_fontsize='13', fontsize='11', ncol=1)
    ax.grid(True)
    plt.tight_layout(rect=[0, 0, 0.85, 1])

    # Save the plot as a PNG file
    plt.savefig('../images/graph.png')
    plt.show()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_top5_bar_graph.py <criteria>")
        print("Criteria can be one of: 'greenhouse_gas_emissions', 'population', 'gdp'")
        sys.exit(1)

    criteria = sys.argv[1]
    generate_top5_bar_graph(criteria)
