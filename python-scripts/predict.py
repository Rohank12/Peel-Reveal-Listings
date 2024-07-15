import pickle
import sys
import pandas as pd

# load the model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

# load the column names
with open('columns.pkl', 'rb') as file:
    train_columns = pickle.load(file)

# get the parameters from command line arguments
parameters = sys.argv[1:]
#print(parameters)

if(parameters[0] == '' or parameters[1] == ''):
    print("Unable to predict salary")
else:
    # create a dataframe from the parameters
    df = pd.DataFrame([parameters], columns=['jobRole', 'location'])
    #print(df)

    # one-hot encode the dataframe
    df_encoded = pd.get_dummies(df)
    #print(df_encoded)

    # add the missing columns from the original training set
    df_encoded = df_encoded.reindex(columns=train_columns, fill_value=0)

    # make a prediction
    prediction = model.predict(df_encoded)

    # round prediction to whole number
    prediction = int(round(prediction[0], 2))
    
    # put prediction into money format with 0 decimals
    prediction = '${:,.0f}'.format(prediction)

    print(prediction)