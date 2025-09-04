package com.assignment.omnify.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.assignment.omnify.dto.BlogRequest;
import com.assignment.omnify.dto.BlogResponse;
import com.assignment.omnify.model.Blog;
import com.assignment.omnify.model.User;
import com.assignment.omnify.repository.BlogRepository;
import com.assignment.omnify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final UserRepository userRepository;
    private final BlogRepository blogRepository;


    public BlogResponse createBlog(BlogRequest request, String userId) {
        Blog blog = new Blog();
        blog.setUserId(userId);
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setCreatedAt(Instant.now());

        Blog savedBlog = blogRepository.save(blog);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return BlogResponse.fromEntity(savedBlog, user.getName());
    }

    public Page<BlogResponse> getAllBlogs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Blog> blogsPage = blogRepository.findAll(pageable);

        return blogsPage.map(blog -> {
            User user = userRepository.findById(blog.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return BlogResponse.fromEntity(blog, user.getName());
        });
    }

    public BlogResponse getBlogById(String blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        User user = userRepository.findById(blog.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return BlogResponse.fromEntity(blog, user.getName());
    }


    public BlogResponse updateBlog(String blogId, BlogRequest request, String userId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found"));

        if (!blog.getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not the author of this blog");
        }

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            blog.setTitle(request.getTitle());
        }
        if (request.getContent() != null && !request.getContent().isBlank()) {
            blog.setContent(request.getContent());
        }

        blog.setUpdatedAt(Instant.now());
        Blog updatedBlog = blogRepository.save(blog);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return BlogResponse.fromEntity(updatedBlog, user.getName());
    }


    public void deleteBlog(String blogId, String userId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        if (!blog.getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to delete this blog");
        }

        blogRepository.delete(blog);
    }

}
