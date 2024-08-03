package com.ssafy.ssafyro.api.controller.room;

import com.ssafy.ssafyro.api.controller.room.request.RoomListRequest;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class RoomFilterArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(RoomFiter.class) != null &&
                parameter.getParameterType().equals(RoomListRequest.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory)  {
        String title = webRequest.getParameter("title");
        String type = webRequest.getParameter("type");
        Integer capacity = parseInteger(webRequest.getParameter("capacity"));
        String status = webRequest.getParameter("status");
        int page = parseInteger(webRequest.getParameter("page"), 1);
        int size = parseInteger(webRequest.getParameter("size"), 10);

        return new RoomListRequest(title, type, capacity, status, page, size);
    }

    private Integer parseInteger(String value) {
        return parseInteger(value, null);
    }

    private Integer parseInteger(String value, Integer defaultValue) {
        try {
            return value != null ? Integer.parseInt(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
}
