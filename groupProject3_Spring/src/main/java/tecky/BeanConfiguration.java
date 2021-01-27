package tecky;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@ComponentScan("com.baeldung.jdbc")
public class BeanConfiguration {

    @Bean
    public MongoDatabase mongoDatabase(){
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase behaviourDB = client.getDatabase("behaviourDB");
        return behaviourDB;
    }


}
