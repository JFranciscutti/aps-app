package com.aps.project.dto;

import com.aps.project.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioNuevoDTO {
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private String role;
}
