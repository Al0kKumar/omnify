package com.assignment.omnify.controller;

import com.assignment.omnify.dto.BlogRequest;
import com.assignment.omnify.dto.BlogResponse;
import com.assignment.omnify.service.BlogService;
import com.assignment.omnify.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<BlogResponse> createBlog(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BlogRequest request) {

        String token = authHeader.substring(7); // remove "Bearer "
        String userId = jwtUtil.extractUserId(token);

        return ResponseEntity.ok(blogService.createBlog(request, userId));
    }


    @GetMapping
    public ResponseEntity<Page<BlogResponse>> getAllBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogService.getAllBlogs(page, size));
    }


    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable String id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<BlogResponse> updateBlog(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id,
            @RequestBody BlogRequest request) {

        String token = authHeader.substring(7);
        String userId = jwtUtil.extractUserId(token);

        return ResponseEntity.ok(blogService.updateBlog(id, request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id) {

        String token = authHeader.substring(7);
        String userId = jwtUtil.extractUserId(token);

        blogService.deleteBlog(id, userId);

        return ResponseEntity.noContent().build();
    }

}
