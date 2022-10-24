package com.aps.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
//TODO: next sprint
@Getter
@Setter
public class Examen {

  private Materia materia;
  private int nota;
  private Usuario alumno;
}
