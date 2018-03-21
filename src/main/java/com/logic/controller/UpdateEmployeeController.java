package com.logic.controller;

import com.logic.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class UpdateEmployeeController {
    @Autowired
    private IEmployeeRepository employeeRepository;

}
