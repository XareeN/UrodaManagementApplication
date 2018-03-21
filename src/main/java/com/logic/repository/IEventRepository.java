package com.logic.repository;

import com.logic.model.Calendar;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IEventRepository extends MongoRepository<Calendar, String> {

}
