package com.aps.project.repo;

import com.aps.project.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MateriaRepository extends JpaRepository<Materia, Long> {

  Optional<Materia> getMateriaById(Long id);
}
