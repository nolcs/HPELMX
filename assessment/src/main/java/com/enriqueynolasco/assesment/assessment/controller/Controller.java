package com.enriqueynolasco.assesment.assessment.controller;

import com.enriqueynolasco.assesment.assessment.entity.People;
import com.enriqueynolasco.assesment.assessment.service.impl.PeopleServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/people")
@CrossOrigin("http://localhost:3000")
public class Controller {

    @Autowired
    private PeopleServiceImpl peopleServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<List<People>> listAllPeople() {

        List<People> people = peopleServiceImpl.getAllPeople();

        if (people.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(people);
    }

    @GetMapping("/{id}")
    public ResponseEntity<People> getPeople(@PathVariable("id") Long id) {

        People people = peopleServiceImpl.getPeopleById(id);
        if (people == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(people);
    }

    @PostMapping("/save")
    public ResponseEntity<People> savePeople(@RequestBody People people) {
        People newPeople = peopleServiceImpl.savePeople(people);
        return ResponseEntity.ok(newPeople);
    }

    @PostMapping
    public ResponseEntity<People> modifyPeople(@RequestBody People updatedPeople) {
        People people = peopleServiceImpl.getPeopleById(updatedPeople.getId());
        people.setFirstName(updatedPeople.getFirstName());
        people.setLastName(updatedPeople.getLastName());
        people.setEmail(updatedPeople.getEmail());
        people.setPhoneNumber(updatedPeople.getPhoneNumber());

        return ResponseEntity.ok(people);
    }

    @DeleteMapping
    public void deletePeople(@RequestBody Long id) {
        peopleServiceImpl.deletePeople(id);
    }
}


