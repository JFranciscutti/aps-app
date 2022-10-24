package com.aps.project.dto;

import com.aps.project.model.Usuario;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class MesaExamenDTO {
  private MateriaDTO materia;
  private List<Usuario> alumnos;
  private Date fecha;
  private Date inicioInscripcion;
  private Date finInscripcion;
  private Usuario profesor;
}
