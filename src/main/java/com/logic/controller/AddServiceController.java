package com.logic.controller;

import com.logic.model.IdToDelete;
import com.logic.model.Service;
import com.logic.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by xareen on 24.10.2017.
 */
@RequestMapping("/auth")
@RestController
public class AddServiceController {
    @Autowired
    private IServiceRepository serviceRepository;

    @PostMapping("/addNewService")
    public ResponseEntity<Service> addService (@RequestBody Service service){
        serviceRepository.save(service);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteService", method = RequestMethod.POST)
    public ResponseEntity<List<Service>> deleteService (@RequestBody IdToDelete idToDelete){
        List<String> list = idToDelete.getId();
        Service service = new Service();
        for(String i : list){
            service.setId(i);
            serviceRepository.delete(service);
        }
        List<Service> updateList = serviceRepository.findAll();
        return new ResponseEntity<>(updateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/updateService", method = RequestMethod.POST)
    public ResponseEntity<Service> updateService (@RequestBody Service service){
        serviceRepository.save(service);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

}
