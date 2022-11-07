package com.aps.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Entity
public class Examen {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private Long id;

  @JoinColumn(name = "materia_id")
  @ManyToOne
  private Materia materia;

  private int nota;

  @JoinColumn(name = "alumno_id")
  @ManyToOne
  private Usuario alumno;
}
