import sys
import pandas as pd
import matplotlib.pyplot as plt
import os
import json
from dotenv import load_dotenv
from matplotlib.patches import Patch
from pymongo import MongoClient

def generate_sustainable_energy_pie_graph(year, countries):
    # Connect to MongoDB
    load_dotenv()
    db_name = os.getenv('DB')
    db_url = os.getenv('URL')
    collection_name = os.getenv('COLLECTION')
    client = MongoClient(db_url, 27017)
    db = client[db_name]

    # Load the list of valid countries from the 'countries_list' collection
    countries_data = db[collection_name].find({}, {'_id': 0, 'country': 1})
    countries_list = [country['country'] for country in countries_data]

    # Check if the provided countries exist in the countries_list
    for country in countries:
        if country not in countries_list:
            print(f"Country '{country}' not found in the countries list.")
            return

    # Filter the data for the given year from the 'energy_data' collection
    year_data = pd.DataFrame(list(db[collection_name].find(
        {'year': year}, 
        {'_id': 0, 'country': 1, 'hydro_consumption': 1, 'solar_consumption': 1, 'biofuel_consumption': 1, 'wind_consumption': 1}
    )))

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

        # Check for NaN values in the required columns
        if country_data[['hydro_consumption', 'solar_consumption', 'biofuel_consumption', 'wind_consumption']].isnull().values.any():
            print(f"Missing data for '{country}' in the year '{year}'. Please try again with a different country.")
            continue

        # Extract the required data
        hydro_consumption = country_data['hydro_consumption'].values[0]
        solar_consumption = country_data['solar_consumption'].values[0]
        biofuel_consumption = country_data['biofuel_consumption'].values[0]
        wind_consumption = country_data['wind_consumption'].values[0]

        # Data for the pie chart
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
    # Get the current directory
    current_dir = os.getcwd()

    # Create a directory for the images if it doesn't exist
    images_dir = os.path.join(current_dir, 'images')
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)

    # Save the plot image in the images directory
    image_path = os.path.join(images_dir, 'graph.png')
    plt.savefig(image_path)

if __name__ == "__main__":
    if len(sys.argv) < 3 or len(sys.argv) > 6:
        print("Usage: python generate_sustainable_energy_pie_graph.py <year> <country1> [<country2> <country3> <country4>]")
        sys.exit(1)

    year = int(sys.argv[1])
    countries = json.loads(sys.argv[2])
    print("Python: ", countries)

    generate_sustainable_energy_pie_graph(year, countries)
