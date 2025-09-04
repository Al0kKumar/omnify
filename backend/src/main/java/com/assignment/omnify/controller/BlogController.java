package com.assignment.omnify.controller;

import com.assignment.omnify.dto.BlogRequest;
import com.assignment.omnify.dto.BlogResponse;
import com.assignment.omnify.repository.UserRepository;
import com.assignment.omnify.service.BlogService;
import com.assignment.omnify.config.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<BlogResponse> createBlog(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BlogRequest request) {

        String token = authHeader.substring(7); // remove "Bearer "
        String userId = jwtUtil.extractUserId(token);

        return ResponseEntity.ok(blogService.createBlog(request, userId));
    }


    @GetMapping
    public ResponseEntity<Page<BlogResponse>> getAllBlogs(  // pagination is added
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogService.getAllBlogs(page, size));
    }


    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable String id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }


    @PatchMapping("/{id}")
    public ResponseEntity<BlogResponse> updateBlog(
            @PathVariable String id,
            @RequestBody BlogRequest request,
            @AuthenticationPrincipal String email) {  // <- directly
        String userId = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        return ResponseEntity.ok(blogService.updateBlog(id, request, userId));
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteBlog(
            @PathVariable String id,
            @AuthenticationPrincipal String email) {

        String userId = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        blogService.deleteBlog(id, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Blog deleted successfully");
        return ResponseEntity.ok(response);
    }



}
