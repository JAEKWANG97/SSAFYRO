package com.ssafy.ssafyro.api.service.interview.response;

import java.util.List;

public record ArticleResponse(Long id, String title, String content, List<String> question) {
}
