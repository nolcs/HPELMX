package com.enriqueynolasco.assesment.assessment.service;

import com.enriqueynolasco.assesment.assessment.entity.People;
import java.util.List;

public interface PeopleService {

    List<People> getAllPeople();

    People getPeopleById(Long id);

    List<People> savePeople(People people);

    Object deletePeople(Long id);
}
