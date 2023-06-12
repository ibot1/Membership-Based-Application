package com.librarians.services;

import com.librarians.models.GeopoliticalZone;
import com.librarians.models.Sex;
import com.librarians.models.UserProfile;
import lombok.NonNull;
import org.mariadb.jdbc.MariaDbPoolDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.sql.*;
import java.util.Optional;

// TODO: possible date-timezone error
// TODO: maven code coverage, dependency vulnerability and bugs plugin
// TODO: maybe trimming and more validations of UserProfile with annotations
// TODO: check exceptions and return appropriate status codes
@Service
public class DatabaseService {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseService.class);
    private static final String GET_USER_PROFILE_BY_USER_ID = "select * from user_profile where user_id = ? limit 1";
    private static final String CREATE_USER_PROFILE = "insert into user_profile(user_id, f_name, m_name, s_name, dob, g_zone, phone_no, sex, photo, cv) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_USER_PROFILE = "update user_profile set f_name = ?, m_name = ?, s_name = ?, dob = ?, g_zone = ?, phone_no = ?, sex = ?, photo = ?, cv = ? where user_id = ? limit 1";

    @Autowired
    private MariaDbPoolDataSource sqlDatasource;

    public Mono<UserProfile> getUserProfile(@NonNull String userId) {
        return Mono
                .fromSupplier(() -> getUserProfileFromDB(userId))
                .filter(Optional::isPresent)
                .map(Optional::get);
    }

    public Mono<Integer> createUser(@NonNull Mono<UserProfile> userProfile) {
        return userProfile
                .map(this::createUserProfileInDB);
    }

    public Mono<Integer> updateUserProfile(@NonNull Mono<UserProfile> userProfile) {
        return userProfile
                .map(this::updateUserProfileInDB);
    }

    private int updateUserProfileInDB(UserProfile userProfile) {
        try (Connection connection = sqlDatasource.getConnection()) {
            try (PreparedStatement statement = connection.prepareStatement(UPDATE_USER_PROFILE)) {
                statement.setString(1, userProfile.firstName());
                statement.setString(2, userProfile.midName());
                statement.setString(3, userProfile.surName());
                statement.setDate(4, new Date(userProfile.dob().getTime()));
                statement.setString(5, userProfile.zone().toString());
                statement.setString(6, userProfile.phoneNo());
                statement.setString(7, userProfile.sex().toString());
                statement.setString(8, userProfile.photo());
                statement.setString(9, userProfile.cv());
                statement.setString(10, userProfile.email());

                return statement.executeUpdate() == 1 ? 200 : 400;
            }
        } catch (SQLException e) {
            logger.warn("Failed to update user-profile {} from db", userProfile, e);

            return 500;
        }
    }

    private int createUserProfileInDB(UserProfile userProfile) {
        try (Connection connection = sqlDatasource.getConnection()) {
            try (PreparedStatement statement = connection.prepareStatement(CREATE_USER_PROFILE)) {
                statement.setString(1, userProfile.email());
                statement.setString(2, userProfile.firstName());
                statement.setString(3, userProfile.midName());
                statement.setString(4, userProfile.surName());
                statement.setDate(5, new Date(userProfile.dob().getTime()));
                statement.setString(6, userProfile.zone().toString());
                statement.setString(7, userProfile.phoneNo());
                statement.setString(8, userProfile.sex().toString());
                statement.setString(9, userProfile.photo());
                statement.setString(10, userProfile.cv());
                statement.executeUpdate();

                return 201;
            }
        } catch (SQLException e) {
            logger.warn("Failed to create user-profile {} from db", userProfile, e);

            return 409;
        }
    }

    private Optional<UserProfile> getUserProfileFromDB(String userId) {
        try (Connection connection = sqlDatasource.getConnection()) {
            try (PreparedStatement statement = connection.prepareStatement(GET_USER_PROFILE_BY_USER_ID)) {
                statement.setString(1, userId);
                ResultSet rows = statement.executeQuery();

                if (rows.next()) {
                    return Optional.of(
                            new UserProfile(
                                    rows.getString("f_name"), rows.getString("m_name"),
                                    rows.getString("s_name"), rows.getDate("dob"),
                                    GeopoliticalZone.valueOf(rows.getString("g_zone")),
                                    rows.getString("user_id"), rows.getString("phone_no"),
                                    Sex.valueOf(rows.getString("sex")),
                                    rows.getString("photo"), rows.getString("cv")
                            )
                    );
                }
            }
        } catch (SQLException e) {
            logger.error("Failed to get user-profile {} from db", userId, e);
        }
        return Optional.empty();
    }
}