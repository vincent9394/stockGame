package io.teckyProj3;


import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.StructType;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.scalatest.tools.Durations;

public class Kafka {
    public static void main(String[] args){
        System.out.println("Hello World2");
        //----------------------------------------------------------------------------------------------------------Read stream from Kafka
        //SparkConf sparkConfig = new SparkConf().setAppName("Kafkaproject3").setMaster("local[2]");
        SparkSession spark = SparkSession
                .builder()
                .master("local")
                .appName("Kafkaproject3")
                .config("spark.some.config.option", "some-value")
                .getOrCreate();
        //JavaStreamingContext streamingContext = new JavaStreamingContext(sparkConfig, Durations.seconds(10000));


        //----------------------------------------------------------------------------------------------------------define dataframe
        Dataset<Row> df = spark
                .readStream()
                .format("kafka")
                .option("kafka.bootstrap.servers", "localhost:9092")
                .option("subscribe", "Heatmap")
                .load();
        df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)");

        //----------------------------------------------------------------------------------------------------------define schema type of file data source
        StructType schema = new StructType().add("x", DataTypes.IntegerType).add("y", DataTypes.IntegerType).add("timeInterval", DataTypes.IntegerType);


        df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)");
        //----------------------------------------------------------------------------------------------------------define df
       /**
        OffsetRange[] offsetRanges = {
                // topic, partition, inclusive starting offset, exclusive ending offset
                OffsetRange.create("test", 0, 0, 100),
                OffsetRange.create("test", 1, 0, 100)
        };

        JavaRDD<ConsumerRecord<String, String>> rdd = KafkaUtils.createRDD(
                sparkContext,
                kafkaParams,
                offsetRanges,
                LocationStrategies.PreferConsistent()
        );

        stream.foreachRDD(rdd -> {
            OffsetRange[] offsetRanges = ((HasOffsetRanges) rdd.rdd()).offsetRanges();
            rdd.foreachPartition(consumerRecords -> {
                OffsetRange o = offsetRanges[TaskContext.get().partitionId()];
                System.out.println(
                        o.topic() + " " + o.partition() + " " + o.fromOffset() + " " + o.untilOffset());
            });
        });
        **/




        /*try {
            //result.print();
            df.start();
            streamingContext.awaitTermination();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/



    }


}
