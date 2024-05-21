import sys
import pandas as pd
import os
from dotenv import load_dotenv
import matplotlib.pyplot as plt
from pymongo import MongoClient

def generate_fossil_energy_graph(country_name):
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

    # Check if the country exists in the countries_list collection
    if country_name not in countries_list:
        print(f"Country '{country_name}' not found in the countries list.")
        return

    # Filter the data for the given country from the 'energy_data' collection
    country_data = pd.DataFrame(list(db[collection_name].find(
        {'country': country_name}, 
        {'_id': 0, 'year': 1, 'oil_consumption': 1, 'gas_consumption': 1, 'coal_consumption': 1}
    )))
    print(country_data)

    if country_data.empty:
        print(f"No data available for '{country_name}' in the energy dataset.")
        return

    # Extract the required data
    years = country_data['year']
    oil_consumption = country_data['oil_consumption']
    gas_consumption = country_data['gas_consumption']
    coal_consumption = country_data['coal_consumption']

    # Plot the data
    plt.figure(figsize=(10, 6))
    plt.plot(years, oil_consumption, label='Oil Consumption', color='orange')
    plt.plot(years, gas_consumption, label='Gas Consumption', color='green')
    plt.plot(years, coal_consumption, label='Coal Consumption', color='blue')

    plt.xlabel('Year')
    plt.ylabel('Primary Energy Consumption (terawatt-hours)')
    plt.title(f'Fossil Energy Consumption in {country_name}')
    plt.legend()
    plt.grid(True)
    plt.savefig('./images/graph.png')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_fossil_energy_graph.py <country_name>")
        sys.exit(1)
    
    country_name = sys.argv[1]
    generate_fossil_energy_graph(country_name)
