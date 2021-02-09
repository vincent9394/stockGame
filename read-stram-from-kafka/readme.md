1. backend server post localhost:8000/posttokafka
 { "x" : 300, "y" : 300,"timeInterval" : 30 }

2. JAVA Build intellij
   
   build.gradale 
 compile group: 'org.apache.spark', name: 'spark-sql_2.12', version: '3.1.0'


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







# KafKA to Spark

## Java Spark ?
https://spark.apache.org/docs/2.2.0/structured-streaming-kafka-integration.html
https://www.programcreek.com/java-api-examples/?api=org.apache.spark.streaming.kafka.KafkaUtils
https://zhuanlan.zhihu.com/p/59461181

# Spark to database
## download Mongo Jar?
https://mvnrepository.com/artifact/org.mongodb/mongo-java-driver/3.12.7

## Pyspark cannot connect to postgresql
