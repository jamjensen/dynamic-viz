import pandas as pd
import geopandas as gpd
from shapely.geometry import shape, Point




def make_df():

    df = pd.read_csv('data/crashes_2019.csv')
    df.columns = df.columns.str.replace(' ', '_')
    df.to_csv('data/crashes_clean.csv')
    tst = df.head(20)
    tst.to_csv('data/tst_clean.csv')
    print('done')
    df[(df['NUMBER_OF_CYCLIST_KILLED'] >=1) | (df['NUMBER_OF_CYCLIST_INJURED'] >=1)]\
        [['NUMBER_OF_PEDESTRIANS_INJURED','NUMBER_OF_PEDESTRIANS_KILLED',\
        'NUMBER_OF_CYCLIST_INJURED','NUMBER_OF_CYCLIST_KILLED']].to_csv('cyclist-binary.csv')

    df = df[(df['NUMBER_OF_CYCLIST_KILLED'] >=1) | (df['NUMBER_OF_CYCLIST_INJURED'] >=1)].reset_index()
    df.drop(columns='index',inplace=True) 
    df = df[~df['LATITUDE'].isnull()] 
    df = df[df['LONGITUDE'] < 0]
    df['geometry'] = df.apply(lambda x: Point(x['LONGITUDE'],x['LATITUDE']), axis=1)
    geo_df = gpd.GeoDataFrame(df) 


def make_gdf():
    bike_paths = gpd.read_file('bike-paths.geojson')
    bike_paths[['allclasses','geometry']] 

def assign_district(bike_paths, geo_df):
    
    # keys = bike_paths['geometry']
    # values = bike_paths['allclasses']
    # bike_dict = dict(zip(keys,values))

    points = list(geo_df['geometry'])
    bike_class = {}
    
    path_distance_dict = {}
    
    for i, pt in enumerate(points):
        smallest = 10
        print(i)
        poly_count = 0
        for idx,row in bike_paths.iterrows():
        # for poly,path_type in bike_dict.items():
            line = row['geometry']
            path = row['allclasses']
            # print(poly)
            # print(path)
            # print(pt.within(line))
            # print(pt.distance(line))
            if pt.distance(line) < 1e-4:
                # print('**************************************************************')
                distance = pt.distance(line)
                if distance < smallest:
                    # print('FUCKKKKKKKKK OFFFFFFFFFF')
                    path_distance_dict[i] = idx
                    bike_class[i] = path
                    smallest = distance


    df = pd.DataFrame.from_dict(bike_class,orient='index')
    df.to_csv('bike_path_classes.csv')

    # return bike_class

def plot_single_accident():

    fig, ax = plt.subplots(figsize = (8,8)) 

    gspaths = gpd.GeoSeries(bike_paths.loc[11661,'geometry'])
    gs = gpd.GeoSeries(geo_df.loc[8,'geometry'])

    bike_paths.plot(ax = ax)

    gs.plot(ax=ax, marker='*', color='red')
    gspaths.plot(ax=ax, color='red') 



