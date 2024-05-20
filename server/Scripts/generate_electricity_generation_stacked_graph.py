import sys
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def generate_electricity_generation_stacked_graph(year):
    # Load the dataset
    data = pd.read_csv('owid-energy-data_A_S.csv')
    
    # Load the list of valid countries
    valid_countries = pd.read_csv('countries.csv')['country'].tolist()
    
    # Filter data to include only valid countries
    data = data[data['country'].isin(valid_countries)]

    # Filter data for the specified year
    data_year = data[data['year'] == year]

    # Select relevant columns for electricity generation sources
    electricity_columns = ['country', 'hydro_electricity', 'solar_electricity', 
                           'biofuel_electricity', 'wind_electricity', 'oil_electricity', 
                           'gas_electricity', 'coal_electricity']

    data_year = data_year[electricity_columns].dropna()

    # Calculate total electricity generation for each country
    data_year['total_generation'] = data_year[electricity_columns[1:]].sum(axis=1)

    # Sort by total_generation and select the top 10 countries
    top_10_countries = data_year.nlargest(10, 'total_generation')

    # Drop the total_generation column for plotting
    top_10_countries = top_10_countries.drop(columns='total_generation')

    # Setting index to 'country'
    top_10_countries.set_index('country', inplace=True)

    # Define custom colors
    custom_colors = ['blue', 'yellow', 'green', 'purple', 'darkorange', 'red', 'cyan']

    # Define custom legend names
    custom_legend_names = {
        'hydro_electricity': 'Hydro',
        'solar_electricity': 'Solar',
        'biofuel_electricity': 'Biofuel',
        'wind_electricity': 'Wind',
        'oil_electricity': 'Oil',
        'gas_electricity': 'Gas',
        'coal_electricity': 'Coal'
    }

    # Renaming the columns to match custom legend names
    top_10_countries.rename(columns=custom_legend_names, inplace=True)

    # Plotting
    ax = top_10_countries.plot(kind='bar', stacked=True, figsize=(14, 8), color=custom_colors)

    # Adding title and labels
    plt.title(f'Top 10 Countries by Electricity Generation in {year}', fontsize=16)
    plt.xlabel('Country', fontsize=14)
    plt.ylabel('Electricity Generation (terawatt-hours)', fontsize=14)
    
    # Adding a legend with a title
    plt.legend(title='Electricity Source', bbox_to_anchor=(1.05, 1), loc='upper left', title_fontsize='13', fontsize='11')

    # Adding grid
    plt.grid(True)

    # Adjusting layout
    plt.tight_layout(rect=[0, 0, 0.85, 1])

    # Save the plot as a PNG file
    plt.savefig('../images/graph.png')
    plt.show()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_electricity_generation_stacked_graph.py <year>")
        sys.exit(1)

    year = int(sys.argv[1])
    generate_electricity_generation_stacked_graph(year)