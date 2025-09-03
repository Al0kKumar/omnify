package com.assignment.omnify.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BlogRequest {
    private String title;

    private String content;
}
