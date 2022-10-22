package com.aps.project.service;

import com.aps.project.dto.MateriaDTO;
import com.aps.project.model.Materia;
import com.aps.project.repo.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MateriaService {

  private final MateriaRepository repository;

  @Autowired
  public MateriaService(MateriaRepository repository) {
    this.repository = repository;
  }

  public Materia createMateria (MateriaDTO dto) {
    Materia materia = new Materia();
    materia.setName(dto.getName());
    materia.setYear(dto.getYear());
    materia.setCuat(dto.getCuat());
    materia.setCorrelativas(dto.getCorrelativas());

    return repository.save(materia);
  }

  public List<Materia> getMaterias() {
    return repository.findAll();
  }
}
