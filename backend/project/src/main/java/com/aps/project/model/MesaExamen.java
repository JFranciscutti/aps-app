package com.aps.project.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class MesaExamen {
  @Id
  @GeneratedValue(strategy = GenerationType.TABLE)
  @Column(nullable = false, updatable = false)
  private Long id;

  @JoinColumn(name = "materia_id")
  @ManyToOne
  private Materia materia;

  @JoinColumn(name = "mesa_examen_id")
  @ManyToMany
  private List<Usuario> alumnos = new ArrayList<>();

  private Date fecha;
  private Date inicioInscripcion;
  private Date finInscripcion;

  @JoinColumn(name = "profesor_id")
  @ManyToOne
  private Usuario profesor;
}
