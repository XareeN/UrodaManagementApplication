package com.logic.repository;

import com.logic.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by xareen on 21.11.2017.
 */
public interface IEmployeeRepository extends MongoRepository<Employee, String>
{
    Employee findByFirstName(String firstName);
    List<Employee> findAllByFirstName(String firstName);
    Employee findByEMail(String eMail);
//    Employee findBy
}