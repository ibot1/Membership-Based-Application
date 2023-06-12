package com.librarians.routers;

import com.librarians.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;

// TODO: more info in non-successful responses
// TODO: documentation in all
// TODO: tests in all
// TODO: security
@Configuration(proxyBeanMethods = false)
public class UserRouter {

    @Bean
    public RouterFunction<ServerResponse> createUserProfile(UserService userService) {
        return RouterFunctions
                .route(POST("/user-profile")
                        .and(contentType(MediaType.APPLICATION_JSON)), userService::createUserProfile);
    }

    @Bean
    public RouterFunction<ServerResponse> updateUserProfile(UserService userService) {
        return RouterFunctions
                .route(PUT("/user-profile")
                        .and(contentType(MediaType.APPLICATION_JSON)), userService::updateUserProfile);
    }

    @Bean
    public RouterFunction<ServerResponse> getUserProfile(UserService userService) {
        return RouterFunctions
                .route(GET("/user-profile/{user_id}")
                        .and(accept(MediaType.APPLICATION_JSON)), userService::getUserProfile);
    }
}