## Transfering code from jupyter notebook to python script

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import root_mean_squared_error
# maybe more imports
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd
import os
import pickle

load_dotenv()
#  get environment variables
mongodb_uri = os.getenv('MONGODB_DB_URL')
db_name = os.getenv('MONGO_DB')
collection_name = os.getenv('MONGO_DB_COLLECTION')

# connect to local mongo instance
client = MongoClient(mongodb_uri)

# select db / create if not existing
db = client[db_name]

# select collection / create if not existing
collection = db[collection_name]

# get data from mongo
data = collection.find({}, projection={'jobRole': True, 'location': True, 'salary': True, '_id': False})

# create a dataframe
df = pd.DataFrame(list(data))

# encode the jobRole and location columns
df = pd.get_dummies(df, columns=['jobRole', 'location'])

# create feature and target
X = df.drop('salary', axis=1)
y = df['salary']

# split train and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# create a linear regression model
model = LinearRegression()

# fit the model
model.fit(X_train, y_train)

# predict the test set
y_pred = model.predict(X_test)

# calculate the root mean squared error
rmse = root_mean_squared_error(y_test, y_pred)

# save encoded columns
with open('columns.pkl', 'wb') as file:
    pickle.dump(X.columns, file)

# save model with pickle
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)