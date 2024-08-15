package com.ssafy.ssafyro.docs;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssafyro.api.controller.openvidu.OpenViduTokenFactory;
import com.ssafy.ssafyro.api.service.codingtestproblem.CodingTestProblemService;
import com.ssafy.ssafyro.api.service.essay.EssayService;
import com.ssafy.ssafyro.api.service.essayquestion.EssayQuestionService;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import com.ssafy.ssafyro.api.service.interviewresult.InterviewResultService;
import com.ssafy.ssafyro.api.service.itknowledge.ItKnowledgeService;
import com.ssafy.ssafyro.api.service.report.KoMorAnGenerator;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.room.RoomService;
import com.ssafy.ssafyro.api.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@ExtendWith(RestDocumentationExtension.class)
public abstract class RestDocsSupport {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    protected ObjectMapper objectMapper;

    protected MockMvc mockMvc;

    @MockBean
    protected CodingTestProblemService codingTestProblemService;

    @MockBean
    protected EssayService essayService;

    @MockBean
    protected EssayQuestionService essayQuestionService;

    @MockBean
    protected InterviewService interviewService;

    @MockBean
    protected InterviewResultService interviewResultService;

    @MockBean
    protected ItKnowledgeService itKnowledgeService;

    @MockBean
    protected OpenViduTokenFactory tokenFactory;

    @MockBean
    protected ReportService reportService;

    @MockBean
    protected RoomService roomService;

    @MockBean
    protected UserService userService;

    @MockBean
    protected KoMorAnGenerator koMorAnGenerator;

    @BeforeEach
    void setUp(RestDocumentationContextProvider provider) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(provider))
                .build();
    }
}