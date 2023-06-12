package com.librarians.models;

import java.util.Date;

import lombok.NonNull;

public record UserProfile (@NonNull String firstName, String midName, @NonNull String surName,
                           @NonNull Date dob, @NonNull GeopoliticalZone zone, @NonNull String email,
                           @NonNull String phoneNo, @NonNull Sex sex, @NonNull String photo, @NonNull String cv) {

    @Override
    public String toString() {
        return email;
    }
}