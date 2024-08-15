package com.ssafy.ssafyro.api.service.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;

//@Component
@RequiredArgsConstructor
public class OllamaResponseGenerator implements AIResponseGenerator {

    private final ChatClient chatClient;

    @Override
    public String generateFeedbackBy(String question, String answer) {
        return chatClient.prompt()
                .user(createFeedbackPrompt(question, answer))
                .call()
                .content();
    }

    @Override
    public AiArticle generateArticle() {
        String content = chatClient.prompt()
                .user(createArticlePrompt())
                .call()
                .content();

        return getArticle(content);
    }

    @Override
    public String generateNewEssay(String question, String content) {
        return chatClient.prompt()
                .user(createEssayReviewPrompt(question, content))
                .call()
                .content();
    }

    private String createFeedbackPrompt(String question, String answer) {
        return "답변은 md 형식이 아닌 text로만, 질문에 대한 답변이 적절한지 피드백 해줘.\n"
                + "질문: " + question + "\n"
                + "답변: " + answer;
    }

    private String createArticlePrompt() {
        return "ssafy PT 모의 면접에 쓰일 IT 신기술 기사 제목, 1000자 이내의 내용, 그리고 그에 따른 질문 2가지 생성해주는데 기사 만들 때 키워드는 2가지 골라서 해줘  질문에 대한 답변은 필요 없어. \n"
                + "기사 제목, 기사 내용,  질문1, 질문2 는 각각 \"-------------\" 구분자로 나눠줘\n"
                + "\n"
                + "키워드 : \n"
                + "블록체인\n"
                + "메타버스\n"
                + "NFT\n"
                + "AR/VR\n"
                + "핀테크\n"
                + "클라우드\n"
                + "사물인터넷\n"
                + "빅데이터\n"
                + "인공지능\n"
                + "자율주행\n"
                + "\n"
                + "예시답안:\n"
                + "\n"
                + "기사 제목 : \n"
                + "\n"
                + "-------------\n"
                + "\n"
                + "기사 내용:\n"
                + "\n"
                + "-------------\n"
                + "\n"
                + "질문1 : \n"
                + "\n"
                + "-------------\n"
                + "\n"
                + "질문2: \n"
                + "\n";
    }

    private String createEssayReviewPrompt(String question, String content) {
        return "질문에 대한 에세이를 첨삭해주고 다시 작성해줘.\n"
                + "질문: " + question + "\n"
                + "에메이: " + content + "\n"
                + "나에게 줄 답변으로 해당 답변 양식만을 채워줘 newcontent에는 해당 에세이 첨삭하는데 문장수 동일하게 만들어주고 changed에는 수정 사항을 다음과 같은 형식으로 작성해 주세요:\n"
                + "\n"
                + "- 수정 전 문장 → 수정 후 문장 (수정 이유). , totalfeedback에서는 전체적인 피드백만 알려줘 구분자로 %%% 써주고\n"
                + "\n"
                + "newcontent:\n"
                + "\n"
                + "%%%\n"
                + "\n"
                + "changed:\n"
                + "\n"
                + "%%%\n"
                + "\n"
                + "totalfeedback:";
    }

    private AiArticle getArticle(String content) {
        return new AiArticle(content.split("-------------"));
    }
}
