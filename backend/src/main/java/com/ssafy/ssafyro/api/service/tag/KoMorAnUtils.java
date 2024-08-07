package com.ssafy.ssafyro.api.service.tag;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class KoMorAnUtils {

    public static Komoran getInstance() {
        return KoMorAnInstance.instance;
    }

    private static class KoMorAnInstance {
        private static final Komoran instance = new Komoran(DEFAULT_MODEL.FULL);
    }
}
