package com.librarians.configurations;

import org.mariadb.jdbc.MariaDbPoolDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.sql.SQLException;

//TODO: hide secret from github
// TODO: dynamic building of configuration/url
@Configuration(proxyBeanMethods = false)
public class SQLConfiguration {

    private static final String connectUrl = "jdbc:mariadb://localhost:3306/development?user=root&password=rootpassword&cachePrepStmts=true&prepStmtCacheSize=250&useServerPrepStmts=false";

    @Bean
    public MariaDbPoolDataSource sqlDataSource() throws SQLException {
        return new MariaDbPoolDataSource(connectUrl);
    }
}