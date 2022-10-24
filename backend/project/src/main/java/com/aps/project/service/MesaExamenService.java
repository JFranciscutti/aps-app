package com.aps.project.service;

import com.aps.project.dto.MesaExamenDTO;
import com.aps.project.exceptions.UserNotFoundException;
import com.aps.project.model.Examen;
import com.aps.project.model.Materia;
import com.aps.project.model.MesaExamen;
import com.aps.project.model.Usuario;
import com.aps.project.repo.MesaExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public Examen inscripcion(Long materiaId, Long alumnoId) throws UserNotFoundException {
    Examen examen = new Examen();
    Optional<Usuario> alumno = usuarioService.getUsuarioById(alumnoId);
    if (alumno.isEmpty()) {
      throw new UserNotFoundException("Usuario no encontrado", "error");
    }
    examen.setAlumno(alumno.get());

    Optional<Materia> materia = materiaService.getMateriaById(materiaId);
    if (materia.isEmpty()) {
      throw new UserNotFoundException("Materia no encontrada", "error");
    }
    examen.setMateria(materia.get());


    return examen;
  }

//  private boolean controlCorrelativas(Materia materia, Usuario alumno) {
//    //TODO: next sprint
//
//  }
}
