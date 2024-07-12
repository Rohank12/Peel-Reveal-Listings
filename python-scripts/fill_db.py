from pymongo import MongoClient
import os
from dotenv import load_dotenv
from faker import Faker
import random

load_dotenv()
fake = Faker()
locations = [fake.city() for _ in range(10)] # create global locations
jobs = [fake.job() for _ in range(10)]
# maybe change this later
concrete_jobs = ["HR", "Systems Manager"]
jobs += concrete_jobs

def create_random_person(): 
    """jobs = ["Software Engineer", "Human Resources", "Product Manager",
            "Data Engineer", "Marketing Manager", "Systems Engineer",
            "HR Coordinator", "Project Manager", "Network Engineer"]"""
    chosen_job = random.choice(jobs)
    return {
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "jobRole": chosen_job,
        "isManager": "manager" in chosen_job.lower(),
        "location": random.choice(locations),
        "salary": random.randint(35000, 150000)
    }


def fill_db():
    # get environment variables
    mongodb_uri = os.getenv('MONGODB_DB_URL')
    db_name = os.getenv('MONGO_DB')
    collection_name = os.getenv('MONGO_DB_COLLECTION')

    # connect to local mongo instance
    client = MongoClient(mongodb_uri)

    # select db / create if not existing
    print(type(client[db_name]))
    db = client[db_name]

    # select collection / create if not existing
    collection = db[collection_name]
    
    data = [create_random_person() for _ in range(20)]

    # deletes the entire collection (so we can add new data instead of appending)
    collection.delete_many({})
    # insert data into collectoin (this will append)
    result = collection.insert_many(data)

    print(f"Added {result.inserted_ids} to the collection")

fill_db()


# MongoDB command line reminder:
# `mongosh` -> `show dbs` -> `use directory` -> `show collections` -> `db.employees.find()`