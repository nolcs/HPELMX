package com.enriqueynolasco.assesment.assessment.service;

import com.enriqueynolasco.assesment.assessment.entity.People;
import java.util.List;

public interface PeopleService {

    List<People> getAllPeople();

    People getPeopleById(Long id);

    People savePeople(People people);

    void deletePeople(Long id);
}
