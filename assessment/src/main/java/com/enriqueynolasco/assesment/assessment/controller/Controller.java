package com.enriqueynolasco.assesment.assessment.controller;

import java.util.List;
import org.aspectj.weaver.patterns.TypePatternQuestions.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questions")
@CrossOrigin("http://localhost:3000")
public class Controller {
    @Autowired
    private QuestionServiceImpl questionServiceImpl;

    @GetMapping("/getall")
    public ResponseEntity<List<Question>> listAllQuestions() {

        List<Question> users = questionServiceImpl.getAllQuestions();

        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    public ResponseEntity<Question> getUser(@PathVariable("id") Long id) {

        Question user = questionServiceImpl.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    public void saveQuestion(@RequestBody Question ques) {
        questionServiceImpl.createUser(ques);
        return ResponseEntity.ok(newUser);
    }
}


