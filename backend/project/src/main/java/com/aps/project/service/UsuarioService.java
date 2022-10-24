package com.aps.project.service;

import com.aps.project.dto.*;
import com.aps.project.exceptions.*;
import com.aps.project.model.UserRole;
import com.aps.project.model.Usuario;
import com.aps.project.repo.UsuarioRepository;
import io.netty.handler.codec.http2.Http2Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UsuarioService {

  private final UsuarioRepository repository;

  @Autowired
  public UsuarioService(UsuarioRepository repository) {
    this.repository = repository;
  }

  public Usuario createUser(UsuarioNuevoDTO dto) {
    Usuario usuario = new Usuario();
    usuario.setFirstName(dto.getFirstName());
    usuario.setLastName(dto.getLastName());
    usuario.setEmail(dto.getEmail());
    usuario.setPassword(dto.getPassword());
    usuario.setRole(UserRole.valueOf(dto.getRole().toUpperCase()));

    return repository.save(usuario);
  }

  public Usuario getUserByEmailAndPassword(String email, String password) throws WrongPasswordException, UserNotFoundException {
    Optional<Usuario> usuario = repository.getByEmail(email);
    if (usuario.isPresent()) {
      if (Objects.equals(usuario.get().getPassword(), password)) {
        return usuario.get();
      } else {
        throw new WrongPasswordException("Contraseña invalida", "error");
      }
    } else {
      throw new UserNotFoundException("Usuario no encontrado", "error");
    }
  }

  public Usuario updateUser(UsuarioNuevoDTO userToUpdate) throws UserNotFoundException {
    Optional<Usuario> usuario = repository.getByEmail(userToUpdate.getEmail());
    if (usuario.isPresent()) {
      Usuario existingUser = usuario.get();
      existingUser.setPassword(userToUpdate.getPassword());
      existingUser.setFirstName(userToUpdate.getFirstName());
      existingUser.setLastName(userToUpdate.getLastName());
      return repository.save(existingUser);
    } else {
      throw new UserNotFoundException("Usuario no encontrado", "ERROR");
    }
  }

  public List<Usuario> getUserByRole(UserRole role) {
    return repository.getByRole(role);
  }

  public Optional<Usuario> getUsuarioById(Long id) {
    return repository.getUsuarioById(id);
  }
}
