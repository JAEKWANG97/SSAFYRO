package com.ssafy.ssafyro.api.service.codingtestproblem;

import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemScrapResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemsResponse;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblemRepository;
import com.ssafy.ssafyro.domain.problemscrap.ProblemScrap;
import com.ssafy.ssafyro.domain.problemscrap.ProblemScrapRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.codingtestproblem.CodingTestProblemNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class CodingTestProblemService {

    private final UserRepository userRepository;
    private final ProblemScrapRepository problemScrapRepository;
    private final CodingTestProblemRepository codingTestProblemRepository;

    public CodingTestProblemsResponse getProblems(Pageable pageable) {
        return new CodingTestProblemsResponse(
                codingTestProblemRepository.findAll(pageable).getContent()
        );
    }

    public CodingTestProblemsResponse getScrapedProblemsBy(Long userId, Pageable pageable) {
        return new CodingTestProblemsResponse(
                codingTestProblemRepository.getScrapedCodingTestProblemsBy(userId, pageable)
        );
    }

    public CodingTestProblemResponse getProblem(Long id) {
        CodingTestProblem problem = getCodingTestProblem(id);

        return new CodingTestProblemResponse(problem);
    }

    public CodingTestProblemScrapResponse createScrap(Long id, Long userId) {
        CodingTestProblem problem = getCodingTestProblem(id);
        User user = getUser(userId);

        ProblemScrap problemScrap = createProblemScrap(user, problem);
        problemScrapRepository.save(problemScrap);

        return CodingTestProblemScrapResponse.of(problemScrap.getId(), userId);
    }

    private CodingTestProblem getCodingTestProblem(Long id) {
        return codingTestProblemRepository.findById(id)
                .orElseThrow(() -> new CodingTestProblemNotFoundException("Problem not found"));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private ProblemScrap createProblemScrap(User user, CodingTestProblem problem) {
        return ProblemScrap.builder()
                .user(user)
                .codingTestProblem(problem)
                .build();
    }
}
