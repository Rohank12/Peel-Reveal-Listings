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

num_people_to_be_generated = 20

def create_random_person(id): 
    """jobs = ["Software Engineer", "Human Resources", "Product Manager",
            "Data Engineer", "Marketing Manager", "Systems Engineer",
            "HR Coordinator", "Project Manager", "Network Engineer"]"""
    chosen_job = random.choice(jobs)
    hr_names = ['human resources', 'hr']
    return {
        "id": id,
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "phoneNumber": f"({random.randint(100, 999)}) {random.randint(100, 999)}-{random.randint(1000, 9999)}",
        "jobRole": chosen_job,
        "isManager": "manager" in chosen_job.lower(),
        "isHR": any(job in chosen_job.lower() for job in hr_names),
        "manages": [],
        "location": random.choice(locations),
        "salary": random.randint(35000, 150000)
    }

def assign_managers(people): 
    # want to get all non managers
    non_managers = [person for person in people if not person['isManager']]
    if len(non_managers) != len(people):
        # want to get all managers
        managers = [person for person in people if person['isManager']]
        print(managers)
        for person in non_managers:
            manager = random.choice(managers)
            manager['manages'].append(person['id'])


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
    
    data = [create_random_person(i+1) for i in range(num_people_to_be_generated)]
    assign_managers(data)

    # deletes the entire collection (so we can add new data instead of appending)
    collection.delete_many({})
    # insert data into collectoin (this will append)
    result = collection.insert_many(data)

    print(f"Added {result.inserted_ids} to the collection")

fill_db()


# MongoDB command line reminder:
# `mongosh` -> `show dbs` -> `use directory` -> `show collections` -> `db.employees.find()`