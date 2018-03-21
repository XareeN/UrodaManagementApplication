package com.logic.controller;

import com.logic.model.Employee;
import com.logic.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by xareen on 21.11.2017.
 */
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private IEmployeeRepository employeeRepository;

    //create
    @RequestMapping(method = RequestMethod.POST)
    public void create (@RequestBody Employee employee) { employeeRepository.save(employee); }

    //read
    @RequestMapping(value = "/{_id}")
    public Employee read(@PathVariable String id) { return employeeRepository.findOne(id); }

    //update
    @RequestMapping(method = RequestMethod.PUT)
    public void update(@RequestBody Employee employee) { employeeRepository.save(employee); }

    //delete
    @RequestMapping(value = "/{_id}", method = RequestMethod.DELETE)
    public void delete(String id) {employeeRepository.delete(id);}
}
