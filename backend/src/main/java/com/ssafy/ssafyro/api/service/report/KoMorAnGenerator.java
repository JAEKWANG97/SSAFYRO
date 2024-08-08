package com.ssafy.ssafyro.api.service.report;

import com.ssafy.ssafyro.config.KoMorAnConfig;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KoMorAnGenerator {

    public List<String> createTags(String question) {
        return KoMorAnConfig.getInstance().analyze(question).getNouns();
    }
}
