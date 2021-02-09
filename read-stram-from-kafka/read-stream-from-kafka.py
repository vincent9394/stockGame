
#%% [markdown]
# # Find the spark home
# ### 跟返你果個spark 裝咗係邊嘅path
#  Add pyspark to your PYTHON_PATH
import findspark
# findspark.init('/home/vincent/DAE/spark')  #the path of spark
findspark.init('C:\\Users\\user\\vincent\\spark') # for windows

#%% [markdown]
# # Read stream from Kafka
from pyspark.sql import SparkSession
spark = SparkSession.builder\
    .appName("Read Stream from kafka").getOrCreate()
     
# %% [markdown]
# # Readstream from kafka  run in the WSL and change the localhost as ip
dfStream = spark.readStream.format('kafka')\
        .option('kafka.bootstrap.servers','localhost:9092')\
        .option('subscribe','Heatmap').load()

# # %%
# # This one is for debug purpose
# # 如果你唔run .start()，就唔會開始住
# def print_df(df,epoch_id):
#     # df here normal dataframe
#     df.show()

# query = dfStream.writeStream.foreachBatch(print_df).start()
# query.awaitTermination()



# %% [markdown]
# Make a schema for incoming data
from pyspark.sql.types import StringType, IntegerType, StructType, StructField
schema = StructType([
    StructField("_id",StringType()),
    StructField("x",IntegerType()),
    StructField("y",IntegerType()),
    StructField("time_interval",StringType())
])

from pyspark.sql import functions as F
dfStream = dfStream.select(F.from_json(dfStream['value'].cast('string'),schema).alias('mouse_move'))
dfStream_with_schema = dfStream.selectExpr("mouse_move.x",
                                "mouse_move.y",
                                "mouse_move.time_interval"
                                )


# %%
def print_df(df,epoch_id):
    # df here normal dataframe
    df.show()

query = dfStream_with_schema.writeStream.foreachBatch(print_df).start()
query.awaitTermination()
# %% [markdown]

# %%
# { "listing_id" : 562683, "date" : "2021-01-20", "available" : "t", "price" : "$122.00", "adjusted_price" : "$122.00", "minimum_nights" : 1, "maximum_nights" : 1125 }



#%%
# create the database in psql 
db_config = {
    "url":"jdbc:postgresql://localhost:5432/heatmap",
    "user":"admin",
    "password":"admin",
    "driver" :"org.postgresql.Driver"
}

def insert_into_staging_table(df,epoch_id):
     df.write.format('jdbc').options(**db_config).option('dbtable','mouse_move').mode('append').save()

query = dfStream_with_schema.writeStream.foreachBatch(insert_into_staging_table).start()
query.awaitTermination()
# %%

#%%
# create the database in psql 
# db_config = {
#     "url":"jdbc:postgresql://localhost:27017/heatmap",
#     "user":"admin",
#     "password":"admin",
#     "driver" :"org.postgresql.Driver"
# }

# def insert_into_staging_table(df,epoch_id):
#      df.write.format('jdbc').options(**db_config).option('dbtable','mouse_move').mode('append').save()

# query = dfStream_with_schema.writeStream.foreachBatch(insert_into_staging_table).start()
# query.awaitTermination()




