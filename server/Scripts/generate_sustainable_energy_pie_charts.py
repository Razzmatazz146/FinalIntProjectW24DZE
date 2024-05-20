import sys
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

def generate_sustainable_energy_pie_charts(year, countries):
    # Load the datasets
    energy_data = pd.read_csv('owid-energy-data_A_S.csv')
    countries_data = pd.read_csv('countries.csv')

    # Check if the provided countries exist in the countries.csv
    for country in countries:
        if country not in countries_data['country'].values:
            print(f"Country '{country}' not found in the countries list.")
            return

    # Filter the data for the given year
    year_data = energy_data[energy_data['year'] == year]

    if year_data.empty:
        print(f"No data available for the year '{year}' in the energy dataset.")
        return

    # Initialize a figure with subplots
    fig, axs = plt.subplots(1, len(countries), figsize=(5 * len(countries), 6))

    # Ensure axs is iterable
    if len(countries) == 1:
        axs = [axs]

    # Define a color palette
    color_palette = {
        'Hydro': 'purple',
        'Solar': 'blue',
        'Biofuel': 'green',
        'Wind': 'yellow'
    }
    energy_sources = list(color_palette.keys())
    colors = list(color_palette.values())

    # Filter the data for the given country
    for ax, country in zip(axs, countries):
        country_data = year_data[year_data['country'] == country]

        if country_data.empty:
            print(f"No data available for '{country}' in the year '{year}'.")
            return

        # Extract the required data
        hydro_consumption = country_data['hydro_consumption'].values[0]
        solar_consumption = country_data['solar_consumption'].values[0]
        biofuel_consumption = country_data['biofuel_consumption'].values[0]
        wind_consumption = country_data['wind_consumption'].values[0]

        # Data for the pie chart
        energy_sources = ['Hydro', 'Solar', 'Biofuel', 'Wind']
        consumption_values = [hydro_consumption, solar_consumption, biofuel_consumption, wind_consumption]

        # Plot the pie chart with a specific color palette
        ax.pie(consumption_values, labels=energy_sources, autopct='%1.1f%%', startangle=140, colors=colors)
        ax.set_title(country, fontsize=14, pad=20)

        # Add a legend
        legend_elements = [Patch(facecolor=color, label=energy) for energy, color in color_palette.items()]
        fig.legend(handles=legend_elements, loc='upper right', ncol=1, fontsize=10, title='Energy Types')

    # Set the main title
    plt.suptitle(f'Sustainable Energy Consumption Distribution by Country ({year})', fontsize=16)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.savefig('../images/graph.png')
    plt.show()

if __name__ == "__main__":
    if len(sys.argv) < 3 or len(sys.argv) > 6:
        print("Usage: python generate_sustainable_energy_pie_charts.py <year> <country1> [<country2> <country3> <country4>]")
        sys.exit(1)

    year = int(sys.argv[1])
    countries = sys.argv[2:]

    generate_sustainable_energy_pie_charts(year, countries)
