import sys
import pandas as pd
import matplotlib.pyplot as plt

def generate_fossil_energy_graph(country_name):
    # Load the datasets
    energy_data = pd.read_csv('owid-energy-data_A_S.csv')
    countries_data = pd.read_csv('countries.csv')
    
    # Check if the country exists in the countries.csv
    if country_name not in countries_data['country'].values:
        print(f"Country '{country_name}' not found in the countries list.")
        return

    # Filter the data for the given country
    country_data = energy_data[energy_data['country'] == country_name]

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
    plt.savefig('../images/graph.png')
    plt.show()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_fossil_energy_graph.py <country_name>")
        sys.exit(1)
    
    country_name = sys.argv[1]
    generate_fossil_energy_graph(country_name)