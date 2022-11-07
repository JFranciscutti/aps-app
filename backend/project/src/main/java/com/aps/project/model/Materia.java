package com.aps.project.model;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.util.List;

@Entity
@Getter
@Setter
public class Materia {
  @Id
  @GeneratedValue(strategy = GenerationType.TABLE)
  @Column(nullable = false, updatable = false)
  private Long id;

  @NotNull
  private String name;

  @NotNull
  private int year;

  @NotNull
  private int cuat;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "correlativas", joinColumns = @JoinColumn(name = "materia_id"))
  @Column(name = "correlativas")
  private List<Long> correlativas;
}
