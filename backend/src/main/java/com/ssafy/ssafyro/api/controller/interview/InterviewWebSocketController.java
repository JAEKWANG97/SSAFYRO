package com.ssafy.ssafyro.api.controller.interview;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.interview.request.InterviewStageRequest;
import com.ssafy.ssafyro.api.controller.interview.request.SelectEvaluatorRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import com.ssafy.ssafyro.api.service.interview.response.ExitResponse;
import com.ssafy.ssafyro.api.service.interview.response.FinishResponse;
import com.ssafy.ssafyro.api.service.interview.response.InterviewStageResponse;
import com.ssafy.ssafyro.api.service.interview.response.SelectEvaluatorResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class InterviewWebSocketController {

    private final InterviewService interviewService;

    @MessageMapping("/start/{roomId}")
    @SendTo("/topic/interview/{roomId}")
    public ApiResult<StartResponse> startInterview(@DestinationVariable String roomId) {
        return success(interviewService.startInterview(roomId));
    }

    @MessageMapping("/finish/{roomId}")
    @SendTo("/topic/interview/{roomId}")
    public ApiResult<FinishResponse> finishInterview(@DestinationVariable String roomId) {
        return success(interviewService.finishInterview(roomId));
    }

    @MessageMapping("/turn/{roomId}")
    @SendTo("/topic/interview/{roomId}")
    public InterviewStageResponse changeTurnInterviewer(@DestinationVariable String roomId,
                                                        @Valid InterviewStageRequest request) {
        return interviewService.changeInterviewer(roomId, request.toServiceRequest());
    }

    @MessageMapping("/submit/{roomId}")
    @SendTo("/topic/interview/{roomId}")
    public SelectEvaluatorResponse selectEvaluator(@DestinationVariable String roomId,
                                                   @Valid SelectEvaluatorRequest request) {
        return new SelectEvaluatorResponse(request.userId());
    }

    @MessageMapping("/exit/{roomId}")
    @SendTo("/topic/interview/{roomId}")
    public ExitResponse exitInterview(@Valid @NotNull Long userId,
                                      @DestinationVariable String roomId) {
        return interviewService.exitInterview(roomId, userId);
    }
}
