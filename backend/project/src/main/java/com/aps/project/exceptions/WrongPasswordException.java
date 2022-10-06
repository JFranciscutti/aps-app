package com.aps.project.exceptions;

import lombok.Getter;

@Getter
public class WrongPasswordException extends Exception {
  private String error;

  public WrongPasswordException(String message, String error) {
    super(message);
    this.error = error;
  }
}
