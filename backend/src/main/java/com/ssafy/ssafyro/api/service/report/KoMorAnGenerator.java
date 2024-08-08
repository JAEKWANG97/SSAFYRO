package com.ssafy.ssafyro.api.service.report;

import com.ssafy.ssafyro.config.KoMorAnConfig;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class KoMorAnGenerator {

    public List<String> createTags(String sentence) {
        return KoMorAnConfig.getInstance()
                .analyze(sentence)
                .getNouns();
    }
}
