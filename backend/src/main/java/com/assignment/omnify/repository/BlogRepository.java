package com.assignment.omnify.repository;

import com.assignment.omnify.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BlogRepository extends MongoRepository<Blog, String> {
   List<Blog> findByUserId(String userId);
}
