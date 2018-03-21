package com.logic.repository;

import com.logic.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by xareen on 21.10.2017.
 */
public interface IServiceRepository extends MongoRepository<Service, String>{
    Service findOneByName(String name);
    List<Service> findAllByNameContaining(String name);



}
