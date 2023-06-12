package com.librarians.services;

import com.librarians.models.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    @Autowired
    private DatabaseService databaseService;

    public Mono<ServerResponse> createUserProfile(ServerRequest request) {
        return databaseService
                .createUser(request.bodyToMono(UserProfile.class))   
                .flatMap(status -> ServerResponse.status(status).build());
    }

    public Mono<ServerResponse> updateUserProfile(ServerRequest request) {
        return databaseService
                .updateUserProfile(request.bodyToMono(UserProfile.class))
                .flatMap(status -> ServerResponse.status(status).build());
    }

    public Mono<ServerResponse> getUserProfile(ServerRequest request) {
        return databaseService
                .getUserProfile(request.pathVariable("user_id"))
                .flatMap(resp -> ServerResponse.ok().body(Mono.just(resp), UserProfile.class))
                .switchIfEmpty(ServerResponse.notFound().build());
    }
}