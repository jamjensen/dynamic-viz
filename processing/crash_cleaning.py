import pandas as pd

df = pd.read_csv('data/crashes_2019.csv')
df.columns = df.columns.str.replace(' ', '_')
df.to_csv('data/crashes_clean.csv')
tst = df.head(20)
tst.to_csv('data/tst_clean.csv')
print('done')
