package com.aps.project.repo;

import com.aps.project.model.MesaExamen;
import com.aps.project.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MesaExamenRepository extends JpaRepository<MesaExamen, Long> {

  List<MesaExamen> getAllByProfesorId(Long id);

  @Query(value = "SELECT me.* FROM mesa_examen_alumnos mea INNER JOIN mesa_examen me WHERE mea.mesa_examen_id = me.id AND mea.alumnos_id = :id; ", nativeQuery = true)
  List<MesaExamen> getAllByAlumnoInAlumnos(@Param("id") Long id);
}
