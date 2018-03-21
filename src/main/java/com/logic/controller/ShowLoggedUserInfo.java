package com.logic.controller;

import com.logic.model.Employee;
import com.logic.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by xareen on 22.12.2017.
 */
@RequestMapping("/auth")
@Controller
public class ShowLoggedUserInfo {
    @Autowired
    private IEmployeeRepository employeeRepository;

    @RequestMapping(value = "/showUser", method = RequestMethod.POST)
    public ResponseEntity<Employee> showUserInfo(Authentication authentication) {
        if (authentication != null) {

            Employee employee = employeeRepository.findByEMail(authentication.getName());
            Employee userToShow = new Employee();
            userToShow.setId(employee.getId());
            userToShow.setFirstName(employee.getFirstName());
            userToShow.setLastName(employee.getLastName());
            userToShow.seteMail(employee.geteMail());
            userToShow.setDateOfBirth(employee.getDateOfBirth());
            userToShow.setTelNo(employee.getTelNo());
            userToShow.setAuthorities(employee.getAuthorities());
            userToShow.setIsActive(employee.getIsActive());


            return new ResponseEntity<>(userToShow, HttpStatus.OK);
        } else {
            Employee employee = new Employee();
            return new ResponseEntity<>(employee, HttpStatus.OK);
        }
    }
}
