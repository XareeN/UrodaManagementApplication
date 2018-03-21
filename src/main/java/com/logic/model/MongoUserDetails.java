package com.logic.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Created by xareen on 17.12.2017.
 */
public class MongoUserDetails implements UserDetails{

    private String eMail;
    private String password;
    private List<GrantedAuthority> authorities;

    public MongoUserDetails(String eMail, String password, String[] authorities) {
        this.eMail = eMail;
        this.password = password;
        this.authorities = AuthorityUtils.createAuthorityList(authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return eMail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
