package com.ssafy.ssafyro.api.service.interview.response;

import java.util.List;

public record ArticleResponse(String title, String article, List<String> question) {
}
