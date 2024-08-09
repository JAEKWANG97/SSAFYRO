package com.ssafy.ssafyro.api.service.interviewresult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.interviewresult.response.InterviewResultsResponse;
import com.ssafy.ssafyro.api.service.report.KoMorAnGenerator;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocument;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocumentRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class InterviewResultServiceTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InterviewResultDocumentRepository interviewResultDocumentRepository;

    @Autowired
    private InterviewResultService interviewResultService;

    @Autowired
    private KoMorAnGenerator koMorAnGenerator;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
        interviewResultDocumentRepository.deleteAll();
    }

    @DisplayName("유저 별 각각 미흡한 질문 답변과 비슷한 베스트 질문 답변을 뽑아준다.")
    @Test
    void getRecommendInterviewResultsFor() {
        //given
        String bestQuestion1 = "디자이너로서 앞으로의 목표에 관해서 설명해 주세요";
        String bestAnswer1 = "저는 디자이너로서 많은 경험들을 쌓아서 그것들을 토대로 제 개인 브랜드를 런칭하는 게 목표입니다.";

        String bestQuestion2 = "지원자님께서는 이전 직장에서 퇴사한 후 퇴사한 것을 후회하신 적이 있나요? 있으시면 왜인지도 함께 말씀 부탁드립니다.";
        String bestAnswer2 = "정말 그런 시기가 왔을 때 제가 이 일에 정말 관심이 생겼고 제가 꿈꿨던 그런 순간이 왔다고 생각했을 때 뒤도 돌아보지 않고 그만뒀기 때문에 전혀 후회하지 않습니다.";

        String bestQuestion3 = "지금까지 인생을 살면서 지원자님은 가장 후회되는 일이 있다면 어떤 일이 있었나요? 한 가지만 말씀해 주세요.";
        String bestAnswer3 = "저는 이상하게 어릴 때부터 그렇게 후회하면서 살지 않았기 때문에 딱히 후회하는 일이 없습니다.";

        String bestQuestion4 = "디자인을 할 때 가장 중요하게 생각하는 점이 무엇인가요?";
        String bestAnswer4 = "저는 현실성이라고 생각합니다. 현실적으로 이 디자인이 제품으로 나올 때까지 어 너무 오래 걸리지 않고 무리하지 않는 선에서 나올 수 있는 지를 중요하게 생각합니다.";

        String bestQuestion5 = "지원자님이 태어나서 지금까지 한 일들 가운데 가장 후회했던 일이 무엇인가요? 한 가지만 골라 말씀해 주세요.";
        String bestAnswer5 = "어렸을 때 굉장히 친하게 지낸 친구가 있습니다. 어 제일 친하다고 생각했었고 모든 이야기를 공유하는 사이였습니다. 지금까지 연락이 되지 않고 있는데 그때 어떤 사연이었는지 묻지 못했던 것을 후회하고 있습니다.";

        InterviewResultDocument interviewResultDocument1 = createInterviewResultDocument(100L, bestQuestion1,
                bestAnswer1,
                80);
        InterviewResultDocument interviewResultDocument2 = createInterviewResultDocument(100L, bestQuestion2,
                bestAnswer2,
                95);
        InterviewResultDocument interviewResultDocument3 = createInterviewResultDocument(100L, bestQuestion3,
                bestAnswer3,
                90);
        InterviewResultDocument interviewResultDocument4 = createInterviewResultDocument(100L, bestQuestion4,
                bestAnswer4,
                85);
        InterviewResultDocument interviewResultDocument5 = createInterviewResultDocument(100L, bestQuestion5,
                bestAnswer5,
                100);

        interviewResultDocumentRepository.saveAll(
                List.of(
                        interviewResultDocument1,
                        interviewResultDocument2,
                        interviewResultDocument3,
                        interviewResultDocument4,
                        interviewResultDocument5
                )
        );

        User user = createUser();
        userRepository.save(user);

        String question = "지금까지 인생을 살면서 지원자님은 가장 후회되는 일이 있다면 어떤 일이 있었나요? 한 가지만 말씀해 주세요.";
        String answer = "없는데요.";

        interviewResultDocumentRepository.save(
                createInterviewResultDocument(user.getId(), question, answer, 10)
        );

        //when
        InterviewResultsResponse recommendInterviewResults = interviewResultService.getRecommendInterviewResultsFor(
                user.getId()
        );

        //then
        assertThat(recommendInterviewResults.getInterviewResultInfos())
                .extracting("question", "answer")
                .containsExactly(
                        tuple(bestQuestion3, bestAnswer3),
                        tuple(bestQuestion5, bestAnswer5),
                        tuple(bestQuestion2, bestAnswer2)
                );
    }

    private InterviewResultDocument createInterviewResultDocument(Long userId,
                                                                  String question,
                                                                  String answer,
                                                                  int score) {
        return InterviewResultDocument.create(
                createInterview(userId, question, answer, score), koMorAnGenerator
        );
    }

    private InterviewRedis createInterview(Long userId, String question, String answer, int score) {
        return InterviewRedis.builder()
                .userId(userId)
                .question(question)
                .answer(answer)
                .pronunciationScore(100)
                .evaluationScore(score)
                .happy(100)
                .disgust(0)
                .sad(0)
                .surprise(0)
                .fear(0)
                .angry(0)
                .neutral(0)
                .build();
    }

    private User createUser() {
        return User.builder()
                .username("enduf768640@gmail.com")
                .nickname("김두열")
                .providerId("providerId")
                .profileImageUrl("https://profileImageUrl.example")
                .majorType(MajorType.MAJOR)
                .build();
    }
}