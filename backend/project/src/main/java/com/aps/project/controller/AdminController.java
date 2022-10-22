package com.aps.project.controller;

import com.aps.project.dto.MateriaDTO;
import com.aps.project.model.Materia;
import com.aps.project.service.MateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  MateriaService materiaService;

  @PostMapping("/create-materia")
  public ResponseEntity<Materia> createMateria(@RequestBody MateriaDTO materiaDTO) {
    return ResponseEntity.ok(materiaService.createMateria(materiaDTO));
  }

  @GetMapping("/all-materias")
  public ResponseEntity<List<Materia>> getMaterias() {
    return ResponseEntity.ok(materiaService.getMaterias());
  }
}
