from pymongo import MongoClient
# do an impor of faker

def fill_db():
    client = MongoClient('localhost', 27017)

    # db can be created here
    db = client['directory']

    # collection can be created here
    collection = db['employees']

    # Sample data (do random later)
    data = [
        {"name": "Bob", "age": 25}
    ]

    # insert data into collectoin
    result = collection.insert_many(data)

    print(f"Added {result} to the collection")

fill_db()

# MongoDB command line reminder:
# `mongosh` -> `show dbs` -> `use directory` -> `show collections` -> `db.employees.find()`