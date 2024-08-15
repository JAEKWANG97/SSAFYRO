package com.ssafy.ssafyro.config;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class KoMorAnConfig {

    public static Komoran getInstance() {
        return KoMorAnInstance.instance;
    }

    private static class KoMorAnInstance {
        private static final Komoran instance = new Komoran(DEFAULT_MODEL.FULL);
    }
}
