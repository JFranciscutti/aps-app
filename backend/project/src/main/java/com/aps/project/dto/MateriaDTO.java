package com.aps.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class MateriaDTO {
  private String id;
  private String name;
  private int year;
  private int cuat;
  private String state;
  private Date lastUpdate;
  private List<String> correlativas;
}
