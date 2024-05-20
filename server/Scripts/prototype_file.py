import pandas as pd
from pymongo import MongoClient
import sys

# Check if there are enough arguments provided
if len(sys.argv) != 3:
    print("Usage: python prototype_file.py owid-energy-data_A_S.csv countries.csv")
    sys.exit(1)

# Get the CSV file names from the command line arguments
energy_data_csv = sys.argv[1]
countries_csv = sys.argv[2]

# Read the CSV files into DataFrames
energy_df = pd.read_csv(energy_data_csv)
countries_df = pd.read_csv(countries_csv)

# Filter the energy data to only include rows where the country is in the countries.csv list
allowed_countries = set(countries_df['country'].unique())

filtered_energy_df = energy_df[energy_df['country'].isin(allowed_countries)]

# Insert the filtered data into MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['energy_database']  # Database name
collection = db['energy_data']  # Collection name

# Convert the DataFrame to a list of dictionaries
energy_records = filtered_energy_df.to_dict(orient='records')

# Insert the data into the collection
collection.insert_many(energy_records)

print(f"Inserted {len(energy_records)} records into the 'energy_data' collection in 'energy_database' database.")