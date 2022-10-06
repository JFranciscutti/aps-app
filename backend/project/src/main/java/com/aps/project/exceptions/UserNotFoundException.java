package com.aps.project.exceptions;

import lombok.Getter;

@Getter
public class UserNotFoundException extends Exception {
  private String error;

  public UserNotFoundException(String message, String error) {
    super(message);
    this.error = error;
  }
}
