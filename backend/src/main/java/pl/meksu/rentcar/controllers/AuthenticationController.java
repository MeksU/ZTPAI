package pl.meksu.rentcar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.meksu.rentcar.models.User;
import pl.meksu.rentcar.services.UserService;
import pl.meksu.rentcar.util.JwtUtil;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getMail(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userService.getUserByMail(loginRequest.getMail()).orElseThrow(() -> new RuntimeException("User not found"));

            String jwt = jwtUtil.generateToken(String.valueOf(user.getId()), user.getType());
            Map<String, String> response = new HashMap<>();
            response.put("jwt", jwt);
            response.put("userId", String.valueOf(user.getId()));
            response.put("userType", user.getType());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (!userService.isMailUnique(user.getMail())) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym e-mailu istnieje.");
        }
        User registeredUser = userService.registerUser(user.getName(), user.getSurname(), user.getMail(), user.getPassword(), "user");
        return ResponseEntity.ok("User registered successfully: " + registeredUser.getMail());
    }
}