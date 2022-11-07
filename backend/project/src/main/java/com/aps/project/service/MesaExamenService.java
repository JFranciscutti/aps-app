package com.aps.project.service;

import com.aps.project.dto.MesaExamenDTO;
import com.aps.project.exceptions.UserNotFoundException;
import com.aps.project.model.Examen;
import com.aps.project.model.Materia;
import com.aps.project.model.MesaExamen;
import com.aps.project.model.Usuario;
import com.aps.project.repo.ExamenRepository;
import com.aps.project.repo.MesaExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class MesaExamenService {

  private final MesaExamenRepository repository;

  @Autowired
  MateriaService materiaService;

  @Autowired
  UsuarioService usuarioService;

  @Autowired
  ExamenRepository examenRepository;

  @Autowired
  MesaExamenRepository mesaExamenRepository;

  @Autowired
  public MesaExamenService(MesaExamenRepository repository) {
    this.repository = repository;
  }

  public MesaExamen createMesa(MesaExamenDTO dto) throws UserNotFoundException {
    MesaExamen mesaExamen = new MesaExamen();
    Optional<Materia> materia = materiaService.getMateriaById(dto.getMateria().getId());
    if (materia.isEmpty()) {
      throw new UserNotFoundException("Materia no encontrada", "error");
    }
    mesaExamen.setMateria(materia.get());

    Optional<Usuario> profesor = usuarioService.getUsuarioById(dto.getProfesor().getId());
    if (profesor.isEmpty()) {
      throw new UserNotFoundException("Usuario no encontrado", "error");
    }
    mesaExamen.setProfesor(profesor.get());
    mesaExamen.setFecha(dto.getFecha());
    mesaExamen.setInicioInscripcion(dto.getInicioInscripcion());
    mesaExamen.setFinInscripcion(dto.getFinInscripcion());

    return repository.save(mesaExamen);
  }

  public List<MesaExamen> getAllByProfesorId(Long id) {
    return repository.getAllByProfesorId(id);
  }

  public List<MesaExamen> getAllByAlumno(Long id) {
    return repository.getAllByAlumnoInAlumnos(id);
  }

  public List<MesaExamen> getAll() {
    return repository.findAll();
  }

  @Transactional
  public Examen inscripcion(Long mesaExamenId, Long alumnoId) throws Exception {
    Examen examen = new Examen();
    Usuario alumno = usuarioService.getUsuarioById(alumnoId).orElseThrow(()-> new UserNotFoundException("Usuario no encontrado", "error"));
    examen.setAlumno(alumno);

    MesaExamen mesaExamen = mesaExamenRepository.getReferenceById(mesaExamenId);

    examen.setMateria(mesaExamen.getMateria());

    if (!controlCorrelativas(mesaExamen.getMateria(), alumno)) {
      throw new Exception("Error en control de correlativas");
    }

    examen = examenRepository.save(examen);

    if (mesaExamen.getAlumnos().contains(alumno)) {
      throw new Exception("Alumno ya inscripto");
    }
    mesaExamen.getAlumnos().add(alumno);
    mesaExamenRepository.save(mesaExamen);

    return examen;
  }

  private boolean controlCorrelativas(Materia materia, Usuario alumno) {
    List<Long> examenesAlumno = alumno.getMateriasAprobadas();
    List<Long> correlativasMateria = materia.getCorrelativas();
    return new HashSet<>(examenesAlumno).containsAll(correlativasMateria);
  }
}
