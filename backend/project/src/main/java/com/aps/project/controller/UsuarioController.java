package com.aps.project.controller;

import com.aps.project.model.Usuario;
import com.aps.project.dto.*;
import com.aps.project.exceptions.*;
import com.aps.project.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/usuarios")
public class UsuarioController {

  @Autowired
  UsuarioService service;

  @PostMapping("/create")
  public ResponseEntity<Usuario> createUser(@RequestBody UsuarioNuevoDTO usuarioNuevoDTO) {
    return ResponseEntity.ok(service.createUser(usuarioNuevoDTO));
  }

  @PostMapping("/login/{email}")
  public ResponseEntity<Usuario> loginUser(@PathVariable("email") String email, @RequestBody String password) throws UserNotFoundException, WrongPasswordException {
    return ResponseEntity.ok(service.getUserByEmailAndPassword(email, password));
  }
}
