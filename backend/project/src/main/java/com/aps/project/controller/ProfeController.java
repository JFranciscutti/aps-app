package com.aps.project.controller;

import com.aps.project.dto.MesaExamenDTO;
import com.aps.project.exceptions.UserNotFoundException;
import com.aps.project.model.Examen;
import com.aps.project.model.MesaExamen;
import com.aps.project.service.MesaExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/profe")
public class ProfeController {
  @Autowired
  MesaExamenService mesaExamenService;

  @PostMapping("/create-mesa")
  public ResponseEntity<MesaExamen> createMesa(@RequestBody MesaExamenDTO mesaExamenDTO) throws UserNotFoundException {
    return ResponseEntity.ok(mesaExamenService.createMesa(mesaExamenDTO));
  }

  @GetMapping("/{profeId}/mesas")
  public ResponseEntity<List<MesaExamen>> getByProfesorId(@PathVariable("profeId") Long id) {
    return ResponseEntity.ok(mesaExamenService.getAllByProfesorId(id));
  }

  @GetMapping("/all-mesas")
  public ResponseEntity<List<MesaExamen>> getAllMesas() {
    return ResponseEntity.ok(mesaExamenService.getAll());
  }

  @GetMapping("/{alumnoId}/mesas-alumno")
  public ResponseEntity<List<MesaExamen>> getMesasByAlumno(@PathVariable("alumnoId") Long id) {
    return ResponseEntity.ok(mesaExamenService.getAllByAlumno(id));
  }

  @GetMapping("/{alumnoId}/inscripcion/{mesaExamenId}")
  public ResponseEntity<Examen> inscripcionAMateria(@PathVariable("mesaExamenId") Long mesaExamenId, @PathVariable("alumnoId") Long alumnoId) throws Exception {
    return ResponseEntity.ok(mesaExamenService.inscripcion(mesaExamenId, alumnoId));
  }
}
