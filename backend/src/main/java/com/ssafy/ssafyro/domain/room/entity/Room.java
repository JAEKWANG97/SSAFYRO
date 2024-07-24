package com.ssafy.ssafyro.domain.room.entity;

import com.ssafy.ssafyro.domain.BaseEntity;
import com.ssafy.ssafyro.domain.room.RoomType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Room extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    @Builder
    private Room(String title, RoomType type) {
        this.title = title;
        this.type = type;
    }
}
