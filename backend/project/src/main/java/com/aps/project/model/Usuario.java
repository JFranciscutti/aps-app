package com.aps.project.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private Long id;

  @NotNull
  private String firstName;

  @NotNull
  private String lastName;

  @NotNull
  private String email;

  @NotNull
  private String password;

  @NotNull
  @Enumerated(EnumType.STRING)
  private UserRole role;

  @JoinColumn(name = "examen_id")
  @ManyToMany
  private List<Examen> examenes = new ArrayList<>();

  public List<Long> getMateriasAprobadas() {
    return examenes.stream().filter(examen -> examen.getNota() >= 4).map(examen -> examen.getMateria().getId()).collect(Collectors.toList());
  }

}
