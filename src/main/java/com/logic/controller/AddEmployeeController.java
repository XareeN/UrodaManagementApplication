package com.logic.controller;

import com.logic.model.Employee;
import com.logic.model.IdToDelete;
import com.logic.model.Service;
import com.logic.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by xareen on 21.11.2017.
 */
@RequestMapping("/auth")
@Controller
public class AddEmployeeController {
    @Autowired
    IEmployeeRepository employeeRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/addNewEmployee")
    public ResponseEntity<Employee> addEmployee (@RequestBody Employee employee){
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));
        employeeRepository.save(employee);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteEmployee",method = RequestMethod.POST)
    public ResponseEntity<List<Employee>> deleteEmployee (@RequestBody IdToDelete idToDelete){
        List<String> list = idToDelete.getId();
        Employee employee = new Employee();
        for(String i : list){
            employee.setId(i);
            employeeRepository.delete(employee);
        }
        List<Employee> updateList = employeeRepository.findAll();
        return new ResponseEntity<>(updateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/updateEmployee", method = RequestMethod.POST)
    public ResponseEntity<Employee> updateEmployee (@RequestBody Employee employee){
        employeeRepository.save(employee);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }



}
