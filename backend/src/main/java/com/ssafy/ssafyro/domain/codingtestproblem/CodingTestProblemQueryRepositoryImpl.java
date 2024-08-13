package com.ssafy.ssafyro.domain.codingtestproblem;

import static com.ssafy.ssafyro.domain.codingtestproblem.QCodingTestProblem.codingTestProblem;
import static com.ssafy.ssafyro.domain.problemscrap.QProblemScrap.problemScrap;
import static com.ssafy.ssafyro.domain.user.QUser.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CodingTestProblemQueryRepositoryImpl implements CodingTestProblemQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<CodingTestProblem> getScrapedCodingTestProblemsBy(Long userId, Pageable pageable) {
        return jpaQueryFactory.select(codingTestProblem)
                .from(user)
                .join(user.problemScraps, problemScrap)
                .join(problemScrap.codingTestProblem, codingTestProblem)
                .where(user.id.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
