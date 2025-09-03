package com.assignment.omnify.dto;

import com.assignment.omnify.model.Blog;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogResponse {
    private String id;
    private String title;
    private String authorName;
    private String content;
    private Instant createdAt;

    public static BlogResponse fromEntity(Blog blog,String authorName){
        return new BlogResponse(
                blog.getId(),
                blog.getTitle(),
                blog.getContent(),
                authorName,
                blog.getCreatedAt()
        );
    }
}
