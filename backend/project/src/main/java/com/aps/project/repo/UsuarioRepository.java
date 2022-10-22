package com.aps.project.repo;

import com.aps.project.model.UserRole;
import com.aps.project.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Optional<Usuario> getByEmail(String email);

  List<Usuario> getByRole(UserRole role);
}
