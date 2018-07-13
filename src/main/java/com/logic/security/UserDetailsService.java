package com.logic.security;

import com.logic.model.MongoUserDetails;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

/**
 * Created by xareen on 17.12.2017.
 */
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private MongoClient mongoClient;

    @Override
    public UserDetails loadUserByUsername(String eMail) throws UsernameNotFoundException {
        MongoDatabase database = mongoClient.getDatabase("CloudFoundry_u4tj3ort_nsf2tr0v");
        MongoCollection<Document> collection = database.getCollection("employee");
        Document document = collection.find(Filters.eq("eMail", eMail)).first();
        if(eMail != null && eMail != "") {
            if(document!=null) {
                String password = document.getString("password");
                List<String> authorities = (List<String>) document.get("authorities");
                MongoUserDetails mongoUserDetails = new MongoUserDetails(eMail,password,authorities.toArray(new String[authorities.size()]));
                return mongoUserDetails;
            }
        }else{
            //jeżeli email jest pusty
            return null;
        }

        return null;
    }




}
