1. backend server post localhost:8000/posttokafka
 { "x" : 300, "y" : 300,"timeInterval" : 30 }

2. JAVA Build intellij
   
   build.gradale 
 compile group: 'org.apache.spark', name: 'spark-sql_2.12', version: '3.1.0'


# Create database
PSQL
```
create database heatmap;
```

Create table
```
create table mouse_move(
    id SERIAL PRIMARY KEY,
    x int,
    y int,
    time_interval int
);
```

Mongo
```
mongo
```

```
use heatmap
```

```
db.createCollection( mouse_move,
   {
     capped: <boolean>,
     autoIndexId: <boolean>,
     size: <number>,
     max: <number>,
     storageEngine: <document>,
     validator: <document>,
     validationLevel: <string>,
     validationAction: <string>,
     indexOptionDefaults: <document>,
     viewOn: <string>,              // Added in MongoDB 3.4
     pipeline: <pipeline>,          // Added in MongoDB 3.4
     collation: <document>,         // Added in MongoDB 3.4
     writeConcern: <document>
   }
)
```

```






# KafKA to Spark

## Java Spark ?
https://spark.apache.org/docs/2.2.0/structured-streaming-kafka-integration.html
https://www.programcreek.com/java-api-examples/?api=org.apache.spark.streaming.kafka.KafkaUtils
https://zhuanlan.zhihu.com/p/59461181

# Spark to database
## download Mongo Jar?
https://mvnrepository.com/artifact/org.mongodb/mongo-java-driver/3.12.7

## Pyspark cannot connect to postgresql












# Kafka command
## For linux
``` powershell
// Run kafka
cd to kafka file

// Run zookeeper
./bin/zookeeper-server-start.sh config/zookeeper.properties

// Run server brokers
./bin/kafka-server-start.sh config/server.properties

// Establish User interface
java --add-opens=java.base/sun.nio.ch=ALL-UNNAMED -jar kafdrop-3.27.0.jar --kafka.brokerConnect=localhost:9092

// Create Topic
 ./bin/kafka-topics.sh --create --topic Heatmap --bootstrap-server localhost:9092

// Edit Topic
./bin/kafka-console-producer.sh --topic Heatmap --bootstrap-server localhost:9092

// Specify Topic key
./bin/kafka-console-producer.sh --topic Heatmap --bootstrap-server localhost:9092 --property "parse.key=true" --property "key.separator=:"

// Read topic
./bin/kafka-console-consumer.sh --topic Heatmap --from-beginning --bootstrap-server localhost:9092



## For windows
``` powershell
// Run kafka
cd to kafka file

// Run zookeeper
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties

// Run server brokers
.\bin\windows\kafka-server-start.bat .\config\server.properties

// Establish User interface
java --add-opens=java.base/sun.nio.ch=ALL-UNNAMED -jar kafdrop-3.27.0.jar --kafka.brokerConnect=localhost:9092

// Create Topic
.\bin\windows\kafka-topics.bat --create --topic Heatmap --bootstrap-server localhost:9092

// Edit Topic
.\bin\windows\kafka-console-producer.bat --topic Heatmap --bootstrap-server localhost:9092

// Specify Topic key
.\bin\windows\kafka-console-producer.bat --topic Heatmap --bootstrap-server localhost:9092 --property "parse.key=true" --property "key.separator=:"

// Read topic
.\bin\windows\kafka-console-consumer.bat --topic Heatmap --from-beginning --bootstrap-server localhost:9092
```





# Run the spark for testing propose
## Go to the spark folder, run the pyspark
```
./bin/pyspark
```
## run the following script
```python

dfStream = spark.readStream.format('kafka')\
        .option('kafka.bootstrap.servers','localhost:9092')\
        .option('subscribe','Heatmap').load()

from pyspark.sql.types import StringType, IntegerType, StructType, FloatType, StructField
schema = StructType([
    StructField("_id",StringType()),
    StructField("x",IntegerType()),
    StructField("y",IntegerType()),
    StructField("time_interval",FloatType())
])

from pyspark.sql import functions as F
dfStream = dfStream.select(F.from_json(dfStream['value'].cast('string'),schema).alias('mouse_move'))
dfStream_with_schema = dfStream.selectExpr("mouse_move.x",
                                "mouse_move.y",
                                "mouse_move.time_interval"
                                )

db_config = {
    "url":"jdbc:postgresql://localhost:5432/stock",
    "user":"admin",
    "password":"admin",
    "driver" :"org.postgresql.Driver"
}

def insert_into_staging_table(df,epoch_id):
     df.write.format('jdbc').options(**db_config).option('dbtable','mouse_move').mode('append').save()

query = dfStream_with_schema.writeStream.foreachBatch(insert_into_staging_table).start()
query.awaitTermination()


```