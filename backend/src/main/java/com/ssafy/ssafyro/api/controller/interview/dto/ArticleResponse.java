package com.ssafy.ssafyro.api.controller.interview.dto;

import java.util.List;

public record ArticleResponse(String article, List<String> question) {
}
