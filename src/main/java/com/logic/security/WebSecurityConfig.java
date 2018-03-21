package com.logic.security;

import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by xareen on 12.10.2017.
 */
@Configuration
@EnableWebSecurity

public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    @Autowired
//    private BasicAuthPoint basicAuthPoint;

    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService() {
        return new UserDetailsService();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .exceptionHandling()
                .and()
                .authorizeRequests()
                .antMatchers("/webjars/**","/css/**","/js/**","/pics/**"
                        ,"/sass/**","/fullcalendar/**","/built/**").permitAll()
                .antMatchers("/home","/login").permitAll()
                .antMatchers("/auth/**").authenticated()
                .anyRequest().authenticated()
                .and()
                .csrf().disable()
                .formLogin()
                .loginPage("/login")
                .failureUrl("/login")
                .successHandler(successHandler())
                .failureHandler(failureHandler())
                .defaultSuccessUrl("/auth/calendar", true)
                .usernameParameter("userName")
                .passwordParameter("userPassword")
                .permitAll()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/home")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .and()
                .exceptionHandling()
                .accessDeniedPage("/accessControl")
                .and()
                .httpBasic();
//                .authenticationEntryPoint(basicAuthPoint);

    }

    @Autowired
    public void configureGlobal (AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        org.springframework.security.core.userdetails.UserDetailsService userDetailsService = userDetailsService();
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
//                .inMemoryAuthentication()
//                .withUser("1")
//                .password("1")
//                .roles("USER");
    }

    @Bean
    public AuthenticationSuccessHandler successHandler(){
        SimpleUrlAuthenticationSuccessHandler simpleUrlAuthenticationSuccessHandler = new SimpleUrlAuthenticationSuccessHandler();
        simpleUrlAuthenticationSuccessHandler.setUseReferer(true);
        return simpleUrlAuthenticationSuccessHandler;
    }

    private SimpleUrlAuthenticationFailureHandler failureHandler(){
        return new SimpleUrlAuthenticationFailureHandler();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean()
            throws Exception {
        return super.authenticationManagerBean();
    }


}
