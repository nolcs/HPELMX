package com.enriqueynolasco.assesment.assessment.service.impl;

import com.enriqueynolasco.assesment.assessment.entity.People;
import com.enriqueynolasco.assesment.assessment.repository.PeopleRepository;
import com.enriqueynolasco.assesment.assessment.service.PeopleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PeopleServiceImpl implements PeopleService {

    @Autowired
    private PeopleRepository peopleRepository;

    @Override
    public List<People> getAllPeople() {
        return peopleRepository.findAll();
    }

    @Override
    public People getPeopleById(Long id) {
        return peopleRepository.findById(id).orElse(null);
    }

    @Override
    public List<People> savePeople(People people) {
        peopleRepository.save(people);
        return getAllPeople();
    }

    @Override
    public List<People> deletePeople(Long id) {
        peopleRepository.deleteById(id);
        return getAllPeople();
    }
}
